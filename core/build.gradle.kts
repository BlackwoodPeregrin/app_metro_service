plugins {
    kotlin("jvm") version "1.9.22"
    id("org.springframework.boot") version "2.6.7"
    application
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:2.6.7")
    implementation("org.springframework.boot:spring-boot-starter-web:2.6.7")
    implementation("org.springframework.boot:spring-boot-starter-webflux:2.6.7")
    implementation("org.springframework.boot:spring-boot-configuration-processor:2.6.7")

    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.0")

    implementation("org.postgresql:postgresql:42.2.24")

    implementation("org.hibernate:hibernate-core:5.5.7.Final")
    implementation("org.hibernate:hibernate-entitymanager:5.5.7.Final")
    implementation("javax.xml.bind:jaxb-api:2.3.1")

    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.5.0")

    testImplementation("org.jetbrains.kotlin:kotlin-test")
}

tasks {
    jar {
        manifest {
            attributes["Main-Class"] = "app.metro.service.ApplicationKt"
        }

        duplicatesStrategy = DuplicatesStrategy.EXCLUDE

        configurations.runtimeClasspath.get().files.forEach {
            if (it.isDirectory) {
                from(it)
            } else {
                from(zipTree(it))
            }
        }
    }

    test {
        useJUnitPlatform()
    }
}

kotlin {
    jvmToolchain(17)
}