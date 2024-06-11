package app.metro.service.controllers.request

data class ChangeRoleEmployeeRequest(
    val employeeId: Int,
    val role: String
)

data class ChangeWorkAriaEmployeeRequest(
    val employeeId: Int,
    val workAria: Int
)