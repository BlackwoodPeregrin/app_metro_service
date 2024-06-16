package app.metro.service.controllers

import app.metro.service.controllers.response.*
import app.metro.service.data.BidStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import app.metro.service.entity.Passenger
import app.metro.service.repository.BidRepository
import app.metro.service.repository.PassengerRepository
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import java.time.LocalDate
import java.time.LocalTime
import kotlin.math.log

@RestController
@RequestMapping("/api/v1/metro/service/passenger")
@Api(value = "Пассажиры", description = "Операции с пассажирами")
open class PassengerController(
    @Autowired val passengersRepo: PassengerRepository,
    @Autowired val bidRepo: BidRepository
) {
    companion object {
        private val logger = LoggerFactory.getLogger(this::class.java)
    }

    @GetMapping("/all")
    @ApiOperation(value = "Получить список всех пассажиров")
    fun getAllPassengers(): Response {
        logger.info("getAllPassengers")

        return try {
            PassengersResponse(passengersRepo.findAll().filter { it.active == true })
        } catch (e: Exception) {
            ErrorResponse(message = "Fail get passengers from db")
        }
    }

    @PostMapping("/add")
    @ApiOperation(value = "Добавить нового пассажира")
    fun addPassenger(@RequestBody passenger: Passenger): Response {
        logger.info("passenger = $passenger")

        return try {
            passengersRepo.save(passenger.apply { active = true })
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message="Fail add passenger to db")
        }
    }

    @PostMapping("/remove")
    @ApiOperation(value = "Удалить пассажира")
    fun removePassenger(@RequestBody idPassenger: Int): Response {
        val passenger = passengersRepo.findById(idPassenger)
        if (!passenger.isPresent) {
            return ErrorResponse(message="Not found passenger with id '$idPassenger'")
        }

        val futureBids = bidRepo.findAll().filter {
            it.date >= LocalDate.now()
                    && it.time > LocalTime.now()
                    && it.passengerId == idPassenger
                    && it.status != BidStatus.CANSEL.convertToString()
        }

        return if (futureBids.isEmpty()) {
            passengersRepo.save(passenger.get().apply { active = false })
            SuccessResponse()
        } else {
            UnCanceledBid(futureBids.map { it.id }, message = "For this passenger have next bids")
        }
    }

    @PostMapping("/change")
    @ApiOperation(value = "Изменить данные пассажира")
    fun changePassenger(@RequestBody modifyPassenger: Passenger): Response {
        val passenger = passengersRepo.findById(modifyPassenger.id)
        if (!passenger.isPresent) {
            return ErrorResponse(message="Not found passenger with id '${modifyPassenger.id}'")
        }

        passengersRepo.save(passenger.get()
            .apply {
                lastName = modifyPassenger.lastName
                firstName = modifyPassenger.firstName
                surName = modifyPassenger.surName
                category = modifyPassenger.category
                phone = modifyPassenger.phone
            }
        )

        return SuccessResponse()
    }
}