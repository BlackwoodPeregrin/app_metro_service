package app.metro.service.controllers.response

import app.metro.service.entity.Employee
import app.metro.service.entity.Passenger

interface Response {
    val code: Int
    val message: String
}

open class SuccessResponse(
    override val code: Int = 200,
    override val message: String = "OK"
) : Response

class ErrorResponse(
    override val code: Int = 500,
    override val message: String
) : Response

class PassengersResponse(
    val passengers: List<Passenger>
) : SuccessResponse()


class EmployeeResponse(
    val employee: List<Employee>
) : SuccessResponse()

class AddBuildResponse(
    val added: Boolean
) : SuccessResponse()