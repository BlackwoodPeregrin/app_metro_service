package app.metro.service.services

import app.metro.service.data.BidStatus
import app.metro.service.data.PassengerCategory
import app.metro.service.repository.BidRepository
import app.metro.service.repository.PassengerRepository
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import java.io.File
import java.time.LocalDate
import java.time.LocalTime
import kotlin.math.ceil
import java.util.concurrent.locks.ReentrantLock
import javax.annotation.PostConstruct

@EnableScheduling
@Service
class TimeAllowanceCategoryService(
    @Value("\${time_allowance_category}") pathToStat: String,
    @Autowired private val bidRepo: BidRepository,
    @Autowired private val passengerRepo: PassengerRepository,
    @Autowired private val metroNavigator: MetroNavigatorService
) {
    companion object {
        private val mapper = jacksonObjectMapper()
        private val logger = LoggerFactory.getLogger(this::class.java)
        private val lock = ReentrantLock()
    }

    private val stat: MutableMap<PassengerCategory, TimeStat> = loadStatistic(pathToStat)

    fun getMean(category: PassengerCategory): Int {
        lock.lock()
        val categoryStat = stat[category]
        lock.unlock()

        return categoryStat?.mean
            ?: throw RuntimeException("Not found category '$category' in loaded statistic")
    }

    fun getMedian(category: PassengerCategory): Int {
        lock.lock()
        val categoryStat = stat[category]
        lock.unlock()

        return categoryStat?.median
            ?: throw RuntimeException("Not found category '$category' in loaded statistic")
    }

    @Scheduled(cron = "0 1 0 * * ?")
    fun reloadStatistics() {
        logger.info("reloadStatistics")

        val startDate = LocalDate.now().minusDays(31)
        val endDate = LocalDate.now().minusDays(1)

        val finishedBids = bidRepo.findAll()
            .filter {
                it.date >= startDate && it.date <= endDate && it.status == BidStatus.FINISHED.convertToString()
            }

        val groupCategory = mutableMapOf<PassengerCategory, MutableList<Int>>()

        for (bid in finishedBids) {
            val pasCategory = PassengerCategory.convertFromString(passengerRepo.findById(bid.passengerId).get().category)

            val isCommonGraph: Boolean = when (pasCategory) {
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

            val predictTime = metroNavigator.wayTimeBetween(bid.stID1, bid.stID2, isCommonGraph)
            val realTime =  timeDifference(bid.timeStart!!, bid.timeOver!!)

            groupCategory.getOrPut(pasCategory) { mutableListOf() }.add(realTime - predictTime)
        }

        lock.lock()

        for ((category, diffs) in groupCategory) {
            stat[category]  = TimeStat(
                mean = calculateMean(diffs),
                median = calculateMedian(diffs)
            )
        }

        lock.unlock()

        logger.info("new statistic = $stat")
    }

    private fun loadStatistic(path: String): MutableMap<PassengerCategory, TimeStat> {
        val node: Map<String, TimeStat>  = mapper.readValue(File(path))

        val res = mutableMapOf<PassengerCategory, TimeStat>()
        for ((category, timeStat) in node) {
            res[PassengerCategory.convertFromString(category)] = timeStat
        }

        return res
    }

    private fun timeDifference(start: LocalTime, end: LocalTime): Int {
        return if (end >= start) {
            end.toSecondOfDay() - start.toSecondOfDay()
        } else {
            (LocalTime.MAX.toSecondOfDay() + end.toSecondOfDay()) - start.toSecondOfDay()
        }
    }

    private fun calculateMean(numbers: List<Int>): Int = ceil(numbers.average()).toInt()

    private fun calculateMedian(numbers: List<Int>): Int {
        val sortedNumbers = numbers.sorted()
        val mid = sortedNumbers.size / 2
        return if (sortedNumbers.size % 2 == 0) {
            ((sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2)
        } else {
            sortedNumbers[mid]
        }
    }
}

private data class TimeStat(
    val mean: Int,
    val median: Int
)
