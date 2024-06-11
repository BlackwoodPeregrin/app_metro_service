package app.metro.service.data

import java.time.LocalDate
import java.time.LocalTime

data class WorkInterval(
    val startTime: LocalTime,
    val endTime: LocalTime,
    val startDate: LocalDate,
    val endDate: LocalDate
)