package app.metro.service.data

enum class BidStatus {
    NEW,
    ACCEPTED,
    ON_THE_WAY,
    WAIT_PASSENGER,
    STARTED,
    FINISHED,
    INSPECTOR_LATE,
    PASSENGER_LATE,
    CANSEL;

    companion object {
        fun convertFromString(from: String): BidStatus {
            return when (from) {
                "Новая" -> NEW
                "Принята" -> ACCEPTED
                "Инспектор выехал" -> ON_THE_WAY
                "Инспектор на месте" -> WAIT_PASSENGER
                "Поездка" -> STARTED
                "Заявка закончена" -> FINISHED
                "Инспектор опаздывает" -> INSPECTOR_LATE
                "Пассажир опаздывает" -> PASSENGER_LATE
                "Отменена" -> CANSEL
                else -> throw RuntimeException("Not expected bid status '$from'")
            }
        }
    }

    fun convertToString(): String = when (this) {
        NEW -> "Новая"
        ACCEPTED -> "Принята"
        ON_THE_WAY -> "Инспектор выехал"
        WAIT_PASSENGER -> "Инспектор на месте"
        STARTED -> "Поездка"
        FINISHED -> "Заявка закончена"
        INSPECTOR_LATE -> "Инспектор опаздывает"
        PASSENGER_LATE -> "Пассажир опаздывает"
        CANSEL -> "Отменена"
    }
}


