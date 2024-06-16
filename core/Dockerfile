# stage build
FROM gradle AS build

WORKDIR /app

COPY build.gradle.kts settings.gradle.kts ./

COPY src ./src

RUN gradle build

# stage start
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY src/main/resources/configs ./src/main/resources/configs/

COPY --from=build /app/build/libs/*.jar ./app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
