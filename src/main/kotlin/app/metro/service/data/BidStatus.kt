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
    CANSEL,
    NOT_DISTRIBUTED;

    companion object {
        private const val NEW_STR = "Новая"
        private const val ACCEPTED_STR = "Принята"
        private const val ON_THE_WAY_STR = "Инспектор выехал"
        private const val WAIT_PASSENGER_STR = "Инспектор на месте"
        private const val STARTED_STR = "Поездка"
        private const val FINISHED_STR = "Заявка закончена"
        private const val INSPECTOR_LATE_STR = "Инспектор опаздывает"
        private const val PASSENGER_LATE_STR = "Пассажир опаздывает"
        private const val CANSEL_STR = "Отменена"
        private const val NOT_DISTRIBUTED_STR = "Не распределена"

        fun convertFromString(from: String): BidStatus {
            return when (from) {
                NEW_STR -> NEW
                ACCEPTED_STR -> ACCEPTED
                ON_THE_WAY_STR  -> ON_THE_WAY
                WAIT_PASSENGER_STR -> WAIT_PASSENGER
                STARTED_STR -> STARTED
                FINISHED_STR  -> FINISHED
                INSPECTOR_LATE_STR  -> INSPECTOR_LATE
                PASSENGER_LATE_STR  -> PASSENGER_LATE
                CANSEL_STR -> CANSEL
                NOT_DISTRIBUTED_STR  -> NOT_DISTRIBUTED
                else -> throw RuntimeException("Not expected bid status '$from'")
            }
        }
    }

    fun convertToString(): String = when (this) {
        NEW -> NEW_STR
        ACCEPTED -> ACCEPTED_STR
        ON_THE_WAY -> ON_THE_WAY_STR
        WAIT_PASSENGER -> WAIT_PASSENGER_STR
        STARTED -> STARTED_STR
        FINISHED -> FINISHED_STR
        INSPECTOR_LATE -> INSPECTOR_LATE_STR
        PASSENGER_LATE -> PASSENGER_LATE_STR
        CANSEL -> CANSEL_STR
        NOT_DISTRIBUTED -> NOT_DISTRIBUTED_STR
    }
}


