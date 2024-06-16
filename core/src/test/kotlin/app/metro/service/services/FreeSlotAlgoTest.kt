package app.metro.service.services

import app.metro.service.data.EmployeeSex
import java.time.LocalTime
import java.time.format.DateTimeFormatter
import kotlin.test.Test
import kotlin.test.assertEquals

class FreeSlotAlgoTest {
    companion object {
        private val freeSlotCalc = FreeSlotCalculation()
    }

    @Test
    fun test1() {
        val config = FreeSlotConfig(
            schedules = mapOf(
                1 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("09:00" to "10:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
                2 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("10:00" to "11:00", "13:00" to "14:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
                3 to EmployeeConf(EmployeeSex.FEMALE, toLocalTime(listOf("09:30" to "10:30")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0)))
            ),
            duration = 30,
            requiredMen = 2,
            requiredWomen = 0
        )

        assertEquals(
            expected = freeSlotCalc.calculate(config),
            actual = toLocalTime(listOf("08:00" to "09:00", "11:00" to "13:00", "14:00" to "17:00"))
        )
    }

    @Test
    fun test2() {
        val config = FreeSlotConfig(
            schedules = mapOf(
                1 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("09:00" to "10:00", "12:00" to "13:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(18, 0))),
                2 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("10:00" to "11:00", "14:00" to "15:00")), TimeSlot(start = LocalTime.of(9, 0), end = LocalTime.of(17, 0))),
                3 to EmployeeConf(EmployeeSex.FEMALE, toLocalTime(listOf("08:30" to "09:30", "11:00" to "12:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(16, 30))),
                4 to EmployeeConf(EmployeeSex.FEMALE, toLocalTime(listOf("08:00" to "09:00", "15:00" to "16:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0)))

            ),
            duration = 45,
            requiredMen = 1,
            requiredWomen = 1
        )

        assertEquals(
            expected = freeSlotCalc.calculate(config),
            actual = toLocalTime(listOf("09:00" to "10:00", "10:00" to "11:00", "10:00" to "12:00", "11:00" to "14:00", "12:00" to "14:00", "13:00" to "15:00", "13:00" to "16:30", "15:00" to "16:30", "16:00" to "17:00"))
        )
    }

    @Test
    fun test3() {
        val config = FreeSlotConfig(
            schedules = mapOf(
                1 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("08:00" to "09:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
                2 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("09:00" to "10:00", "13:00" to "14:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
                3 to EmployeeConf(EmployeeSex.FEMALE, toLocalTime(listOf("10:00" to "11:00", "14:00" to "15:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(18, 0))),
                4 to EmployeeConf(EmployeeSex.FEMALE, toLocalTime(listOf("08:30" to "09:30", "11:00" to "12:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(16, 30))),
                5 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("12:00" to "13:00", "15:00" to "16:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0)))
            ),
            duration = 30,
            requiredMen = 2,
            requiredWomen = 1
        )

        assertEquals(
            expected = freeSlotCalc.calculate(config),
            actual = toLocalTime(listOf("08:00" to "08:30", "08:00" to "09:00", "09:00" to "10:00", "09:30" to "11:00", "10:00" to "11:00", "11:00" to "12:00", "11:00" to "13:00", "12:00" to "13:00", "13:00" to "14:00", "13:00" to "15:00", "14:00" to "15:00", "14:00" to "16:30", "15:00" to "17:00", "16:00" to "16:30", "16:00" to "17:00"))
        )
    }

    @Test
    fun test4() {
        val config = FreeSlotConfig(
            schedules = mapOf(
                1 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf()), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
                2 to EmployeeConf(EmployeeSex.FEMALE, toLocalTime(listOf()), TimeSlot(start = LocalTime.of(9, 0), end = LocalTime.of(18, 0)))
            ),
            duration = 60,
            requiredMen = 1,
            requiredWomen = 1
        )

        assertEquals(
            expected = freeSlotCalc.calculate(config),
            actual = toLocalTime(listOf("09:00" to "17:00"))
        )
    }

    @Test
    fun test5() {
        val config = FreeSlotConfig(
            schedules = mapOf(
                1 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("08:00" to "16:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
                2 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("08:00" to "12:00", "13:00" to "17:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
                3 to EmployeeConf(EmployeeSex.FEMALE, toLocalTime(listOf("09:00" to "17:00")), TimeSlot(start = LocalTime.of(9, 0), end = LocalTime.of(18, 0))),
                4 to EmployeeConf(EmployeeSex.FEMALE, toLocalTime(listOf("08:00" to "09:00", "10:00" to "17:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
                5 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("10:00" to "16:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0)))
            ),
            duration = 15,
            requiredMen = 2,
            requiredWomen = 1
        )

        assertEquals(
            expected = freeSlotCalc.calculate(config),
            actual = emptyList()
        )
    }

    @Test
    fun test6() {
        val config = FreeSlotConfig(
            schedules = mapOf(
                1 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("14:00" to "17:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
                2 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("09:00" to "11:00", "12:00" to "17:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
                3 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("18:00" to "20:00")), TimeSlot(start = LocalTime.of(16, 0), end = LocalTime.of(22, 0))),
            ),
            duration = 30,
            requiredMen = 3,
            requiredWomen = 0
        )

        assertEquals(
            expected = freeSlotCalc.calculate(config),
            actual = emptyList()
        )
    }

    @Test
    fun test7() {
        val config = FreeSlotConfig(
            schedules = mapOf(
                1 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("14:00" to "17:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
                2 to EmployeeConf(EmployeeSex.MALE, toLocalTime(listOf("09:00" to "11:00", "12:00" to "17:00")), TimeSlot(start = LocalTime.of(8, 0), end = LocalTime.of(17, 0))),
            ),
            duration = 30,
            requiredMen = 3,
            requiredWomen = 0
        )

        assertEquals(
            expected = freeSlotCalc.calculate(config),
            actual = emptyList()
        )
    }


    private fun toLocalTime(times: List<Pair<String, String>>): List<TimeSlot> = times.map {
        TimeSlot(
            start = LocalTime.parse(it.first, DateTimeFormatter.ofPattern("HH:mm")),
            end = LocalTime.parse(it.second, DateTimeFormatter.ofPattern("HH:mm"))
        )
    }
}