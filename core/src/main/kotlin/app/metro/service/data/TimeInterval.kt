package app.metro.service.data

import java.time.LocalDate
import java.time.LocalTime

data class TimeInterval(
    val startDate: LocalDate,
    val endDate: LocalDate,
    val startTime: LocalTime,
    val endTime: LocalTime,
)
