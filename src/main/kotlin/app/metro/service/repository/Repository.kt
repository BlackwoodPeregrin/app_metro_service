package app.metro.service.repository

import app.metro.service.data.WorkInterval
import app.metro.service.entity.Bid
import app.metro.service.entity.Employee
import app.metro.service.entity.Passenger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.jdbc.core.JdbcTemplate
import java.sql.ResultSet
import java.time.LocalDate
import java.time.LocalTime

@Component
interface PassengerRepository : JpaRepository<Passenger, Int>

@Component
interface EmployeeRepository : JpaRepository<Employee, Int>

@Component
interface BidRepository : JpaRepository<Bid, Int>

@Component
open class WorkScheduleRepository(
    @Autowired private val jdbcTemplate: JdbcTemplate,
    @Autowired private val employeeRepo: EmployeeRepository
) {

    fun getWhoCanTakeBid(date: LocalDate, time: LocalTime): Map<Employee, WorkInterval> {
        val sql = """
            SELECT ID_EMPLOYEE, START_WORK, END_WORK, START_DATE, END_DATE
            FROM WORK_SCHEDULE
            WHERE ('$date' >= START_DATE AND '$date' <= END_DATE)
            AND (
                CASE 
                    WHEN START_WORK <= END_WORK 
                    THEN ('$time' >= START_WORK AND '$time' <= END_WORK)
                    ELSE ('$time' >= START_WORK OR ('$time' <= END_WORK AND '$date' = END_DATE))
                END
            )
        """.trimIndent()

        println(sql)

        val res = mutableMapOf<Employee, WorkInterval>()

        jdbcTemplate.query(sql) { row: ResultSet, _: Int ->
            val employeeId = row.getInt("ID_EMPLOYEE")
            val employee = employeeRepo.findById(employeeId)
            if (!employee.isPresent) {
                throw RuntimeException("Reference to id employee '$employeeId' not found in table EMPLOYEE")
            }

            val workInterval = WorkInterval(
                startTime = row.getTime("START_WORK").toLocalTime(),
                endTime = row.getTime("END_WORK").toLocalTime(),
                startDate = row.getDate("START_DATE").toLocalDate(),
                endDate = row.getDate("END_DATE").toLocalDate(),
            )

            res.put(employee.get(), workInterval)
        }

        return res
    }
}

@Component
open class AssignedBidRepository(
    @Autowired val bidRepository: BidRepository,
    @Autowired val jdbcTemplate: JdbcTemplate
) {
    fun assignedBidByEmployee(employee: Employee, bidDate: LocalDate): List<Bid> {
        val sql = """
            SELECT AB.ID_BID FROM ASSIGNED_BIDS AB
            JOIN BIDS B ON B.ID = AB.ID_BID
            WHERE AB.ID_EMPLOYEE = ${employee.id}
            AND B.BID_DATE = '$bidDate'
        """.trimIndent()

        return jdbcTemplate.query(sql) { row: ResultSet, _: Int ->
            val bidId = row.getInt("ID_BID")
            val bid = bidRepository.findById(bidId)
            if (!bid.isPresent) {
                throw RuntimeException("Reference to id bid '$bidId' not found in table BID")
            }
            bid.get()
        }
    }

    fun assignNewBid(employees: List<Employee>, bid: Bid) {
        val sql = """
            INSERT INTO ASSIGNED_BIDS (ID_BID, ID_EMPLOYEE)
            VALUES (?, ?)
        """.trimIndent()

        for (e in employees) {
            var query = sql
            query = query.replaceFirst("?", bid.id.toString())
            query = query.replaceFirst("?", e.id.toString())

            jdbcTemplate.update(query)
        }
    }
}