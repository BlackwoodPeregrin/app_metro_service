package app.metro.service.services

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.stereotype.Service
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.beans.factory.annotation.Value
import java.io.File

@Service
open class MetroNavigatorService(
    @Value("\${graph.common}") pathToGraphCommon: String,
    @Value("\${graph.special}") pathToGraphSpecial: String,
) {
    companion object {
        private val mapper: ObjectMapper = jacksonObjectMapper()
    }

    private val commonGraph: List<List<MetroNavigationInfo>> = mapper.readValue(File(pathToGraphCommon))
    private val specialGraph: List<List<MetroNavigationInfo>> = mapper.readValue(File(pathToGraphSpecial))

    fun wayTimeBetween(st1: Int, st2: Int, isCommonGraph: Boolean): Int {
        return if (isCommonGraph) {
            commonGraph[st1 - 1][st2 - 1].time
        } else {
            specialGraph[st1 - 1][st2 - 1].time
        }
    }

    fun pathBetween(st1: Int, st2: Int): List<Int> {
        return commonGraph[st1 - 1][st2 - 1].path
    }
}

private data class MetroNavigationInfo(
    val id1: Int,
    val id2: Int,
    val time: Int,
    val path: List<Int>
)
