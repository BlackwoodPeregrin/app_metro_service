import React, {useEffect, useState} from 'react';
import { employeeList, IEmployeeList } from "../../utils/constants";
import {Card, Row, Col, Button, Form, Modal, Input, Select, Pagination, message} from 'antd';
import { parse, format } from 'date-fns';
import { ru } from 'date-fns/locale';
import RedCross from "../../icons/RedCross";
import {SPOT_LIST, LIST_OF_POSITION, IAddEmployee, WEEKDAYS, PAGE_SIZE} from "../../utils/constants";

import {HomePageWrapper} from './styled'
import {PlusOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {EditEmployeeDialog} from "./Dialog/EditEmployeeDialog";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import {
    addNewEmployee,
    IEmployeeWorkSchedule,
    IListOfEmployees,
    requestListOfEmployee
} from "../../services/FileBrowserService";

const AddEmployeeForm = styled(Form)`
    margin-bottom: 20px;
`;

interface ICreateNewEmployee {
    lastName: string,
    firstName: string,
    surName: string,
    role: string,
    workAria: string,
    sex: string,
    phone: string
}


export const EmployeesPage: React.FC = () => {
    const [listOfEmployees, setListOfEmployees] = useState<IListOfEmployees[]>([]);
    const[isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] = useState<boolean>(false);
    const[isEditEmployeeModalVisible, setIsEditEmployeeModalVisible] = useState<boolean>(false);
    const[editEmployeeModalValue, setEditEmployeeModalValue] = useState<IListOfEmployees | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [employeeWorkSchedule, setEmployeeWorkSchedule] = useState<IEmployeeWorkSchedule[]>([]);

    const [addEmployeeForm] = Form.useForm<IAddEmployee>();

    const getListOfEmployees = () => {
        requestListOfEmployee()
            .then(response => {
                setListOfEmployees(response.employee);
            })
            .catch(() => {
                message.error('Ошибка при получении списка работников.');
            })
    }

    useEffect(() => {
        getListOfEmployees()
    }, [])


    const handleAddNewEmployee = (values: any) => {
        console.log(values);
        addNewEmployee({
            ...values,
            sex: values.sex === 'Мужчина' ? "Male" : "Female"
        })
        setIsAddEmployeeModalVisible(false);
    }
    const getAbbreviatedDayOfWeek = (fullDayOfWeek: string) => {
        switch (fullDayOfWeek) {
            case 'понедельник':
                return 'Пн';
            case 'вторник':
                return 'Вт';
            case 'среда':
                return 'Ср';
            case 'четверг':
                return 'Чт';
            case 'пятница':
                return 'Пт';
            case 'суббота':
                return 'Сб';
            case 'воскресенье':
                return 'Вс';
            default:
                return '';
        }
    }
    const handleEdit = (employee: IListOfEmployees ) => {
        // console.log(employee.FIO);
        setEditEmployeeModalValue(employee);
        setIsEditEmployeeModalVisible(true);
    }
    const handleChooseDay = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log(event.target);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Сброс на первую страницу при поиске
    }

    const filteredEmployees = listOfEmployees.filter(employee =>
        employee.surName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <HomePageWrapper>
            <div className="header">
                <SidebarMenu />
                <div>Регистрация рабочего дня сотрудника</div>
                <Button type="primary" icon={<PlusOutlined/>} onClick={() => setIsAddEmployeeModalVisible(true)}>
                    Зарегистрировать нового сотрудника
                </Button>
            </div>
            <Input
                placeholder="Поиск по фамилии"
                value={searchTerm}
                onChange={handleSearch}
                style={{ margin: '20px 0' }}
            />
            <Modal
                title="Новый сотрудник"
                open={isAddEmployeeModalVisible}
                onCancel={() => {
                    setIsAddEmployeeModalVisible(false);
                    addEmployeeForm.resetFields();
                }}
                footer={null}
            >
                <AddEmployeeForm form={addEmployeeForm} onFinish={handleAddNewEmployee} layout="vertical">
                    <Form.Item name="surName" label="Фамилия"
                               rules={[{required: true, message: 'Пожалуйста, введите фамилию сотрудника'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="firstName" label="Имя"
                               rules={[{required: true, message: 'Пожалуйста, введите имя сотрудника'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="lastName" label="Отчество"
                               rules={[{required: true, message: 'Пожалуйста, введите отчество сотрудника'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="sex" label="Пол"
                               rules={[{required: true, message: 'Пожалуйста, введите пол сотрудника'}]}>
                        <Select>
                            {["Мужчина", "Женщина"].map(sex => (
                                <Select.Option key={sex} value={sex}>
                                    {sex}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="phone" label="Телефон"
                               rules={[{required: true, message: 'Пожалуйста, введите телефон сотрудника'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="workAria" label="Участок"
                               rules={[{required: true, message: 'Пожалуйста, введите участок сотрудника'}]}>
                        <Select>
                            {SPOT_LIST.map(spot => (
                                <Select.Option key={spot} value={spot}>
                                    ЦУ-{spot}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {/*<Form.Item name="smena" label="Смена"*/}
                    {/*           rules={[{required: false, message: 'Пожалуйста, введите смену сотрудника'}]}>*/}
                    {/*    <Input/>*/}
                    {/*</Form.Item>*/}
                    <Form.Item name="role" label="Должность"
                               rules={[{required: true, message: 'Пожалуйста, введите должность сотрудника'}]}>
                        <Select>
                            {LIST_OF_POSITION.map(position => (
                                <Select.Option key={position} value={position}>
                                    {position}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Зарегистрировать
                        </Button>
                    </Form.Item>
                </AddEmployeeForm>
            </Modal>
            <EditEmployeeDialog
                editEmployeeModalValue={editEmployeeModalValue}
                isEditEmployeeModalVisible={isEditEmployeeModalVisible}
                setIsEditEmployeeModalVisible={setIsEditEmployeeModalVisible}
            />
            <Row gutter={[16, 16]}>
                {paginatedEmployees.sort((a, b) => a.surName.localeCompare(b.surName, 'ru', { sensitivity: 'base' })).map(employee => {
                    // const parsedDate = parse(item., 'dd.MM.yyyy', new Date());
                    // const dayOfWeek = format(parsedDate, 'EEEE', { locale: ru as any });
                    return (
                        <Col key={`${employee.id}}`} span={8}>
                            <Card
                                title={`${employee.surName} ${employee.firstName} ${employee.lastName}`}
                                extra={
                                    <div className="management-btn">
                                        <RedCross width={30} height={30} />
                                        <Button
                                            className="btn-edit"
                                            onClick={() => handleEdit(employee)}
                                        >
                                            Редактировать
                                        </Button>
                                    </div>}
                                style={{height: '100%'}}>
                                <div>Номер участка сотрудника: {employee.workAria}</div>
                                <div>Должность: {employee.role}</div>
                                <div>Рабочий график сотрудника:</div>
                                <div className="dayOfWeek" onClick={(e) =>handleChooseDay(e)}>
                                    {WEEKDAYS.map(day => {
                                        return (
                                            <Card
                                                key={`${employee.id}`}
                                                // className={
                                                //     `${getAbbreviatedDayOfWeek(dayOfWeek.toLowerCase()) === day ? 'card-day working-day' : 'card-day'}`
                                                // }
                                            >
                                                <div className="day-name">{day}</div>
                                                {/*<div>{employee.}</div>*/}
                                            </Card>
                                        )
                                    })}
                                </div>

                            </Card>
                        </Col>
                    )})}
            </Row>
            <Pagination
                current={currentPage}
                total={filteredEmployees.length}
                pageSize={PAGE_SIZE}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                style={{ marginTop: '20px', textAlign: 'center' }}
            />
        </HomePageWrapper>
    );
};


