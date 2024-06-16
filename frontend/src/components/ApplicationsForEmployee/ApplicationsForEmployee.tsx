// import React, { useState, useEffect } from "react";
// import { List, Card, Button, Modal, Tabs } from 'antd';
// import { PhoneOutlined } from '@ant-design/icons';
//
// import { waitingList, nameStations, IWaitingList } from "../../utils/constants";
// import { ApplicationsForEmployeeWrapper } from "./styled";
//
// const { TabPane } = Tabs;
//
// type ApplicationStatus = 'pending' | 'accepted' | 'on-the-way' | 'on-site' | 'in-progress' | 'finished';
//
// const statusButtonsMap: { [key in ApplicationStatus]: string[] } = {
//     pending: ['Принять'],
//     accepted: ['Инспектор выехал', 'Инспектор опаздывает'],
//     'on-the-way': ['Инспектор на месте'],
//     'on-site': ['Начать поездку', 'Пассажир опаздывает'],
//     'in-progress': ['Завершить заявку'],
//     finished: []
// };
//
// export const ApplicationsForEmployee = () => {
//     const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
//     const [currentTime, setCurrentTime] = useState(new Date());
//
//     useEffect(() => {
//         const timerId = setInterval(() => {
//             setCurrentTime(new Date());
//         }, 1000);
//
//         // Очищаем таймер при размонтировании компонента
//         return () => clearInterval(timerId);
//     }, []);
//
//     const myApplications = waitingList.sort((a, b) => {
//         const [dateA, timeA] = a.datetime.split(' ');
//         const [dateB, timeB] = b.datetime.split(' ');
//
//         const dateAObj: Date = new Date(Date.parse(`1970-01-01T${timeA.padStart(8, '0')}Z`));
//         const dateBObj: Date = new Date(Date.parse(`1970-01-01T${timeB.padStart(8, '0')}Z`));
//
//         return dateAObj.getTime() - dateBObj.getTime();
//     }).slice(0, 10);
//
//     const [currentApplicationIndex, setCurrentApplicationIndex] = useState(0);
//     const [applicationStatuses, setApplicationStatuses] = useState<ApplicationStatus[]>(
//         myApplications.map(() => 'pending')
//     );
//     const [completedApplications, setCompletedApplications] = useState<IWaitingList[]>([]);
//
//     const currentApplication = myApplications[currentApplicationIndex];
//     const remainingApplications = myApplications.slice(currentApplicationIndex + 1);
//
//     const findStationName = (id: string) => nameStations.find((station) => station.id === id)?.name_station;
//
//     const handleUpdateStatus = (newStatus: ApplicationStatus) => {
//         const updatedStatuses = [...applicationStatuses];
//         updatedStatuses[currentApplicationIndex] = newStatus;
//         setApplicationStatuses(updatedStatuses);
//
//         if (newStatus === 'finished') {
//             setCompletedApplications([...completedApplications, currentApplication]);
//             setCurrentApplicationIndex(currentApplicationIndex + 1);
//         }
//     };
//
//     const handleCallDispatcher = () => {
//         window.location.href = `tel:${+7999999999}`;
//     };
//
//     const showModal = () => {
//         setIsModalVisible(true);
//     };
//
//     const handleCloseModal = () => {
//         setIsModalVisible(false);
//     };
//
//     const handleOk = () => {
//         handleUpdateStatus('cancelled' as ApplicationStatus);
//         setIsModalVisible(false);
//     };
//
//     const renderButtons = () => {
//         const currentStatus = applicationStatuses[currentApplicationIndex];
//         const buttons = statusButtonsMap[currentStatus];
//
//         return buttons.map((buttonText) => {
//             let buttonProps: Partial<React.ComponentProps<typeof Button>> = {};
//
//             switch (buttonText) {
//                 case 'Принять':
//                     buttonProps = {
//                         onClick: () => handleUpdateStatus('accepted'),
//                         style: { backgroundColor: '#28a745', borderColor: '#28a745' }
//                     };
//                     break;
//                 case 'Инспектор выехал':
//                     buttonProps = {
//                         onClick: () => handleUpdateStatus('on-the-way'),
//                         style: { backgroundColor: '#ffc107', borderColor: '#ffc107' }
//                     };
//                     break;
//                 case 'Инспектор опаздывает':
//                     buttonProps = {
//                         onClick: showModal,
//                         style: { backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }
//                     };
//                     break;
//                 case 'Инспектор на месте':
//                     buttonProps = {
//                         onClick: () => handleUpdateStatus('on-site'),
//                         style: { backgroundColor: '#17a2b8', borderColor: '#17a2b8' }
//                     };
//                     break;
//                 case 'Начать поездку':
//                     buttonProps = {
//                         onClick: () => handleUpdateStatus('in-progress'),
//                         style: { backgroundColor: '#007bff', borderColor: '#007bff' }
//                     };
//                     break;
//                 case 'Пассажир опаздывает':
//                     buttonProps = {
//                         onClick: showModal,
//                         style: { backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }
//                     };
//                     break;
//                 case 'Завершить заявку':
//                     buttonProps = {
//                         onClick: () => handleUpdateStatus('finished'),
//                         style: { backgroundColor: '#ffd700', borderColor: '#ffd700', color: '#fff' }
//                     };
//                     break;
//                 default:
//                     break;
//             }
//
//             return (
//                 <Button key={buttonText} type="primary" style={{ margin: '0 10px' }} {...buttonProps}>
//                     {buttonText}
//                 </Button>
//             );
//         });
//     };
//
//     return (
//         <ApplicationsForEmployeeWrapper>
//             <header className="app-header">
//                 <div>{currentTime.toLocaleTimeString()}</div>
//                 <div className="button-call">
//                     <div>Диспетчер</div>
//                     <Button type="primary" className="dispatcher-call" onClick={handleCallDispatcher} icon={<PhoneOutlined />} />
//                 </div>
//             </header>
//             <Tabs className="tabs-panel" defaultActiveKey="1">
//                 <TabPane tab="Активные заявки" key="1">
//                     <div>
//                         {currentApplication && (
//                             <Card
//                                 title={`Текущая заявка №${currentApplicationIndex + 1}`}
//                                 bordered={false}
//                                 style={{ marginBottom: 20 }}
//                             >
//                                 <p>Дата и время начала заявки: {currentApplication.datetime}</p>
//                                 <p>Маршрут от станции: {findStationName(currentApplication.id_st1)}</p>
//                                 <p>До станции: {findStationName(currentApplication.id_st2)}</p>
//                                 <p>Категория пассажира: {currentApplication.cat_pas}</p>
//                                 <p>Статус заявки: {applicationStatuses[currentApplicationIndex]}</p>
//                                 <div>
//                                     {renderButtons()}
//                                 </div>
//                             </Card>
//                         )}
//
//                         <List
//                             itemLayout="vertical"
//                             dataSource={remainingApplications}
//                             renderItem={(item, index) => (
//                                 <List.Item>
//                                     <List.Item.Meta
//                                         title={`Заявка № ${currentApplicationIndex + 2 + index}`}
//                                         description={`Дата и время начала заявки: ${item.datetime}`}
//                                     />
//                                     <div>Маршрут от станции: {findStationName(item.id_st1)}</div>
//                                     <div>До станции: {findStationName(item.id_st2)}</div>
//                                     <div>Категория пассажира: {item.cat_pas}</div>
//                                     <div>{`Статус заявки: ${applicationStatuses[currentApplicationIndex + 1 + index]}`}</div>
//                                 </List.Item>
//                             )}
//                         />
//                     </div>
//                 </TabPane>
//                 <TabPane tab="Завершенные заявки" key="2">
//                     <List
//                         itemLayout="vertical"
//                         dataSource={completedApplications}
//                         renderItem={(item, index) => (
//                             <List.Item className="application">
//                                 <List.Item.Meta
//                                     title={`Заявка № ${index + 1}`}
//                                     description={`Дата и время начала заявки: ${item.datetime}`}
//                                 />
//                                 <div>Маршрут от станции: {findStationName(item.id_st1)}</div>
//                                 <div>До станции: {findStationName(item.id_st2)}</div>
//                                 <div>Категория пассажира: {item.cat_pas}</div>
//                                 <div>{`Статус заявки: ${applicationStatuses[myApplications.indexOf(item)]}`}</div>
//                             </List.Item>
//                         )}
//                     />
//                 </TabPane>
//             </Tabs>
//             <Modal
//                 title="Подтверждение"
//                 open={isModalVisible}
//                 onOk={handleOk}
//                 onCancel={handleCloseModal}
//                 okText="Подтвердить"
//                 cancelText="Отмена"
//             >
//                 <p>Вы уверены, что хотите отменить заявку?</p>
//             </Modal>
//         </ApplicationsForEmployeeWrapper>
//     );
// };
import React, { useState, useEffect } from "react";
import { List, Card, Button, Tabs, message } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import {updateStatus} from "../../services/FileBrowserService";
// import axios from 'axios';

