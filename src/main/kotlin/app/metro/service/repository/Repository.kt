package app.metro.service.repository

import app.metro.service.controllers.request.RequestWorkDinnerInterval
import app.metro.service.data.BidStatus
import app.metro.service.data.EmployeeSchedule
import app.metro.service.data.TimeInterval
import app.metro.service.entity.Bid
import app.metro.service.entity.Employee
import app.metro.service.entity.Passenger
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Component
import java.sql.ResultSet
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.LocalTime
import java.time.format.DateTimeFormatter

@Component
interface PassengerRepository : JpaRepository<Passenger, Int>

@Component
interface EmployeeRepository : JpaRepository<Employee, Int>

@Component
interface BidRepository : JpaRepository<Bid, Int>

@Component
open class EmployeeScheduleRepository(
    @Autowired private val jdbcTemplate: JdbcTemplate,
    @Autowired private val employeeRepo: EmployeeRepository,
) {
    companion object {
        private val logger: Logger = LoggerFactory.getLogger(this::class.java)
    }
    fun getWhoCanTakeBid(date: LocalDate, time: LocalTime): Map<Employee, EmployeeSchedule> {
        logger.info("who can take bid $date")
        logger.info("Its week day ${date.dayOfWeek}")

        val res = mutableMapOf<Employee, EmployeeSchedule>()

        res.putAll(getEmployeesWorkTimeInterval(date, time))
            
        if (time.isAfter(LocalTime.MIDNIGHT)
            && time.isBefore(LocalTime.of(8, 0, 0))) {
            res.putAll(
                getEmployeesWorkTimeInterval(date.minusDays(1), time)
            )
        }

        return res
    }

    fun registrationWorkingHouse(employeeId: Int, schedule: Map<DayOfWeek, RequestWorkDinnerInterval>) {
        val sqlWorkingHours = """
            INSERT INTO WORK_WEEK_HOURS (ID_EMPLOYEE, MON, TUE, WED, THU, FRI, SAT, SUN)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """.trimIndent()

        val sqlDinnerHours = """
            INSERT INTO DINNER_WEEK_HOURS (ID_EMPLOYEE, MON, TUE, WED, THU, FRI, SAT, SUN)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """.trimIndent()

        val employee = employeeRepo.findById(employeeId)
        if (!employee.isPresent) {
            throw RuntimeException("Not found employee with id '$employeeId'")
        }

        jdbcTemplate.update(sqlWorkingHours) { ps ->
            var idx = 1
            ps.setInt(idx++, employee.get().id)
            ps.setString(idx++, schedule[DayOfWeek.MONDAY]?.let { "${it.work.start}-${it.work.end}" })
            ps.setString(idx++, schedule[DayOfWeek.THURSDAY]?.let { "${it.work.start}-${it.work.end}" })
            ps.setString(idx++, schedule[DayOfWeek.WEDNESDAY]?.let { "${it.work.start}-${it.work.end}" })
            ps.setString(idx++, schedule[DayOfWeek.THURSDAY]?.let { "${it.work.start}-${it.work.end}" })
            ps.setString(idx++, schedule[DayOfWeek.FRIDAY]?.let { "${it.work.start}-${it.work.end}" })
            ps.setString(idx++, schedule[DayOfWeek.SATURDAY]?.let { "${it.work.start}-${it.work.end}" })
            ps.setString(idx, schedule[DayOfWeek.SUNDAY]?.let { "${it.work.start}-${it.work.end}" })
        }

        jdbcTemplate.update(sqlDinnerHours) { ps ->
            var idx = 1
            ps.setInt(idx++, employee.get().id)
            ps.setString(idx++, schedule[DayOfWeek.MONDAY]?.let { "${it.dinner.start}-${it.dinner.end}" })
            ps.setString(idx++, schedule[DayOfWeek.THURSDAY]?.let { "${it.dinner.start}-${it.dinner.end}" })
            ps.setString(idx++, schedule[DayOfWeek.WEDNESDAY]?.let { "${it.dinner.start}-${it.dinner.end}" })
            ps.setString(idx++, schedule[DayOfWeek.THURSDAY]?.let { "${it.dinner.start}-${it.dinner.end}" })
            ps.setString(idx++, schedule[DayOfWeek.FRIDAY]?.let { "${it.dinner.start}-${it.dinner.end}" })
            ps.setString(idx++, schedule[DayOfWeek.SATURDAY]?.let { "${it.dinner.start}-${it.dinner.end}" })
            ps.setString(idx, schedule[DayOfWeek.SUNDAY]?.let { "${it.dinner.start}-${it.dinner.end}" })
        }
    }

    private fun getEmployeesWorkTimeInterval(date: LocalDate, time: LocalTime): Map<Employee, EmployeeSchedule> {
        val sql = """
            SELECT 
                WWH.ID_EMPLOYEE AS ID_EMPLOYEE,
                COALESCE (WWH.${date.dayOfWeek.asString()}, 'NULL') AS WORK_INTERVAL,
                COALESCE (DWH.${date.dayOfWeek.asString()}, 'NULL') DINNER_INTERVAL
            FROM WORK_WEEK_HOURS WWH
            JOIN DINNER_WEEK_HOURS DWH ON DWH.ID_EMPLOYEE = WWH.ID_EMPLOYEE
        """.trimIndent()

        val formatter = DateTimeFormatter.ofPattern("HH:mm") // Определяем формат времени

        val res = mutableMapOf<Employee, EmployeeSchedule>()

        jdbcTemplate.query(sql) { row: ResultSet, _: Int ->
            val employeeId = row.getInt("ID_EMPLOYEE")
            val workTime = row.getString("WORK_INTERVAL")
            val dinnerTime = row.getString("DINNER_INTERVAL")

            if (workTime != "NULL" && dinnerTime != "NULL") {
                val employee = employeeRepo.findById(employeeId)
                val workInterval = workTime.split("-")
                val dinnerInterval = dinnerTime.split("-")

                val startTimeWork = LocalTime.parse(workInterval.first(), formatter)
                val endTimeWork = LocalTime.parse(workInterval.last(), formatter)
                val endDateWork = if (startTimeWork < endTimeWork) {
                    date
                } else {
                    date.plusDays(1)
                }

                val startTimeDinner = LocalTime.parse(dinnerInterval.first(), formatter)
                val endTimeDinner = LocalTime.parse(dinnerInterval.last(), formatter)
                val startEndDinnerDate: Pair<LocalDate, LocalDate> = if (startTimeDinner < endTimeDinner) {
                    if (startTimeWork < startTimeDinner) {
                        Pair(date, date)
                    } else {
                        Pair(date.plusDays(1), date.plusDays(1))
                    }
                } else {
                    Pair(date, date.plusDays(1))
                }

                if (time < startTimeDinner || time > endTimeDinner.plusMinutes(15)) { // 15 минут добавляем для логики подссчтеа обеда
                    if (employee.get().active == true && employee.get().sick == false) {
                        res[employee.get()] = EmployeeSchedule(
                            workTime = TimeInterval(
                                startTime = startTimeWork,
                                endTime = endTimeWork,
                                startDate = date,
                                endDate = endDateWork
                            ),
                            dinnerTime = TimeInterval(
                                startTime = startTimeDinner,
                                endTime = endTimeDinner,
                                startDate = startEndDinnerDate.first,
                                endDate = startEndDinnerDate.second
                            )
                        )
                    }
                }
            }
        }

        return res
    }
}

