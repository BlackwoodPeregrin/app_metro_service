package app.metro.service


import org.springframework.web.bind.annotation.RestController
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@RestController
@SpringBootApplication
open class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
