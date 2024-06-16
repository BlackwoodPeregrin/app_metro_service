import React from 'react';
import { Table } from 'antd';
import {nameStations} from "../../../utils/constants";
import {IListOfPassengers, IListOfBids} from "../../../services/FileBrowserService";

interface IPotentialProblemsListProps {
    potentialProblemsList: IListOfBids[];
    passengerList: IListOfPassengers[];
}

export const WarningApplicationCard: React.FC<IPotentialProblemsListProps> = ({potentialProblemsList, passengerList}) => {

    const resultApplicationData = potentialProblemsList.map(app => {
        const passengerSurName = passengerList.find(item => item.id === app.bid.passengerId)?.surName || '';
        const passengerFirstName = passengerList.find(item => item.id === app.bid.passengerId)?.firstName || '';
        const passengerLastName = passengerList.find(item => item.id === app.bid.passengerId)?.lastName || '';
        const dataIndex = `${app.bid.date} ${app.bid.time}`;
        const name_station1 = nameStations.find(station => +station.id === app.bid.stID1)?.name_station;
        const name_station2 = nameStations.find(station => +station.id === app.bid.stID2)?.name_station;
        return (
            {
                ...app,
                id: app.bid.id,
                passengerFiO: `${passengerLastName} ${passengerFirstName} ${passengerSurName}`,
                name_station1: name_station1,
                name_station2: name_station2,
                datetime: dataIndex,
                status: app.bid.status,
                INSP_SEX_M: app.bid.countMale,
                INSP_SEX_F: app.bid.countFemale,
                createdDate: app.bid.createdDate,
                createdTime: app.bid.createdTime,
                TIME_OVER: app.bid.timePredict
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