@Component
open class AssignedBidRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val bidRepository: BidRepository,
    @Autowired val employeeRepo: EmployeeRepository
) {
    fun assignedBidByEmployee(employee: Employee, bidDate: LocalDate): List<Bid> {
        val sql = """
            SELECT AB.ID_BID AS ID_BID FROM ASSIGNED_BIDS AB
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

    fun assignedEmployeeByBid(bidId: Int): List<Employee> {
        val sql = """
            SELECT ID_EMPLOYEE FROM ASSIGNED_BIDS
            WHERE ID_BID = $bidId 
        """.trimIndent()

        return jdbcTemplate.query(sql) { row: ResultSet, _: Int ->
            val employeeId = row.getInt("ID_BID")
            employeeRepo.findById(employeeId).get()
        }
    }

    fun assignedAllFutureBidByEmployee(employee: Employee, bidDate: LocalDate): List<Bid> {
        val sql = """
            SELECT AB.ID_BID AS ID_BID FROM ASSIGNED_BIDS AB
            JOIN BIDS B ON B.ID = AB.ID_BID
            WHERE AB.ID_EMPLOYEE = ${employee.id}
            AND B.BID_DATE >= '$bidDate'
            AND B.STATUS NOT IN ('${BidStatus.FINISHED.convertToString()}', '${BidStatus.CANSEL.convertToString()}') 
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

    fun removeBidFromEmployees(bidId: Int) {
        val sql = """
            DELETE FROM ASSIGNED_BIDS
            WHERE ID_BID = $bidId 
        """.trimIndent()

        jdbcTemplate.update(sql)
    }

    fun assignedEmployeesByBid(bidId: Int): List<Int> {
        val sql = """
            SELECT ID_EMPLOYEE FROM ASSIGNED_BIDS
            WHERE ID_BID = $bidId
        """.trimIndent()

        return jdbcTemplate.query(sql) { row: ResultSet, _: Int ->
            row.getInt("ID_EMPLOYEE")
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

private fun DayOfWeek.asString(): String = when (this) {
    DayOfWeek.MONDAY -> "MON"
    DayOfWeek.TUESDAY -> "TUE"
    DayOfWeek.WEDNESDAY -> "WED"
    DayOfWeek.THURSDAY -> "THU"
    DayOfWeek.FRIDAY -> "FRI"
    DayOfWeek.SATURDAY -> "SAT"
    DayOfWeek.SUNDAY -> "SUN"
}
