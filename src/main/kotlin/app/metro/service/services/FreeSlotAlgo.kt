package app.metro.service.services

import app.metro.service.data.EmployeeSex
import org.springframework.stereotype.Service
import java.time.Duration
import java.time.LocalTime

data class TimeSlot(
    val start: LocalTime,
    val end: LocalTime
)

data class EmployeeConf(
    val gender: EmployeeSex,
    val intervals: List<TimeSlot>,
    val work: TimeSlot
)

data class FreeSlotConfig(
    val schedules: Map<Int, EmployeeConf>,
    val duration: Int,
    val requiredMen: Int,
    val requiredWomen: Int,
)

@Service
class FreeSlotCalculation {
    fun calculate(configuration: FreeSlotConfig): List<TimeSlot> {
        val preparedData = prepareData(configuration.schedules)
        val freePlace = calculateFreePlace(preparedData, configuration.requiredMen, configuration.requiredWomen)

        return checkDuration(freePlace, configuration.duration)
            .sortedWith(compareBy({it.start}, {it.end}))
    }

    private fun findIntersections(intervals: MutableMap<Int, List<TimeSlot>>): List<TimeSlot> {
        var intersections = intervals.values.first().toMutableList()
        for (employeeIntervals in intervals.values.drop(1)) {
            val newIntersections = mutableListOf<TimeSlot>()
            for ((s1, e1) in intersections) {
                for ((s2, e2) in employeeIntervals) {
                    if (s2.isBefore(e1) && s1.isBefore(e2)) {
                        newIntersections.add(TimeSlot(maxOf(s1, s2), minOf(e1, e2)))
                    }
                }
            }
            intersections = newIntersections
        }
        return intersections
    }

    private fun getFreeIntervals(schedule: EmployeeConf): List<TimeSlot> {
        val workStart = schedule.work.start
        val workEnd = schedule.work.end
        val intervals = schedule.intervals
        val freeIntervals = mutableListOf<TimeSlot>()
        var currentStart = workStart

        for ((start, end) in intervals) {
            if (currentStart.isBefore(start)) {
                freeIntervals.add(TimeSlot(currentStart, start))
            }
            currentStart = end
        }

        if (currentStart.isBefore(workEnd)) {
            freeIntervals.add(TimeSlot(currentStart, workEnd))
        }

        return freeIntervals
    }

    private fun calculateFreePlace(empls: Map<Int, EmployeeConf>, numsMen: Int, numsWomen: Int): Set<TimeSlot> {
        val men = mutableListOf<Int>()
        val women = mutableListOf<Int>()

        for ((emp, data) in empls) {
            when (data.gender) {
                EmployeeSex.MALE -> men.add(emp)
                EmployeeSex.FEMALE -> women.add(emp)
            }
        }

        val mIntersects = mutableMapOf<Int, List<TimeSlot>>()

        for (combo in men.combinations(numsMen)) {
            val group = combo.associateWith { empls[it]!!.intervals }

            val groupName = combo.hashCode()

            val res = if (numsMen == 1) {
                group.values.first()
            } else {
                findIntersections(group.toMutableMap())
            }
            if (res.isNotEmpty()) {
                mIntersects[groupName] = res
            }
        }

        if (numsMen > 0 && mIntersects.isEmpty()) {
            return emptySet()
        }
        if (numsWomen == 0) {
            return mIntersects.values.flatten().toSet()
        }

        val wIntersects = mutableMapOf<Int, List<TimeSlot>>()

        for (combo in women.combinations(numsWomen)) {
            val group = combo.associateWith { empls[it]!!.intervals }

            val groupName = combo.hashCode()
            val res = if (numsMen == 1) {
                group.values.first()
            } else {
                findIntersections(group.toMutableMap())
            }
            if (res.isNotEmpty()) {
                wIntersects[groupName] = res
            }
        }

        if (numsWomen > 0 && wIntersects.isEmpty()) {
            return emptySet()
        }
        if (numsMen == 0) {
            return wIntersects.values.flatten().toSet()
        }

        val p = mIntersects.keys.flatMap { m -> wIntersects.keys.map { w -> m to w } }
        val res = mutableSetOf<TimeSlot>()
        for ((m, f) in p) {
            val intersections = findIntersections(mutableMapOf(m to mIntersects[m]!!, f to wIntersects[f]!!))
            res.addAll(intersections)
        }

        return res
    }

    private fun prepareData(booked: Map<Int, EmployeeConf>): Map<Int, EmployeeConf> {
        val empHoles = mutableMapOf<Int, EmployeeConf>()
        for ((emp, data) in booked) {
            empHoles[emp] = EmployeeConf(gender = data.gender, intervals = getFreeIntervals(data), work = data.work)
        }
        return empHoles
    }

    private fun checkDuration(intervals: Set<TimeSlot>, duration: Int): List<TimeSlot> {
        val requiredDuration = Duration.ofMinutes(duration.toLong())
        return intervals.filter { Duration.between(it.start, it.end) >= requiredDuration }
    }
}

// Helper extension function to generate combinations
private fun <T> List<T>.combinations(k: Int): List<List<T>> {
    if (k == 0) return listOf(emptyList())
    if (isEmpty()) return emptyList()
    val element = first()
    val rest = drop(1)
    val combsWithoutFirst = rest.combinations(k)
    val combsWithFirst = rest.combinations(k - 1).map { it + element }
    return combsWithoutFirst + combsWithFirst
}
