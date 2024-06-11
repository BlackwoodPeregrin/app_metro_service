package app.metro.service.data

enum class EmployeeRole {
    ADMINISTRATOR,
    SPECIALIST,
    SECTION_CHIEF,
    SENIOR_INSPECTOR,
    OPERATOR,
    INSPECTOR;

    companion object {
        fun convertFromString(from: String): EmployeeRole {
            return when (from) {
                "АР" -> ADMINISTRATOR
                "СТ" -> SPECIALIST
                "ЦУ" -> SECTION_CHIEF
                "ЦСИ" -> SENIOR_INSPECTOR
                "ЦИО" -> OPERATOR
                "ЦИ" -> INSPECTOR
                else -> throw RuntimeException("Not expected role employee name '$from'")
            }
        }
    }

    fun convertToString(): String = when (this) {
        ADMINISTRATOR -> "АР"
        SPECIALIST -> "СТ"
        SECTION_CHIEF -> "ЦУ"
        SENIOR_INSPECTOR -> "ЦСИ"
        OPERATOR -> "ЦИО"
        INSPECTOR -> "ЦИ"
    }
}
