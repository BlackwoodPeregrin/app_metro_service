package app.metro.service.entity

import java.time.LocalDate
import java.time.LocalTime
import javax.persistence.Entity
import javax.persistence.Table
import javax.persistence.Id
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Column

@Entity
@Table(name = "BIDS")
data class Bid(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,

    @Column(name = "ID_PAS")
    val passengerId: Int,

    @Column(name = "CREATED_DATE")
    val createdDate: LocalDate,

    @Column(name = "CREATED_TIME")
    val createdTime: LocalTime,

    @Column(name = "BID_DATE")
    val date: LocalDate,

    @Column(name = "BID_TIME")
    val time: LocalTime,

    @Column(name = "STATUS")
    val status: String,

    @Column(name = "ID_ST1")
    val stID1: Int,

    @Column(name = "ID_ST2")
    val stID2: Int,

    @Column(name = "INSPECTOR_M")
    val countMale: Int,

    @Column(name = "INSPECTOR_F")
    val countFemale: Int,

    @Column(name = "TIME_PREDICT")
    var timePredict: LocalTime?,

    @Column(name = "TIME_START")
    var timeStart: LocalTime?,

    @Column(name = "TIME_OVER")
    var timeOver: LocalTime?
) {
    constructor(): this(0, 0, LocalDate.now(), LocalTime.now(), LocalDate.now(), LocalTime.now(), "", 0, 0,0, 0, LocalTime.now(), null, null)
}