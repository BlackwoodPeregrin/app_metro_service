package app.metro.service.services

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.File

@Service
class StationService(
    @Value("\${station}") pathToStation: String
) {
    companion object {
        private val mapper: ObjectMapper = jacksonObjectMapper()
    }

    private val stations: Map<Int, StationConf> = loadStation(pathToStation)

    private fun loadStation(path: String): Map<Int, StationConf> {
        val jsonTree: List<Map<String, String>> = mapper.readValue(File(path))

        val res = mutableMapOf<Int, StationConf>()

        for (node in jsonTree) {
            val id = node["id"]?.toInt() ?: throw RuntimeException("Incorrect configuration station config")
            val idLine = node["id_line"]?.toInt() ?: throw RuntimeException("Incorrect configuration station config")
            val name = node["name_station"] ?: throw RuntimeException("Incorrect configuration station config")
            val nameLine = node["name_line"] ?: throw RuntimeException("Incorrect configuration station config")

            res[id] = StationConf(
                idLine = idLine,
                name = name,
                nameLine = nameLine
            )
        }

        return res
    }

    fun nameStation(id: Int): String {
        return stations[id]?.name
            ?: throw RuntimeException("Not found category '$id' in loaded station")
    }

    fun nameLineStation(id: Int): String {
        return stations[id]?.nameLine
            ?: throw RuntimeException("Not found category '$id' in loaded station")
    }

    fun idLineStation(id: Int): Int {
        return stations[id]?.idLine
            ?: throw RuntimeException("Not found category '$id' in loaded station")
    }
}

private data class StationConf(
    val idLine: Int,
    val name: String,
    val nameLine: String,
)
