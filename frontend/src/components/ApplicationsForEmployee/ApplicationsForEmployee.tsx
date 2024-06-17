import React, { useState, useEffect } from "react";
import { List, Card, Button, Tabs, message } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import {updateStatus, bidAllEmployee, IBidAllEmployeeList} from "../../services/FileBrowserService";
import {useAuth} from "../../context/authContext";

import { nameStations } from "../../utils/constants";
import { ApplicationsForEmployeeWrapper } from "./styled";

const { TabPane } = Tabs;

export const ApplicationsForEmployee = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [employeeBidList, setEmployeeBidList] = useState<IBidAllEmployeeList[]>([]);
    const [currentApplicationIndex, setCurrentApplicationIndex] = useState(0);
    const [completedApplications, setCompletedApplications] = useState<IBidAllEmployeeList[]>([]);
    const { user, logout } = useAuth();
    const id = user.id;

    const getEmployeeBidList = (idEmployee: number) => {
        bidAllEmployee(idEmployee)
            .then((res) => {
                setEmployeeBidList(res.bids);
            })
            .catch(() => {
                message.error('Ошибка при получении списка заявок.')
            })
    }

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Очищаем таймер при размонтировании компонента
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        if(id !== null){
            getEmployeeBidList(+id);

        }

    }, []);


    const myApplications = employeeBidList?.sort((a, b) => {
            const [hoursA, minutesA, secondsA] = a.time.split(':').map(Number);
            const [hoursB, minutesB, secondsB] = b.time.split(':').map(Number);
    
            if (hoursA !== hoursB) {
                return hoursA - hoursB;
            } else if (minutesA !== minutesB) {
                return minutesA - minutesB;
            } else {
                return secondsA - secondsB;
            }
        })
    const currentApplication = myApplications?.[currentApplicationIndex];
    const remainingApplications = myApplications?.slice(currentApplicationIndex + 1);
        

    const handleCallDispatcher = () => {
        window.location.href = `tel:${+7999999999}`;
    };

    const findStationName = (id: number) => nameStations.find((station) => +station.id === id)?.name_station;

    const updateStatusBid = (idCurrenBid: number, status: string) => {
        updateStatus(status, idCurrenBid)
            .then(() => {
                if(id !== null) {
                    getEmployeeBidList(+id);
                }
            })

    }

    const handleUpdateStatus = async (newStatus: string, idBid: number) => {
        switch (newStatus) {
            case 'Новая':
                updateStatusBid(idBid,'accept');
                break;
            case 'Инспектор выехал':
                updateStatusBid(idBid, 'on_the_way');
                break;
            case 'Инспектор опаздывает':
                updateStatusBid(idBid,'late/employee');
                break;
            case 'Инспектор на месте':
                updateStatusBid(idBid,'wait_passenger');
                break;
            case 'Начать поездку':
                updateStatusBid(idBid,'start');
                break;
            case 'Пассажир опаздывает':
                updateStatusBid(idBid,'late/passenger');
                break;
            case 'Завершить заявку':
                updateStatusBid(idBid,'finish');
                break;
            default:
                break;
        }

        if (currentApplication?.status === 'Заявка закончена') {
            setCompletedApplications([...completedApplications, currentApplication]);
            setCurrentApplicationIndex(currentApplicationIndex + 1);
        }

    };

    return (
        <ApplicationsForEmployeeWrapper>
            <header className="app-header">
                <div>{currentTime.toLocaleTimeString()}</div>
                <div className="button-call">
                    <div>Диспетчер</div>
                    <Button type="primary" className="dispatcher-call" onClick={handleCallDispatcher} icon={<PhoneOutlined />} />
                    <Button type="primary" style={{backgroundColor: "coral", marginLeft: 20}} onClick={() => logout()}>
                        Выйти
                    </Button>
                </div>
            </header>
            <Tabs className="tabs-panel" defaultActiveKey="1">
                <TabPane tab="Активные заявки" key="1">
                    <div>
                        {currentApplication && (
                            <Card
                                title={`Текущая заявка №${currentApplicationIndex + 1}`}
                                bordered={false}
                                style={{ marginBottom: 20 }}
                            >
                                <p>Дата и время начала заявки: {currentApplication.time}</p>
                                <p>Маршрут от станции: {findStationName(currentApplication.stID1)}</p>
                                <p>До станции: {findStationName(currentApplication.stID2)}</p>
                                <p>Статус заявки: {currentApplication.status}</p>

                                {currentApplication.status === 'Принята' || currentApplication.status === 'Инспектор на месте' ? (
                                    <>
                                        <Button type="primary" style={{ margin: '0 10px' }} onClick={() => handleUpdateStatus(currentApplication.status === 'Принята' ? 'Инспектор на месте' : 'Начать поездку', currentApplication.id)}>
                                            {currentApplication.status === 'Принята' ? 'Инспектор на месте' : 'Начать поездку'}
                                        </Button>
                                        <Button type="primary" style={{ margin: '0 10px' }} onClick={() => handleUpdateStatus(currentApplication.status, currentApplication.id)}>
                                            {currentApplication.status === 'Инспектор на месте' ? 'Пассажир опаздывает' : 'Инспектор опаздывает'}
                                            {/*'Пассажир опаздывает'*/}
                                        </Button>
                                    </>
                                ) : (
                                    <Button type="primary" style={{ margin: '0 10px' }} onClick={() => handleUpdateStatus('Завершить заявку', currentApplication.id)}>
                                        {currentApplication.status === 'Новая' ? 'Принять' : 'Завершить заявку'}
                                    </Button>
                                )}

                            </Card>
                        )}

                        <List
                            itemLayout="vertical"
                            dataSource={remainingApplications}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={`Заявка № ${currentApplicationIndex + 2 + index}`}
                                        description={`Дата и время начала заявки: ${item.time}`}
                                    />
                                    <div>Маршрут от станции: {findStationName(item.stID1)}</div>
                                    <div>До станции: {findStationName(item.stID2)}</div>

                                </List.Item>
                            )}
                        />
                    </div>
                </TabPane>
                <TabPane tab="Завершенные заявки" key="2">
                    <List
                        itemLayout="vertical"
                        dataSource={completedApplications}
                        renderItem={(item, index) => (
                            <List.Item className="application">
                                <List.Item.Meta
                                    title={`Заявка № ${index + 1}`}
                                    description={`Дата и время начала заявки: ${item.time}`}
                                />
                                <div>Маршрут от станции: {findStationName(item.stID1)}</div>
                                <div>До станции: {findStationName(item.stID2)}</div>
                            </List.Item>
                        )}
                    />
                </TabPane>
            </Tabs>
        </ApplicationsForEmployeeWrapper>
    );
};
