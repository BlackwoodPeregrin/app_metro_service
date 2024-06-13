package app.metro.service.controllers

import app.metro.service.controllers.request.ChangeBidPredictTime
import app.metro.service.controllers.response.*
import app.metro.service.data.*
import app.metro.service.entity.Bid
import app.metro.service.entity.Employee
import app.metro.service.repository.*
import app.metro.service.services.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.LocalTime
import java.time.Duration
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
    @Autowired private val scheduleRepo: EmployeeScheduleRepository,
    @Autowired private val assignedBidRepo: AssignedBidRepository,
    @Autowired private val metroNavigator: MetroNavigatorService,
    @Autowired private val timeAllowance: TimeAllowanceCategoryService,
    @Autowired private val employeeRepository: EmployeeRepository,
    @Autowired private val freeSlotCalcService: FreeSlotCalculation
) {
    companion object {
        private const val TIME_MIN_SPARE_EMPLOYEE = 900 // 15 мин
        private const val TIME_MAX_WAIT_PASSENGER = 600 // 10 мин

        private val logger: Logger = LoggerFactory.getLogger(this::class.java)
    }

    @PostMapping("/accept")
    fun employeeAcceptBid(@RequestBody idBid: Int): Response {
        return try {
            changeStatusBid(idBid, BidStatus.ACCEPTED)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/on_the_way")
    fun employeeOnTheWay(@RequestBody idBid: Int): Response {
        return try {
            changeStatusBid(idBid, BidStatus.ON_THE_WAY)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/wait_passenger")
    fun employeeWaitPassenger(@RequestBody idBid: Int): Response {
        return try {
            changeStatusBid(idBid, BidStatus.WAIT_PASSENGER)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/start")
    fun employeeStartBid(@RequestBody idBid: Int): Response {
        val bid = bidRepository.findById(idBid)
        if (!bid.isPresent) {
            return ErrorResponse(message = "Not found ID bid '$idBid'")
        }

        bidRepository.save(bid.get()
            .apply {
                timeStart = LocalTime.now()
                status = BidStatus.STARTED.convertToString()
            }
        )

        return SuccessResponse()
    }

    @PostMapping("/finish")
    fun employeeFinishBid(@RequestBody idBid: Int): Response {
        val bid = bidRepository.findById(idBid)
        if (!bid.isPresent) {
            return ErrorResponse(message = "Not found ID bid '$idBid'")
        }

        bidRepository.save(bid.get()
            .apply {
                timeOver = LocalTime.now()
                status = BidStatus.FINISHED.convertToString()
            }
        )

        return SuccessResponse()
    }

    @PostMapping("/late/employee")
    fun employeeLate(@RequestBody idBid: Int): Response {
        return try {
            changeStatusBid(idBid, BidStatus.INSPECTOR_LATE)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/late/passenger")
    fun passengerLate(@RequestBody idBid: Int): Response {
        return try {
            changeStatusBid(idBid, BidStatus.PASSENGER_LATE)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/cansel")
    fun canselBid(@RequestBody idBid: Int): Response {
        return try {
            assignedBidRepo.removeBidFromEmployees(idBid)
            changeStatusBid(idBid, BidStatus.CANSEL)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @GetMapping("/all")
    fun getAllBids(): Response {
        val res = bidRepository.findAll().map { bid ->
            BidResponseWithEmployees(
                bid = bid,
                employeesId = assignedBidRepo.assignedEmployeesByBid(bid.id)
            )
        }
        return AllBidResponse(res)
    }

    @PostMapping("/all/employee")
    fun getAllBidByEmployee(@RequestBody employeeId: Int): Response {
        val employee = employeeRepository.findById(employeeId)
        if (!employee.isPresent) {
            return ErrorResponse(message="Not found employee in db with ID '${employeeId}'")
        }

        class Response(val bids: List<Bid>) : SuccessResponse()

        return Response(assignedBidRepo.assignedAllFutureBidByEmployee(employee.get(), LocalDate.now()))
    }

    @PostMapping("/calculate")
    fun calculateTimeBid(@RequestBody newBid: Bid): Response {
        calculatePredictTime(newBid)

        return CalculateBidResponse(newBid.timePredict!!)
    }


    @PostMapping("/edit/predictTime")
    fun editPredictionTimeBid(@RequestBody request: ChangeBidPredictTime): Response {
//        val bid = bidRepository.findById(request.bidId)
//        if (!bid.isPresent) {
//            throw RuntimeException("Not found ID bid '${bid.get().id}'")
//        }
//        if (bid.get().status == BidStatus.FINISHED.convertToString()
//            && bid.get().status == BidStatus.CANSEL.convertToString()
//            && bid.get().status == BidStatus.NOT_DISTRIBUTED.convertToString()) {
//            throw RuntimeException("Bid with '${bid.get().id}' in active")
//        }
//
//        if (request.timePredict < bid.get().timePredict) {
//
//
//
//
//
//            bidRepository.save(bid.get().apply { timePredict = request.timePredict })
//            return SuccessResponse()
//        }


        return SuccessResponse()
    }

    @PostMapping("/alternative_time")
    fun alternativeTimeBid(@RequestBody newBid: Bid): Response {
        if (newBid.timePredict == null) {
            calculatePredictTime(newBid)
        }

        val schedules = mutableMapOf<Int, EmployeeConf>()

        for ((employee, schedule) in scheduleRepo.getWhoCanTakeBid(newBid.date, newBid.time)) {
            val gender = EmployeeSex.convertFromString(employee.sex)
            val busySlots = mutableListOf<TimeSlot>()

            logger.info("schedule = $schedule")

            val work = if (schedule.workTime.startTime < schedule.workTime.endTime) {
                TimeSlot(schedule.workTime.startTime, schedule.workTime.endTime)
            } else {
                if (newBid.date == schedule.workTime.startDate) {
                    TimeSlot(schedule.workTime.startTime, LocalTime.of(23, 59))
                } else {
                    TimeSlot(LocalTime.MIDNIGHT, schedule.workTime.endTime)
                }
            }

            val employeeBids: List<Bid> = assignedBidRepo.assignedBidByEmployee(employee, newBid.date)
                .sortedWith(compareBy({ it.date }, { it.time }))

            var endDinnerTime = schedule.dinnerTime.endTime.toSecondOfDay() + TIME_MIN_SPARE_EMPLOYEE

            for (i in employeeBids.indices) {
                val bid: Bid = employeeBids[i]

                val timeStart: Int = if (i == 0) {
                    bid.time.toSecondOfDay()
                } else {
                    bid.time.toSecondOfDay() - TIME_MIN_SPARE_EMPLOYEE - metroNavigator.wayTimeBetween(bid.stID2, newBid.stID1, isCommonGraph = true)
                }

                val timeEnd: Int = bid.time.toSecondOfDay() + TIME_MAX_WAIT_PASSENGER + bid.timePredict!!.toSeconds() + metroNavigator.wayTimeBetween(bid.stID2, newBid.stID1, isCommonGraph = true) + TIME_MIN_SPARE_EMPLOYEE

                val slot = if (timeStart > timeEnd) {
                    TimeSlot(start = localTimeFromSeconds(timeStart), end = LocalTime.of(23, 59))
                } else {
                    TimeSlot(start = localTimeFromSeconds(timeStart), end = localTimeFromSeconds(timeEnd))
                }

                busySlots.add(slot)

                if (bid.time < schedule.dinnerTime.startTime) {
                    endDinnerTime = schedule.dinnerTime.endTime.toSecondOfDay() + TIME_MIN_SPARE_EMPLOYEE + metroNavigator.wayTimeBetween(bid.stID2, newBid.stID1, isCommonGraph = true)
                }
            }

            val dinner = if (schedule.dinnerTime.startTime < schedule.dinnerTime.endTime) {
                TimeSlot(schedule.dinnerTime.startTime, localTimeFromSeconds(endDinnerTime))
            } else {
                if (newBid.date == schedule.dinnerTime.startDate) {
                    TimeSlot(schedule.workTime.startTime, LocalTime.of(23, 59))
                } else {
                    TimeSlot(LocalTime.MIDNIGHT, schedule.workTime.endTime)
                }

            }

            busySlots.add(dinner)

            val sortedBusySlots = busySlots.sortedBy { it.start }.toMutableList()

            var p1 = 0
            var p2 = 1
            while (p2 < sortedBusySlots.size) {
                if (sortedBusySlots[p1].end > sortedBusySlots[p2].start) {
                    sortedBusySlots[p1] = TimeSlot(start = sortedBusySlots[p1].start, end = sortedBusySlots[p2].end)
                    ++p2
                    continue
                }

                if (p2 - p1 == 1) {
                    ++p1
                    ++p2
                } else {
                    sortedBusySlots[++p1] = sortedBusySlots[p2++]
                }
            }

            if (sortedBusySlots[p1].end > schedule.workTime.endTime) {
                sortedBusySlots[p1] = TimeSlot(start = sortedBusySlots[p1].start, end = schedule.workTime.endTime)
            }

            schedules[employee.id] = EmployeeConf(gender, sortedBusySlots.subList(0, p1 + 1), work)
        }

        for ((id, userData) in schedules) {
            logger.info("employeeId '{}' userData '{}'", id, userData)
        }

        class Response(val freeSlots: List<TimeSlot>): SuccessResponse()

        val duration: LocalTime = newBid.timePredict!!
//            .plusMinutes(10)

        logger.info("${duration.hour * 60 + duration.minute}")

        val freeSlots = freeSlotCalcService.calculate(
            FreeSlotConfig(
                schedules = schedules,
                duration = duration.hour * 60 + duration.minute,
                requiredMen = newBid.countMale,
                requiredWomen = newBid.countFemale
            )
        )



        return Response(freeSlots.map {
            TimeSlot(
                start = it.start,
                end = it.end.minusMinutes((duration.hour * 60 + duration.minute).toLong())
            )
        })
    }

    @PostMapping("/add")
    fun addNewBid(@RequestBody newBid: Bid): Response {
        if (newBid.timePredict == null) {
            calculatePredictTime(newBid)
        }

        /*
        *   кто может взять заявку, ключом является время в секундах которое будет в запасе перед неачалом новой заявки
        *   приоритет идет на тех у кого это время меньше
        */

        val potentialTake = sortedMapOf<Int, MutableList<Employee>>()

        /* получаем список сотрудников + их время работы кто потенциально может взять заявку */
        for ((employee, schedule) in scheduleRepo.getWhoCanTakeBid(newBid.date, newBid.time)) {

            logger.info("potential employee $employee")

            // получаем список заявок которые уже назначены сотруднику на дату поступающей заявки
            val employeeBids: List<Bid> = assignedBidRepo.assignedBidByEmployee(employee, newBid.date)
                .sortedWith(compareBy({ it.date }, { it.time }))

            // проходимся по каждоый, назанченной заявке чтобы проверить есть ли возможность добавить новую
            for (i in employeeBids.indices) {
                val bid: Bid = employeeBids[i]

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

                    saveNewBid(newBid)
                    assignedBidRepo.assignNewBid(employeesTakeBid, newBid)
                    return AddBidResponse(added = true)
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
                    saveNewBid(newBid)
                    assignedBidRepo.assignNewBid(employeesTakeBid, newBid)
                    return AddBidResponse(added = true)
                }
            }
        }

        return AddBidResponse(added = false)
    }

    private fun changeStatusBid(idBid: Int, newStatus: BidStatus) {
        val bid = bidRepository.findById(idBid)
        if (!bid.isPresent) {
            throw RuntimeException("Not found ID bid '$idBid'")
        }
        bidRepository.save(bid.get().apply { status = newStatus.convertToString() })
    }

    private fun saveNewBid(newBid: Bid) {
        newBid.createdDate = LocalDate.now()
        newBid.createdTime = LocalTime.now()
        newBid.status = BidStatus.NEW.convertToString()
        bidRepository.save(newBid)
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
            val diff = timeStartNewBid - (timeStartOldBid + TIME_MAX_WAIT_PASSENGER +  oldBid.timePredict!!.toSeconds() + metroNavigator.wayTimeBetween(oldBid.stID2, newBid.stID1,true) + TIME_MIN_SPARE_EMPLOYEE)
            logger.info("timeStartNewBid = $timeStartNewBid")
            logger.info("timeStartOldBid = $timeStartOldBid")
            logger.info("oldBid.timePredict!!.toSeconds() = ${oldBid.timePredict!!.toSeconds()}")
            logger.info("TIME_MAX_WAIT_PASSENGER = $TIME_MAX_WAIT_PASSENGER")
            logger.info("TIME_MAX_WAIT_PASSENGER = $TIME_MIN_SPARE_EMPLOYEE")
            logger.info("${oldBid.stID2} -> ${newBid.stID1} = ${metroNavigator.wayTimeBetween(oldBid.stID2, newBid.stID1,true)}")

            if (diff >= 0) {
                return Pair(BidAvailabilityStatus.AFTER, diff)
            }
        } else {
            val diff = timeStartOldBid - (timeStartNewBid + TIME_MAX_WAIT_PASSENGER + newBid.timePredict!!.toSeconds() + metroNavigator.wayTimeBetween(newBid.stID2, oldBid.stID1, true) + TIME_MIN_SPARE_EMPLOYEE)

            logger.info("timeStartNewBid = $timeStartNewBid")
            logger.info("timeStartOldBid = $timeStartOldBid")
            logger.info("oldBid.timePredict!!.toSeconds() = ${oldBid.timePredict!!.toSeconds()}")
            logger.info("TIME_MAX_WAIT_PASSENGER = $TIME_MAX_WAIT_PASSENGER")
            logger.info("TIME_MAX_WAIT_PASSENGER = $TIME_MIN_SPARE_EMPLOYEE")
            logger.info("${newBid.stID2} -> ${oldBid.stID1} = ${metroNavigator.wayTimeBetween(oldBid.stID2, newBid.stID1,true)}")

            if (diff >= 0) {
                return Pair(BidAvailabilityStatus.BEFORE, diff)
            }
        }

        return Pair(BidAvailabilityStatus.NONE, -1)
    }

    private fun isPossibleTakeFromStartWork(schedule: EmployeeSchedule, newBid: Bid): Boolean {
        logger.info("isPossibleTakeFromStartWork")

        val timeStartWork = schedule.workTime.startTime.toSecondOfDay()
        val timeStartBid = newBid.time.toSecondOfDay()

        val timeDiff = if (schedule.workTime.startDate == newBid.date) {
            timeStartBid - (timeStartWork + TIME_MIN_SPARE_EMPLOYEE)
        } else {
            (24 * 3600 + timeStartBid) - (timeStartWork + TIME_MIN_SPARE_EMPLOYEE)
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
                timeDiff = dinner.startTime.toSecondOfDay() - (newBid.time.toSecondOfDay() + TIME_MAX_WAIT_PASSENGER + newBid.timePredict!!.toSecondOfDay())
            }
        } else {
            if (dinner.startTime < newBid.time) {
                timeDiff = (24 * 3600 + dinner.startTime.toSecondOfDay()) - (newBid.time.toSecondOfDay() + TIME_MAX_WAIT_PASSENGER + newBid.timePredict!!.toSecondOfDay())
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
            timeEndWork - (timeStartBid + TIME_MAX_WAIT_PASSENGER + newBid.timePredict!!.toSeconds())
        } else {
            (24 * 3600 + timeEndWork) - (timeStartBid + TIME_MAX_WAIT_PASSENGER + newBid.timePredict!!.toSeconds())
        }

        logger.info("timeDiff = $timeDiff")

        return timeDiff >= 0
    }

    private fun calculatePredictTime(newBid: Bid) {
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

        if (seconds != 0) {
            newBid.timePredict = LocalTime.of(hours, minutes + 1)
        } else {
            newBid.timePredict = LocalTime.of(hours, minutes)
        }
    }
}

private fun LocalTime.toSeconds(): Int = hour * 3600 + minute * 60

private fun localTimeFromSeconds(secondsOf: Int): LocalTime {
    val hours = Duration.ofSeconds(secondsOf.toLong()).toHours()
    var minutes = Duration.ofSeconds(secondsOf - 3600 * hours).toMinutes()
    val seconds = Duration.ofSeconds(secondsOf - (3600 * hours + 60 * minutes)).toSeconds()
    if (seconds.toInt() != 0) {
        ++minutes
    }
    return LocalTime.of(hours.toInt(), minutes.toInt(), 0)
}