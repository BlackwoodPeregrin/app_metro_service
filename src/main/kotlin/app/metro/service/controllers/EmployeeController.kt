package app.metro.service.controllers

import app.metro.service.controllers.request.AddWorkingHouseEmployee
import app.metro.service.controllers.request.RequestWorkDinnerInterval
import app.metro.service.controllers.response.*
import app.metro.service.data.EmployeeSchedule
import app.metro.service.entity.Employee
import app.metro.service.repository.AssignedBidRepository
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
    @Autowired val scheduleRepo: EmployeeScheduleRepository
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
            employeeRepo.save(employee.apply { active = true })
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

            scheduleRepo.registrationWorkingHouse(request.employeeId, res)

            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/remove")
    fun removeEmployee(@RequestBody employeeId: Int): Response {
        val employee = employeeRepo.findById(employeeId)
        if (!employee.isPresent) {
            return ErrorResponse(message="Not found employee in db with ID '${employeeId}'")
        }

        val futureBidForEmployee = assignedBidRepository.assignedAllFutureBidByEmployee(employee.get(), LocalDate.now())

        return if (futureBidForEmployee.isEmpty()) {
            employeeRepo.save(employee.get().apply { active = false })
            SuccessResponse()
        } else {
            UnCanceledBid(futureBidForEmployee.map { it.id }, "For this employee have next bids")
        }
    }

    @PostMapping("/change")
    fun changeEmployee(@RequestBody modifyEmployee: Employee): Response {
        val employee = employeeRepo.findById(modifyEmployee.id)
        if (!employee.isPresent) {
            return ErrorResponse(message="Not found employee in db with ID '${modifyEmployee.id}'")
        }

        employeeRepo.save(employee.get()
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

        return SuccessResponse()
    }
}
