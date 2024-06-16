import React from 'react';
import { Table, Card, Empty } from 'antd';

import {nameStations} from "../../../utils/constants";
import {IListOfPassengers, IListOfBids, IListOfEmployees} from "../../../services/FileBrowserService";

type TableProps = {
    timeSlots: string[];
    data: IListOfBids[];
    passengerList: IListOfPassengers[];
    listOfEmployees: IListOfEmployees[];
};

interface TableRow {
    key: number;
    time: string;
    [employeeName: string]: string | ITitleResultData | number | null; // Индексный тип, допускающий ключи строкового типа
}

interface ITitleResultData {
    passenger: string;
    timeApplication: string;
    countOfMan: number;
    countOfWomen: number;
    startStation: string;
    endStation: string;
}

interface IResultData {
    employeeName: string;
    time: string;
    title: ITitleResultData
}

export const ApplicationTabs: React.FC<TableProps> = ({ timeSlots, data, passengerList, listOfEmployees }) => {

    const roundTimeToNearestHalfHour = (time: string): string => {
        let formattedTime = time;
        if(time.split(' ').length > 1) {
            const timeString = time.split(' ')[1];
            const [hours, minutes] = timeString.split(':');
            formattedTime = `${hours.padStart(2, '0')}:${minutes}`;
        }

        const [hour, minute] = formattedTime.split(':').map(Number);

        // Округляем количество минут до ближайшего 30-минутного интервала
        const roundedMinute = Math.floor(minute / 30) * 30;

        // Если минуты равны 0 или 30, то возвращаем время как есть
        if (roundedMinute === 0 || roundedMinute === 30) {
            return `${hour.toString().padStart(2, '0')}:${roundedMinute.toString().padStart(2, '0')}`;
        } else {
            // Иначе, округляем часы вниз и возвращаем время
            const roundedHour = hour - 1;
            return `${roundedHour.toString().padStart(2, '0')}:30`;
        }

    }

    if(data.length){
        const receivingApplicationData = (applicationData: IListOfBids, listPassenger: IListOfPassengers[]) => {
            const pass = listPassenger.find(pas => pas.id === applicationData.bid.passengerId)?.surName;
            return (
                {
                    employeeName: listOfEmployees.filter(employee => applicationData.employeesId.includes(employee.id))[0]?.surName || '',
                    title: {
                        passenger: pass || '',
                        timeApplication: applicationData.bid.time,
                        countOfMan: applicationData.bid.countMale,
                        countOfWomen: applicationData.bid.countFemale,
                        startStation: nameStations.find(name => +name.id === applicationData.bid.stID1)?.name_station || '',
                        endStation: nameStations.find(name => +name.id === applicationData.bid.stID2)?.name_station || '',
                    }

                }
            )

        }

        const resultData: IResultData[] = data.map(item => {
            return ({
                ...receivingApplicationData(item, passengerList),
                time: roundTimeToNearestHalfHour(item.bid.time),

            })
        })

        const employees = listOfEmployees
            .filter(item => data.find(application => application.employeesId.includes(item.id)))
            .map(employee => {
                console.log(employee.lastName)
                return ({
                    name: `${employee.surName}`
                })
            });


        const handleViewingApplication = () => {
            console.log('handleViewingApplication');
        }

        const columns = employees.length ? [
            {
                title: 'Time',
                dataIndex: 'time',
                key: 'time',
                fixed: 'left' as const,
                width: 100,
            },
            ...employees.map((employee) => ({
                title: employee.name,
                dataIndex: 'employeeData',  // Используем отдельное поле для данных
                key: employee.name,
                width: 150,
                render: (_: any, row: TableRow) => {
                    const data: ITitleResultData = row[employee.name] as ITitleResultData;
                    if (!data) {
                        return null;
                    }
                    return (
                        <Card onClick={handleViewingApplication}>
                            <div>Время заявки: {data.timeApplication}</div>
                            <div>Станция отправления: {data.startStation}</div>
                            <div>Станция назначения: {data.endStation}</div>
                        </Card>
                    );
                },
            })),
        ] : [];
        const dataMap = new Map<string, Map<string, ITitleResultData>>(); // Map для хранения значений title

        resultData.forEach(({ employeeName, time, title }) => {

            if (!dataMap.has(time)) {
                dataMap.set(time, new Map<string, ITitleResultData>());
            }
            dataMap.get(time)!.set(employeeName, title);
        });


        const startedTime = resultData.sort((a, b) => a.time < b.time ? -1 : a.time > b.time ? 1 : 0);

        const veuTimeIndex = timeSlots.findIndex(time => startedTime[0].time === time);


        const tableData: TableRow[] = timeSlots.slice(veuTimeIndex).map((time, index) => {
            const row: TableRow = { key: index, time };
            employees.forEach((employee) => {
                row[employee.name] = dataMap.get(time)?.get(employee.name) || null;
            });
            return row;
        });
        return (
            <Table
                bordered
                columns={columns}
                dataSource={tableData}
                pagination={{ pageSize: 10 }}
                scroll={{ y: 400, x: 'max-content' }}
            />
        )
    } else {
        return (
            <Empty />
        )
    }
};

