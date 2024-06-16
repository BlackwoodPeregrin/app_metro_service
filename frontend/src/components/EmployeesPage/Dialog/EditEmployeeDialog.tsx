import React, {useEffect} from "react";
import {Button, Form, Input, message, Modal, Select} from "antd";
import {LIST_OF_POSITION, SPOT_LIST, IEditEmployee} from "../../../utils/constants";

import {EditEmployeeDialogWrapper, EditEmployeeForm} from "./styled";
import {IListOfEmployees, changeEmployee} from "../../../services/FileBrowserService";

interface IEditEmployeeDialogProps {
    editEmployeeModalValue: IListOfEmployees | null;
    isEditEmployeeModalVisible: boolean;
    setIsEditEmployeeModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    getListOfEmployees: () => void;
}

interface ISelectedDayState {
    Пн: boolean;
    Вт: boolean;
    Ср: boolean;
    Чт: boolean;
    Пт: boolean;
    Сб: boolean;
    Вс: boolean;
}

export const EditEmployeeDialog = (
    {
        editEmployeeModalValue,
        isEditEmployeeModalVisible,
        setIsEditEmployeeModalVisible,
        getListOfEmployees
    }: IEditEmployeeDialogProps
) => {

    const [editEmployeeForm] = Form.useForm<IEditEmployee>();

    useEffect(() => {
        if (editEmployeeModalValue) {
            editEmployeeForm.setFieldsValue(editEmployeeModalValue);
        }
    }, [editEmployeeModalValue]);

    const handleEditEmployee = (values: any) => {
        console.log(values)
        changeEmployee({
            ...values,
            id: editEmployeeModalValue?.id
        }).then(() => {
            message.success('Данные пассажира успешно обновлены!');
            getListOfEmployees();
        })
            .catch(() => {
                message.error('Ошибка при обновлении данных пассажира.');
            });
        setIsEditEmployeeModalVisible(false);

    }


    return (
        <EditEmployeeDialogWrapper>
            <Modal
                title="Редактирование информации о сотруднике"
                open={isEditEmployeeModalVisible}
                onCancel={() => {
                    setIsEditEmployeeModalVisible(false);
                    editEmployeeForm.resetFields();
                }}
                footer={null}
            >
                <EditEmployeeForm
                    form={editEmployeeForm}
                    onFinish={handleEditEmployee}
                    layout="vertical"
                    initialValues={{
                        surName: editEmployeeModalValue?.surName,
                        firstName: editEmployeeModalValue?.firstName,
                        lastName: editEmployeeModalValue?.lastName,
                        sex: editEmployeeModalValue?.sex,
                        phone: editEmployeeModalValue?.phone,
                        workAria: editEmployeeModalValue?.workAria,
                        role: editEmployeeModalValue?.role,
                    }}
                >
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
                </EditEmployeeForm>
            </Modal>
        </EditEmployeeDialogWrapper>
    )
}