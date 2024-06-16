import React, {useEffect, useState} from 'react';

import {Card, Row, Col, Button, Form, Modal, Input, Select, Pagination, message} from 'antd';

import RedCross from "../../icons/RedCross";
import {SPOT_LIST, LIST_OF_POSITION, IAddEmployee, PAGE_SIZE, daysOfWeek} from "../../utils/constants";
import {EditTwoTone} from '@ant-design/icons';
import {EditEmployeeWorkSchedule} from "./Dialog/EditEmployeeWorkSchedule";
import {UnallocatedTasks} from "./Dialog/UnallocatedTasks";



import {HomePageWrapper} from './styled'
import {PlusOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {EditEmployeeDialog} from "./Dialog/EditEmployeeDialog";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import {
    addNewEmployee,
    IEmployeeWorkSchedule,
    IListOfEmployees,
    requestListOfEmployee,
    workSchedule,
    IEditWorkSchedule,
    employeeSickLeave
} from "../../services/FileBrowserService";

const AddEmployeeForm = styled(Form)`
    margin-bottom: 20px;
`;

export const EmployeesPage: React.FC = () => {
    const [listOfEmployees, setListOfEmployees] = useState<IListOfEmployees[]>([]);
    const[isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] = useState<boolean>(false);
    const[isEditEmployeeModalVisible, setIsEditEmployeeModalVisible] = useState<boolean>(false);
    const[editEmployeeModalValue, setEditEmployeeModalValue] = useState<IListOfEmployees | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [employeeWorkSchedule, setEmployeeWorkSchedule] = useState<IEmployeeWorkSchedule[]>([]);
    const [editWorkSchedule, setEditWorkSchedule] = useState<IEditWorkSchedule | null>(null);
    const [isEditEmployeeWorkScheduleVisible, setIsEditEmployeeWorkScheduleVisible] = useState<boolean>(false);
    const [listOfUnallocatedTasksIsVisible, setListOfUnallocatedTasksIsVisible] = useState(false);
    const [idOfUnallocatedTasks, setIdOfUnallocatedTasks] = useState<number[]>([]);

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

    const getWorkSchedule = () => {
        workSchedule()
            .then(response => {
                console.log(response);
                setEmployeeWorkSchedule(response);
            })
            .catch(() => {
                message.error('Ошибка при получении списка рабочего времени.');
            })
    }

    useEffect(() => {
        getListOfEmployees();
        getWorkSchedule();
    }, [])


    const handleAddNewEmployee = (values: any) => {
        console.log(values);
        addNewEmployee({
            ...values,
            sex: values.sex === 'Мужчина' ? "Male" : "Female"
        })
        setIsAddEmployeeModalVisible(false);
    }

    const handleEdit = (employee: IListOfEmployees ) => {
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

    const handleEditWorkSchedule = (id: number, workShadul: IEmployeeWorkSchedule ) => {
        setEditWorkSchedule({id: id, workSchedule: workShadul});
        setIsEditEmployeeWorkScheduleVisible(true);
        console.log('handleEditWorkSchedule')
    }

    const handleClickCross = (employee: IListOfEmployees) => {
        const sickStatus = !employee.sick ? 'on' : 'off';
        employeeSickLeave(employee.id, sickStatus)
            .then((res) => {
                if(res.bidsId) {
                    if(res.bidsId.length > 0){
                        setListOfUnallocatedTasksIsVisible(true);
                        setIdOfUnallocatedTasks(res.bidsId)
                    } else {
                        message.success('Заявки успешно перераспределены.');
                        // getWorkSchedule()
                    }
                }
                getListOfEmployees();
            })
    }

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
                getListOfEmployees={getListOfEmployees}
            />
            <EditEmployeeWorkSchedule
                editWorkSchedule={editWorkSchedule}
                isEditEmployeeWorkScheduleVisible={isEditEmployeeWorkScheduleVisible}
                setIsEditEmployeeWorkScheduleVisible={setIsEditEmployeeWorkScheduleVisible}
                getWorkSchedule={getWorkSchedule}
                setListOfUnallocatedTasksIsVisible={setListOfUnallocatedTasksIsVisible}
                setIdOfUnallocatedTasks={setIdOfUnallocatedTasks}
            />
            <UnallocatedTasks
                listOfUnallocatedTasksIsVisible={listOfUnallocatedTasksIsVisible}
                setListOfUnallocatedTasksIsVisible={setListOfUnallocatedTasksIsVisible}
                idOfUnallocatedTasks={idOfUnallocatedTasks}
            />
            <Row gutter={[16, 16]}>
                {paginatedEmployees.sort((a, b) => a.surName.localeCompare(b.surName, 'ru', { sensitivity: 'base' })).map(employee => {
                    const employeeSchedule = employeeWorkSchedule.find(item => item.employeeId === employee.id)!;
                    return (
                        <Col key={`${employee.id}}`} span={8}>
                            <Card
                                title={`${employee.surName} ${employee.firstName} ${employee.lastName}`}
                                extra={
                                    <div className="management-btn" style={{ width: '70px', justifyContent: 'space-between' }} >
                                        <RedCross width={30} height={30} onClick={() => handleClickCross(employee)} />
                                        <EditTwoTone style={{fontSize: '25px'}} onClick={() => handleEdit(employee)} />
                                    </div>}
                                style={{height: '100%'}}>
                                <div>Номер участка сотрудника: {employee.workAria}</div>
                                <div>Должность: {employee.role}</div>
                                <div>
                                    <div>Рабочий график сотрудника:</div>
                                    <EditTwoTone style={{fontSize: '20px'}} onClick={() => handleEditWorkSchedule(employee.id, employeeSchedule)} />
                                </div>
                                <div className="dayOfWeek" style={{ flexDirection: 'column'}} onClick={(e) =>handleChooseDay(e)}>
                                    {daysOfWeek.map((day) => {
                                        return (
                                            <Card
                                                key={day.key}
                                                className={`card-day ${employeeSchedule?.weekIntervals[day.key] ? 'working-day' : ''} ${employee.sick ? 'sikOn' : 'sikOff'}`}
                                            >
                                                <div className="day-name">{day.name}</div>
                                                {employeeSchedule?.weekIntervals[day.key] && (
                                                    <div>
                                                        <div>Работа: {employeeSchedule?.weekIntervals[day.key].work.start} - {employeeSchedule?.weekIntervals[day.key].work.end}</div>
                                                        <div>Обед: {employeeSchedule?.weekIntervals[day.key].dinner.start} - {employeeSchedule?.weekIntervals[day.key].dinner.end}</div>
                                                    </div>
                                                )}
                                            </Card>
                                        )
                                    })}
                                </div>

                            </Card>
                        </Col>
                    )})}
            </Row>
            {filteredEmployees.length > 6 ? (
                    <Pagination
                        current={currentPage}
                        total={filteredEmployees.length}
                        pageSize={6}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                        style={{ marginTop: '20px', textAlign: 'center' }}
                    />
                ) : null
            }

        </HomePageWrapper>
    );
};


