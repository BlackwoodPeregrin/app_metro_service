package app.metro.service.controllers

import app.metro.service.controllers.request.AddWorkingHouseEmployee
import app.metro.service.controllers.request.RegistrationRequest
import app.metro.service.controllers.request.RequestWorkDinnerInterval
import app.metro.service.controllers.response.*
import app.metro.service.data.BidStatus
import app.metro.service.data.EmployeeRole
import app.metro.service.data.EmployeeSex
import app.metro.service.entity.Bid
import app.metro.service.entity.Employee
import app.metro.service.repository.AssignedBidRepository
import app.metro.service.repository.BidRepository
import app.metro.service.repository.EmployeeRepository
import app.metro.service.repository.EmployeeScheduleRepository
import app.metro.service.services.BidService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.client.WebClient
import java.math.BigInteger
import java.security.SecureRandom
import java.time.DayOfWeek
import java.time.LocalDate
import kotlin.math.log

@RestController
@RequestMapping("/api/v1/metro/service/employee")
@Api(value = "Сотрудники", description = "Операции с сотрудниками")
open class EmployeeController(
    @Autowired val employeeRepo: EmployeeRepository,
    @Autowired val assignedBidRepository: AssignedBidRepository,
    @Autowired val scheduleRepo: EmployeeScheduleRepository,
    @Autowired val bidRepo: BidRepository,
    @Autowired val assignedRepo: AssignedBidRepository,
    @Autowired val bidService: BidService,
    @Value(("\${uri.registration}")) private val regUri: String
) {
    companion object {
        private val logger = LoggerFactory.getLogger(this::class.java)
        private const val LENGTH_PASSWORD = 12
    }
    @GetMapping("/all")
    @ApiOperation(value = "Получить весь список сотрудников")
    fun getAllEmployees(): Response {
        return try {
            EmployeeResponse(employeeRepo.findAll().filter { it.active == true })
        } catch (e: Exception) {
            ErrorResponse(message = "Fail get employees from db")
        }
    }

    @PostMapping("/add")
    @ApiOperation(value = "Добавить нового сотрудника")
    fun addEmployee(@RequestBody employee: Employee): Response {
        return try {
            employeeRepo.save(employee.apply {
                active = true
                sick = false
            })

            val password = generatePassword()

            val regRequest = RegistrationRequest(
                username = employee.phone,
                password = password,
                id = employee.id,
                role = castRoleRegistration(EmployeeRole.convertFromString(employee.role))
            )

            val responseReg = WebClient.create()
                .post()
                .uri("$regUri/register")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(regRequest))
                .retrieve()
                .bodyToMono(String::class.java)
                .block()

            class Response(val password: String): SuccessResponse()

            return Response(password)
        } catch (e: Exception) {
            logger.error(e.message)

            employeeRepo.delete(employee)

            ErrorResponse(message="Fail add employee to db")
        }
    }

    @PostMapping("/remove")
    @ApiOperation(value = "Удалить сотрудника")
    fun removeEmployee(@RequestBody employeeId: Int): Response {
        return try {
            val employee = getEmployee(employeeId)
            val futureBidForEmployee = assignedBidRepository.assignedAllFutureBidByEmployee(employee, LocalDate.now())
            if (futureBidForEmployee.isEmpty()) {
                employeeRepo.save(employee.apply { active = false })
                SuccessResponse()
            } else {
                UnCanceledBid(futureBidForEmployee.map { bid -> bid.id }, "For this employee have next bids")
            }
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/change")
    @ApiOperation(value = "Изменить данные по сотруднику")
    fun changeEmployee(@RequestBody modifyEmployee: Employee): Response {
        return try {
            employeeRepo.save(getEmployee(modifyEmployee.id)
                .apply {
                    lastName = modifyEmployee.lastName
                    firstName = modifyEmployee.firstName
                    surName = modifyEmployee.surName
                    role = modifyEmployee.role
                    workAria = modifyEmployee.workAria
                    sex = modifyEmployee.sex
                    phone = modifyEmployee.phone
                }
            )

            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/sick_leave/on")
    @ApiOperation(value = "Вывести на больничный")
    fun sickLeaveEmployee(@RequestBody employeeId: Int): Response {
        return try {
            val employee = getEmployee(employeeId)

            employeeRepo.save(employee.apply { sick = true })

            val unAssignedBids = mutableListOf<Bid>()

            for (bid in assignedRepo.assignedAllFutureBidByEmployee(employee, LocalDate.now())) {
                logger.info("bid = $bid")

                assignedRepo.removeEmployeeFromBid(bid.id, employee.id)

                var replaceEmployee = false

                for (emp in scheduleRepo.getWhoCanTakeBid(bid.date, bid.time).keys) {
                    if (bidService.canAddEmployeeToBid(bid, emp, EmployeeSex.convertFromString(employee.sex))) {
                        assignedRepo.assignNewBid(listOf(emp), bid)
                        replaceEmployee = true
                        break
                    }
                }

                if (!replaceEmployee) {
                    bidRepo.save(bid.apply { status = BidStatus.NOT_DISTRIBUTED.convertToString()})
                    assignedRepo.removeBidFromEmployees(bid.id)
                    unAssignedBids.add(bid)
                }
            }

            NotDistributedBids(unAssignedBids.map { it.id })
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/sick_leave/off")
    @ApiOperation(value = "Снять с больничного")
    fun sickLeaveEmployeeOff(@RequestBody employeeId: Int): Response {
        return try {
            val employee = getEmployee(employeeId)
            employeeRepo.save(employee.apply { sick = false })

            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @GetMapping("/get/schedule")
    @ApiOperation(value = "Получить рабочее расписание всех сотрудников")
    fun getEmployeeSchedule(): List<AddWorkingHouseEmployee> {
        val res = mutableListOf<AddWorkingHouseEmployee>()

        for (employee in employeeRepo.findAll().filter { it.active == true }) {
            val weekSchedule = scheduleRepo.getScheduleByEmployee(employee)

            val weekIntervals = mutableMapOf<Int, RequestWorkDinnerInterval>()

            for ((day, schedule) in weekSchedule) {
                if (schedule != null) {
                    weekIntervals[day.value] = schedule
                }
            }

            res.add(AddWorkingHouseEmployee(employee.id, weekIntervals))
        }

        return res
    }

    @PostMapping("/change/schedule")
    @ApiOperation(value = "Изменить рабочее расписание сотрудника")
    fun changeWorkingHoursEmployee(@RequestBody newSchedule: AddWorkingHouseEmployee): Response {
        return try {
            val employee = getEmployee(newSchedule.employeeId)

            val res = mutableMapOf<DayOfWeek, RequestWorkDinnerInterval>()
            for ((day, interval) in newSchedule.weekIntervals) {
                res[DayOfWeek.of(day)] = interval
            }

            if (scheduleRepo.getScheduleByEmployee(employee).isEmpty()) {
                scheduleRepo.registrationWorkingHouse(employee.id, res)
                return SuccessResponse()
            }

            scheduleRepo.removeWorkingHours(employee)
            scheduleRepo.registrationWorkingHouse(employee.id, res)

            val unAssignedBids = mutableListOf<Bid>()

            for (bid in assignedRepo.assignedAllFutureBidByEmployee(employee, LocalDate.now())) {
                logger.info("bid = $bid")

                assignedRepo.removeEmployeeFromBid(bid.id, employee.id)
                if (bidService.canAddEmployeeToBid(bid, employee, EmployeeSex.convertFromString(employee.sex))) {
                    assignedRepo.assignNewBid(listOf(employee), bid)
                } else {
                    unAssignedBids.add(bid)
                }
            }

            val finalUnAssigned = mutableListOf<Int>()
            val reRegBid = mutableMapOf<Int, Int>()

            for (bid in unAssignedBids) {
                for (emp in scheduleRepo.getWhoCanTakeBid(bid.date, bid.time).keys) {
                    if (bidService.canAddEmployeeToBid(bid, emp, EmployeeSex.convertFromString(employee.sex))) {
                        assignedRepo.assignNewBid(listOf(emp), bid)
                        reRegBid[bid.id] = emp.id
                        break
                    }
                }

                if (reRegBid[bid.id] == null) {
                    assignedRepo.removeBidFromEmployees(bid.id)
                    bidRepo.save(bid.apply { status = BidStatus.NOT_DISTRIBUTED.convertToString() })
                    finalUnAssigned.add(bid.id)
                }
            }

            NotDistributedBids(finalUnAssigned)
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    private fun getEmployee(employeeId: Int): Employee {
        val employee = employeeRepo.findById(employeeId)
        if (!employee.isPresent || employee.get().active == false) {
            throw RuntimeException("Not found employee in db with ID '${employeeId}'")
        }
        return employee.get()
    }

    private fun generatePassword(): String {
        val random = SecureRandom()
        val uniquePassword = BigInteger(130, random).toString(32)
        return uniquePassword.take(LENGTH_PASSWORD)
    }

    private fun castRoleRegistration(role: EmployeeRole): String {
        return when (role) {
            EmployeeRole.ADMINISTRATOR -> "adm"
            EmployeeRole.SPECIALIST -> "st"
            EmployeeRole.SECTION_CHIEF -> "cu"
            EmployeeRole.SENIOR_INSPECTOR -> "csi"
            EmployeeRole.OPERATOR -> "cio"
            EmployeeRole.INSPECTOR -> "ci"
        }
    }
}
