package app.metro.service.controllers.response

import app.metro.service.entity.Bid
import app.metro.service.entity.Employee
import app.metro.service.entity.Passenger
import java.time.LocalTime

interface Response {
    val code: Int
    val message: String
}

open class SuccessResponse(
    override val code: Int = 200,
    override val message: String = "OK"
) : Response

open class ErrorResponse(
    override val code: Int = 500,
    override val message: String
) : Response

class PassengersResponse(
    val passengers: List<Passenger>
) : SuccessResponse()

class EmployeeResponse(
    val employee: List<Employee>
) : SuccessResponse()

class BidResponseWithEmployees(
    val bid: Bid,
    val employeesId: List<Int>
)

class AllBidResponse(
    val bids: List<BidResponseWithEmployees>
) : SuccessResponse()

class AddBidResponse(
    val added: Boolean
) : SuccessResponse()

class CalculateBidResponse(
    val timePredict: LocalTime
) : SuccessResponse()

class UnCanceledBid(
    val bidsId: List<Int>,
    override val message: String
) : ErrorResponse(message = message)

class NotDistributedBids(
    val bidsId: List<Int>,
): SuccessResponse()
