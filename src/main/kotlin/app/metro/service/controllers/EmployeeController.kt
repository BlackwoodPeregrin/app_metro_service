package app.metro.service.controllers

import app.metro.service.controllers.request.ChangeRoleEmployeeRequest
import app.metro.service.controllers.request.ChangeWorkAriaEmployeeRequest
import app.metro.service.controllers.response.EmployeeResponse
import app.metro.service.controllers.response.ErrorResponse
import app.metro.service.controllers.response.Response
import app.metro.service.controllers.response.SuccessResponse
import app.metro.service.entity.Employee
import app.metro.service.repository.EmployeeRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/metro/service/employee")
open class EmployeeController(
    @Autowired val employeeRepo: EmployeeRepository
) {
    @GetMapping("/all")
    fun getAllEmployees(): Response {
        return try {
            EmployeeResponse(employeeRepo.findAll())
        } catch (e: Exception) {
            ErrorResponse(message = "Fail get employees from db")
        }
    }

    @PostMapping("/add")
    fun addEmployee(@RequestBody employee: Employee): Response {
        return try {
            employeeRepo.save(employee)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message="Fail add employee to db")
        }
    }

    @PostMapping("/change/role")
    fun changeRoleEmployee(@RequestBody request: ChangeRoleEmployeeRequest): Response {
        return try {
            val employee = employeeRepo.findById(request.employeeId)
            if (!employee.isPresent) {
                return ErrorResponse(message="Not found employee in db with ID '${request.employeeId}'")
            }
            employee.get().role = request.role
            employeeRepo.save(employee.get())
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message="Fail change work role employ with ID '${request.employeeId}' with error '${e.message}'")
        }
    }

    @PostMapping("/change/work_aria")
    fun changeWorkAriaEmployee(@RequestBody request: ChangeWorkAriaEmployeeRequest): Response {
        return try {
            val employee = employeeRepo.findById(request.employeeId)
            if (!employee.isPresent) {
                return ErrorResponse(message="Not found employee in db with ID '${request.employeeId}'")
            }
            employee.get().workAria = request.workAria
            employeeRepo.save(employee.get())
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message="Fail change work aria employ with ID '${request.employeeId}' with error '${e.message}'")
        }
    }
}
