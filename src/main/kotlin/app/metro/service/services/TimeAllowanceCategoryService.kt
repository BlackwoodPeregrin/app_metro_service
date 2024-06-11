package app.metro.service.services

import app.metro.service.data.PassengerCategory
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.File

@Service
class TimeAllowanceCategoryService(
    @Value("\${time_allowance_category}") pathToCategoryStat: String,
) {
    companion object {
        private val mapper: ObjectMapper = jacksonObjectMapper()
    }

    private val stat: Map<PassengerCategory, TimeStat> = loadStatistic(pathToCategoryStat)

    fun getMean(category: PassengerCategory): Int {
        return stat[category]?.mean
            ?: throw RuntimeException("Not found category '$category' in loaded statistic")
    }

    fun getMedian(category: PassengerCategory): Int {
        return stat[category]?.median
            ?: throw RuntimeException("Not found category '$category' in loaded statistic")
    }


    private fun loadStatistic(path: String): Map<PassengerCategory, TimeStat> {
        val node: Map<String, TimeStat>  = mapper.readValue(File(path))

        val res = mutableMapOf<PassengerCategory, TimeStat>()
        for ((category, timeStat) in node) {
            res[PassengerCategory.convertFromString(category)] = timeStat
        }

        return res
    }
}

private data class TimeStat(
    val mean: Int,
    val median: Int
)
