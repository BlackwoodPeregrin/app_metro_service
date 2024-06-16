## Документация к REST-API

## Операции с заявками

## Добавить новую заявку
### POST
    /api/v1/metro/service/bid/add

## Получить все заявки
### GET
    /api/v1/metro/service/bid/all

## Получить все заявки на конкретного сотрудника
### POST
    /api/v1/metro/service/bid/all/employee
- Request - `id сотрудника`
- Response - `объектная модель заявки List<Bid>`

## Фильтрация заявок
### POST
    /api/v1/metro/service/bid/all/filter
- Request - `объектная модель фильтра FilterBidSearch`
- Response - `объектная модель заявки List<Bid>`

## Получить альтернативное время начала исполнения заявки, в случае если желаемое время занято
### POST
    /api/v1/metro/service/bid/alternative_time
- Request - `объектная модель фильтра FilterBidSearch`
- Response - `объектная модель слота времени List<TimeSlot>`

## Установить статус заявке 'Принята'
### POST
    /api/v1/metro/service/bid/accept
- Request - `id заявки`

## Установить статус заявке 'Заявка закончена'
### POST
    /api/v1/metro/service/bid/finish
- Request - `id заявки`

## Отменить заявку и установить статус 'Отменена'
### POST
    /api/v1/metro/service/bid/cansel
- Request - `id заявки`

## Установить статус заявке 'Инспектор опаздывает'
### POST
    /api/v1/metro/service/bid/late/employee
- Request - `id заявки`

## Установить статус заявке 'Пассажир опаздывает'
### POST
    /api/v1/metro/service/bid/late/passenger
- Request - `id заявки`

## Установить статус заявке 'Инспектор выехал'
### POST
    /api/v1/metro/service/bid/on_the_way
- Request - `id заявки`

## Установить статус заявке 'Поездка'
### POST
    /api/v1/metro/service/bid/start
- Request - `id заявки`

## Установить статус заявке 'Ожидание пассажира'
### POST
    /api/v1/metro/service/bid/wait_passenger
- Request - `id заявки`

## Редактировать заявку
### POST
    /api/v1/metro/service/bid/edit
- Request - `id заявки`

## Автоматически рассчитать время выполнения заявки
### POST
    /api/v1/metro/service/bid/calculate
- Request - `объектная модель заявки Bid`
- Response - `рассчитанное время системой timePredict: Int`

## Автоматическое распределение заявок
### POST
    /api/v1/metro/service/bid/redistribute
- Request - `желаемая дата распределния date: LocalDate`
- Response - `объектная модель заявки List<Bid>`

# Операции с пассажирами

## Добавить нового пассажира
### POST
    /api/v1/metro/service/passenger/add
- Request - `объектная модель пассажира 'Passenger'`

## Получить список всех пассажиров
### GET
    /api/v1/metro/service/passenger/all
- Response - `список пассажиров`

## Изменить данные по пассажиру
### POST
    /api/v1/metro/service/passenger/change
- Request - `id пассажира`

## Удалить пассажира
### POST
    /api/v1/metro/service/passenger/remove
- Request - `id пассажира`

# Операции с сотрудниками

## Добавить нового сотрудника
### POST
    /api/v1/metro/service/employee/add
- Request - `объектная модель сотрудника 'Employee'`

## Получить весь список сотрудников
### GET
    /api/v1/metro/service/employee/all
- Request - `список всех сотрудников`

## Изменить данные по сотруднику
### POST
    /api/v1/metro/service/employee/change
- Request - `id сотрудника`

## Изменить рабочее расписание сотрудника
### POST 
    /api/v1/metro/service/employee/change/schedule
- Request - `id сотрудника`

## Получить рабочее расписание всех сотрудников
### GET
    `/api/v1/metro/service/employee/get/schedule
- Request - `id сотрудника`
- Response - `объектная модель рабочиего графика сотрудника`

## Удалить сотрудника
### POST
    /api/v1/metro/service/employee/remove
- Request - `id сотрудника`

## Снять с больничного
### POST
    /api/v1/metro/service/employee/sick_leave/off
- Request - `id сотрудника`

## Вывести на больничный
### POST
    /api/v1/metro/service/employee/sick_leave/on
- Request - `id сотрудника`


# Passenger
Модель данных пассажира

- category: string
- Категория

- firstName: string
- Имя

- lastName: string
- Фамилия

- phone: string
- Мобильный телефон

- surName: string
- Отчество

---

# Employee
Модель данных сотрудника

- firstName: string
- Имя

- lastName: string
- Фамилия

- phone: string
- Мобильный телефон

- role: string
- Роль

- sex: string
- Пол

- surName: string
- Отчество

- workAria: string
- Рабочий участок

---

# FilterBidSearch
Модель данных фильтра поиска заявок

- category: string
- Категория

- employee_firstName: string
- Имя сотрудника

- employee_lastName: string
- Отчество сотрудника

- employee_surName: string
- Отчество сотрудника

- endDate: string($date)
- Конец интервала поиска заявок по дате

- endTime: LocalTime{...}
- ID заявки

- id: integer($int32)
- ID заявки

- id_st1: integer($int32)
- Начальная станция

- id_st2: integer($int32)
- Конечная станция

- passenger_firstName: string
- Имя пассажира

- passenger_lastName: string
- Фамилия пассажира

- passenger_surName: string
- Отчество пассажира

- startDate: string($date)
- Начало интервала поиска заявок по дате

- startTime: LocalTime{...}
- Время начала

- status: string
- Статус

- uchastok: string
- Рабочий участок

# RequestWorkDinnerInterval
Модель данных расписания рабочего дня

- dinner
- Данные об обеде
- work
- Данные о рабочем времени

---

# AddWorkingHouseEmployee
Модель данных недельного расписания сотрудников

- employeeId: integer($int32)
- ID сотрудника

- weekIntervals
- Данные о недельных интервалах
