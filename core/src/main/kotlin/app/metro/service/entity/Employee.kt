package app.metro.service.entity

import io.swagger.annotations.ApiModel
import io.swagger.annotations.ApiModelProperty
import javax.persistence.Entity
import javax.persistence.Table
import javax.persistence.Id
import javax.persistence.GenerationType
import javax.persistence.GeneratedValue
import javax.persistence.Column

@Entity
@Table(name = "EMPLOYEE")
@ApiModel(value = "Employee", description = "Модель данных сотрудника")
data class Employee(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(hidden = true)
    val id: Int,

    @Column(name = "LAST_NAME")
    @ApiModelProperty(value = "Фамилия")
    var lastName: String,

    @Column(name = "FIRST_NAME")
    @ApiModelProperty(value = "Имя")
    var firstName: String,

    @Column(name = "SURNAME_NAME")
    @ApiModelProperty(value = "Отчество")
    var surName: String,

    @Column(name = "ROLE")
    @ApiModelProperty(value = "Роль")
    var role: String,

    @Column(name = "WORK_ARIA")
    @ApiModelProperty(value = "Рабочий участок")
    var workAria: String,

    @Column(name = "SEX")
    @ApiModelProperty(value = "Пол")
    var sex: String,

    @Column(name = "PHONE")
    @ApiModelProperty(value = "Мобильный телефон")
    var phone: String,

    @Column(name = "ACTIVE")
    @ApiModelProperty(hidden = true)
    var active: Boolean?,

    @Column(name = "SICK")
    @ApiModelProperty(hidden = true)
    var sick: Boolean?
) {
    constructor(): this(0, "", "", "", "", "0", "", "", true, false)
}