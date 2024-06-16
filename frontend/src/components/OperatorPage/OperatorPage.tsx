import React, {useEffect, useState} from 'react';

import {
    DatePicker,
    Button,
    Form,
    Modal,
    Tabs,
    AutoComplete,
    TimePicker,
    Select,
    Input,
    message,
    Badge,
    List,
    Empty
} from 'antd';
import {PlusOutlined, SearchOutlined, LeftOutlined} from '@ant-design/icons';
import { parse, addMinutes, format } from 'date-fns';
import dayjs from 'dayjs';
import {waitingList, employeeList, ITestWaitingList, SPOT_LIST} from "../../utils/constants";
import {ApplicationTabs} from "./ApplicationsTabs/ApplicationsTabs";
import ApplicationCard from "./ApplicationCard/ApplicationCard";
import {WarningApplicationCard} from "./WarningApplicationCard/WarningApplicationCard";

import styled from 'styled-components';

import {
    IListOfBids, IListOfEmployees,
    IListOfPassengers,
    requestListOfBid,
    requestListOfEmployee,
    requestListOfPassengers,
    calculateNewBid,
    IAddBidProps,
    addNewBid, IListFilterBid, findBid, IListOfBidsResult
} from "../../services/FileBrowserService";
import {nameStations} from "../../utils/constants";
import SidebarMenu from "../SidebarMenu/SidebarMenu";


const { TabPane } = Tabs;

interface ISearchParameterApplication {
    id?: string | number | null,
    passenger_lastName?: string | null,
    passenger_firstName?: string | null,
    passenger_surName?: string | null,
    category?: string | null,
    id_st1?: string | null | undefined,
    id_st2?: string | null | undefined,
    status?: string | null,
    uchastok?: string | null,
    employee_lastName?: string | null,
    employee_firstName?: string | null,
    employee_surName?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    time?: string | null
} // параметры поиска

interface ICreateNewApplication {
    passengerId: number,
    date: string,
    time: string,
    stID1: number,
    stID2: number,
    countMale: number,
    countFemale: number,
    timePredict?: string | null,
}

const OperatorPageWrapper = styled.div`    
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #1890ff;
        color: white;
        font-size: 18px;
        margin-bottom: 20px;
    }
    .operatorPage-content {
        padding: 10px;
    }
`; // стили

const ApplicationCreateForm = styled(Form)`
    margin-bottom: 20px;
`; // стили форм

interface Application {
    passenger: string;
    route: string;
    time: string;
    employee: string;
    date: string; // добавляем поле даты
}

// const testWaitingList: ITestWaitingList[] = waitingList.map((item, index) => {
//     const employeeIndex = index % employeeList.length; // Циклический индекс
//     return {
//         ...item,
//         id_employee: employeeList[employeeIndex].ID
//     };
// });

// const testStatusWaitingList: ITestWaitingList[] = testWaitingList.map((item, index) => {
//     let statusWait = '';
//     if (index % 7 === 0) {
//         statusWait = 'latePassenger'
//     } else if (index % 6 === 0) {
//         statusWait = 'lateEmployee'
//     } else if (index % 5 === 0) {
//         statusWait = 'finish'
//     } else if (index % 4 === 0) {
//         statusWait = 'start'
//     } else if (index % 3 === 0) {
//         statusWait = 'wait_passenger'
//     } else if (index % 2 === 0) {
//         statusWait = 'on_the_way'
//     } else {
//         statusWait = 'accept'
//     }
//     return {
//         ...item,
//         status: statusWait,
//     };
// })

// const list: IListOfPassengers[] = [
//     {"id":1,"lastName":"Дориан","firstName":"Джон","surName":"Грэй","category":"ИЗТ","phone":"+7-999-808-15-44"},
//     {"id":2,"lastName":"Конор","firstName":"Сара","surName":"Терминаторна","category":"ИЗТ","phone":"+7-999-808-15-44"},
// ] // тестовый список пассажиров

