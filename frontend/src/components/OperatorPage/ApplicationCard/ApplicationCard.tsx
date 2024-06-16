import React, {useState} from 'react';
import {Card, DatePicker, Select, Table} from 'antd';
import {ITestWaitingList, nameStations} from "../../../utils/constants";
import {IListOfBidsResult, IListOfPassengers} from '../../../services/FileBrowserService';
import dayjs from "dayjs";
import {format} from "date-fns";

interface IApplicationCardProps {
    application: IListOfBidsResult[]
    passengerList: IListOfPassengers[];
}

// "id": number,
//     "passengerId": number,
//     "createdDate": string,
//     "createdTime": string,
//     "date": string,
//     "time": string,
//     "status": string,
//     "stID1": number,
//     "stID2": number,
//     "countMale": number,
//     "countFemale": number,
//     "timePredict": string,
//     "timeStart": null,
//     "timeOver": null

const ApplicationCard: React.FC<IApplicationCardProps> = ({ application, passengerList }) => {
    const resultApplicationData = application.map(app => {
        const passengerSurName = passengerList.find(item => item.id === app.passengerId)?.surName || '';
        const passengerFirstName = passengerList.find(item => item.id === app.passengerId)?.firstName || '';
        const passengerLastName = passengerList.find(item => item.id === app.passengerId)?.lastName || '';
        const dataIndex = `${app.date} ${app.time}`;
        const name_station1 = nameStations.find(station => +station.id === app.stID1)?.name_station;
        const name_station2 = nameStations.find(station => +station.id === app.stID2)?.name_station;
        return (
            {
                ...app,
                passengerFiO: `${passengerLastName} ${passengerFirstName} ${passengerSurName}`,
                name_station1: name_station1,
                name_station2: name_station2,
                datetime: dataIndex,
                status: app.status,
                INSP_SEX_M: app.countMale,
                INSP_SEX_F: app.countFemale,
                createdDate: app.createdDate,
                createdTime: app.createdTime,
                TIME_OVER: app.timePredict
            }
        )
    })

    const columns = [
        {
            title: 'ID заявки',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Пассажир',
            dataIndex: 'passengerFiO',
            key: 'id_pas',
        },
        {
            title: 'Дата и время',
            dataIndex: 'datetime',
            key: 'datetime',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Количество инспекторов мужчин',
            dataIndex: 'INSP_SEX_M',
            key: 'INSP_SEX_M',
        },
        {
            title: 'Количество инспекторов женщин',
            dataIndex: 'INSP_SEX_F',
            key: 'INSP_SEX_F',
        },
        {
            title: 'Рассчитанное время на выполнение заявки',
            dataIndex: 'TIME_OVER',
            key: 'TIME_OVER',
        },
        {
            title: 'Станция отправления',
            dataIndex: 'name_station1',
            key: 'id_st1',
        },
        {
            title: 'Станция назначения',
            dataIndex: 'name_station2',
            key: 'id_st2',
        },
        {
            title: 'Время создания заявки',
            dataIndex: 'createdTime',
            key: 'createdTime',
        },
        {
            title: 'Дата создания заявки',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
    ];
    return (
        <Table
            dataSource={resultApplicationData}
            columns={columns}
            rowKey="id"
            pagination={{pageSize: 10}}
        />
    )
}
export default ApplicationCard;
