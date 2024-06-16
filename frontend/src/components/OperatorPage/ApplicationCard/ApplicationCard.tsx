import React, {useState} from 'react';
import {Card, DatePicker, Select} from 'antd';
import {ITestWaitingList} from "../../../utils/constants";
import dayjs from "dayjs";
import {format} from "date-fns";


const ApplicationCard: React.FC<{ application: ITestWaitingList[] }> = ({ application }) => {
    const [selectedDate, setSelectedDate] = useState<string>('');

    const dateFormat = 'DD.MM.YYYY';

    const handleDateChange = (date: any) => {
        if(date) {
            const formattedDate = format(date.$d, 'dd.MM.yyyy');
            setSelectedDate(formattedDate);
        }
    };
    return (
        <>
            <DatePicker
                onChange={handleDateChange}
                defaultValue={dayjs(format(new Date(), 'dd.MM.yyyy'), dateFormat)}
                format={dateFormat}
                style={{margin: '20px 0'}}
            />

            {/*<Card title={`Заявка ${application.id}`} style={{ marginBottom: 16 }}>*/}
            {/*    <p><strong>Пассажир:</strong> {application.status}</p>*/}
            {/*    <p><strong>Дата:</strong> {application.datetime}</p>*/}

            {/*</Card>*/}
        </>
    );
};

export default ApplicationCard;
