import React, {useState, useEffect} from "react";
import {Button, Card, Form, TimePicker, Modal, Select, message} from "antd";
import {IDaysOfWeek, daysOfWeek, SelectedDayValueKey} from "../../../utils/constants";

import {EditEmployeeDialogWrapper, EditEmployeeForm} from "./styled";
import {IEditWorkSchedule, changeEmployeeSchedule} from "../../../services/FileBrowserService";
import dayjs, { Dayjs } from "dayjs";


interface IEditEmployeeDialogProps {
    editWorkSchedule: IEditWorkSchedule | null;
    isEditEmployeeWorkScheduleVisible: boolean;
    setIsEditEmployeeWorkScheduleVisible: React.Dispatch<React.SetStateAction<boolean>>;
    getWorkSchedule: () => void;
    setListOfUnallocatedTasksIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIdOfUnallocatedTasks: React.Dispatch<React.SetStateAction<number[]>>;
}

interface ISelectedDayState {
    [key: string]: boolean;
}

interface WorkTimeState {
    [key: string]: {
        work: { start: string, end: string },
        dinner: { start: string, end: string }
    };
}

const TIME_WORK: string[] = ['07:00 - 19:00', '08:00 - 20:00', '10:00 - 22:00', '20:00 - 08:00'];

const initialSelectedDayState: ISelectedDayState = {
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false
};

export const EditEmployeeWorkSchedule = (
    {
        editWorkSchedule,
        isEditEmployeeWorkScheduleVisible,
        setIsEditEmployeeWorkScheduleVisible,
        getWorkSchedule,
        setListOfUnallocatedTasksIsVisible,
        setIdOfUnallocatedTasks
    }: IEditEmployeeDialogProps
) => {
    if(editWorkSchedule) {
        for(const key in initialSelectedDayState) {
            initialSelectedDayState[key] = Object.keys(editWorkSchedule?.workSchedule.weekIntervals).includes(key)
        }
    }


    const[selectedDay, setSelectedDay] = useState<ISelectedDayState>(initialSelectedDayState);
    const [workDate, setWorkDate] = useState<string[]>([]);
    const [workTime, setWorkTime] = useState<WorkTimeState>({});


   const handleChangeSchedule = (date: any) => {
        changeEmployeeSchedule(date)
            .then((res) => {
                if(res.bidsId?.length > 0){
                    setListOfUnallocatedTasksIsVisible(true);
                    setIdOfUnallocatedTasks(res.bidsId)
                } else {
                    message.success('Заявки успешно перераспределены.');
                    getWorkSchedule()
                }

            })
    }


    const [editEmployeeForm] = Form.useForm<WorkTimeState>();

    useEffect(() => {
        if (editWorkSchedule) {
            // @ts-ignore
            editEmployeeForm.setFieldsValue(editWorkSchedule);
        }
    }, [editWorkSchedule]);

    const handleEditEmployee = (values: any) => {
        const mergedObj = Object.keys(workTime).reduce((acc: {}, key: string) => {
            // @ts-ignore
            acc[key] = {
                dinner: {
                    start: workTime[key].dinner.start,
                    end: workTime[key].dinner.end
                },
                work: {
                    start: values[key].split(' - ')[0],
                    end: values[key].split(' - ')[1]
                }
            };
            return acc;
        }, {});
        handleChangeSchedule({
            weekIntervals: {
                ...mergedObj,
            },
            employeeId: editWorkSchedule?.id
        })
        setIsEditEmployeeWorkScheduleVisible(false);
        setSelectedDay(initialSelectedDayState);
        setWorkTime({})
    }

    const handleWorkTimeChange = (day: SelectedDayValueKey, value: Dayjs | null, type: 'work' | 'dinner', timeType: 'start' | 'end') => {
        setWorkTime(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [type]: {
                    ...prevState[day]?.[type],
                    [timeType]: value ? value.format('HH:mm') : ''
                }
            }
        }));
    };

    const handleChooseWorkDay = (value: string) => {
        setSelectedDay((prevSelectedDay) => ({
            ...prevSelectedDay,
            [value]: !prevSelectedDay[value]
        }));
    }


    return (
        <EditEmployeeDialogWrapper>
            <Modal
                title="Редактирование информации о сотруднике"
                open={isEditEmployeeWorkScheduleVisible}
                onCancel={() => {
                    setIsEditEmployeeWorkScheduleVisible(false);
                    editEmployeeForm.resetFields();
                    setSelectedDay(initialSelectedDayState);
                }}
                footer={null}
            >
                <EditEmployeeForm
                    form={editEmployeeForm}
                    onFinish={handleEditEmployee}
                    layout="vertical"
                >
                    {daysOfWeek.map((day) => {
                        const initialDateWork = editWorkSchedule?.workSchedule.weekIntervals[day.key];
                        const initialDate = initialDateWork?.work.start.split(':').slice(0,2).join(':') || '';
                        return (

                            <div key={day.key} className="workDate-wrapper">
                                <Card
                                    className={selectedDay[day.key] ? 'card-day working-day' : 'card-day'}
                                    onClick={() => handleChooseWorkDay(day.key)}
                                >
                                    <div className="day-name">{day.name}</div>
                                </Card>
                                <div
                                    className={`${selectedDay[day.key] ? 'shiftScheduleWrapper__block' : 'shiftScheduleWrapper'}`}>
                                    <div className="shiftScheduleContent">
                                        <Form.Item
                                            name={`${day.key}`}
                                            label="График смен"
                                            rules={[{
                                                required: selectedDay[day.key],
                                                message: 'Пожалуйста, выберите рабочее время'
                                            }]}
                                            style={{flex: 1, marginRight: 10}}
                                            initialValue={TIME_WORK.find(item => item.split(" - ")[0] === initialDate)}
                                        >
                                            <Select
                                                value={workDate[day.key]}
                                                // onChange={(value) => handleWorkDateChange(day, value)}
                                                className="time-picker"
                                            >
                                                {TIME_WORK.map((time) => (
                                                    <Select.Option key={time} value={time}>
                                                        {time}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item>
                                            <div>Обед:
                                                <TimePicker
                                                    value={workTime[day.key]?.dinner?.start ? dayjs(workTime[day.key].dinner.start, 'HH:mm') : null}
                                                    onChange={(value) => handleWorkTimeChange(day.key as SelectedDayValueKey, value, 'dinner', 'start')}
                                                    format='HH:mm'
                                                    minuteStep={10}
                                                /> -
                                                <TimePicker
                                                    value={workTime[day.key]?.dinner?.end ? dayjs(workTime[day.key].dinner.end, 'HH:mm') : null}
                                                    onChange={(value) => handleWorkTimeChange(day.key as SelectedDayValueKey, value, 'dinner', 'end')}
                                                    format='HH:mm'
                                                    minuteStep={10}  // Добавьте это свойство
                                                />
                                            </div>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
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

