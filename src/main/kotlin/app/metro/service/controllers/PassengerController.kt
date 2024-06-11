package app.metro.service.controllers

import app.metro.service.controllers.response.Response
import app.metro.service.controllers.response.SuccessResponse
import app.metro.service.controllers.response.ErrorResponse
import app.metro.service.controllers.response.PassengersResponse
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import app.metro.service.entity.Passenger
import app.metro.service.repository.PassengerRepository
import org.springframework.beans.factory.annotation.Autowired

@RestController
@RequestMapping("/api/v1/metro/service/passenger")
open class PassengerController(
    @Autowired val passengersRepo: PassengerRepository
) {
    @GetMapping("/all")
    fun getAllPassengers(): Response {
        return try {
            PassengersResponse(passengersRepo.findAll())
        } catch (e: Exception) {
            ErrorResponse(message = "Fail get passengers from db")
        }
    }

    @PostMapping("/add")
    fun addPassenger(@RequestBody passenger: Passenger): Response {
        return try {
            passengersRepo.save(passenger)
            SuccessResponse()
        } catch (e: Exception) {
            ErrorResponse(message="Fail add passenger to db")
        }
    }
}