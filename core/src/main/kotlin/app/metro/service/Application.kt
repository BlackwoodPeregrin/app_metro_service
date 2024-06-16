package app.metro.service

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.web.server.Ssl
import org.springframework.boot.web.server.WebServerFactoryCustomizer
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@RestController
@SpringBootApplication
open class Application

@Configuration
open class WebConfiguration : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**").allowedMethods("*")
    }
}

@Component
class CustomizationBean(
    @Value("\${keystore.path}") private val keystorePath: String,
    @Value("\${keystore.password}") private val keystorePassword: String,
) : WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {
    override fun customize(factory: ConfigurableServletWebServerFactory) {
        factory.setSsl(Ssl().apply {
            isEnabled = false
            keyStore = keystorePath
            keyStoreType = "PKCS12"
            keyStorePassword = keystorePassword
        })
    }
}

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
