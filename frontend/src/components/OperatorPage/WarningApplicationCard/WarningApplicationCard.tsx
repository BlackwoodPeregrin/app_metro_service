import React from 'react';
import { Table } from 'antd';
import {ITestWaitingList, nameStations} from "../../../utils/constants";
import {IListOfPassengers} from "../../../services/FileBrowserService";

interface IPotentialProblemsListProps {
    potentialProblemsList: ITestWaitingList[];
    passengerList: IListOfPassengers[];
}

export const WarningApplicationCard: React.FC<IPotentialProblemsListProps> = ({potentialProblemsList, passengerList}) => {

    const resultApplicationData = potentialProblemsList.map(app => {
        const passengerSurName = passengerList.find(item => item.id === +app.id)?.surName || '';
        const passengerFirstName = passengerList.find(item => item.id === +app.id)?.firstName || '';
        const passengerLastName = passengerList.find(item => item.id === +app.id)?.lastName || '';
        const passengerFiO = `${passengerSurName} ${passengerFirstName} ${passengerLastName}`;
        const name_station1 = nameStations.find(station => station.id === app.id_st1)?.name_station;
        const name_station2 = nameStations.find(station => station.id === app.id_st2)?.name_station;
        return (
            {
                ...app,
                passengerFiO: passengerFiO,
                name_station1: name_station1,
                name_station2: name_station2
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
            title: 'Категория пассажира',
            dataIndex: 'cat_pas',
            key: 'cat_pas',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'TPZ',
            dataIndex: 'tpz',
            key: 'tpz',
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
    ];
    return (
        <Table
            dataSource={resultApplicationData}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
    )
}