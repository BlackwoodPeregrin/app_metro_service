package app.metro.service.services

import app.metro.service.controllers.BidController
import app.metro.service.controllers.toSeconds
import app.metro.service.data.EmployeeSchedule
import app.metro.service.data.EmployeeSex
import app.metro.service.data.PassengerCategory
import app.metro.service.entity.Bid
import app.metro.service.entity.Employee
import app.metro.service.repository.*
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.LocalTime
import kotlin.math.max

private enum class BidAvailabilityStatus {
    BEFORE,
    AFTER,
    NONE
}

enum class Algorithm {
    DENSE,
    UNIFORM
}

@Service
class BidService(
    @Autowired private val passengerRepo: PassengerRepository,
    @Autowired private val scheduleRepo: EmployeeScheduleRepository,
    @Autowired private val assignedBidRepo: AssignedBidRepository,
    @Autowired private val metroNavigator: MetroNavigatorService,
    @Autowired private val timeAllowance: TimeAllowanceCategoryService,
) {
    companion object {
        private val logger = LoggerFactory.getLogger(this::class.java)
    }

    fun canAddNewBid(newBid: Bid, employeesTakeBid: MutableList<Employee>, skipBids: Set<Int>, algorithm: Algorithm): Boolean {
        return when (algorithm) {
            Algorithm.DENSE -> canAddNewBidDenseAlgorithm(newBid, employeesTakeBid, skipBids)
            Algorithm.UNIFORM -> canAddNewBidUniformAlgorithm(newBid, employeesTakeBid, skipBids)
        }
    }

    fun calculatePredictTime(newBid: Bid): LocalTime {
        val passenger = passengerRepo.findById(newBid.passengerId)
        if (!passenger.isPresent) {
            throw RuntimeException("Passenger with id '${newBid.passengerId}' not found")
        }

        val passengerCategory = PassengerCategory.convertFromString(passenger.get().category)

        val isCommonGraph: Boolean = when (passengerCategory) {
            PassengerCategory.WHEEL_CHAIR_IMPAIRED,
            PassengerCategory.CHILD_IMPAIRED,
            PassengerCategory.SUPPORT_IMPAIRED,
            PassengerCategory.OLD_HUMAN,
            PassengerCategory.TEMPORARILY_DISABLED -> {
                false
            }
            else -> {
                true
            }
        }

        val distance: Int = metroNavigator.wayTimeBetween(newBid.stID1, newBid.stID2, isCommonGraph)
        val delta: Int = max(timeAllowance.getMean(passengerCategory), timeAllowance.getMedian(passengerCategory))

        logger.info("distance = $distance")
        logger.info("delta = $delta")

        var hours = (distance + delta) / 3600
        var minutes = ((distance + delta) % 3600) / 60
        val seconds = ((distance + delta) % 3600) % 60

        if (minutes + 1 == 60) {
            hours++
            minutes = 0
        }

        return if (seconds != 0) {
            LocalTime.of(hours, minutes + 1)
        } else {
            LocalTime.of(hours, minutes)
        }
    }

    fun canAddEmployeeToBid(newBid: Bid, employee: Employee, expectedSex: EmployeeSex): Boolean {
        logger.info("canAddEmployeeToBid")

        val pullWhoCan = scheduleRepo.getWhoCanTakeBid(newBid.date, newBid.time)

        logger.info("employee = $employee")

        if (!pullWhoCan.contains(employee)) {
            return false
        }
        val schedule = pullWhoCan[employee]!!

        logger.info("schedule = $schedule")

        val employeeBids: List<Bid> = assignedBidRepo.assignedBidByEmployee(employee, newBid.date)
            .sortedWith(compareBy({ it.date }, { it.time }))

        val actualSex = EmployeeSex.convertFromString(employee.sex)

        for (i in employeeBids.indices) {
            val bid: Bid = employeeBids[i]

            logger.info("bid = $bid")

            val variant: Pair<BidAvailabilityStatus, Int> = canDoBidBeforeOrAfter(oldBid = bid, newBid = newBid)

            logger.info("variant = $variant")

            when (variant.first) {
                BidAvailabilityStatus.BEFORE -> {
                    if ((i != 0 || isPossibleTakeFromStartWork(schedule, newBid)) && isNotCrossDinner(schedule, newBid)) {
                        if (actualSex == expectedSex) {
                            return true
                        }
                    }
                    return false
                }
                BidAvailabilityStatus.AFTER -> {
                    if (i == employeeBids.lastIndex) {
                        if (isPossibleTakeFromEndWork(schedule, newBid) && isNotCrossDinner(schedule, newBid)) {
                            if (actualSex == expectedSex) {
                                return true
                            }
                        }
                        return false
                    }
                }
                BidAvailabilityStatus.NONE -> {
                    return false
                }
            }
        }

        logger.info("Without bids, check schedule")

        if (isPossibleTakeFromStartWork(schedule, newBid)
            && isPossibleTakeFromEndWork(schedule, newBid)
            && isNotCrossDinner(schedule, newBid)) {
            if (actualSex == expectedSex) {
                return true
            }
        }

        return false
    }

    private fun canAddNewBidUniformAlgorithm(newBid: Bid, employeesTakeBid: MutableList<Employee>, skipBids: Set<Int>): Boolean {
        if (newBid.timePredict == null) {
            newBid.timePredict = calculatePredictTime(newBid)
        }

        logger.info("Try find employee without bids")

        var needMales = newBid.countMale
        var needFemale = newBid.countFemale

        // в случае если не хватает, пытаемся назначить ее на сотрудников, которые еще не имеют заявок
        for ((employee, interval) in scheduleRepo.getWhoCanTakeBid(newBid.date, newBid.time)) { // выкасить нахуй
            val bids: List<Bid> = assignedBidRepo.assignedBidByEmployee(employee, newBid.date)
                .filter { !skipBids.contains(it.id) }

            if (bids.isNotEmpty()) {
                continue
            }

            logger.info("potential employee $employee")

            if (isPossibleTakeFromStartWork(interval, newBid)
                && isPossibleTakeFromEndWork(interval, newBid)
                && isNotCrossDinner(interval, newBid)) {
                when (EmployeeSex.convertFromString(employee.sex)) {
                    EmployeeSex.MALE -> {
                        if (needMales != 0) {
                            employeesTakeBid.add(employee)
                            --needMales
                        }
                    }
                    EmployeeSex.FEMALE -> {
                        if (needFemale != 0) {
                            employeesTakeBid.add(employee)
                            --needFemale
                        }
                    }
                }

                if (needMales == 0 && needFemale == 0) {
                    return true
                }
            }
        }

        val potentialTake = findPotentialEmployeesWithBids(newBid, skipBids)

        logger.info("----- All who can take newBid with bids -----")
        for (emp in potentialTake.values) {
            logger.info("$emp")
        }
        logger.info("--------------------------------------------")

        for (employees in potentialTake.values) {
            for (employee in employees) {
                when (EmployeeSex.convertFromString(employee.sex)) {
                    EmployeeSex.MALE -> {
                        if (needMales != 0) {
                            employeesTakeBid.add(employee)
                            --needMales
                        }
                    }
                    EmployeeSex.FEMALE -> {
                        if (needFemale != 0) {
                            employeesTakeBid.add(employee)
                            --needFemale
                        }
                    }
                }

                // проверяем хватает ли людей необходимых в заявке
                if (needMales == 0 && needFemale == 0) {
                    logger.info("All searched who need with already have bids")

                    return true
                }
            }
        }

        return false
    }

    private fun canAddNewBidDenseAlgorithm(newBid: Bid, employeesTakeBid: MutableList<Employee>, skipBids: Set<Int>): Boolean {
        if (newBid.timePredict == null) {
            newBid.timePredict = calculatePredictTime(newBid)
        }

        val potentialTake = findPotentialEmployeesWithBids(newBid, skipBids)

        logger.info("----- All who can take newBid with bids -----")
        for (emp in potentialTake.values) {
            logger.info("$emp")
        }
        logger.info("--------------------------------------------")

        var needMales = newBid.countMale
        var needFemale = newBid.countFemale

        for (employees in potentialTake.values) {
            for (employee in employees) {
                when (EmployeeSex.convertFromString(employee.sex)) {
                    EmployeeSex.MALE -> {
                        if (needMales != 0) {
                            employeesTakeBid.add(employee)
                            --needMales
                        }
                    }
                    EmployeeSex.FEMALE -> {
                        if (needFemale != 0) {
                            employeesTakeBid.add(employee)
                            --needFemale
                        }
                    }
                }

                // проверяем хватает ли людей необходимых в заявке
                if (needMales == 0 && needFemale == 0) {
                    logger.info("All searched who need with already have bids")

                    return true
                }
            }
        }

        logger.info("Try find employee without bids")

        // в случае если не хватает, пытаемся назначить ее на сотрудников, которые еще не имеют заявок
        for ((employee, interval) in scheduleRepo.getWhoCanTakeBid(newBid.date, newBid.time)) {
            val bids: List<Bid> = assignedBidRepo.assignedBidByEmployee(employee, newBid.date)
                .filter { !skipBids.contains(it.id) }

            if (bids.isNotEmpty()) {
                continue
            }

            logger.info("potential employee $employee")

            if (isPossibleTakeFromStartWork(interval, newBid)
                && isPossibleTakeFromEndWork(interval, newBid)
                && isNotCrossDinner(interval, newBid)) {
                when (EmployeeSex.convertFromString(employee.sex)) {
                    EmployeeSex.MALE -> {
                        if (needMales != 0) {
                            employeesTakeBid.add(employee)
                            --needMales
                        }
                    }
                    EmployeeSex.FEMALE -> {
                        if (needFemale != 0) {
                            employeesTakeBid.add(employee)
                            --needFemale
                        }
                    }
                }

                if (needMales == 0 && needFemale == 0) {
                    return true
                }
            }
        }

        return false
    }

    private fun findPotentialEmployeesWithBids(newBid: Bid, skipBids: Set<Int>): Map<Int, MutableList<Employee>> {
        val potentialTake = sortedMapOf<Int, MutableList<Employee>>()

        for ((employee, schedule) in scheduleRepo.getWhoCanTakeBid(newBid.date, newBid.time)) {

            logger.info("potential employee $employee")

            // получаем список заявок которые уже назначены сотруднику на дату поступающей заявки
            val employeeBids: List<Bid> = assignedBidRepo.assignedBidByEmployee(employee, newBid.date)
                .sortedWith(compareBy({ it.date }, { it.time }))

            // проходимся по каждоый, назанченной заявке чтобы проверить есть ли возможность добавить новую
            for (i in employeeBids.indices) {
                val bid: Bid = employeeBids[i]

                if (skipBids.contains(bid.id)) {
                    continue
                }

                logger.info("bid = $bid")

                val variant: Pair<BidAvailabilityStatus, Int> = canDoBidBeforeOrAfter(oldBid = bid, newBid = newBid)

                logger.info("variant = $variant")

                when (variant.first) {
                    BidAvailabilityStatus.BEFORE -> {
                        if ((i != 0 || isPossibleTakeFromStartWork(schedule, newBid)) && isNotCrossDinner(schedule, newBid)) {
                            potentialTake.getOrPut(variant.second) { mutableListOf() }.add(employee)
                        }
                        break
                    }
                    BidAvailabilityStatus.AFTER -> {
                        if (i == employeeBids.lastIndex) {
                            if (isPossibleTakeFromEndWork(schedule, newBid) && isNotCrossDinner(schedule, newBid)) {
                                potentialTake.getOrPut(variant.second) { mutableListOf() }.add(employee)
                            }
                            break
                        }
                    }
                    BidAvailabilityStatus.NONE -> {
                        break
                    }
                }
            }
        }

        logger.info("potentional wtf = $potentialTake")

        return potentialTake
    }

    private fun isPossibleTakeFromStartWork(schedule: EmployeeSchedule, newBid: Bid): Boolean {
        logger.info("isPossibleTakeFromStartWork")

        val timeStartWork = schedule.workTime.startTime.toSecondOfDay()
        val timeStartBid = newBid.time.toSecondOfDay()

        val timeDiff = if (schedule.workTime.startDate == newBid.date) {
            timeStartBid - (timeStartWork + BidController.TIME_MIN_SPARE_EMPLOYEE)
        } else {
            (24 * 3600 + timeStartBid) - (timeStartWork + BidController.TIME_MIN_SPARE_EMPLOYEE)
        }

        logger.info("timeDiff = $timeDiff")

        return timeDiff >= 0
    }

    private fun isNotCrossDinner(schedule: EmployeeSchedule, newBid: Bid): Boolean {
        logger.info("isNotCrossDinner")

        val dinner = schedule.dinnerTime

        var timeDiff = 0

        if (dinner.startDate == newBid.date) {
            if (dinner.startTime > newBid.time) {
                timeDiff = dinner.startTime.toSecondOfDay() - (newBid.time.toSecondOfDay() + BidController.TIME_MAX_WAIT_PASSENGER + newBid.timePredict!!.toSecondOfDay())
            }
        } else {
            if (dinner.startTime < newBid.time) {
                timeDiff = (24 * 3600 + dinner.startTime.toSecondOfDay()) - (newBid.time.toSecondOfDay() + BidController.TIME_MAX_WAIT_PASSENGER + newBid.timePredict!!.toSecondOfDay())
            }
        }

        logger.info("timeDiff = $timeDiff")

        return timeDiff >= 0
    }

    private fun isPossibleTakeFromEndWork(schedule: EmployeeSchedule, newBid: Bid): Boolean {
        logger.info("isPossibleTakeFromEndWork")

        val timeEndWork = schedule.workTime.endTime.toSecondOfDay()
        val timeStartBid = newBid.time.toSecondOfDay()

        val timeDiff = if (schedule.workTime.endDate == newBid.date) {
            timeEndWork - (timeStartBid + BidController.TIME_MAX_WAIT_PASSENGER + newBid.timePredict!!.toSeconds())
        } else {
            (24 * 3600 + timeEndWork) - (timeStartBid + BidController.TIME_MAX_WAIT_PASSENGER + newBid.timePredict!!.toSeconds())
        }

        logger.info("timeDiff = $timeDiff")

        return timeDiff >= 0
    }

    private fun canDoBidBeforeOrAfter(oldBid: Bid, newBid: Bid): Pair<BidAvailabilityStatus, Int> {
        var timeStartOldBid = 0
        var timeStartNewBid = 0

        if (oldBid.date == newBid.date) {
            timeStartOldBid = oldBid.time.toSecondOfDay()
            timeStartNewBid = newBid.time.toSecondOfDay()
        } else if (newBid.date > oldBid.date) {
            timeStartOldBid = oldBid.time.toSecondOfDay()
            timeStartNewBid = 24 * 3600 + newBid.time.toSecondOfDay()
        } else {
            timeStartOldBid = 24 * 3600 + oldBid.time.toSecondOfDay()
            timeStartNewBid = newBid.time.toSecondOfDay()
        }

        if (timeStartNewBid > timeStartOldBid) {
            val diff = timeStartNewBid - (timeStartOldBid + BidController.TIME_MAX_WAIT_PASSENGER +  oldBid.timePredict!!.toSeconds() + metroNavigator.wayTimeBetween(oldBid.stID2, newBid.stID1,true) + BidController.TIME_MIN_SPARE_EMPLOYEE)
            logger.info("timeStartNewBid = $timeStartNewBid")
            logger.info("timeStartOldBid = $timeStartOldBid")
            logger.info("oldBid.timePredict!!.toSeconds() = ${oldBid.timePredict!!.toSeconds()}")
            logger.info("TIME_MAX_WAIT_PASSENGER = ${BidController.TIME_MAX_WAIT_PASSENGER}")
            logger.info("TIME_MAX_WAIT_PASSENGER = ${BidController.TIME_MIN_SPARE_EMPLOYEE}")
            logger.info("${oldBid.stID2} -> ${newBid.stID1} = ${metroNavigator.wayTimeBetween(oldBid.stID2, newBid.stID1,true)}")

            if (diff >= 0) {
                return Pair(BidAvailabilityStatus.AFTER, diff)
            }
        } else {
            val diff = timeStartOldBid - (timeStartNewBid + BidController.TIME_MAX_WAIT_PASSENGER + newBid.timePredict!!.toSeconds() + metroNavigator.wayTimeBetween(newBid.stID2, oldBid.stID1, true) + BidController.TIME_MIN_SPARE_EMPLOYEE)

            logger.info("timeStartNewBid = $timeStartNewBid")
            logger.info("timeStartOldBid = $timeStartOldBid")
            logger.info("oldBid.timePredict!!.toSeconds() = ${oldBid.timePredict!!.toSeconds()}")
            logger.info("TIME_MAX_WAIT_PASSENGER = ${BidController.TIME_MAX_WAIT_PASSENGER}")
            logger.info("TIME_MAX_WAIT_PASSENGER = ${BidController.TIME_MIN_SPARE_EMPLOYEE}")
            logger.info("${newBid.stID2} -> ${oldBid.stID1} = ${metroNavigator.wayTimeBetween(oldBid.stID2, newBid.stID1,true)}")

            if (diff >= 0) {
                return Pair(BidAvailabilityStatus.BEFORE, diff)
            }
        }

        return Pair(BidAvailabilityStatus.NONE, -1)
    }
}