import React, {useState} from "react";
import {Button, Card, Form, Input, Modal, Select} from "antd";
import {LIST_OF_POSITION, SPOT_LIST, IEmployeeList, IEditEmployee, WEEKDAYS, SelectedDayValueKey} from "../../../utils/constants";

import {EditEmployeeDialogWrapper, EditEmployeeForm} from "./styled";
import {IListOfEmployees} from "../../../services/FileBrowserService";

interface IEditEmployeeDialogProps {
    editEmployeeModalValue: IListOfEmployees | null;
    isEditEmployeeModalVisible: boolean;
    setIsEditEmployeeModalVisible: React.Dispatch<React.SetStateAction<boolean>>
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

interface WorkTimeState {
    [key: string]: string;
}

const TIME_WORK: string[] = ['7:00 - 19:00', '8:00 - 20:00', '10:00 - 22:00', '20:00 - 8:00'];

const initialSelectedDayState: ISelectedDayState = {
    Пн: false,
    Вт: false,
    Ср: false,
    Чт: false,
    Пт: false,
    Сб: false,
    Вс: false
}


export const EditEmployeeDialog = (
    {
        editEmployeeModalValue,
        isEditEmployeeModalVisible,
        setIsEditEmployeeModalVisible
    }: IEditEmployeeDialogProps
) => {
    const[selectedDay, setSelectedDay] = useState<ISelectedDayState>(initialSelectedDayState);
    const [workTime, setWorkTime] = useState<WorkTimeState>({});
    const [editEmployeeForm] = Form.useForm<IEditEmployee>();

    const handleEditEmployee = (values: any) => {
        console.log(values)
        setIsEditEmployeeModalVisible(false);
        setSelectedDay(initialSelectedDayState);
    }
    const handleChooseWorkDay = (day: SelectedDayValueKey) => {
        setSelectedDay(prevState => ({
            ...prevState,
            [day]: !prevState[day],
        }));
    }
    const handleWorkTimeChange = (day: SelectedDayValueKey, value: string) => {
        setWorkTime(prevState => ({
            ...prevState,
            [day]: value,
        }));
    };
    return (
        <EditEmployeeDialogWrapper>
            <Modal
                title="Редактирование информации о сотруднике"
                open={isEditEmployeeModalVisible}
                onCancel={() => {
                    setIsEditEmployeeModalVisible(false);
                    editEmployeeForm.resetFields();
                    setSelectedDay(initialSelectedDayState);
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
                    {WEEKDAYS.map((day) => (
                        <div key={day} className="workDate-wrapper">
                            <Card
                                className={selectedDay[day] ? 'card-day working-day' : 'card-day'}
                                onClick={() => handleChooseWorkDay(day)}
                            >
                                <div className="day-name">{day}</div>
                            </Card>
                            <div className={`${selectedDay[day] ? 'shiftScheduleWrapper__block' : 'shiftScheduleWrapper'}`}>
                                <Form.Item
                                    name={`workTime-${day}`}
                                    label="График смен"
                                    rules={[{
                                        required: selectedDay[day],
                                        message: 'Пожалуйста, выберите рабочее время'
                                    }]}
                                    style={{ flex: 1 }}
                                >
                                    <Select
                                        value={workTime[day] || undefined}
                                        onChange={(value) => handleWorkTimeChange(day, value)}
                                        className="time-picker"
                                    >
                                        {TIME_WORK.map((time) => (
                                            <Select.Option key={time} value={time}>
                                                {time}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    ))}

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