import { waitingList, nameStations, IWaitingList } from "../../utils/constants";
import { ApplicationsForEmployeeWrapper } from "./styled";

const { TabPane } = Tabs;

type ApplicationStatus = 'pending' | 'accept' | 'on-the-way' | 'wait_passenger' | 'in-progress' | 'finished';

const statusButtonsMap: { [key in ApplicationStatus]: string[] } = {
    pending: ['Принять'],
    accept: ['Инспектор выехал', 'Инспектор опаздывает'],
    'on-the-way': ['Инспектор на месте'],
    'wait_passenger': ['Начать поездку', 'Пассажир опаздывает'],
    'in-progress': ['Завершить заявку'],
    finished: []
};

export const ApplicationsForEmployee = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Очищаем таймер при размонтировании компонента
        return () => clearInterval(timerId);
    }, []);

    const myApplications = waitingList.sort((a, b) => {
        const [dateA, timeA] = a.datetime.split(' ');
        const [dateB, timeB] = b.datetime.split(' ');

        const dateAObj: Date = new Date(Date.parse(`1970-01-01T${timeA.padStart(8, '0')}Z`));
        const dateBObj: Date = new Date(Date.parse(`1970-01-01T${timeB.padStart(8, '0')}Z`));

        return dateAObj.getTime() - dateBObj.getTime();
    }).slice(0, 10);

    const handleCallDispatcher = () => {
        window.location.href = `tel:${+7999999999}`;
    };

    const [currentApplicationIndex, setCurrentApplicationIndex] = useState(0);
    const [applicationStatuses, setApplicationStatuses] = useState<ApplicationStatus[]>(
        myApplications.map(() => 'pending')
    );
    const [completedApplications, setCompletedApplications] = useState<IWaitingList[]>([]);

    const initialButtonStates: { [key: number]: string[] } = myApplications.reduce((acc, _, index) => {
        acc[index] = statusButtonsMap['pending'];
        return acc;
    }, {} as { [key: number]: string[] });

    const [buttonStates, setButtonStates] = useState<{ [key: number]: string[] }>(initialButtonStates);

    const currentApplication = myApplications[currentApplicationIndex];
    const remainingApplications = myApplications.slice(currentApplicationIndex + 1);

    const findStationName = (id: string) => nameStations.find((station) => station.id === id)?.name_station;

    const handleUpdateStatus = async (newStatus: ApplicationStatus) => {
        console.log(111)

        // try {
        //     const response = await axios.post('/api/update-status', {
        //         id: currentApplication.id,
        //         status: newStatus
        //     });
        //
        //     if (response.status === 200) {
        //         const updatedStatuses = [...applicationStatuses];
        //         updatedStatuses[currentApplicationIndex] = newStatus;
        //         setApplicationStatuses(updatedStatuses);
        //
        //         if (newStatus === 'finished') {
        //             setCompletedApplications([...completedApplications, currentApplication]);
        //             setCurrentApplicationIndex(currentApplicationIndex + 1);
        //         }
        //
        //         const newButtonStates = { ...buttonStates };
        //         newButtonStates[currentApplicationIndex] = statusButtonsMap[newStatus];
        //         setButtonStates(newButtonStates);
        //
        //         message.success(`Статус заявки обновлен на ${newStatus}`);
        //     } else {
        //         message.error('Ошибка при обновлении статуса заявки');
        //     }
        // } catch (error) {
        //     message.error('Ошибка при обновлении статуса заявки');
        // }
        updateStatus(newStatus, +currentApplication.id) // скорректировать название статусов
        const updatedStatuses = [...applicationStatuses];
        updatedStatuses[currentApplicationIndex] = newStatus;
        setApplicationStatuses(updatedStatuses);

        if (newStatus === 'finished') {
            setCompletedApplications([...completedApplications, currentApplication]);
            setCurrentApplicationIndex(currentApplicationIndex + 1);
        }

        const newButtonStates = { ...buttonStates };
        newButtonStates[currentApplicationIndex] = statusButtonsMap[newStatus];
        setButtonStates(newButtonStates);
    };

    const handleButtonClick = (buttonText: string) => {
        switch (buttonText) {
            case 'Принять':
                handleUpdateStatus('accept');
                break;
            case 'Инспектор выехал':
                handleUpdateStatus('on-the-way');
                break;
            case 'Инспектор опаздывает':
                setButtonStates((prevStates) => {
                    const newStates = { ...prevStates };
                    newStates[currentApplicationIndex] = newStates[currentApplicationIndex].filter(
                        (button) => button !== 'Инспектор опаздывает'
                    );
                    return newStates;
                });
                break;
            case 'Инспектор на месте':
                handleUpdateStatus('wait_passenger');
                break;
            case 'Начать поездку':
                handleUpdateStatus('in-progress');
                break;
            case 'Пассажир опаздывает':
                setButtonStates((prevStates) => {
                    const newStates = { ...prevStates };
                    newStates[currentApplicationIndex] = newStates[currentApplicationIndex].filter(
                        (button) => button !== 'Пассажир опаздывает'
                    );
                    return newStates;
                });
                break;
            case 'Завершить заявку':
                handleUpdateStatus('finished');
                break;
            default:
                break;
        }
    };

    const renderButtons = () => {
        // const currentStatus = applicationStatuses[currentApplicationIndex];
        const buttons = buttonStates[currentApplicationIndex];

        return buttons.map((buttonText) => {
            let buttonProps: Partial<React.ComponentProps<typeof Button>> = {};

            switch (buttonText) {
                case 'Принять':
                    buttonProps = {
                        onClick: () => handleButtonClick('Принять'),
                        style: { backgroundColor: '#28a745', borderColor: '#28a745' }
                    };
                    break;
                case 'Инспектор выехал':
                    buttonProps = {
                        onClick: () => handleButtonClick('Инспектор выехал'),
                        style: { backgroundColor: '#ffc107', borderColor: '#ffc107' }
                    };
                    break;
                case 'Инспектор опаздывает':
                    buttonProps = {
                        onClick: () => handleButtonClick('Инспектор опаздывает'),
                        style: { backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }
                    };
                    break;
                case 'Инспектор на месте':
                    buttonProps = {
                        onClick: () => handleButtonClick('Инспектор на месте'),
                        style: { backgroundColor: '#17a2b8', borderColor: '#17a2b8' }
                    };
                    break;
                case 'Начать поездку':
                    buttonProps = {
                        onClick: () => handleButtonClick('Начать поездку'),
                        style: { backgroundColor: '#007bff', borderColor: '#007bff' }
                    };
                    break;
                case 'Пассажир опаздывает':
                    buttonProps = {
                        onClick: () => handleButtonClick('Пассажир опаздывает'),
                        style: { backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }
                    };
                    break;
                case 'Завершить заявку':
                    buttonProps = {
                        onClick: () => handleButtonClick('Завершить заявку'),
                        style: { backgroundColor: '#ffd700', borderColor: '#ffd700', color: '#fff' }
                    };
                    break;
                default:
                    break;
            }

            return (
                <Button key={buttonText} type="primary" style={{ margin: '0 10px' }} {...buttonProps}>
                    {buttonText}
                </Button>
            );
        });
    };

    return (
        <ApplicationsForEmployeeWrapper>
            <header className="app-header">
                <div>{currentTime.toLocaleTimeString()}</div>
                <div className="button-call">
                    <div>Диспетчер</div>
                    <Button type="primary" className="dispatcher-call" onClick={handleCallDispatcher} icon={<PhoneOutlined />} />
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
                                <p>Дата и время начала заявки: {currentApplication.datetime}</p>
                                <p>Маршрут от станции: {findStationName(currentApplication.id_st1)}</p>
                                <p>До станции: {findStationName(currentApplication.id_st2)}</p>
                                <p>Категория пассажира: {currentApplication.cat_pas}</p>
                                <p>Статус заявки: {applicationStatuses[currentApplicationIndex]}</p>
                                <div>
                                    {renderButtons()}
                                </div>
                            </Card>
                        )}

                        <List
                            itemLayout="vertical"
                            dataSource={remainingApplications}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={`Заявка № ${currentApplicationIndex + 2 + index}`}
                                        description={`Дата и время начала заявки: ${item.datetime}`}
                                    />
                                    <div>Маршрут от станции: {findStationName(item.id_st1)}</div>
                                    <div>До станции: {findStationName(item.id_st2)}</div>
                                    <div>Категория пассажира: {item.cat_pas}</div>
                                    <div>{`Статус заявки: ${applicationStatuses[currentApplicationIndex + 1 + index]}`}</div>
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
                                    description={`Дата и время начала заявки: ${item.datetime}`}
                                />
                                <div>Маршрут от станции: {findStationName(item.id_st1)}</div>
                                <div>До станции: {findStationName(item.id_st2)}</div>
                                <div>Категория пассажира: {item.cat_pas}</div>
                                <div>{`Статус заявки: ${applicationStatuses[myApplications.indexOf(item)]}`}</div>
                            </List.Item>
                        )}
                    />
                </TabPane>
            </Tabs>
        </ApplicationsForEmployeeWrapper>
    );
};
