import React, {useEffect} from "react";
import {Button, Form, Input, message, Modal, Select} from "antd";
import {changePassenger} from "../../../services/FileBrowserService";


import {PassengerPageDialogWrapper, EditPassengerForm} from "./styled";
import {IListOfPassengers} from "../../../services/FileBrowserService";

interface IEditPassengerDialogProps {
    editPassengerModalValue: IListOfPassengers | null;
    isEditPassengerModalVisible: boolean;
    setIsEditPassengerModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setEditPassengerModalValue:  React.Dispatch<React.SetStateAction<IListOfPassengers | null>>;
    getListOfPassengers: () => void;
}




export const PassengerPageDialog = (
    {
        editPassengerModalValue,
        isEditPassengerModalVisible,
        setIsEditPassengerModalVisible,
        setEditPassengerModalValue,
        getListOfPassengers
    }: IEditPassengerDialogProps
) => {

    const [editPassengerForm] = Form.useForm<IListOfPassengers>();

    const handleChangePassenger = (values: IListOfPassengers) => {
        changePassenger(values)
            .then(() => {
                message.success('Данные пассажира успешно обновлены!');
                getListOfPassengers()
            })
            .catch(() => {
                message.error('Ошибка при обновлении данных пассажира.');
            });
    }

    useEffect(() => {
        if (editPassengerModalValue) {
            editPassengerForm.setFieldsValue(editPassengerModalValue);
        }
    }, [editPassengerModalValue]);

    const handleEditEmployee = (values: any) => {
        setIsEditPassengerModalVisible(false);
        setEditPassengerModalValue(null);
        handleChangePassenger({ id: editPassengerModalValue?.id,
            ...values
        })
    }

    return (
        <PassengerPageDialogWrapper>
            <Modal
                title="Редактирование информации о пассажире"
                open={isEditPassengerModalVisible}
                onCancel={() => {
                    setIsEditPassengerModalVisible(false);
                    setEditPassengerModalValue(null);
                    editPassengerForm.resetFields();

                }}
                footer={null}
            >
                <EditPassengerForm
                    form={editPassengerForm}
                    onFinish={handleEditEmployee}
                    layout="vertical"
                    initialValues={{
                        surName: editPassengerModalValue?.surName,
                        firstName: editPassengerModalValue?.firstName,
                        lastName: editPassengerModalValue?.lastName,
                        phone: editPassengerModalValue?.phone,
                        category: editPassengerModalValue?.category,
                    }}
                >
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
                               rules={[{required: true, message: 'Пожалуйста, введите категорию пассажира'}]}>
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
                </EditPassengerForm>
            </Modal>
        </PassengerPageDialogWrapper>
    )
}