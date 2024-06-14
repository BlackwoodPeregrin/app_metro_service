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
    var passengerId: Int,

    @Column(name = "CREATED_DATE")
    var createdDate: LocalDate?,

    @Column(name = "CREATED_TIME")
    var createdTime: LocalTime?,

    @Column(name = "BID_DATE")
    var date: LocalDate,

    @Column(name = "BID_TIME")
    var time: LocalTime,

    @Column(name = "STATUS")
    var status: String?,

    @Column(name = "ID_ST1")
    var stID1: Int,

    @Column(name = "ID_ST2")
    var stID2: Int,

    @Column(name = "INSPECTOR_M")
    var countMale: Int,

    @Column(name = "INSPECTOR_F")
    var countFemale: Int,

    @Column(name = "TIME_PREDICT")
    var timePredict: LocalTime?,

    @Column(name = "TIME_START")
    var timeStart: LocalTime?,

    @Column(name = "TIME_OVER")
    var timeOver: LocalTime?
) {
    constructor(): this(0, 0, LocalDate.now(), LocalTime.now(), LocalDate.now(), LocalTime.now(), "", 0, 0,0, 0, LocalTime.now(), null, null)
}