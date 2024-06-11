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
    val lastName: String,

    @Column(name = "FIRST_NAME")
    val firstName: String,

    @Column(name = "SURNAME_NAME")
    val surName: String,

    @Column(name = "CATEGORY")
    val category: String,

    @Column(name = "PHONE")
    val phone: String
) {
    constructor(): this(0, "", "", "", "", "")
}



