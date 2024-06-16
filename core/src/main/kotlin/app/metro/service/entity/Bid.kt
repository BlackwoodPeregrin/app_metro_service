package app.metro.service.entity

import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
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
@ApiModel(value = "Bid", description = "Модель данных заявки")
data class Bid(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(hidden = true)
    val id: Int,

    @Column(name = "ID_PAS")
    @ApiModelProperty(value = "ID пассажира")
    var passengerId: Int,

    @Column(name = "CREATED_DATE")
    @ApiModelProperty(value = "Дата создания")
    var createdDate: LocalDate?,

    @Column(name = "CREATED_TIME")
    @ApiModelProperty(value = "Время создания")
    var createdTime: LocalTime?,

    @Column(name = "BID_DATE")
    @ApiModelProperty(value = "Дата исполнения")
    var date: LocalDate,

    @Column(name = "BID_TIME")
    @ApiModelProperty(value = "Время исполнения")
    var time: LocalTime,

    @Column(name = "STATUS")
    @ApiModelProperty(value = "Статус")
    var status: String?,

    @Column(name = "ID_ST1")
    @ApiModelProperty(value = "Начальная станция")
    var stID1: Int,

    @Column(name = "ID_ST2")
    @ApiModelProperty(value = "Конечная станция")
    var stID2: Int,

    @Column(name = "INSPECTOR_M")
    @ApiModelProperty(value = "Количество мужчин необходимых на заявку")
    var countMale: Int,

    @Column(name = "INSPECTOR_F")
    @ApiModelProperty(value = "Количество женщин необходимых на заявку")
    var countFemale: Int,

    @Column(name = "TIME_PREDICT")
    @ApiModelProperty(value = "Время исполнения, рассчитанное системой")
    var timePredict: LocalTime?,

    @Column(name = "TIME_START")
    @ApiModelProperty(value = "Время начала заявки")
    var timeStart: LocalTime?,

    @Column(name = "TIME_OVER")
    @ApiModelProperty(value = "Время завершения заявки")
    var timeOver: LocalTime?
) {
    constructor(): this(0, 0, LocalDate.now(), LocalTime.now(), LocalDate.now(), LocalTime.now(), "", 0, 0,0, 0, LocalTime.now(), null, null)
}