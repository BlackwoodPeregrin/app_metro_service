package app.metro.service.data

enum class EmployeeSex {
    MALE,
    FEMALE;

    companion object {
        fun convertFromString(from: String): EmployeeSex {
            return when (from) {
                "Male" -> MALE
                "Female" -> FEMALE
                else -> throw RuntimeException("Not expected sex employee name '$from'")
            }
        }
    }

    fun convertToString(): String = when (this) {
        MALE -> "Male"
        FEMALE -> "Female"
    }
}
