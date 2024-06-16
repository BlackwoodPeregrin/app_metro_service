package app.metro.service.data

enum class PassengerCategory {
    VISUALLY_IMPAIRED_TOTAL,
    VISUALLY_IMPAIRED,
    HEARING_IMPAIRED,
    WHEEL_CHAIR_IMPAIRED,
    SUPPORT_IMPAIRED,
    CHILD_IMPAIRED,
    OLD_HUMAN,
    PARENTS_WITH_KIDS,
    PARENTS_WITH_KIDS_WHEELS,
    ORG_GROUP_KIDS,
    TEMPORARILY_DISABLED,
    MENTAL_IMPAIRED;

    companion object {
        fun convertFromString(from: String): PassengerCategory {
            return when (from) {
                "ИЗТ" -> VISUALLY_IMPAIRED_TOTAL
                "ИЗ" -> VISUALLY_IMPAIRED
                "ИС" -> HEARING_IMPAIRED
                "ИК" -> WHEEL_CHAIR_IMPAIRED
                "ИО" -> SUPPORT_IMPAIRED
                "ДИ" -> CHILD_IMPAIRED
                "ПЛ" -> OLD_HUMAN
                "РД" -> PARENTS_WITH_KIDS
                "РДК" -> PARENTS_WITH_KIDS_WHEELS
                "ОГД" -> ORG_GROUP_KIDS
                "ОВ" -> TEMPORARILY_DISABLED
                "ИУ" -> MENTAL_IMPAIRED
                else -> throw RuntimeException("Not expected passenger category name '$from'")
            }
        }
    }

    fun convertToString(): String = when (this) {
        VISUALLY_IMPAIRED_TOTAL -> "ИЗТ"
        VISUALLY_IMPAIRED -> "ИЗ"
        HEARING_IMPAIRED -> "ИС"
        WHEEL_CHAIR_IMPAIRED -> "ИК"
        SUPPORT_IMPAIRED -> "ИО"
        CHILD_IMPAIRED -> "ДИ"
        OLD_HUMAN -> "ПЛ"
        PARENTS_WITH_KIDS -> "РД"
        PARENTS_WITH_KIDS_WHEELS -> "РДК"
        ORG_GROUP_KIDS -> "ОГД"
        TEMPORARILY_DISABLED -> "ОВ"
        MENTAL_IMPAIRED -> "ИУ"
    }
}