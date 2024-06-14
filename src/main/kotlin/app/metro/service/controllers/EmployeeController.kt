package app.metro.service.controllers

import app.metro.service.controllers.request.AddWorkingHouseEmployee
import app.metro.service.controllers.request.RequestWorkDinnerInterval
import app.metro.service.controllers.response.*
import app.metro.service.data.BidStatus
import app.metro.service.entity.Employee
import app.metro.service.repository.AssignedBidRepository
import app.metro.service.repository.BidRepository
import app.metro.service.repository.EmployeeRepository
import app.metro.service.repository.EmployeeScheduleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.DayOfWeek
import java.time.LocalDate

@RestController
@RequestMapping("/api/v1/metro/service/employee")
open class EmployeeController(
    @Autowired val employeeRepo: EmployeeRepository,
    @Autowired val assignedBidRepository: AssignedBidRepository,
    @Autowired val scheduleRepo: EmployeeScheduleRepository,
    @Autowired val bidRepo: BidRepository,
    @Autowired val assignedRepo: AssignedBidRepository
) {
    @GetMapping("/all")
    fun getAllEmployees(): Response {
        return try {
            EmployeeResponse(employeeRepo.findAll().filter { it.active == true })
        } catch (e: Exception) {
            ErrorResponse(message = "Fail get employees from db")
        }
    }

    @PostMapping("/add")
    fun addEmployee(@RequestBody employee: Employee): Response {
        return try {
            employeeRepo.save(employee.apply {
                active = true
                sick = false
            })
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message="Fail add employee to db")
        }
    }

    @PostMapping("/add/working_hours")
    fun addWorkingHouseEmployee(@RequestBody request: AddWorkingHouseEmployee): Response {
        return try {
            val res = mutableMapOf<DayOfWeek, RequestWorkDinnerInterval>()

            for ((day, interval) in request.weekIntervals) {
                res[DayOfWeek.of(day)] = interval
            }

            scheduleRepo.registrationWorkingHouse(getEmployee(request.employeeId).id, res)

            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/remove")
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
    fun sickLeaveEmployee(@RequestBody employeeId: Int): Response {
        return try {
            val employee = getEmployee(employeeId)
            val notDistributed = assignedBidRepository.assignedAllFutureBidByEmployee(employee, LocalDate.now()).map { bid ->
                bid.status = BidStatus.NOT_DISTRIBUTED.convertToString()
                assignedRepo.removeBidFromEmployees(bid.id)
                bid.id
            }
            employeeRepo.save(employee.apply { sick = true })

            NotDistributedBids(notDistributed)
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/sick_leave/off")
    fun sickLeaveEmployeeOff(@RequestBody employeeId: Int): Response {
        return try {
            val employee = getEmployee(employeeId)
            employeeRepo.save(employee.apply { sick = false })

            SuccessResponse()
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
}
