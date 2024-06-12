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
    var lastName: String,

    @Column(name = "FIRST_NAME")
    var firstName: String,

    @Column(name = "SURNAME_NAME")
    var surName: String,

    @Column(name = "ROLE")
    var role: String,

    @Column(name = "WORK_ARIA")
    var workAria: String,

    @Column(name = "SEX")
    var sex: String,

    @Column(name = "PHONE")
    var phone: String,

    @Column(name = "ACTIVE")
    var active: Boolean?
) {
    constructor(): this(0, "", "", "", "", "0", "", "", true)
}