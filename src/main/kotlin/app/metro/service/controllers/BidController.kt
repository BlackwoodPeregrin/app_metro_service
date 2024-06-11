package app.metro.service.controllers

import app.metro.service.controllers.response.AddBuildResponse
import app.metro.service.controllers.response.Response
import app.metro.service.data.EmployeeSex
import app.metro.service.data.PassengerCategory
import app.metro.service.data.WorkInterval
import app.metro.service.entity.Bid
import app.metro.service.entity.Employee
import app.metro.service.repository.BidRepository
import app.metro.service.repository.AssignedBidRepository
import app.metro.service.repository.PassengerRepository
import app.metro.service.repository.WorkScheduleRepository
import app.metro.service.services.MetroNavigatorService
import app.metro.service.services.TimeAllowanceCategoryService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalTime
import java.util.SortedMap
import kotlin.math.max

private enum class BidAvailabilityStatus {
    BEFORE,
    AFTER,
    NONE
}

@RestController
@RequestMapping("/api/v1/metro/service/bid")
open class BidController(
    @Autowired private val passengerRepo: PassengerRepository,
    @Autowired private val bidRepository: BidRepository,
    @Autowired private val scheduleRepo: WorkScheduleRepository,
    @Autowired private val assignedBidRepo: AssignedBidRepository,
    @Autowired private val metroNavigator: MetroNavigatorService,
    @Autowired private val timeAllowance: TimeAllowanceCategoryService
) {
    companion object {
        private const val TIME_MIN_SPARE_EMPLOYEE = 900 // 15 мин
        private const val TIME_MAX_WAIT_PASSENGER = 600 // 10 мин

        private val logger: Logger = LoggerFactory.getLogger(this::class.java)
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
            val diff = timeStartNewBid - (timeStartOldBid + oldBid.timePredict!!.toSeconds() + metroNavigator.wayTimeBetween(oldBid.stID2, newBid.stID1,true) + TIME_MIN_SPARE_EMPLOYEE)
            println(timeStartNewBid)
            println(timeStartOldBid)
            println(oldBid.timePredict!!.toSeconds())
            println("${oldBid.stID2} -> ${newBid.stID1} ")
            println(metroNavigator.wayTimeBetween(oldBid.stID2, newBid.stID1,true))
            println(TIME_MIN_SPARE_EMPLOYEE)

            if (diff >= 0) {
                return Pair(BidAvailabilityStatus.AFTER, diff)
            }
        } else {
            val diff = timeStartOldBid - (timeStartNewBid + newBid.timePredict!!.toSeconds() + metroNavigator.wayTimeBetween(newBid.stID2, oldBid.stID1, true) + TIME_MIN_SPARE_EMPLOYEE)

            println(timeStartOldBid)
            println(timeStartNewBid)
            println(newBid.timePredict!!.toSeconds())
            println("${newBid.stID2} -> ${oldBid.stID1} ")
            println(metroNavigator.wayTimeBetween(newBid.stID2, oldBid.stID1, true))
            println(TIME_MIN_SPARE_EMPLOYEE)

            if (diff >= 0) {
                return Pair(BidAvailabilityStatus.BEFORE, diff)
            }
        }

        return Pair(BidAvailabilityStatus.NONE, -1)
    }

    private fun isPossibleTakeFromStartWork(workInterval: WorkInterval, newBid: Bid): Boolean {
        val timeStartWork = workInterval.startTime.toSecondOfDay()
        val timeStartBid = newBid.time.toSecondOfDay()

        val timeDiff = if (timeStartWork > timeStartBid) {
            (24 * 3600 + timeStartBid) - (timeStartWork + TIME_MIN_SPARE_EMPLOYEE)
        } else {
            timeStartBid - (timeStartWork + TIME_MIN_SPARE_EMPLOYEE)
        }

        return timeDiff >= 0
    }

    private fun isPossibleTakeFromEndWork(workInterval: WorkInterval, newBid: Bid): Boolean {
        val timeEndWork = workInterval.endTime.toSecondOfDay()
        val timeStartBid = newBid.time.toSecondOfDay()

        val timeDiff = if (workInterval.endDate == newBid.date) {
            timeEndWork - (timeStartBid + newBid.timePredict!!.toSeconds())
        } else {
            (24 * 3600 + timeEndWork) - (timeStartBid + newBid.timePredict!!.toSeconds())
        }

        return timeDiff >= 0
    }

    @PostMapping("/add")
    fun addNewBid(@RequestBody newBid: Bid): Response {
        /* рассчитанное нашим алгоритмом длительность выполнения новой заявки */
        val bidExecTime: Int = calculatePredictTime(newBid)

        /*
        *   кто может взять заявку, ключом является время в секундах которое будет в запасе перед неачалом новой заявки
        *   приоритет идет на тех у кого это время меньше
        */

        val potentialTake = sortedMapOf<Int, MutableList<Employee>>()

        /* получаем список сотрудников + их время работы кто потенциально может взять заявку */
        for ((employee, interval) in scheduleRepo.getWhoCanTakeBid(newBid.date, newBid.time)) {

            logger.info("potential employee $employee")

            // получаем список заявок которые уже назначены сотруднику на дату поступающей заявки
            val employeeBids: List<Bid> = assignedBidRepo.assignedBidByEmployee(employee, newBid.date)
                .sortedWith(compareBy({ it.date }, { it.time }))

            // проходимся по каждоый, назанченной заявке чтобы проверить есть ли возможность добавить новую
            for (i in employeeBids.indices) {
                val bid: Bid = employeeBids[i]

                logger.info("bid = $bid")

                val variant: Pair<BidAvailabilityStatus, Int> = canDoBidBeforeOrAfter(oldBid = bid, newBid = newBid)

                println(variant)

                when (variant.first) {
                    BidAvailabilityStatus.BEFORE -> {
                        if (i != 0 || isPossibleTakeFromStartWork(interval, newBid)) {
                            potentialTake.getOrPut(variant.second) { mutableListOf() }.add(employee)
                        }
                        break
                    }
                    BidAvailabilityStatus.AFTER -> {
                        if (i == employeeBids.lastIndex) {
                            if (isPossibleTakeFromEndWork(interval, newBid)) {
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

        logger.info("----- All who can take newBid with bids -----")
        for (emp in potentialTake.values) {
            logger.info("$emp")
        }
        logger.info("--------------------------------------------")

        // пытвемся подобрать необходимое количество людей под входящую заявку
        var needMales = newBid.countMale
        var needFemale = newBid.countFemale

        val employeesTakeBid = mutableListOf<Employee>()

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

                    bidRepository.save(newBid)
                    assignedBidRepo.assignNewBid(employeesTakeBid, newBid)
                    return AddBuildResponse(added = true)
                }
            }
        }

        logger.info("Try find employee without bids")

        // в случае если не хватает, пытаемся назначить ее на сотрудников, которые еще не имеют заявок
        for ((employee, interval) in scheduleRepo.getWhoCanTakeBid(newBid.date, newBid.time)) { // выкасить нахуй
            val bids: List<Bid> = assignedBidRepo.assignedBidByEmployee(employee, newBid.date)
            if (bids.isNotEmpty()) {
                continue
            }

            logger.info("potential employee $employee")

            if (isPossibleTakeFromStartWork(interval, newBid)
                && isPossibleTakeFromEndWork(interval, newBid)) {
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
                    bidRepository.save(newBid)
                    assignedBidRepo.assignNewBid(employeesTakeBid, newBid)
                    return AddBuildResponse(added = true)
                }
            }
        }

        return AddBuildResponse(added = false)
    }


    private fun calculatePredictTime(newBid: Bid): Int {
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

        val hours = (distance + delta) / 3600
        val minutes = ((distance + delta) % 3600) / 60
        val seconds = ((distance + delta) % 3600) % 60

        return if (seconds != 0) {
            newBid.timePredict = LocalTime.of(hours, minutes + 1)
            hours * 3600 + (minutes + 1) * 60
        } else {
            newBid.timePredict = LocalTime.of(hours, minutes)
            hours * 3600 + minutes * 60
        }
    }
}

private fun LocalTime.toSeconds(): Int = hour * 3600 + minute * 60