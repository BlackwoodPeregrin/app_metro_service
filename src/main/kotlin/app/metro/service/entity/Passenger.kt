package app.metro.service.entity

import javax.persistence.Entity
import javax.persistence.Table
import javax.persistence.Id
import javax.persistence.GenerationType
import javax.persistence.GeneratedValue
import javax.persistence.Column

@Entity
@Table(name = "PASSENGERS")
data class Passenger(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,

    @Column(name = "LAST_NAME")
    var lastName: String,

    @Column(name = "FIRST_NAME")
    var firstName: String,

    @Column(name = "SURNAME_NAME")
    var surName: String,

    @Column(name = "CATEGORY")
    var category: String,

    @Column(name = "PHONE")
    var phone: String,

    @Column(name = "ACTIVE")
    var active: Boolean?
) {
    constructor(): this(0, "", "", "", "", "", true)
}



