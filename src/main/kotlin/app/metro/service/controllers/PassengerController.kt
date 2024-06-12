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
import org.springframework.beans.factory.annotation.Autowired
import java.time.LocalDate
import java.time.LocalTime

@RestController
@RequestMapping("/api/v1/metro/service/passenger")
open class PassengerController(
    @Autowired val passengersRepo: PassengerRepository,
    @Autowired val bidRepo: BidRepository
) {
    @GetMapping("/all")
    fun getAllPassengers(): Response {
        return try {
            PassengersResponse(passengersRepo.findAll().filter { it.active == true })
        } catch (e: Exception) {
            ErrorResponse(message = "Fail get passengers from db")
        }
    }

    @PostMapping("/add")
    fun addPassenger(@RequestBody passenger: Passenger): Response {
        return try {
            passengersRepo.save(passenger.apply { active = true })
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message="Fail add passenger to db")
        }
    }

    @PostMapping("/remove")
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