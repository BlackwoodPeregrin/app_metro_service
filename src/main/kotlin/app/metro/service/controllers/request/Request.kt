package app.metro.service.controllers.request

import java.time.LocalTime

data class RequestInterval(
    val start: LocalTime,
    val end: LocalTime
)

data class RequestWorkDinnerInterval(
    val work: RequestInterval,
    val dinner: RequestInterval
)

data class AddWorkingHouseEmployee(
    val employeeId: Int,
    val weekIntervals: Map<Int, RequestWorkDinnerInterval>
)
