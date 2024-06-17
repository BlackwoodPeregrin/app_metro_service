package app.metro.service.controllers.request

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import java.time.LocalDate
import java.time.LocalTime

@ApiModel(value = "RequestWorkDinnerInterval", description = "Модель данных расписания рабочего дня")
data class RequestInterval(
    @ApiModelProperty(value = "Начало интервала")
    val start: LocalTime,
    @ApiModelProperty(value = "Конец интервала")
    val end: LocalTime
)

@ApiModel(value = "RequestWorkDinnerInterval", description = "Модель данных расписания рабочего дня")
data class RequestWorkDinnerInterval(
    @ApiModelProperty(value = "Рабочие часы")
    val work: RequestInterval,
    @ApiModelProperty(value = "Обеденные часы")
    val dinner: RequestInterval
)

@ApiModel(value = "AddWorkingHouseEmployee", description = "Модель данных недельного расписания сотрудников")
data class AddWorkingHouseEmployee(
    @ApiModelProperty(value = "ID сотрудника")
    val employeeId: Int,
    @ApiModelProperty(value = "Рабочие часы по дням недели")
    val weekIntervals: Map<Int, RequestWorkDinnerInterval>
)

data class RegistrationRequest(
    val username: String,
    val password: String,
    val id: Int,
    val role: String
)

@ApiModel(value = "FilterBidSearch", description = "Модель данных фильтра поиска заявок")
data class FilterBidSearch(
    @ApiModelProperty(value = "ID заявки")
    val id: Int?,
    @JsonProperty("passenger_lastName")
    @ApiModelProperty(value = "Фамилия пассажира")
    val passengerLastName: String?,
    @JsonProperty("passenger_firstName")
    @ApiModelProperty(value = "Имя пассажира")
    val passengerFirstName: String?,
    @JsonProperty("passenger_surName")
    @ApiModelProperty(value = "Отчество пассажира")
    val passengerSurName: String?,
    @ApiModelProperty(value = "Категория")
    val category: String?,
    @JsonProperty("id_st1")
    @ApiModelProperty(value = "Начальная станция")
    val idSt1: Int?,
    @JsonProperty("id_st2")
    @ApiModelProperty(value = "Конечная станция")
    val idSt2: Int?,
    @ApiModelProperty(value = "Статус")
    val status: String?,
    @ApiModelProperty(value = "Рабочий участок")
    val uchastok: String?,
    @JsonProperty("employee_lastName")
    @ApiModelProperty(value = "Отчество сотрудника")
    val employeeLastName: String?,
    @JsonProperty("employee_firstName")
    @ApiModelProperty(value = "Имя сотрудника")
    val employeeFirstName: String?,
    @JsonProperty("employee_surName")
    @ApiModelProperty(value = "Отчество сотрудника")
    val employeeSurName: String?,
    @ApiModelProperty(value = "Начало интервала посика заявок по дате")
    val startDate: LocalDate?,
    @ApiModelProperty(value = "Конец интервала посика заявок по дате")
    val endDate: LocalDate?,
    @ApiModelProperty(value = "Начало интервала посика заявок по времени")
    val startTime: LocalTime?,
    @ApiModelProperty(value = "Конец интервала посика заявок по времени")
    val endTime: LocalTime?
)