const OperatorPage: React.FC = () => {
    const [listOfBids, setListOfBids] = useState<IListOfBids[]>([]);
    const [listOfEmployees, setListOfEmployees] = useState<IListOfEmployees[]>([]);
    const [passengerList, setPassengerList] = useState<IListOfPassengers[]>([]);
    const [optionsSearchStation, setOptionsSearchStation] = useState<any[]>([]);
    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchApplicationResults, setSearchApplicationResults] = useState<IListOfBidsResult[]>([]);
    const [optionSearchEmployee, setOptionSearchEmployee] = useState<any[]>([]);
    const [optionSearchPassenger, setOptionSearchPassenger] = useState<any[]>([]);
    const [isApplicationCreateModalVisible, setIsApplicationCreateModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [timePredict, setTimePredict] = useState<string>('');
    const [requestOfCalculateAppParameter, setRequestOfCalculateAppParameter] = useState<IAddBidProps | null>(null);
    const [isCalculationAppCompleted, setIsCalculationAppCompleted] = useState<boolean>(false);
    const [statusOfCalculationAppCompleted, setStatusOfCalculationAppCompleted] = useState<boolean | null>(null);
    const [selectedAddedTime, setSelectedAddedTime] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm'));
    const [potentialProblemsList, setPotentialProblemsList] = useState<IListOfBids[]>([]);
    const [warningAoolicationIsVisible, setWarningAoolicationIsVisible] = useState<boolean>(false);
    const [requestOfCreateAppParameter, setRequestOfCreateAppParameter] = useState<IAddBidProps | null>(null);
    const [alternativeApplicationTimesIsVisible, setAlternativeApplicationTimesIsVisible] = useState<boolean>(false);
    const [alternativeApplicationTimesList, setAlternativeApplicationTimesList] = useState<string[]>([]);

    const getListOfEmployees = () => {
        requestListOfEmployee()
            .then(response => {
                setListOfEmployees(response.employee);
            })
            .catch(() => {
                message.error('Ошибка при получении списка работников.');
            })
    }

    const calculateTimeBid = (props: IAddBidProps) => {
        calculateNewBid(props)
            .then(respons => {
                console.log(respons)
                setTimePredict(respons.timePredict.split(':').slice(0,2).join(':'))
            })
    }

    // const getListOfPassengers = () => {
    //     requestListOfPassengers()
    //         .then(response => {
    //             setPassengerList(response.passengers)
    //         })
    //         .catch(error => {
    //             message.error('Ошибка при получении списка пассажиров.');
    //         })
    // }

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(format(new Date(), 'HH:mm'));
        }, 1000);

        // Очищаем таймер при размонтировании компонента
        return () => clearInterval(timerId);
    }, []);


    const getListOfPassengers = async () => {
        requestListOfPassengers()
            .then(response => {
                setPassengerList(response.passengers)
            })
            .catch(error => {
                message.error('Ошибка при отправке запроса.');
            })
    }

    useEffect(() => {
        getListOfPassengers();
        getListOfEmployees();
        requestListOfBid().then(response => {
            setListOfBids(response.bids)
            console.log(response.bids.filter(time=> time.bid.status !== 'Заявка закончена'))
        })
    }, [])



    const handleTimeComparison = (time1: string, time2: string) => {
        let formattedTime1;
        if(time1.split(' ').length > 1) {
            const timeString = time1.split(' ')[1];
            const [hours, minutes] = timeString.split(':');
            formattedTime1 = `${hours.padStart(2, '0')}${minutes}`;
        } else {
            const [hours, minutes] = time1.split(':');
            formattedTime1 = +`${hours.padStart(2, '0')}${minutes}`;
        }

        const [hour2, minute2] = time2.split(':');
        const formattedTime2 = +`${hour2.padStart(2, '0')}${minute2}`;
        return formattedTime1 < formattedTime2
    }


    // const [timePredictOfapplication, setTimePredictOfapplication] = useState<string | null>(null); // параметры заявки
    // const [filteredPassengerList, setFilteredPassengerList] = useState<IListOfPassengers[]>([]);
    // const [selectedPassenger, setSelectedPassenger] = useState<IListOfPassengers | null>(null);
    // const [searchValue, setSearchValue] = useState('');



    const [applicationCreateForm] = Form.useForm<Application>();
    const [searchForm] = Form.useForm();
    const dateFormat = 'DD.MM.YYYY';

    const handleSearchPassenger = (value: string) => {
        setOptionSearchPassenger(
            passengerList
                .filter(passenger =>
                    passenger.lastName.toLowerCase().includes(value.toLowerCase()) ||
                    passenger.firstName.toLowerCase().includes(value.toLowerCase()) ||
                    passenger.surName.toLowerCase().includes(value.toLowerCase()))
                .map(passenger => ({value: `${passenger.lastName} ${passenger.firstName} ${passenger.surName}`, key: passenger.id}))
        )
    }; // обработка поиска пассажира

    const handleSearchStation = (value: string) => {
        setOptionsSearchStation(
            nameStations
                .filter(station => station.name_station.toLowerCase().includes(value.toLowerCase()))
                .map(station => ({ value: station.name_station }))
        );
    }; // обработка поиска станции

    const handleSearchEmployee = (value: string) => {
        setOptionSearchEmployee(
            employeeList
                .filter(employee => employee.FIO.toLowerCase().includes(value.toLowerCase()))
                .map((employee, index) => ({value: employee.FIO, key: `${employee.ID}-${index}`}))
        )
    } // обработка поиска исполнителя

    const handleDateChange = (date: any) => {
        if(date) {
            const formattedDate = format(date.$d, 'dd.MM.yyyy');
            setSelectedDate(formattedDate);
        }
    }; // обработка выбора даты

    const generateTimeSlots = (): string[] => {
        const slots: string[] = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
            }
        }
        return slots;
    };  // создание солбца времени

    const timeSlots = generateTimeSlots();

    const handleOpenApplicationModal = async () => {
        setIsApplicationCreateModalVisible(true);
        // const passengerList: IListOfPassengers[] = await getListOfPassengers(); // перенести в useEffect
        // setPassengerList(list); // туда же
    }

    const handleAddedTimeChange = (value: number) => {
        setSelectedAddedTime(value);
        console.log(value)
    }

    const handleCreateNewApplication = (values: any) => {
        console.log(values);
        const requestCreationParameters: IAddBidProps = {
            passengerId: passengerList.find(passenger => passenger.lastName === values.passenger.split(' ')[0])?.id!,
            date: format(values.date.$d, 'yyyy-MM-dd'),
            time: format(values.time.$d, 'HH:mm'),
            stID1: +nameStations.find(station => station.name_station.toLowerCase() === values.id_st1.toLowerCase())?.id!,
            stID2: +nameStations.find(station => station.name_station.toLowerCase() === values.id_st2.toLowerCase())?.id!,
            countMale: values.INSP_SEX_M,
            countFemale: values.INSP_SEX_F,
        }
        setRequestOfCalculateAppParameter(requestCreationParameters);
        console.log(requestCreationParameters);
        calculateTimeBid(requestCreationParameters);
        // отправляем запрос на расчет заявки
        // если запрос обработан, то
        // setIsCalculationAppCompleted(true);
        // setStatusOfCalculationAppCompleted(true) // статус проверки возможно ли распределить
        // если статус тру то присваеваем предикт
        setRequestOfCreateAppParameter({...requestCreationParameters, timePredict: timePredict}) // сюда нужно добавить TIME_PREDICT из респонса


    }

    const handleRegistrationRequest = () => {

        // отправляем запрос на регистрацию
        setIsApplicationCreateModalVisible(false);
        if(requestOfCreateAppParameter) {
            const timeString = timePredict || '';
            const parsedTime = parse(timeString, 'HH:mm', new Date());
            const newTime = addMinutes(parsedTime, selectedAddedTime || 0);
            const formattedTime = format(newTime, 'HH:mm');
            const newRequestOfCreateAppParameter: IAddBidProps = {...requestOfCalculateAppParameter!, timePredict: formattedTime}
            console.log(newRequestOfCreateAppParameter);
            addNewBid(newRequestOfCreateAppParameter)
                .then(response => {
                    if(response.added) {
                        message.success('Заявка успешно зарегистрирована')
                    } else {
                        setAlternativeApplicationTimesList(response.freeSlots || [])
                        setAlternativeApplicationTimesIsVisible(true)
                    }
                })
        }

    }

    const handleOpenSearchModal = () => {
        // setIsSearchModalVisible(true);
        setIsSearchModalVisible(true)
    };

    const handleSearchApplication = (values: any) => {
        const isEmpty = Object.values(values).every(value => value === undefined || value === '');
        if (isEmpty) {
            message.warning('Заполните хотя бы одно поле для поиска');
            return;
        } else {
            console.log('Search values:', values);
            const searchParameterApplication: IListFilterBid = {};

            if (values.id) searchParameterApplication.id = values.id;

            if (values.passenger) {
                const [lastName, firstName, surName] = values.passenger.split(' ');
                if (lastName) searchParameterApplication.passenger_lastName = lastName;
                if (firstName) searchParameterApplication.passenger_firstName = firstName;
                if (surName) searchParameterApplication.passenger_surName = surName;
            }

            if (values.category) searchParameterApplication.category = values.category;

            if (values.station1) {
                const station1 = nameStations.find(station => station.name_station.toLowerCase() === values.station1.toLowerCase());
                if (station1) searchParameterApplication.id_st1 = +station1.id;
            }

            if (values.station2) {
                const station2 = nameStations.find(station => station.name_station.toLowerCase() === values.station2.toLowerCase());
                if (station2) searchParameterApplication.id_st2 = +station2.id;
            }

            if (values.status) searchParameterApplication.status = values.status;

            if (values.uchastok) searchParameterApplication.uchastok = `ЦУ-${values.uchastok}`;

            if (values.employee) {
                const [empLastName, empFirstName, empSurName] = values.employee.split(' ');
                if (empLastName) searchParameterApplication.employee_lastName = empLastName;
                if (empFirstName) searchParameterApplication.employee_firstName = empFirstName;
                if (empSurName) searchParameterApplication.employee_surName = empSurName;
            }

            if (values.startDate) searchParameterApplication.startDate = format(values.startDate.$d, 'yyyy-MM-dd');

            if (values.endDate) searchParameterApplication.endDate = format(values.endDate.$d, 'yyyy-MM-dd');

            if (values.time) searchParameterApplication.startTime = format(values.time.$d, 'hh.mm');


            console.log(searchParameterApplication);
            setIsSearchModalVisible(false);
            findBid(searchParameterApplication)
                .then(response => {
                    setSearchApplicationResults(response.bids);
                    setIsSearching(true);
                    console.log(response);
                })
            // здесь нужен запрос на бэк с параметрами поиска
            // setSearchApplicationResults(searchParameterApplication) полученный результат добавляем в стэйт
            // setIsSearching(true) открываем страницу с результатами
        }
    };

    const handleBadgeClick = (key: string, event: React.MouseEvent) => {
        event.stopPropagation();
        console.log(`Badge clicked: ${key}`);
        setPotentialProblemsList(
            key === 'active' ? listOfBids.filter(time=> time.bid.status !== 'Заявка закончена' && handleTimeComparison(time.bid.time, currentTime)):
                listOfBids.filter(time=> time.bid.status === key && handleTimeComparison(time.bid.time, currentTime))
        )
        setWarningAoolicationIsVisible(true)
        // Здесь можно добавить дополнительную логику обработки клика
    };

    console.log(listOfBids.filter(time=> time.bid.status !== 'Заявка закончена' && handleTimeComparison(time.bid.time, currentTime)))

    return (
        <OperatorPageWrapper>
            <div className="header">
                {warningAoolicationIsVisible || isSearching ? <LeftOutlined onClick={() => {
                    setWarningAoolicationIsVisible(false);
                    setIsSearching(false)
                }} /> : <SidebarMenu/>}

                <div>{currentTime}</div>
                <div>Регистрация рабочего дня сотрудника</div>
                <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={handleOpenApplicationModal}
                >
                    Создать новую заявку
                </Button>
                <Button
                    type="default"
                    icon={<SearchOutlined/>}
                    onClick={handleOpenSearchModal}
                >
                    Поиск заявок
                </Button>
            </div>
            <Modal
                title="Новая заявка"
                open={isApplicationCreateModalVisible}
                onCancel={() => {
                    setIsApplicationCreateModalVisible(false);
                    applicationCreateForm.resetFields();
                }}
                footer={null}
            >
                <ApplicationCreateForm form={applicationCreateForm} onFinish={handleCreateNewApplication} layout="vertical"
                                 initialValues={{INSP_SEX_M: 0, INSP_SEX_F: 0}}>
                    <Form.Item name="passenger" label="Пассажир"
                               rules={[{required: true, message: 'Пожалуйста, выберите пассажира'}]}>
                        <AutoComplete
                            onSearch={handleSearchPassenger}
                            options={optionSearchPassenger}
                            placeholder="Введите ФИО пассажира"
                        />
                    </Form.Item>
                    <Form.Item
                        name="id_st1"
                        label="Станция начала маршрута"
                        rules={[{required: true, message: 'Пожалуйста, введите станцию начала маршрута'}]}
                    >
                        <AutoComplete
                            onSearch={handleSearchStation}
                            options={optionsSearchStation}
                            placeholder="Введите станцию начала маршрута"
                        />
                    </Form.Item>
                    <Form.Item name="id_st2" label="Станция завершения маршрута"
                               rules={[{required: true, message: 'Пожалуйста, введите станцию завершения маршрута'}]}>

                        <AutoComplete
                            onSearch={handleSearchStation}
                            options={optionsSearchStation}
                            placeholder="Введите станцию завершения маршрутаа"
                        />
                    </Form.Item>
                    {/*<Form.Item name="date" label="Дата"*/}
                    {/*           rules={[{required: true, message: 'Пожалуйста, выберите дату'}]}>*/}
                    {/*    <DatePicker/>*/}
                    {/*</Form.Item>*/}
                    <Form.Item name="date" label="Дата"
                               rules={[{required: true, message: 'Пожалуйста, выберите дату'}]}>
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item name="time" label="Время"
                               rules={[{required: true, message: 'Пожалуйста, выберите время'}]}>
                        <TimePicker showSecond={false}/>
                    </Form.Item>
                    <Form.Item
                        name="INSP_SEX_M"
                        label="Количество сотрудников мужчин выделяемых на данную заявку"
                        rules={[{required: true, message: 'Пожалуйста, введите количество сотрудников'}]}
                    >
                        <Select>
                            {[0, 1, 2, 3, 4, 5].map(num => (
                                <Select.Option key={num} value={num}>
                                    {num}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="INSP_SEX_F"
                        label="Количество сотрудников женщин выделяемых на данную заявку"
                        rules={[{required: true, message: 'Пожалуйста, введите количество сотрудников'}]}
                    >
                        <Select>
                            {[0, 1, 2, 3, 4, 5].map(num => (
                                <Select.Option key={num} value={num}>
                                    {num}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {!isCalculationAppCompleted ? (
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Отправить на расчет
                            </Button>
                        </Form.Item>
                    ) : null}

                </ApplicationCreateForm>
                {timePredict ? (
                    <div>
                        <div>Рвсчетное время на выполнение
                            заявки {timePredict}</div>
                        <div>Добавить дополнительное время?</div>
                        <Select
                            placeholder="Выберите время"
                            onChange={handleAddedTimeChange}
                            value={selectedAddedTime}
                        >
                            {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map(num => (
                                <Select.Option key={num} value={num}>
                                    {num} мин.
                                </Select.Option>
                            ))}
                        </Select>

                        <Button
                            type="primary"
                            onClick={handleRegistrationRequest}
                        >
                            Зарегистрировать
                        </Button>
                    </div>
                ) : null}
            </Modal>

            <Modal
                title="Поиск заявок"
                open={isSearchModalVisible}
                onCancel={() => setIsSearchModalVisible(false)}
                footer={null}
            >
                <p>Введите один или несколько параметров поиска</p>
                <Form form={searchForm} onFinish={handleSearchApplication} layout="vertical">
                    <Form.Item name="id" label="Уникальный идентификационный номер заявки">
                        <Input placeholder="Введите ID заявки"/>
                    </Form.Item>
                    <Form.Item name="startDate" label="Дата начала периода поиска">
                        <DatePicker format={dateFormat}/>
                    </Form.Item>
                    <Form.Item name="endDate" label="Дата завершения периода поиска">
                        <DatePicker format={dateFormat}/>
                    </Form.Item>
                    <Form.Item name="time" label="Время">
                        <TimePicker showSecond={false}/>
                    </Form.Item>
                    <Form.Item name="station1" label="Станция отправления">
                        <AutoComplete
                            onSearch={handleSearchStation}
                            options={optionsSearchStation}
                            placeholder="Введите станцию отправления"
                        />
                    </Form.Item>
                    <Form.Item name="station2" label="Станция назначения">
                        <AutoComplete
                            onSearch={handleSearchStation}
                            options={optionsSearchStation}
                            placeholder="Введите станцию назначения"
                        />
                    </Form.Item>
                    <Form.Item name="category" label="Категория заявки">
                        <Select placeholder="Выберите категорию пассажира">
                            {['ИЗТ', 'ИЗ', 'ИС', 'ИК', 'ИО', 'ДИ', 'ПЛ', 'РД', 'РДК', 'ОГД', 'ОВ', 'ИУ'].map(category => (
                                <Select.Option key={category} value={category}>
                                    {category}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="passenger" label="ФИО пассажира">
                        <AutoComplete
                            onSearch={handleSearchPassenger}
                            options={optionSearchPassenger}
                            placeholder="Введите ФИО пассажира"
                        />
                    </Form.Item>
                    <Form.Item name="status" label="Статус заявки">
                        <Select placeholder="Выберите статус заявки">
                            <Select.Option value="accept">Принята</Select.Option>
                            <Select.Option value="on_the_way">Инспектор выехал</Select.Option>
                            <Select.Option value="lateEmployee">Инспектор опаздывает</Select.Option>
                            <Select.Option value="latePassenger">Пассажир опаздывает</Select.Option>
                            <Select.Option value="start">В процессе</Select.Option>
                            <Select.Option value="finish">Завершена</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="uchastok" label="Участок инспектора">
                        <Select placeholder="Выберите участок инспектор">
                            {SPOT_LIST.map(spot => (
                                <Select.Option key={spot} value={spot}>
                                    ЦУ-{spot}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="employee" label="ФИО инспектора">
                        <AutoComplete
                            onSearch={handleSearchEmployee}
                            options={optionSearchEmployee}
                            placeholder="Введите ФИО инспектора"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Искать
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title={`${alternativeApplicationTimesList.length ? 'Альтернативное время заявок' : 'Невозможно зарегистрировать заявку на указанную дату'}`}
                open={alternativeApplicationTimesIsVisible}
                onCancel={()=>setAlternativeApplicationTimesIsVisible(false)}
                footer={[
                    <Button key="close" onClick={()=>setAlternativeApplicationTimesIsVisible(false)}>
                        Закрыть
                    </Button>
                ]}
            >
                {alternativeApplicationTimesList.length ? (
                    <List
                        size="small"
                        bordered
                        dataSource={alternativeApplicationTimesList}
                        renderItem={item => (
                            <List.Item>
                                ID задачи: {item}
                            </List.Item>
                        )}
                    />
                ) : (
                    <Empty/>
                )}

            </Modal>

            {isSearching ? (
                <div className="search-results">
                    <h2>Результаты поиска</h2>
                    {/*<Button onClick={() => setIsSearching(false)}>Назад</Button>*/}
                    <ApplicationCard
                        application={searchApplicationResults}
                        passengerList={passengerList}
                    />
                </div>
            ) : (
                <div className="operatorPage-content">
                    {warningAoolicationIsVisible ? (
                        <>
                        <h2>Заявки, время начала которых истекло</h2>
                        <WarningApplicationCard potentialProblemsList={potentialProblemsList} passengerList={passengerList} />
                        </>
                    ) : (
                        <Tabs className="tabs-panel" defaultActiveKey="1">
                            <TabPane
                                tab={
                                    <span>
                                    Активные заявки
                                    <span onClick={(event) => handleBadgeClick('active', event)}>
                                        <Badge
                                            count={
                                                listOfBids.filter(time=> time.bid.status !== 'Заявка закончена' && handleTimeComparison(time.bid.time, currentTime)).length
                                            }
                                        />
                                    </span>
                                </span>
                                }
                                key="1"
                            >
                                <ApplicationTabs
                                    timeSlots={timeSlots}
                                    data={listOfBids.filter(wait => wait.bid.status !== 'Заявка закончена')}
                                    passengerList={passengerList}
                                    listOfEmployees={listOfEmployees}
                                />
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                    Принятые заявки
                                    <span onClick={(event) => handleBadgeClick('Принята', event)}>
                                        <Badge count={
                                            listOfBids.filter(time=> time.bid.status === 'Принята' && handleTimeComparison(time.bid.time, currentTime)).length
                                        }
                                        />
                                    </span>
                                </span>
                                }
                                key="2">
                                <ApplicationTabs
                                    timeSlots={timeSlots}
                                    data={listOfBids.filter(wait => wait.bid.status === 'Принята')}
                                    passengerList={passengerList}
                                    listOfEmployees={listOfEmployees}
                                />
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                    Инспектор выехал
                                    <span onClick={(event) => handleBadgeClick('Инспектор выехал', event)}>
                                        <Badge count={
                                            listOfBids.filter(time=> time.bid.status === 'Инспектор выехал' && handleTimeComparison(time.bid.time, currentTime)).length
                                        }
                                        />
                                    </span>
                                </span>
                                }
                                key="3"
                            >
                                <ApplicationTabs
                                    timeSlots={timeSlots}
                                    data={listOfBids.filter(wait => wait.bid.status === 'Инспектор выехал')}
                                    passengerList={passengerList}
                                    listOfEmployees={listOfEmployees}

                                />
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                    Инспектор опаздывает
                                    <span onClick={(event) => handleBadgeClick('Инспектор опаздывает', event)}>
                                        <Badge count={
                                            listOfBids.filter(time=> time.bid.status === 'Инспектор опаздывает' && handleTimeComparison(time.bid.time, currentTime)).length
                                        }
                                        />
                                    </span>
                                </span>
                                }
                                key="4"
                            >
                                <ApplicationTabs timeSlots={timeSlots}
                                                 data={listOfBids.filter(wait => wait.bid.status === 'Инспектор опаздывает')}
                                                 passengerList={passengerList}
                                                 listOfEmployees={listOfEmployees}

                                />
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                    Инспектор на месте
                                    <span onClick={(event) => handleBadgeClick('Инспектор на месте', event)}>
                                            <Badge count={
                                                listOfBids.filter(time=> time.bid.status === 'Инспектор на месте' && handleTimeComparison(time.bid.time, currentTime)).length
                                            }
                                            />
                                    </span>
                                </span>
                                }
                                key="5"
                            >
                                <ApplicationTabs timeSlots={timeSlots}
                                                 data={listOfBids.filter(wait => wait.bid.status === 'Инспектор на месте')}
                                                 passengerList={passengerList}
                                                 listOfEmployees={listOfEmployees}

                                />
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                    Пассажир опаздывает
                                    <span onClick={(event) => handleBadgeClick('Пассажир опаздывает', event)}>
                                        <Badge count={
                                            listOfBids.filter(time=> time.bid.status === 'Пассажир опаздывает' && handleTimeComparison(time.bid.time, currentTime)).length
                                        }
                                        />
                                    </span>
                                </span>
                                }
                                key="6"
                            >
                                <ApplicationTabs timeSlots={timeSlots}
                                                 data={listOfBids.filter(wait => wait.bid.status === 'Пассажир опаздывает')}
                                                 passengerList={passengerList}
                                                 listOfEmployees={listOfEmployees}

                                />
                            </TabPane>
                            <TabPane
                                tab="В процессе"
                                key="7">
                                <ApplicationTabs timeSlots={timeSlots}
                                                 data={listOfBids.filter(wait => wait.bid.status === 'Поездка')}
                                                 passengerList={passengerList}
                                                 listOfEmployees={listOfEmployees}

                                />
                            </TabPane>
                            <TabPane tab="Завершенные заявки" key="8">
                                <ApplicationTabs timeSlots={timeSlots}
                                                 data={listOfBids.filter(wait => wait.bid.status === 'Заявка закончена')}
                                                 passengerList={passengerList}
                                                 listOfEmployees={listOfEmployees}

                                />
                            </TabPane>
                        </Tabs>
                    )}

                </div>
            )}


        </OperatorPageWrapper>
    );
};

export default OperatorPage;
