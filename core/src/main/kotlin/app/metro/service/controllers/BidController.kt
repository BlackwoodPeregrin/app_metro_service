package app.metro.service.controllers

import app.metro.service.controllers.request.FilterBidSearch
import app.metro.service.controllers.response.*
import app.metro.service.data.*
import app.metro.service.entity.Bid
import app.metro.service.entity.Employee
import app.metro.service.repository.*
import app.metro.service.services.*
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
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

@RestController
@RequestMapping("/api/v1/metro/service/bid")
@Api(value = "Заявки", description = "Операции с заявками")
open class BidController(
    @Autowired private val passengerRepo: PassengerRepository,
    @Autowired private val bidRepository: BidRepository,
    @Autowired private val scheduleRepo: EmployeeScheduleRepository,
    @Autowired private val assignedBidRepo: AssignedBidRepository,
    @Autowired private val metroNavigator: MetroNavigatorService,
    @Autowired private val employeeRepository: EmployeeRepository,
    @Autowired private val freeSlotCalcService: FreeSlotCalculation,
    @Autowired private val bidService: BidService
) {
    companion object {
        const val TIME_MIN_SPARE_EMPLOYEE = 900 // 15 мин
        const val TIME_MAX_WAIT_PASSENGER = 600 // 10 мин

        private val logger: Logger = LoggerFactory.getLogger(this::class.java)
    }

    @PostMapping("/accept")
    @ApiOperation(value = "Установить статус заявке 'Принята'")
    fun employeeAcceptBid(@RequestBody idBid: Int): Response {
        return try {
            changeStatusBid(idBid, BidStatus.ACCEPTED)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/on_the_way")
    @ApiOperation(value = "Установить статус заявке 'Инспектор выехал'")
    fun employeeOnTheWay(@RequestBody idBid: Int): Response {
        return try {
            changeStatusBid(idBid, BidStatus.ON_THE_WAY)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/wait_passenger")
    @ApiOperation(value = "Установить статус заявке 'Инспектор на месте'")
    fun employeeWaitPassenger(@RequestBody idBid: Int): Response {
        return try {
            changeStatusBid(idBid, BidStatus.WAIT_PASSENGER)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/start")
    @ApiOperation(value = "Установить статус заявке 'Поездка'")
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
    @ApiOperation(value = "Установить статус заявке 'Заявка закончена'")
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
    @ApiOperation(value = "Установить статус заявке 'Инспектор опаздывает'")
    fun employeeLate(@RequestBody idBid: Int): Response {
        return try {
            changeStatusBid(idBid, BidStatus.INSPECTOR_LATE)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/late/passenger")
    @ApiOperation(value = "Установить статус заявке 'Пассажир опаздывает'")
    fun passengerLate(@RequestBody idBid: Int): Response {
        return try {
            changeStatusBid(idBid, BidStatus.PASSENGER_LATE)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/cansel")
    @ApiOperation(value = "Отменить заявку и установить статус 'Отменена'")
    fun canselBid(@RequestBody idBid: Int): Response {
        return try {
            assignedBidRepo.removeBidFromEmployees(idBid)
            changeStatusBid(idBid, BidStatus.CANSEL)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message = e.message!!)
        }
    }

    @PostMapping("/all/filter")
    @ApiOperation(value = "Позволяет получить заявки по входящему фильтру")
    fun getAllBidsByFilter(@RequestBody filter: FilterBidSearch): Response {
        var bids = bidRepository.findAll()

        if (filter.id != null) {
            bids = bids.filter { it.id == filter.id }
        }

        if (filter.passengerLastName != null) {
            bids = bids.filter {
                passengerRepo.findById(it.passengerId).get().lastName == filter.passengerLastName
            }
        }

        if (filter.passengerFirstName != null) {
            bids = bids.filter {
                passengerRepo.findById(it.passengerId).get().firstName == filter.passengerFirstName
            }
        }

        if (filter.passengerSurName != null) {
            bids = bids.filter {
                passengerRepo.findById(it.passengerId).get().surName == filter.passengerSurName
            }
        }


        if (filter.category != null) {
            bids = bids.filter {
                passengerRepo.findById(it.passengerId).get().category == filter.category
            }
        }

        if (filter.idSt1 != null) {
            bids = bids.filter {
                it.stID1 == filter.idSt1
            }
        }

        if (filter.idSt2 != null) {
            bids = bids.filter {
                it.stID2 == filter.idSt2
            }
        }

        if (filter.status != null) {
            bids = bids.filter {
                it.status == filter.status
            }
        }

        if (filter.uchastok != null) {
            bids = bids.filter {
                employeeRepository.findById(it.passengerId).get().workAria == filter.uchastok
            }
        }

        if (filter.employeeLastName != null) {
            bids = bids.filter {
                employeeRepository.findById(it.passengerId).get().lastName == filter.employeeLastName
            }
        }

        if (filter.employeeFirstName != null) {
            bids = bids.filter {
                employeeRepository.findById(it.passengerId).get().firstName == filter.employeeFirstName
            }
        }

        if (filter.employeeSurName != null) {
            bids = bids.filter {
                employeeRepository.findById(it.passengerId).get().surName == filter.employeeSurName
            }
        }

        if (filter.startDate != null) {
            bids = bids.filter {
                it.date >= filter.startDate
            }
        }

        if (filter.endDate != null) {
            bids = bids.filter {
                it.date <= filter.endDate
            }
        }

        if (filter.startTime != null) {
            bids = bids.filter {
                it.time >= filter.startTime
            }
        }

        if (filter.endTime != null) {
            bids = bids.filter {
                it.time <= filter.endTime
            }
        }

        class Response(val bids: List<Bid>) : SuccessResponse()

        return Response(bids)
    }

    @GetMapping("/all")
    @ApiOperation(value = "Получить все заявки")
    fun getAllBidsCurrentDate(): Response {
        val res = bidRepository.findAll()
//            .filter { it.date == LocalDate.now() }
            .map { bid ->
            BidResponseWithEmployees(
                bid = bid,
                employeesId = assignedBidRepo.assignedEmployeesIdByBid(bid.id)
            )
        }
        return AllBidResponse(res)
    }

    @PostMapping("/all/employee")
    @ApiOperation(value = "Получить все заявки на конкретного сотрудника")
    fun getAllBidByEmployee(@RequestBody employeeId: Int): Response {
        val employee = employeeRepository.findById(employeeId)
        if (!employee.isPresent) {
            return ErrorResponse(message="Not found employee in db with ID '${employeeId}'")
        }

        class Response(val bids: List<Bid>) : SuccessResponse()

        return Response(assignedBidRepo.assignedAllFutureBidByEmployee(employee.get(), LocalDate.now()))
    }

    @PostMapping("/calculate")
    @ApiOperation(value = "Автоматически рассчитать время выполенения заявки")
    fun calculateTimeBid(@RequestBody newBid: Bid): Response {
        newBid.timePredict = bidService.calculatePredictTime(newBid)

        return CalculateBidResponse(newBid.timePredict!!)
    }

    @PostMapping("/edit")
    @ApiOperation(value = "Редактировать заявку")
    fun editRegisteredBid(@RequestBody editBid: Bid): Response {
        val optionBid = bidRepository.findById(editBid.id)
        if (!optionBid.isPresent) {
            return ErrorResponse(message = "Bid with '${editBid.id}' in active")
        }

        val bid = optionBid.get()

        val bidStatus = BidStatus.convertFromString(bid.status)

        if (bidStatus == BidStatus.FINISHED || bidStatus == BidStatus.CANSEL || bidStatus == BidStatus.NOT_DISTRIBUTED) {
            return ErrorResponse(message = "Bid with '${editBid.id}' in active")
        }

        val employeesTakeBid = mutableListOf<Employee>()


        swapBid(bid, editBid)

        return if (bidService.canAddNewBid(bid, employeesTakeBid, setOf(bid.id), Algorithm.DENSE)) {
            assignedBidRepo.removeBidFromEmployees(bid.id)
            bidRepository.save(bid)
            assignedBidRepo.assignNewBid(employeesTakeBid, bid)

            class Response(val added: Boolean, val employeesId: List<Int>) : SuccessResponse()

            Response(added = true, employeesId = employeesTakeBid.map { it.id })
        } else {

            AddBidResponse(added = false)
        }
    }

    private fun swapBid(old: Bid, new: Bid) {
        old.passengerId = new.passengerId
        old.createdTime = LocalTime.now()
        old.createdDate = LocalDate.now()
        old.date = new.date
        old.time = new.time
        old.stID1 = new.stID1
        old.stID2 = new.stID2
        old.countMale = new.countMale
        old.countFemale = new.countFemale
        old.timePredict = null
        old.timeStart = null
        old.timeOver = null
    }

    @PostMapping("/alternative_time")
    @ApiOperation(value = "Получить альтернативное время начала исполнения заявки, в случае если желаемое время занято")
    fun alternativeTimeBid(@RequestBody newBid: Bid): Response {
        class Response(val freeSlots: List<TimeSlot>): SuccessResponse()
        try {
            if (newBid.timePredict == null) {
                newBid.timePredict = bidService.calculatePredictTime(newBid)
            }

            val schedules = mutableMapOf<Int, EmployeeConf>()

            for ((employee, schedule) in scheduleRepo.getWhoCanTakeBid(newBid.date, newBid.time)) {
                val gender = EmployeeSex.convertFromString(employee.sex)
                var busySlots = mutableListOf<TimeSlot>()

                logger.info("schedule = $schedule")

                val work = if (schedule.workTime.startTime < schedule.workTime.endTime) {
                    TimeSlot(schedule.workTime.startTime.plusMinutes(15), schedule.workTime.endTime)
                } else {
                    if (newBid.date == schedule.workTime.startDate) {
                        TimeSlot(schedule.workTime.startTime.plusMinutes(15), LocalTime.of(23, 59))
                    } else {
                        TimeSlot(LocalTime.MIDNIGHT, schedule.workTime.endTime)
                    }
                }

                val employeeBids: List<Bid> = assignedBidRepo.assignedBidByEmployee(employee, newBid.date)
                    .sortedWith(compareBy({ it.date }, { it.time }))

                for (i in employeeBids.indices) {
                    val bid: Bid = employeeBids[i]

                    var timeStart: Int = bid.time.toSecondOfDay() - metroNavigator.wayTimeBetween(newBid.stID2, bid.stID1, isCommonGraph = true)
                    val timeEnd: Int = bid.time.toSecondOfDay() + TIME_MAX_WAIT_PASSENGER + bid.timePredict!!.toSeconds() + metroNavigator.wayTimeBetween(bid.stID2, newBid.stID1, isCommonGraph = true)

                    val slotBid = if (timeStart > timeEnd) {
                        TimeSlot(start = localTimeFromSeconds(timeStart), end = LocalTime.of(23, 59))
                    } else {
                        if (timeStart < 0) {
                            timeStart = 0
                        }
                        TimeSlot(start = localTimeFromSeconds(timeStart), end = localTimeFromSeconds(timeEnd))
                    }

                    busySlots.add(slotBid)
                }

                var dinnerStart = schedule.dinnerTime.startTime.toSecondOfDay() - TIME_MAX_WAIT_PASSENGER
                if (dinnerStart < 0) {
                    dinnerStart = 0
                }
                val dinnerEnd = schedule.dinnerTime.endTime.toSecondOfDay() + TIME_MIN_SPARE_EMPLOYEE

                val slotDinner = if (dinnerStart > dinnerEnd) {
                    TimeSlot(start = localTimeFromSeconds(dinnerStart), end = LocalTime.of(23, 59))
                } else {
                    TimeSlot(start = localTimeFromSeconds(dinnerStart), end = localTimeFromSeconds(dinnerEnd))
                }

                busySlots.add(slotDinner)
                busySlots = busySlots.sortedBy { it.start }.toMutableList()

                var p1 = 0
                var p2 = 1
                while (p2 < busySlots.size) {
                    if (busySlots[p1].end > busySlots[p2].start) {
                        busySlots[p1] = TimeSlot(start = busySlots[p1].start, end = busySlots[p2].end)
                        ++p2
                        continue
                    }

                    if (p2 - p1 == 1) {
                        ++p1
                        ++p2
                    } else {
                        busySlots[++p1] = busySlots[p2++]
                    }
                }


                if (busySlots.first().start < schedule.workTime.startTime) {
                    busySlots[0] = TimeSlot(start = schedule.workTime.startTime, end = busySlots[0].end)
                }

                if (busySlots[p1].end > schedule.workTime.endTime) {
                    busySlots[p1] = TimeSlot(start = busySlots[p1].start, end = schedule.workTime.endTime)
                }

                schedules[employee.id] = EmployeeConf(gender, busySlots.subList(0, p1 + 1), work)
            }

            for ((id, userData) in schedules) {
                logger.info("employeeId '{}' userData '{}'", id, userData)
            }

            val duration: LocalTime = newBid.timePredict!!
            val durationMin: Int = duration.hour * 60 + duration.minute + 10

            logger.info("$durationMin")

            val freeSlots = freeSlotCalcService.calculate(
                FreeSlotConfig(
                    schedules = schedules,
                    duration = durationMin,
                    requiredMen = newBid.countMale,
                    requiredWomen = newBid.countFemale
                )
            )

            return Response(freeSlots.map {
                TimeSlot(
                    start = it.start.plusMinutes(15 + 1), // из-за округления predictTime
                    end = it.end.minusMinutes(durationMin.toLong())
                )
            })
        } catch (e: Exception) {
            logger.error(e.message)
            for (err in e.stackTrace) {
                logger.error(err.toString())
            }
            return Response(listOf())
        }
    }

    @PostMapping("/add")
    @ApiOperation(value = "Добавить новую заявку")
    fun addNewBid(@RequestBody newBid: Bid): Response {
        if (newBid.date >= LocalDate.now()) {
            AddBidResponse(added = false)
        }

        val employeesTakeBid = mutableListOf<Employee>()

        return if (bidService.canAddNewBid(newBid, employeesTakeBid, emptySet(), Algorithm.DENSE)) {
            saveNewBid(newBid)
            assignedBidRepo.assignNewBid(employeesTakeBid, newBid)
            AddBidResponse(added = true)
        } else {
            alternativeTimeBid(newBid)
        }
    }

    @PostMapping("/redistribute/dense")
    fun redistributeBids(@RequestBody date: LocalDate): Response {
        class Response(val unAssignedBids: List<Bid>): SuccessResponse()

        return Response(redistributeBids(date, Algorithm.DENSE))
    }

    @PostMapping("/redistribute/uniform")
    fun redistributeBidsUniform(@RequestBody date: LocalDate): Response {
        class Response(val unAssignedBids: List<Bid>): SuccessResponse()

        return Response(redistributeBids(date, Algorithm.UNIFORM))
    }

    private fun redistributeBids(date: LocalDate, algorithm: Algorithm): List<Bid> {
        val bids = bidRepository.findAll()
            .filter { it.date == date }
            .sortedWith(compareBy { it.createdTime })

        for (bid in bids) {
            val employees: List<Employee> = assignedBidRepo.assignedEmployeeByBid(bid.id)
            assignedBidRepo.removeBidFromEmployees(bid.id)
            assignedBidRepo.assignNewBidCache(employees, bid)
        }

        val unAssignedBids = mutableListOf<Bid>()

        for (bid in bids) {
            val employeesTakeBid = mutableListOf<Employee>()
            if(bidService.canAddNewBid(bid, employeesTakeBid, setOf(), Algorithm.UNIFORM)) {
                assignedBidRepo.assignNewBid(employeesTakeBid, bid)
            } else {
                bidRepository.save(bid.apply { status = BidStatus.NOT_DISTRIBUTED.convertToString() })
                unAssignedBids.add(bid)
            }
        }

        return unAssignedBids
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
}

fun LocalTime.toSeconds(): Int = hour * 3600 + minute * 60

fun localTimeFromSeconds(secondsOf: Int): LocalTime {
    val logger = LoggerFactory.getLogger("")
    logger.warn(secondsOf.toString())
    val hours = Duration.ofSeconds(secondsOf.toLong()).toHours()
    logger.warn(hours.toString())
    val minutes = Duration.ofSeconds(secondsOf - 3600 * hours).toMinutes()
    logger.warn(minutes.toString())
    val seconds = Duration.ofSeconds(secondsOf - (3600 * hours + 60 * minutes)).toSeconds()
    logger.warn(seconds.toString())
    return if (seconds.toInt() != 0) {
        if (minutes.toInt() == 59) {
            if (hours.toInt() == 23) {
                LocalTime.of(0, 0, 0)
            } else {
                LocalTime.of(hours.toInt() + 1, 0, 0)
            }
        } else {
            LocalTime.of(hours.toInt(), minutes.toInt(), 0)
        }
    } else {
        LocalTime.of(hours.toInt(), minutes.toInt(), 0)
    }
}
