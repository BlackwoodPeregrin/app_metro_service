package app.metro.service.controllers.request

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate
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

data class RegistrationRequest(
    val username: String,
    val password: String,
    val id: Int,
    val role: String
)

data class FilterBidSearch(
    val id: Int?,
    @JsonProperty("passenger_lastName")
    val passengerLastName: String?,
    @JsonProperty("passenger_firstName")
    val passengerFirstName: String?,
    @JsonProperty("passenger_surName")
    val passengerSurName: String?,
    val category: String?,
    @JsonProperty("id_st1")
    val idSt1: Int?,
    @JsonProperty("id_st2")
    val idSt2: Int?,
    val status: String?,
    val uchastok: String?,
    @JsonProperty("employee_lastName")
    val employeeLastName: String?,
    @JsonProperty("employee_firstName")
    val employeeFirstName: String?,
    @JsonProperty("employee_surName")
    val employeeSurName: String?,
    val startDate: LocalDate?,
    val endDate: LocalDate?,
    val startTime: LocalTime?,
    val endTime: LocalTime?
)
