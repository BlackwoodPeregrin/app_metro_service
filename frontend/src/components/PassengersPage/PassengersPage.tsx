import React, { useState, useEffect } from 'react';

import {Card, Row, Col, Button, Form, Modal, Input, Select, message, Pagination} from 'antd';
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons';

import {PassengersPageWrapper} from './styled'
import {PlusOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {PassengerPageDialog} from "./PassengersPageDialog/PassengersPageDialog"
import {addNewPassenger, requestListOfPassengers, deletePassenger, IListOfPassengers, IPassenger} from "../../services/FileBrowserService";
import {PAGE_SIZE} from "../../utils/constants";
import SidebarMenu from "../SidebarMenu/SidebarMenu";

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #1890ff;
    color: white;
    font-size: 18px;
`;

const NewPassengerForm = styled(Form)`
    margin-bottom: 20px;
`;

export const PassengersPage: React.FC = () => {
    const [listOfPassengers, setListOfPassengers] = useState<IListOfPassengers[]>([]);
    const [isNewPassengerModalVisible, setIsNewPassengerModalVisible] = useState<boolean>(false);
    const[isEditPassengerModalVisible, setIsEditPassengerModalVisible] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const[editPassengerModalValue, setEditPassengerModalValue] = useState<IListOfPassengers | null>(null);

    const getListOfPassengers = () => {
        requestListOfPassengers()
            .then(response => {
                setListOfPassengers(response.passengers)
            })
            .catch(error => {
                message.error('Ошибка при получении списка пассажиров.');
            })
    }

    useEffect(() => {
        getListOfPassengers()
    }, [])

    const [passengerForm] = Form.useForm<IPassenger>();

    const handleAddNewPassenger = async (values: any): Promise<void> => {
        try {
            const response = await addNewPassenger(values);
            if (response.code === 200) {
                message.success(response.message || 'Пассажир успешно добавлен!');
            } else {
                message.error(response.message || 'Ошибка при добавлении пассажира.');
            }

        } catch (error) {
            message.error('Ошибка при отправке запроса.');
        }
        getListOfPassengers();
        setIsNewPassengerModalVisible(false);
        passengerForm.resetFields();
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    }

    const filteredEmployees = listOfPassengers.filter(passenger =>
        passenger.surName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const paginatedPassengers = filteredEmployees.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const handleEditPassenger = (value: IListOfPassengers) => {
        setEditPassengerModalValue(value);
        setIsEditPassengerModalVisible(true);
    }

    const handleDeletePassenger = (id: number) => {
        deletePassenger(id)
            .then(response => {
                message.success('Данные пассажира успешно удалены!');
                getListOfPassengers()
            })
            .catch(() => {
                message.error('Ошибка при удалении данных пассажира.');
            })
    }


    return (
        <PassengersPageWrapper>
            <Header>
                <SidebarMenu />
                <div>Список пассажиров</div>
                <Button type="primary" icon={<PlusOutlined/>} onClick={() => setIsNewPassengerModalVisible(true)}>Новый
                    пассажир
                </Button>
            </Header>
            <Input
                placeholder="Поиск по фамилии"
                value={searchTerm}
                onChange={handleSearch}
                style={{ margin: '20px 0' }}
            />
            <Modal
                title="Новый пассажир"
                open={isNewPassengerModalVisible}
                onCancel={() => {
                    setIsNewPassengerModalVisible(false);
                    passengerForm.resetFields();
                }}
                footer={null}
            >
                <NewPassengerForm form={passengerForm} onFinish={handleAddNewPassenger} layout="vertical">
                    <Form.Item name="surName" label="Фамилия"
                               rules={[{required: true, message: 'Пожалуйста, введите фамилию пассажира'}]}>
                        <Input placeholder="Введите фамилию пассажира" />
                    </Form.Item>
                    <Form.Item name="firstName" label="Имя"
                               rules={[{required: true, message: 'Пожалуйста, введите имя пассажира'}]}>
                        <Input placeholder="Введите имя пассажира" />
                    </Form.Item>
                    <Form.Item name="lastName" label="Отчество"
                               rules={[{required: true, message: 'Пожалуйста, введите отчество пассажира'}]}>
                        <Input placeholder="Введите отчество пассажира"/>
                    </Form.Item>
                    <Form.Item name="phone" label="Телефон"
                               rules={[{required: true, message: 'Пожалуйста, введите телефон пассажира'}]}>
                        <Input placeholder="Введите телефон пассажира" />
                    </Form.Item>
                    <Form.Item name="category" label="Категория пассажира"
                               rules={[{required: true, message: 'Пожалуйста, выберите категорию пассажира'}]}>
                        <Select placeholder="Выберите категорию пассажира">
                            {['ИЗТ', 'ИЗ', 'ИС', 'ИК', 'ИО', 'ДИ', 'ПЛ', 'РД', 'РДК', 'ОГД', 'ОВ', 'ИУ'].map(category => (
                                <Select.Option key={category} value={category}>
                                    {category}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>
                </NewPassengerForm>
            </Modal>
            <PassengerPageDialog
                editPassengerModalValue={editPassengerModalValue}
                isEditPassengerModalVisible={isEditPassengerModalVisible}
                setIsEditPassengerModalVisible={setIsEditPassengerModalVisible}
                setEditPassengerModalValue={setEditPassengerModalValue}
                getListOfPassengers={getListOfPassengers}
            />
            <Row style={{"margin": "12px"}} gutter={[16, 16]}>
                {paginatedPassengers.sort((a, b) => a.surName.localeCompare(b.surName, 'ru', { sensitivity: 'base' })).map(passenger => {

                    return (
                        <Col key={passenger.id} span={8}>
                            <Card
                                title={`${passenger.surName} ${passenger.firstName} ${passenger.lastName}`}
                                extra={
                                    <div className="management-btn">
                                        <EditTwoTone onClick={() => handleEditPassenger(passenger)} />
                                        <DeleteTwoTone onClick={() => handleDeletePassenger(passenger.id)} />
                                    </div>}
                                style={{height: '100%'}}>
                                <div>Телефон: {passenger.phone}</div>
                                <div>Категория: {passenger.category}</div>
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

        </PassengersPageWrapper>
    );
};


