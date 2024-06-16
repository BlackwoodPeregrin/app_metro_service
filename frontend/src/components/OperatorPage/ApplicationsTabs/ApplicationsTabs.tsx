import React, {useEffect, useState} from 'react';
import { Table, Card, Empty } from 'antd';
import { format } from 'date-fns';
import {employeeList, ITestWaitingList, nameStations} from "../../../utils/constants";
import {IListOfPassengers} from "../../../services/FileBrowserService";


// const list: IListOfPassengers[] = [
//     {"id":1,"surName":"Дориан","firstName":"Джон","lastName":"Дмитриевич","category":"ИЗТ","phone":"+7-999-808-15-44", "sex": "Мужской"},
//     {"id":2,"surName":"Конор","firstName":"Сара","lastName":"Эльдаровна","category":"ИС","phone":"+7-999-808-15-44", "sex": "Женский"},
// ]

type TableProps = {
    timeSlots: string[];
    data: ITestWaitingList[];
    passengerList: IListOfPassengers[];
};

interface TableRow {
    key: number;
    time: string;
    [employeeName: string]: string | ITitleResultData | number | null; // Индексный тип, допускающий ключи строкового типа
}

interface ITitleResultData {
    passenger: string;
    timeApplication: string;
    category: string;
    registrationTime: string;
    countOfMan: string;
    countOfWomen: string;
    startStation: string;
    endStation: string;
}

interface IResultData {
    employeeName: string;
    time: string;
    title: ITitleResultData
}

export const ApplicationTabs: React.FC<TableProps> = ({ timeSlots, data, passengerList }) => {

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

    const receivingApplicationData = (applicationData: ITestWaitingList, listPassenger: IListOfPassengers[]) => {
        const pass = listPassenger.find(pas => pas.id === +applicationData.id_pas)?.surName;
        return (
            {
                employeeName: employeeList.find(fio => fio.ID === applicationData.id_employee)?.FIO || '',
                title: {
                    passenger: pass || '',
                    timeApplication: applicationData.datetime,
                    category: applicationData.cat_pas,
                    registrationTime: applicationData.tpz,
                    countOfMan: applicationData.INSP_SEX_M,
                    countOfWomen: applicationData.INSP_SEX_F,
                    startStation: nameStations.find(name => name.id === applicationData.id_st1)?.name_station || '',
                    endStation: nameStations.find(name => name.id === applicationData.id_st2)?.name_station || '',
                }

            }
        )

    }



    const resultData: IResultData[] = data.map(item => {
        return ({
            ...receivingApplicationData(item, passengerList),
            time: roundTimeToNearestHalfHour(item.datetime),

        })
    })


    // const resultData: IResultData[] = data.map(item => {
    //     const pass = list.find(pas => pas.id === +item.id_pas)?.surName;
    //     return ({
    //         employeeName: employeeList.find(fio => fio.ID === item.id_employee)?.FIO || '',
    //         time: roundTimeToNearestHalfHour(item.datetime),
    //         title: {
    //             passenger: pass || '',
    //             timeApplication: item.datetime,
    //             category: item.cat_pas,
    //             registrationTime: item.tpz,
    //             countOfMan: item.INSP_SEX_M,
    //             countOfWomen: item.INSP_SEX_F,
    //             startStation: nameStations.find(name => name.id === item.id_st1)?.name_station || '',
    //             endStation: nameStations.find(name => name.id === item.id_st2)?.name_station || '',
    //         }
    //
    //     })
    // })


    const employees = employeeList
        .filter(item => data.find(application => application.id_employee === item.ID))
        .map(employee => {
            return ({
                name: employee.FIO
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
                        <div>Category: {data.category}</div>
                        <div>Time Application: {data.timeApplication}</div>
                        <div>Start Station: {data.startStation}</div>
                        <div>End Station: {data.endStation}</div>
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


};

