package app.metro.service.entity

import javax.persistence.Entity
import javax.persistence.Table
import javax.persistence.Id
import javax.persistence.GenerationType
import javax.persistence.GeneratedValue
import javax.persistence.Column

@Entity
@Table(name = "EMPLOYEE")
data class Employee(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,

    @Column(name = "LAST_NAME")
    val lastName: String,

    @Column(name = "FIRST_NAME")
    val firstName: String,

    @Column(name = "SURNAME_NAME")
    val surName: String,

    @Column(name = "ROLE")
    var role: String,

    @Column(name = "WORK_ARIA")
    var workAria: Int,

    @Column(name = "SEX")
    val sex: String,

    @Column(name = "PHONE")
    val phone: String
) {
    constructor(): this(0, "", "", "", "", 0, "", "")
}