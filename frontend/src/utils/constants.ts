import {workDay} from '../services/FileBrowserService';

export interface IWaitingList {
    "id": string,
    "id_pas": string,
    "datetime": string,
    "time3": string,
    "time4": string,
    "cat_pas": string,
    "status": string,
    "tpz": string,
    "INSP_SEX_M": string,
    "INSP_SEX_F": string,
    "TIME_OVER": string,
    "id_st1": string,
    "id_st2": string,

}

export interface ITimeBetweenStations {
    "id_st1": string,
    "id_st2": string,
    "time": string
}

export interface ITransferTmeBetweenStations {
    "time": string,
    "id1": string,
    "id2": string
}

export interface INameStations {
    "name_station": string,
    "name_line": string,
    "id": string,
    "id_line": string
}

export interface IPassengerNonAppearance {
    "ID_BID": string,
    "DATE_TIME": string
}

export interface ICancellationsOfApplications {
    "ID_BID": string,
    "DATE_TIME": string
}

export interface IPostponementOfApplicationsByTime {
    "id_bid": string,
    "time_edit": string,
    "time_s": string,
    "time_f": string
}

export interface IEmployeeList {
    "DATE": string,
    "TIME_WORK": string,
    "ID": string,
    "FIO": string,
    "UCHASTOK": string,
    "SMENA": string,
    "RANK": string,
    "SEX": string,
    phone?: string
}

export interface IAddEmployee {
    surName: string;
    name: string;
    lastName: string;
    phone: string;
    uchastok: string;
    smena: string;
    rank: string;
    sex: string
}

export interface IEditEmployee extends IAddEmployee {
    workDays: string[];
    workTime: string[];
}

export interface ITestWaitingList extends IWaitingList {
    id_employee: string;
}
export type SelectedDayValueKey = 'Пн'| 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс';

export const SPOT_LIST: string[] = ['1', '2', '3', '3(Н)', '4', '4(Н)', '5', '8'];
export const LIST_OF_POSITION: string[] = ["АР", "СТ", "ЦУ", "ЦСИ", "ЦИО", "ЦИ"]
export const WEEKDAYS:SelectedDayValueKey[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const WEEKDAYS1 = {
    '1': 'Пн',
    '2': 'Вт',
    '3': 'Ср',
    '4': 'Чт',
    '5': 'Пт',
    '6': 'Сб',
    '7': 'Вс'
};
export const WEEKDAYS2 = [
    {1: 'Пн'},
    {2: 'Вт'},
    {3: 'Ср'},
    {4: 'Чт'},
    {5: 'Пт'},
    {6: 'Сб'},
    {7: 'Вс'}
];
export interface IDaysOfWeek {
    key: workDay, name: string
}
export const daysOfWeek: IDaysOfWeek[] = [
    { key: '1' as workDay, name: 'Понедельник' },
    { key: '2' as workDay, name: 'Вторник' },
    { key: '3' as workDay, name: 'Среда' },
    { key: '4' as workDay, name: 'Четверг' },
    { key: '5' as workDay, name: 'Пятница' },
    { key: '6' as workDay, name: 'Суббота' },
    { key: '7' as workDay, name: 'Воскресенье' },
];
export const PAGE_SIZE = 12; // Количество сотрудников и пассажиров на одной странице

export const waitingList : IWaitingList[] = [
    {
        "id": "477354",
        "id_pas": "11058",
        "datetime": "24.04.2024 7:30:00",
        "time3": "07:13:52",
        "time4": "07:51:11",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "15.03.2024 22:48:43",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:52:20",
        "id_st1": "5",
        "id_st2": "97"
    },
    {
        "id": "477370",
        "id_pas": "11058",
        "datetime": "24.04.2024 15:10:00",
        "time3": "15:07:12",
        "time4": "16:17:21",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "15.03.2024 22:51:28",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:07:20",
        "id_st1": "97",
        "id_st2": "5"
    },
    {
        "id": "478278",
        "id_pas": "1530",
        "datetime": "24.04.2024 7:13:00",
        "time3": "07:11:24",
        "time4": "08:06:44",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "18.03.2024 15:40:11",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:20:10",
        "id_st1": "422",
        "id_st2": "224"
    },
    {
        "id": "478293",
        "id_pas": "1530",
        "datetime": "24.04.2024 20:20:00",
        "time3": "20:27:23",
        "time4": "21:29:54",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "18.03.2024 16:02:49",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:19:10",
        "id_st1": "224",
        "id_st2": "422"
    },
    {
        "id": "480889",
        "id_pas": "44307",
        "datetime": "24.04.2024 6:20:00",
        "time3": "06:11:28",
        "time4": "07:29:25",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "27.03.2024 20:17:45",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:50:00",
        "id_st1": "256",
        "id_st2": "249"
    },
    {
        "id": "480915",
        "id_pas": "44307",
        "datetime": "24.04.2024 15:10:00",
        "time3": "15:10:16",
        "time4": "16:19:45",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "27.03.2024 20:23:15",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:50:00",
        "id_st1": "249",
        "id_st2": "256"
    },
    {
        "id": "481183",
        "id_pas": "3338",
        "datetime": "24.04.2024 7:51:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "28.03.2024 21:52:59",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:13:00",
        "id_st1": "284",
        "id_st2": "246"
    },
    {
        "id": "481199",
        "id_pas": "3338",
        "datetime": "24.04.2024 17:40:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "28.03.2024 21:55:27",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:08:00",
        "id_st1": "246",
        "id_st2": "284"
    },
    {
        "id": "481251",
        "id_pas": "33949",
        "datetime": "24.04.2024 7:10:00",
        "time3": "07:10:34",
        "time4": "07:54:50",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "29.03.2024 8:48:27",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:54:40",
        "id_st1": "93",
        "id_st2": "13"
    },
    {
        "id": "481488",
        "id_pas": "27758",
        "datetime": "24.04.2024 6:10:00",
        "time3": "06:11:26",
        "time4": "06:52:04",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "29.03.2024 18:10:13",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:42:15",
        "id_st1": "87",
        "id_st2": "51"
    },
    {
        "id": "481912",
        "id_pas": "30683",
        "datetime": "24.04.2024 7:50:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "30.03.2024 21:43:09",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:45:50",
        "id_st1": "230",
        "id_st2": "206"
    },
    {
        "id": "482595",
        "id_pas": "30851",
        "datetime": "24.04.2024 11:05:00",
        "time3": "11:10:23",
        "time4": "11:17:59",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "01.04.2024 20:49:23",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:25:00",
        "id_st1": "161",
        "id_st2": "161"
    },
    {
        "id": "482974",
        "id_pas": "26846",
        "datetime": "24.04.2024 8:58:00",
        "time3": "09:06:00",
        "time4": "10:28:03",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "03.04.2024 12:04:13",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:46:00",
        "id_st1": "29",
        "id_st2": "6"
    },
    {
        "id": "484122",
        "id_pas": "44570",
        "datetime": "24.04.2024 14:30:00",
        "time3": "14:28:29",
        "time4": "15:20:56",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "07.04.2024 9:25:34",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:53:20",
        "id_st1": "117",
        "id_st2": "73"
    },
    {
        "id": "484123",
        "id_pas": "44570",
        "datetime": "24.04.2024 18:00:00",
        "time3": "18:02:25",
        "time4": "18:45:48",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "07.04.2024 9:25:47",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:55:20",
        "id_st1": "73",
        "id_st2": "117"
    },
    {
        "id": "484165",
        "id_pas": "37801",
        "datetime": "24.04.2024 20:20:00",
        "time3": "20:29:25",
        "time4": "21:16:28",
        "cat_pas": "ПЛ",
        "status": "Заявка закончена",
        "tpz": "07.04.2024 11:21:35",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:52:30",
        "id_st1": "6",
        "id_st2": "139"
    },
    {
        "id": "484238",
        "id_pas": "4269",
        "datetime": "24.04.2024 6:50:00",
        "time3": "06:56:33",
        "time4": "07:47:46",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "07.04.2024 13:16:08",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:59:00",
        "id_st1": "135",
        "id_st2": "34"
    },
    {
        "id": "485000",
        "id_pas": "46498",
        "datetime": "24.04.2024 17:45:00",
        "time3": "17:39:17",
        "time4": "18:35:26",
        "cat_pas": "ПЛ",
        "status": "Заявка закончена",
        "tpz": "10.04.2024 10:06:27",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:52:10",
        "id_st1": "116",
        "id_st2": "34"
    },
    {
        "id": "485041",
        "id_pas": "6467",
        "datetime": "24.04.2024 7:15:00",
        "time3": "07:13:01",
        "time4": "07:31:04",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "10.04.2024 12:15:09",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:25:00",
        "id_st1": "246",
        "id_st2": "246"
    },
    {
        "id": "485822",
        "id_pas": "34032",
        "datetime": "24.04.2024 12:00:00",
        "time3": "11:55:10",
        "time4": "12:55:34",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "13.04.2024 8:49:50",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:30:40",
        "id_st1": "96",
        "id_st2": "134"
    },
    {
        "id": "485823",
        "id_pas": "34032",
        "datetime": "24.04.2024 18:55:00",
        "time3": "18:58:14",
        "time4": "20:03:21",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "13.04.2024 8:50:12",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:30:40",
        "id_st1": "134",
        "id_st2": "96"
    },
    {
        "id": "486441",
        "id_pas": "31888",
        "datetime": "24.04.2024 10:00:00",
        "time3": "09:42:48",
        "time4": "10:39:36",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "14.04.2024 19:35:19",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:11:40",
        "id_st1": "42",
        "id_st2": "28"
    },
    {
        "id": "486447",
        "id_pas": "31888",
        "datetime": "24.04.2024 19:30:00",
        "time3": "19:15:25",
        "time4": "20:14:35",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "14.04.2024 19:35:59",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:11:40",
        "id_st1": "28",
        "id_st2": "42"
    },
    {
        "id": "486665",
        "id_pas": "47331",
        "datetime": "24.04.2024 8:45:00",
        "time3": "08:46:38",
        "time4": "09:29:49",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "15.04.2024 15:12:25",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:47:50",
        "id_st1": "87",
        "id_st2": "6"
    },
    {
        "id": "486993",
        "id_pas": "6333",
        "datetime": "24.04.2024 7:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "16.04.2024 19:11:53",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:10:15",
        "id_st1": "169",
        "id_st2": "246"
    },
    {
        "id": "486997",
        "id_pas": "6333",
        "datetime": "24.04.2024 16:40:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "16.04.2024 19:14:25",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:10:30",
        "id_st1": "246",
        "id_st2": "364"
    },
    {
        "id": "487157",
        "id_pas": "47355",
        "datetime": "24.04.2024 9:45:00",
        "time3": "09:28:28",
        "time4": "10:33:37",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "17.04.2024 13:14:44",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:55:10",
        "id_st1": "20",
        "id_st2": "175"
    },
    {
        "id": "487158",
        "id_pas": "47355",
        "datetime": "24.04.2024 14:00:00",
        "time3": "14:06:10",
        "time4": "14:47:20",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "17.04.2024 13:15:27",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:52:10",
        "id_st1": "158",
        "id_st2": "20"
    },
    {
        "id": "487160",
        "id_pas": "47356",
        "datetime": "24.04.2024 9:45:00",
        "time3": "09:31:28",
        "time4": "10:33:42",
        "cat_pas": "РДК",
        "status": "Заявка закончена",
        "tpz": "17.04.2024 13:17:53",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:55:10",
        "id_st1": "20",
        "id_st2": "175"
    },
    {
        "id": "487161",
        "id_pas": "47356",
        "datetime": "24.04.2024 14:00:00",
        "time3": "14:06:45",
        "time4": "14:47:34",
        "cat_pas": "РДК",
        "status": "Заявка закончена",
        "tpz": "17.04.2024 13:18:25",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:52:10",
        "id_st1": "158",
        "id_st2": "20"
    },
    {
        "id": "487162",
        "id_pas": "36595",
        "datetime": "24.04.2024 15:37:00",
        "time3": "15:35:45",
        "time4": "16:26:20",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "17.04.2024 13:23:13",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:48:00",
        "id_st1": "29",
        "id_st2": "96"
    },
    {
        "id": "487164",
        "id_pas": "36595",
        "datetime": "24.04.2024 20:00:00",
        "time3": "20:07:18",
        "time4": "20:42:11",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "17.04.2024 13:29:15",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:48:00",
        "id_st1": "96",
        "id_st2": "29"
    },
    {
        "id": "487168",
        "id_pas": "47359",
        "datetime": "24.04.2024 15:37:00",
        "time3": "15:35:53",
        "time4": "16:26:25",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "17.04.2024 13:33:45",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:48:00",
        "id_st1": "29",
        "id_st2": "96"
    },
    {
        "id": "487171",
        "id_pas": "47359",
        "datetime": "24.04.2024 20:00:00",
        "time3": "19:23:44",
        "time4": "20:42:22",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "17.04.2024 13:34:28",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:48:00",
        "id_st1": "96",
        "id_st2": "29"
    },
    {
        "id": "487356",
        "id_pas": "30801",
        "datetime": "24.04.2024 17:00:00",
        "time3": "17:02:57",
        "time4": "18:00:30",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "18.04.2024 8:55:04",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:44:00",
        "id_st1": "135",
        "id_st2": "34"
    },
    {
        "id": "487460",
        "id_pas": "30316",
        "datetime": "24.04.2024 12:45:00",
        "time3": "12:39:31",
        "time4": "13:51:42",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "18.04.2024 13:46:32",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:13:10",
        "id_st1": "138",
        "id_st2": "93"
    },
    {
        "id": "487461",
        "id_pas": "30316",
        "datetime": "24.04.2024 18:00:00",
        "time3": "17:49:14",
        "time4": "19:18:06",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "18.04.2024 13:47:12",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:13:10",
        "id_st1": "93",
        "id_st2": "138"
    },
    {
        "id": "487468",
        "id_pas": "41695",
        "datetime": "24.04.2024 16:30:00",
        "time3": "16:28:00",
        "time4": "17:29:00",
        "cat_pas": "РДК",
        "status": "Заявка закончена",
        "tpz": "18.04.2024 14:05:35",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:57:20",
        "id_st1": "140",
        "id_st2": "349"
    },
    {
        "id": "487482",
        "id_pas": "46444",
        "datetime": "24.04.2024 9:00:00",
        "time3": "08:57:12",
        "time4": "09:50:31",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "18.04.2024 14:44:24",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:18:20",
        "id_st1": "263",
        "id_st2": "1"
    },
    {
        "id": "487501",
        "id_pas": "45839",
        "datetime": "24.04.2024 7:45:00",
        "time3": "07:50:00",
        "time4": "07:59:41",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "18.04.2024 15:44:10",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:30:20",
        "id_st1": "350",
        "id_st2": "109"
    },
    {
        "id": "487542",
        "id_pas": "43745",
        "datetime": "24.04.2024 6:46:00",
        "time3": "06:36:00",
        "time4": "07:23:57",
        "cat_pas": "ПЛ",
        "status": "Заявка закончена",
        "tpz": "18.04.2024 18:19:24",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:46:00",
        "id_st1": "29",
        "id_st2": "6"
    },
    {
        "id": "487578",
        "id_pas": "45549",
        "datetime": "24.04.2024 10:00:00",
        "time3": "10:15:57",
        "time4": "10:40:44",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "18.04.2024 21:49:53",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:28:00",
        "id_st1": "81",
        "id_st2": "80"
    },
    {
        "id": "487603",
        "id_pas": "31097",
        "datetime": "24.04.2024 9:00:00",
        "time3": "08:59:23",
        "time4": "10:07:19",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 8:36:36",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:02:00",
        "id_st1": "37",
        "id_st2": "1"
    },
    {
        "id": "487609",
        "id_pas": "31097",
        "datetime": "24.04.2024 16:50:00",
        "time3": "16:39:59",
        "time4": "17:27:10",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 8:37:57",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:02:00",
        "id_st1": "1",
        "id_st2": "37"
    },
    {
        "id": "487616",
        "id_pas": "24159",
        "datetime": "24.04.2024 8:50:00",
        "time3": "08:45:28",
        "time4": "09:47:12",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 8:39:07",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:07:00",
        "id_st1": "48",
        "id_st2": "109"
    },
    {
        "id": "487620",
        "id_pas": "24159",
        "datetime": "24.04.2024 13:40:00",
        "time3": "13:35:24",
        "time4": "14:25:10",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 8:39:43",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:07:00",
        "id_st1": "109",
        "id_st2": "48"
    },
    {
        "id": "487625",
        "id_pas": "38076",
        "datetime": "24.04.2024 9:00:00",
        "time3": "08:54:43",
        "time4": "09:26:57",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 8:42:45",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:35:00",
        "id_st1": "145",
        "id_st2": "90"
    },
    {
        "id": "487629",
        "id_pas": "23374",
        "datetime": "24.04.2024 13:40:00",
        "time3": "13:38:55",
        "time4": "14:21:21",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 9:02:18",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:54:00",
        "id_st1": "133",
        "id_st2": "34"
    },
    {
        "id": "487634",
        "id_pas": "23374",
        "datetime": "24.04.2024 21:00:00",
        "time3": "20:57:40",
        "time4": "21:41:27",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 9:03:33",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:55:00",
        "id_st1": "34",
        "id_st2": "133"
    },
    {
        "id": "487683",
        "id_pas": "44526",
        "datetime": "24.04.2024 9:00:00",
        "time3": "08:46:36",
        "time4": "10:00:23",
        "cat_pas": "ИУ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 11:46:15",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:16:20",
        "id_st1": "244",
        "id_st2": "1"
    },
    {
        "id": "487686",
        "id_pas": "44526",
        "datetime": "24.04.2024 17:00:00",
        "time3": "17:06:14",
        "time4": "18:23:02",
        "cat_pas": "ИУ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 11:47:10",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:16:20",
        "id_st1": "1",
        "id_st2": "244"
    },
    {
        "id": "487705",
        "id_pas": "35542",
        "datetime": "24.04.2024 7:15:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "19.04.2024 12:21:19",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:39:20",
        "id_st1": "168",
        "id_st2": "109"
    },
    {
        "id": "487710",
        "id_pas": "35542",
        "datetime": "24.04.2024 14:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "19.04.2024 12:22:53",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:39:20",
        "id_st1": "109",
        "id_st2": "168"
    },
    {
        "id": "487724",
        "id_pas": "19643",
        "datetime": "24.04.2024 6:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "19.04.2024 12:54:02",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "02:05:50",
        "id_st1": "197",
        "id_st2": "96"
    },
    {
        "id": "487728",
        "id_pas": "19643",
        "datetime": "24.04.2024 10:10:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "19.04.2024 12:54:33",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "02:05:50",
        "id_st1": "96",
        "id_st2": "197"
    },
    {
        "id": "487735",
        "id_pas": "20149",
        "datetime": "24.04.2024 15:00:00",
        "time3": "14:56:27",
        "time4": "15:56:21",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 13:04:05",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:54:00",
        "id_st1": "96",
        "id_st2": "123"
    },
    {
        "id": "487736",
        "id_pas": "20149",
        "datetime": "24.04.2024 20:00:00",
        "time3": "20:02:17",
        "time4": "21:04:25",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 13:04:42",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:57:00",
        "id_st1": "123",
        "id_st2": "97"
    },
    {
        "id": "487748",
        "id_pas": "2776",
        "datetime": "24.04.2024 7:15:00",
        "time3": "07:23:50",
        "time4": "08:01:38",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 13:23:43",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:55:00",
        "id_st1": "93",
        "id_st2": "361"
    },
    {
        "id": "487861",
        "id_pas": "1690",
        "datetime": "24.04.2024 6:50:00",
        "time3": "06:42:29",
        "time4": "07:45:37",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 19:29:32",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:00:10",
        "id_st1": "142",
        "id_st2": "224"
    },
    {
        "id": "487863",
        "id_pas": "1690",
        "datetime": "24.04.2024 17:05:00",
        "time3": "17:00:59",
        "time4": "18:13:39",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 19:30:10",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:07:10",
        "id_st1": "224",
        "id_st2": "142"
    },
    {
        "id": "487874",
        "id_pas": "31065",
        "datetime": "24.04.2024 10:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по неявке пассажира",
        "tpz": "19.04.2024 20:31:54",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:12:10",
        "id_st1": "199",
        "id_st2": "157"
    },
    {
        "id": "487875",
        "id_pas": "31065",
        "datetime": "24.04.2024 19:15:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "19.04.2024 20:32:28",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:12:10",
        "id_st1": "157",
        "id_st2": "199"
    },
    {
        "id": "487882",
        "id_pas": "30359",
        "datetime": "24.04.2024 8:15:00",
        "time3": "07:58:38",
        "time4": "08:34:19",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 21:02:55",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:38:40",
        "id_st1": "106",
        "id_st2": "224"
    },
    {
        "id": "487887",
        "id_pas": "30359",
        "datetime": "24.04.2024 17:05:00",
        "time3": "17:02:28",
        "time4": "17:45:31",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 21:03:54",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:50:40",
        "id_st1": "224",
        "id_st2": "106"
    },
    {
        "id": "487917",
        "id_pas": "13814",
        "datetime": "24.04.2024 18:15:00",
        "time3": "18:07:30",
        "time4": "19:05:09",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 22:55:34",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:30:30",
        "id_st1": "316",
        "id_st2": "122"
    },
    {
        "id": "487918",
        "id_pas": "13814",
        "datetime": "24.04.2024 22:10:00",
        "time3": "21:58:11",
        "time4": "22:45:11",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "19.04.2024 22:56:10",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:30:30",
        "id_st1": "122",
        "id_st2": "316"
    },
    {
        "id": "487932",
        "id_pas": "4311",
        "datetime": "24.04.2024 7:50:00",
        "time3": "07:53:22",
        "time4": "08:28:00",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 7:20:28",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:46:00",
        "id_st1": "51",
        "id_st2": "246"
    },
    {
        "id": "487937",
        "id_pas": "4311",
        "datetime": "24.04.2024 11:50:00",
        "time3": "11:47:56",
        "time4": "12:28:08",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 7:21:40",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:48:00",
        "id_st1": "246",
        "id_st2": "344"
    },
    {
        "id": "487960",
        "id_pas": "43914",
        "datetime": "24.04.2024 10:30:00",
        "time3": "10:12:15",
        "time4": "11:10:58",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 9:51:41",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:01:00",
        "id_st1": "364",
        "id_st2": "18"
    },
    {
        "id": "487964",
        "id_pas": "43914",
        "datetime": "24.04.2024 18:15:00",
        "time3": "18:17:00",
        "time4": "18:53:51",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 9:52:52",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:01:00",
        "id_st1": "18",
        "id_st2": "364"
    },
    {
        "id": "487995",
        "id_pas": "17041",
        "datetime": "24.04.2024 9:00:00",
        "time3": "09:02:25",
        "time4": "09:39:45",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 11:04:33",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:59:40",
        "id_st1": "116",
        "id_st2": "122"
    },
    {
        "id": "488000",
        "id_pas": "17041",
        "datetime": "24.04.2024 16:50:00",
        "time3": "16:43:39",
        "time4": "17:39:35",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 11:05:02",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:04:40",
        "id_st1": "122",
        "id_st2": "116"
    },
    {
        "id": "488037",
        "id_pas": "47105",
        "datetime": "24.04.2024 9:30:00",
        "time3": "09:22:10",
        "time4": "09:51:44",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 12:06:20",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:48:00",
        "id_st1": "149",
        "id_st2": "174"
    },
    {
        "id": "488041",
        "id_pas": "47105",
        "datetime": "24.04.2024 16:15:00",
        "time3": "16:08:45",
        "time4": "16:52:19",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 12:07:36",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:48:00",
        "id_st1": "174",
        "id_st2": "149"
    },
    {
        "id": "488045",
        "id_pas": "3424",
        "datetime": "24.04.2024 9:00:00",
        "time3": "08:57:52",
        "time4": "09:27:48",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 12:09:46",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:49:00",
        "id_st1": "110",
        "id_st2": "126"
    },
    {
        "id": "488050",
        "id_pas": "3424",
        "datetime": "24.04.2024 14:15:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗ",
        "status": "Не подтверждена",
        "tpz": "20.04.2024 12:11:43",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:54:00",
        "id_st1": "126",
        "id_st2": "110"
    },
    {
        "id": "488059",
        "id_pas": "18720",
        "datetime": "24.04.2024 9:45:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "20.04.2024 12:36:41",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:01:30",
        "id_st1": "64",
        "id_st2": "17"
    },
    {
        "id": "488062",
        "id_pas": "26987",
        "datetime": "24.04.2024 7:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Не подтверждена",
        "tpz": "20.04.2024 12:44:09",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:39:50",
        "id_st1": "115",
        "id_st2": "109"
    },
    {
        "id": "488067",
        "id_pas": "26987",
        "datetime": "24.04.2024 15:10:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "20.04.2024 12:44:45",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:39:50",
        "id_st1": "109",
        "id_st2": "115"
    },
    {
        "id": "488098",
        "id_pas": "35801",
        "datetime": "24.04.2024 9:10:00",
        "time3": "09:12:47",
        "time4": "09:54:33",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 13:47:51",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:53:45",
        "id_st1": "347",
        "id_st2": "90"
    },
    {
        "id": "488099",
        "id_pas": "35801",
        "datetime": "24.04.2024 19:00:00",
        "time3": "19:03:47",
        "time4": "19:57:41",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 13:48:23",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:55:45",
        "id_st1": "90",
        "id_st2": "347"
    },
    {
        "id": "488104",
        "id_pas": "32305",
        "datetime": "24.04.2024 7:30:00",
        "time3": "07:33:11",
        "time4": "08:02:44",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 13:52:38",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:37:50",
        "id_st1": "114",
        "id_st2": "109"
    },
    {
        "id": "488135",
        "id_pas": "35582",
        "datetime": "24.04.2024 8:25:00",
        "time3": "08:39:37",
        "time4": "09:05:37",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 15:58:34",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:31:55",
        "id_st1": "190",
        "id_st2": "187"
    },
    {
        "id": "488139",
        "id_pas": "35582",
        "datetime": "24.04.2024 15:00:00",
        "time3": "15:01:09",
        "time4": "15:17:26",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 15:59:00",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:31:55",
        "id_st1": "187",
        "id_st2": "190"
    },
    {
        "id": "488176",
        "id_pas": "43593",
        "datetime": "24.04.2024 8:00:00",
        "time3": "08:03:00",
        "time4": "08:48:39",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 19:11:56",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:53:10",
        "id_st1": "213",
        "id_st2": "224"
    },
    {
        "id": "488180",
        "id_pas": "43593",
        "datetime": "24.04.2024 19:05:00",
        "time3": "19:08:18",
        "time4": "20:01:08",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 19:13:25",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:53:10",
        "id_st1": "224",
        "id_st2": "213"
    },
    {
        "id": "488196",
        "id_pas": "47095",
        "datetime": "24.04.2024 9:50:00",
        "time3": "09:54:19",
        "time4": "10:42:31",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 19:36:02",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:47:00",
        "id_st1": "83",
        "id_st2": "96"
    },
    {
        "id": "488198",
        "id_pas": "47095",
        "datetime": "24.04.2024 16:10:00",
        "time3": "16:01:46",
        "time4": "16:56:38",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 19:37:09",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:46:40",
        "id_st1": "96",
        "id_st2": "83"
    },
    {
        "id": "488202",
        "id_pas": "3669",
        "datetime": "24.04.2024 9:30:00",
        "time3": "09:27:16",
        "time4": "10:46:15",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 19:40:20",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:48:00",
        "id_st1": "42",
        "id_st2": "64"
    },
    {
        "id": "488203",
        "id_pas": "3669",
        "datetime": "24.04.2024 16:00:00",
        "time3": "15:41:40",
        "time4": "17:38:24",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 19:41:09",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:53:00",
        "id_st1": "64",
        "id_st2": "42"
    },
    {
        "id": "488210",
        "id_pas": "43941",
        "datetime": "24.04.2024 7:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "20.04.2024 20:06:57",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:58:50",
        "id_st1": "168",
        "id_st2": "96"
    },
    {
        "id": "488233",
        "id_pas": "36720",
        "datetime": "24.04.2024 10:20:00",
        "time3": "10:17:03",
        "time4": "10:58:07",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 22:13:53",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:14:00",
        "id_st1": "322",
        "id_st2": "31"
    },
    {
        "id": "488235",
        "id_pas": "36720",
        "datetime": "24.04.2024 17:00:00",
        "time3": "17:00:57",
        "time4": "18:10:42",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 22:15:52",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:14:00",
        "id_st1": "31",
        "id_st2": "322"
    },
    {
        "id": "488237",
        "id_pas": "22790",
        "datetime": "24.04.2024 10:15:00",
        "time3": "10:21:59",
        "time4": "11:29:05",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 22:26:17",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:55:10",
        "id_st1": "19",
        "id_st2": "90"
    },
    {
        "id": "488240",
        "id_pas": "22790",
        "datetime": "24.04.2024 17:00:00",
        "time3": "16:56:21",
        "time4": "17:39:02",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 22:27:06",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:55:10",
        "id_st1": "90",
        "id_st2": "19"
    },
    {
        "id": "488248",
        "id_pas": "1344",
        "datetime": "24.04.2024 7:00:00",
        "time3": "06:53:27",
        "time4": "08:08:34",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "20.04.2024 22:42:23",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:03:40",
        "id_st1": "172",
        "id_st2": "29"
    },
    {
        "id": "488255",
        "id_pas": "38694",
        "datetime": "24.04.2024 12:00:00",
        "time3": "11:55:08",
        "time4": "12:58:43",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 5:57:03",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:03:20",
        "id_st1": "117",
        "id_st2": "164"
    },
    {
        "id": "488260",
        "id_pas": "38694",
        "datetime": "24.04.2024 19:10:00",
        "time3": "19:10:00",
        "time4": "20:00:45",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 5:58:13",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:03:20",
        "id_st1": "164",
        "id_st2": "117"
    },
    {
        "id": "488273",
        "id_pas": "3315",
        "datetime": "24.04.2024 8:10:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "21.04.2024 8:09:18",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:59:35",
        "id_st1": "149",
        "id_st2": "73"
    },
    {
        "id": "488275",
        "id_pas": "3315",
        "datetime": "24.04.2024 15:50:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "21.04.2024 8:10:05",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:01:35",
        "id_st1": "73",
        "id_st2": "149"
    },
    {
        "id": "488286",
        "id_pas": "6437",
        "datetime": "24.04.2024 9:40:00",
        "time3": "09:45:09",
        "time4": "10:19:18",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 9:14:49",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:43:20",
        "id_st1": "182",
        "id_st2": "140"
    },
    {
        "id": "488287",
        "id_pas": "6437",
        "datetime": "24.04.2024 12:10:00",
        "time3": "12:09:03",
        "time4": "13:09:19",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 9:15:08",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:05:00",
        "id_st1": "140",
        "id_st2": "118"
    },
    {
        "id": "488293",
        "id_pas": "21439",
        "datetime": "24.04.2024 7:45:00",
        "time3": "07:43:50",
        "time4": "08:07:48",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 9:55:49",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:37:00",
        "id_st1": "256",
        "id_st2": "243"
    },
    {
        "id": "488298",
        "id_pas": "21439",
        "datetime": "24.04.2024 15:30:00",
        "time3": "15:21:38",
        "time4": "15:47:39",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 9:56:28",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:37:00",
        "id_st1": "243",
        "id_st2": "256"
    },
    {
        "id": "488318",
        "id_pas": "40172",
        "datetime": "24.04.2024 7:35:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ОВ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "21.04.2024 10:34:07",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:49:30",
        "id_st1": "74",
        "id_st2": "133"
    },
    {
        "id": "488337",
        "id_pas": "20913",
        "datetime": "24.04.2024 11:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "21.04.2024 11:11:14",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:04:00",
        "id_st1": "251",
        "id_st2": "97"
    },
    {
        "id": "488357",
        "id_pas": "45665",
        "datetime": "24.04.2024 8:40:00",
        "time3": "08:41:17",
        "time4": "09:21:00",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 12:13:27",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:44:20",
        "id_st1": "170",
        "id_st2": "109"
    },
    {
        "id": "488361",
        "id_pas": "45665",
        "datetime": "24.04.2024 13:00:00",
        "time3": "13:00:37",
        "time4": "13:31:17",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 12:14:08",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:44:20",
        "id_st1": "109",
        "id_st2": "170"
    },
    {
        "id": "488365",
        "id_pas": "3776",
        "datetime": "24.04.2024 7:00:00",
        "time3": "06:53:18",
        "time4": "07:14:57",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 12:25:25",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:43:00",
        "id_st1": "59",
        "id_st2": "91"
    },
    {
        "id": "488370",
        "id_pas": "3776",
        "datetime": "24.04.2024 14:30:00",
        "time3": "14:33:16",
        "time4": "15:06:12",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 12:26:02",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:41:00",
        "id_st1": "91",
        "id_st2": "81"
    },
    {
        "id": "488384",
        "id_pas": "33944",
        "datetime": "24.04.2024 17:45:00",
        "time3": "17:40:15",
        "time4": "18:07:46",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 12:58:01",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:41:00",
        "id_st1": "165",
        "id_st2": "159"
    },
    {
        "id": "488406",
        "id_pas": "40828",
        "datetime": "24.04.2024 7:00:00",
        "time3": "06:46:56",
        "time4": "07:51:57",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 14:14:46",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:06:15",
        "id_st1": "184",
        "id_st2": "246"
    },
    {
        "id": "488411",
        "id_pas": "40828",
        "datetime": "24.04.2024 18:30:00",
        "time3": "18:30:36",
        "time4": "19:40:13",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 14:15:42",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:08:50",
        "id_st1": "246",
        "id_st2": "184"
    },
    {
        "id": "488437",
        "id_pas": "18753",
        "datetime": "24.04.2024 7:10:00",
        "time3": "07:09:35",
        "time4": "07:55:36",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 15:19:03",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:50:00",
        "id_st1": "3",
        "id_st2": "91"
    },
    {
        "id": "488443",
        "id_pas": "18753",
        "datetime": "24.04.2024 15:00:00",
        "time3": "14:48:49",
        "time4": "15:27:05",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 15:19:54",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:50:00",
        "id_st1": "91",
        "id_st2": "3"
    },
    {
        "id": "488449",
        "id_pas": "26099",
        "datetime": "24.04.2024 8:40:00",
        "time3": "08:42:28",
        "time4": "09:37:16",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 15:21:55",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:59:00",
        "id_st1": "63",
        "id_st2": "364"
    },
    {
        "id": "488454",
        "id_pas": "47385",
        "datetime": "24.04.2024 8:40:00",
        "time3": "08:42:00",
        "time4": "09:37:24",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 15:24:45",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:59:00",
        "id_st1": "63",
        "id_st2": "364"
    },
    {
        "id": "488497",
        "id_pas": "628",
        "datetime": "24.04.2024 15:45:00",
        "time3": "15:38:52",
        "time4": "16:09:32",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 17:29:30",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:32:00",
        "id_st1": "97",
        "id_st2": "94"
    },
    {
        "id": "488504",
        "id_pas": "3301",
        "datetime": "24.04.2024 6:55:00",
        "time3": "06:57:36",
        "time4": "07:55:07",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 18:31:13",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:20:10",
        "id_st1": "422",
        "id_st2": "224"
    },
    {
        "id": "488510",
        "id_pas": "3301",
        "datetime": "24.04.2024 18:00:00",
        "time3": "18:07:00",
        "time4": "19:05:01",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 18:33:05",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:20:10",
        "id_st1": "224",
        "id_st2": "422"
    },
    {
        "id": "488515",
        "id_pas": "46724",
        "datetime": "24.04.2024 7:50:00",
        "time3": "07:48:07",
        "time4": "08:29:07",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 18:35:00",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:58:25",
        "id_st1": "97",
        "id_st2": "246"
    },
    {
        "id": "488521",
        "id_pas": "46724",
        "datetime": "24.04.2024 16:45:00",
        "time3": "16:48:00",
        "time4": "17:27:00",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 18:35:51",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:52:00",
        "id_st1": "246",
        "id_st2": "97"
    },
    {
        "id": "488523",
        "id_pas": "3332",
        "datetime": "24.04.2024 14:20:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗ",
        "status": "Отмена заявки по неявке пассажира",
        "tpz": "21.04.2024 18:35:55",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:35:00",
        "id_st1": "3",
        "id_st2": "81"
    },
    {
        "id": "488527",
        "id_pas": "9992",
        "datetime": "24.04.2024 14:20:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗ",
        "status": "Отмена заявки по неявке пассажира",
        "tpz": "21.04.2024 18:37:27",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:35:00",
        "id_st1": "3",
        "id_st2": "81"
    },
    {
        "id": "488554",
        "id_pas": "2386",
        "datetime": "24.04.2024 15:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИО",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "21.04.2024 19:42:01",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:53:10",
        "id_st1": "105",
        "id_st2": "128"
    },
    {
        "id": "488559",
        "id_pas": "2386",
        "datetime": "24.04.2024 19:50:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИО",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "21.04.2024 19:43:19",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:53:10",
        "id_st1": "128",
        "id_st2": "105"
    },
    {
        "id": "488575",
        "id_pas": "47416",
        "datetime": "24.04.2024 9:10:00",
        "time3": "09:11:08",
        "time4": "09:41:55",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 20:10:36",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:45:00",
        "id_st1": "6",
        "id_st2": "34"
    },
    {
        "id": "488579",
        "id_pas": "35652",
        "datetime": "24.04.2024 13:30:00",
        "time3": "13:30:00",
        "time4": "14:28:12",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 20:31:16",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:03:00",
        "id_st1": "171",
        "id_st2": "133"
    },
    {
        "id": "488580",
        "id_pas": "35652",
        "datetime": "24.04.2024 16:15:00",
        "time3": "16:26:34",
        "time4": "17:02:41",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 20:31:58",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:03:00",
        "id_st1": "133",
        "id_st2": "171"
    },
    {
        "id": "488584",
        "id_pas": "24030",
        "datetime": "24.04.2024 9:00:00",
        "time3": "08:55:55",
        "time4": "09:31:21",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 20:41:13",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:43:50",
        "id_st1": "92",
        "id_st2": "8"
    },
    {
        "id": "488594",
        "id_pas": "24529",
        "datetime": "24.04.2024 12:00:00",
        "time3": "12:05:41",
        "time4": "13:15:32",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 21:38:34",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:06:00",
        "id_st1": "66",
        "id_st2": "60"
    },
    {
        "id": "488599",
        "id_pas": "24529",
        "datetime": "24.04.2024 18:30:00",
        "time3": "18:15:10",
        "time4": "19:05:10",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 21:39:19",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:06:00",
        "id_st1": "60",
        "id_st2": "66"
    },
    {
        "id": "488606",
        "id_pas": "42968",
        "datetime": "24.04.2024 10:00:00",
        "time3": "10:09:21",
        "time4": "10:57:50",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 21:47:20",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:52:00",
        "id_st1": "170",
        "id_st2": "173"
    },
    {
        "id": "488610",
        "id_pas": "42968",
        "datetime": "24.04.2024 14:20:00",
        "time3": "14:40:34",
        "time4": "15:23:45",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 21:47:46",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:52:00",
        "id_st1": "173",
        "id_st2": "170"
    },
    {
        "id": "488622",
        "id_pas": "30743",
        "datetime": "24.04.2024 9:00:00",
        "time3": "08:59:36",
        "time4": "10:03:08",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 22:41:53",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:08:40",
        "id_st1": "111",
        "id_st2": "1"
    },
    {
        "id": "488623",
        "id_pas": "30743",
        "datetime": "24.04.2024 18:30:00",
        "time3": "18:30:28",
        "time4": "19:16:01",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 22:42:19",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:47:20",
        "id_st1": "102",
        "id_st2": "111"
    },
    {
        "id": "488625",
        "id_pas": "34957",
        "datetime": "24.04.2024 14:00:00",
        "time3": "13:55:51",
        "time4": "15:00:37",
        "cat_pas": "ПЛ",
        "status": "Заявка закончена",
        "tpz": "21.04.2024 23:38:14",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:12:25",
        "id_st1": "179",
        "id_st2": "289"
    },
    {
        "id": "488648",
        "id_pas": "25560",
        "datetime": "24.04.2024 7:00:00",
        "time3": "07:01:59",
        "time4": "08:14:29",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 7:49:37",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:32:20",
        "id_st1": "51",
        "id_st2": "250"
    },
    {
        "id": "488652",
        "id_pas": "30678",
        "datetime": "24.04.2024 9:07:00",
        "time3": "09:08:06",
        "time4": "09:40:05",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 8:22:30",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:36:00",
        "id_st1": "80",
        "id_st2": "103"
    },
    {
        "id": "488653",
        "id_pas": "30678",
        "datetime": "24.04.2024 12:15:00",
        "time3": "12:12:08",
        "time4": "12:42:16",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 8:23:00",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:41:00",
        "id_st1": "103",
        "id_st2": "80"
    },
    {
        "id": "488657",
        "id_pas": "44983",
        "datetime": "24.04.2024 14:30:00",
        "time3": "14:28:30",
        "time4": "15:37:35",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 8:45:18",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:47:00",
        "id_st1": "132",
        "id_st2": "73"
    },
    {
        "id": "488658",
        "id_pas": "44983",
        "datetime": "24.04.2024 18:00:00",
        "time3": "18:00:23",
        "time4": "18:40:34",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 8:45:34",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:49:00",
        "id_st1": "73",
        "id_st2": "132"
    },
    {
        "id": "488668",
        "id_pas": "18103",
        "datetime": "24.04.2024 11:30:00",
        "time3": "11:16:54",
        "time4": "12:14:45",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 9:16:21",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:06:40",
        "id_st1": "139",
        "id_st2": "97"
    },
    {
        "id": "488669",
        "id_pas": "18103",
        "datetime": "24.04.2024 18:30:00",
        "time3": "18:33:41",
        "time4": "19:31:14",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 9:16:38",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:06:40",
        "id_st1": "97",
        "id_st2": "139"
    },
    {
        "id": "488674",
        "id_pas": "40503",
        "datetime": "24.04.2024 9:00:00",
        "time3": "09:08:24",
        "time4": "09:37:10",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 9:29:58",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:37:00",
        "id_st1": "89",
        "id_st2": "81"
    },
    {
        "id": "488686",
        "id_pas": "3667",
        "datetime": "24.04.2024 6:30:00",
        "time3": "06:38:11",
        "time4": "07:28:48",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 9:57:26",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:58:25",
        "id_st1": "43",
        "id_st2": "142"
    },
    {
        "id": "488692",
        "id_pas": "31122",
        "datetime": "24.04.2024 7:55:00",
        "time3": "07:57:25",
        "time4": "08:41:18",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 10:03:24",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:36:00",
        "id_st1": "80",
        "id_st2": "29"
    },
    {
        "id": "488716",
        "id_pas": "30402",
        "datetime": "24.04.2024 8:15:00",
        "time3": "08:24:05",
        "time4": "09:17:10",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 11:01:22",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:04:25",
        "id_st1": "66",
        "id_st2": "50"
    },
    {
        "id": "488717",
        "id_pas": "30402",
        "datetime": "24.04.2024 13:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по неявке пассажира",
        "tpz": "22.04.2024 11:01:35",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "02:01:35",
        "id_st1": "51",
        "id_st2": "66"
    },
    {
        "id": "488734",
        "id_pas": "32193",
        "datetime": "24.04.2024 8:58:00",
        "time3": "09:00:00",
        "time4": "09:34:28",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 11:30:53",
        "INSP_SEX_M": "5",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:40:40",
        "id_st1": "29",
        "id_st2": "34"
    },
    {
        "id": "488736",
        "id_pas": "45001",
        "datetime": "24.04.2024 10:10:00",
        "time3": "10:04:44",
        "time4": "10:47:19",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 11:33:22",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:51:15",
        "id_st1": "183",
        "id_st2": "121"
    },
    {
        "id": "488739",
        "id_pas": "34626",
        "datetime": "24.04.2024 8:58:00",
        "time3": "09:00:00",
        "time4": "09:39:34",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 11:33:55",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:40:40",
        "id_st1": "29",
        "id_st2": "34"
    },
    {
        "id": "488742",
        "id_pas": "31691",
        "datetime": "24.04.2024 17:20:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "22.04.2024 11:37:00",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:44:10",
        "id_st1": "164",
        "id_st2": "128"
    },
    {
        "id": "488743",
        "id_pas": "31691",
        "datetime": "24.04.2024 21:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "22.04.2024 11:37:15",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:40:55",
        "id_st1": "128",
        "id_st2": "183"
    },
    {
        "id": "488744",
        "id_pas": "43063",
        "datetime": "24.04.2024 12:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "22.04.2024 11:58:28",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:43:05",
        "id_st1": "53",
        "id_st2": "90"
    },
    {
        "id": "488745",
        "id_pas": "43063",
        "datetime": "24.04.2024 18:40:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "22.04.2024 11:58:45",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:45:05",
        "id_st1": "90",
        "id_st2": "53"
    },
    {
        "id": "488747",
        "id_pas": "35156",
        "datetime": "24.04.2024 10:15:00",
        "time3": "10:14:02",
        "time4": "10:54:51",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 12:12:24",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:56:45",
        "id_st1": "353",
        "id_st2": "181"
    },
    {
        "id": "488750",
        "id_pas": "35156",
        "datetime": "24.04.2024 14:45:00",
        "time3": "14:47:16",
        "time4": "15:17:45",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 12:13:12",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:56:45",
        "id_st1": "181",
        "id_st2": "353"
    },
    {
        "id": "488754",
        "id_pas": "3426",
        "datetime": "24.04.2024 7:20:00",
        "time3": "07:20:29",
        "time4": "08:12:07",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 12:18:59",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:58:25",
        "id_st1": "80",
        "id_st2": "246"
    },
    {
        "id": "488760",
        "id_pas": "3426",
        "datetime": "24.04.2024 17:25:00",
        "time3": "17:38:42",
        "time4": "18:19:53",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 12:19:49",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:55:45",
        "id_st1": "246",
        "id_st2": "80"
    },
    {
        "id": "488770",
        "id_pas": "47234",
        "datetime": "24.04.2024 14:00:00",
        "time3": "13:51:00",
        "time4": "14:44:52",
        "cat_pas": "ПЛ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 12:54:06",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:00:00",
        "id_st1": "140",
        "id_st2": "118"
    },
    {
        "id": "488771",
        "id_pas": "47428",
        "datetime": "24.04.2024 10:40:00",
        "time3": "10:39:32",
        "time4": "11:42:15",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 13:02:41",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:10:15",
        "id_st1": "134",
        "id_st2": "250"
    },
    {
        "id": "488776",
        "id_pas": "14569",
        "datetime": "24.04.2024 12:45:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ОГД",
        "status": "Отказ по регламенту",
        "tpz": "22.04.2024 13:10:38",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "2",
        "TIME_OVER": "00:46:20",
        "id_st1": "93",
        "id_st2": "5"
    },
    {
        "id": "488778",
        "id_pas": "3409",
        "datetime": "24.04.2024 9:20:00",
        "time3": "09:23:43",
        "time4": "10:23:28",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 13:22:19",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:08:50",
        "id_st1": "170",
        "id_st2": "96"
    },
    {
        "id": "488779",
        "id_pas": "3409",
        "datetime": "24.04.2024 12:45:00",
        "time3": "12:45:34",
        "time4": "13:30:28",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 13:23:09",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:00:25",
        "id_st1": "96",
        "id_st2": "246"
    },
    {
        "id": "488780",
        "id_pas": "3409",
        "datetime": "24.04.2024 20:15:00",
        "time3": "20:13:12",
        "time4": "21:15:38",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 13:23:36",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:13:20",
        "id_st1": "246",
        "id_st2": "170"
    },
    {
        "id": "488784",
        "id_pas": "31146",
        "datetime": "24.04.2024 6:45:00",
        "time3": "06:46:55",
        "time4": "07:20:12",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 13:26:18",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:38:00",
        "id_st1": "80",
        "id_st2": "145"
    },
    {
        "id": "488821",
        "id_pas": "3807",
        "datetime": "24.04.2024 7:10:00",
        "time3": "07:13:37",
        "time4": "08:01:33",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 16:02:45",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:07:20",
        "id_st1": "109",
        "id_st2": "361"
    },
    {
        "id": "488825",
        "id_pas": "3807",
        "datetime": "24.04.2024 11:50:00",
        "time3": "11:38:22",
        "time4": "12:31:02",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 16:04:32",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:07:20",
        "id_st1": "361",
        "id_st2": "109"
    },
    {
        "id": "488829",
        "id_pas": "45520",
        "datetime": "24.04.2024 9:40:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "РДК",
        "status": "Не подтверждена",
        "tpz": "22.04.2024 16:17:43",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:36:50",
        "id_st1": "364",
        "id_st2": "107"
    },
    {
        "id": "488831",
        "id_pas": "45520",
        "datetime": "24.04.2024 12:40:00",
        "time3": "12:47:14",
        "time4": "13:22:16",
        "cat_pas": "РДК",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 16:18:08",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:36:50",
        "id_st1": "107",
        "id_st2": "364"
    },
    {
        "id": "488842",
        "id_pas": "38645",
        "datetime": "24.04.2024 14:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "22.04.2024 17:03:15",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:00:10",
        "id_st1": "1",
        "id_st2": "17"
    },
    {
        "id": "488843",
        "id_pas": "38645",
        "datetime": "24.04.2024 18:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "22.04.2024 17:03:32",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:00:10",
        "id_st1": "17",
        "id_st2": "1"
    },
    {
        "id": "488848",
        "id_pas": "30673",
        "datetime": "24.04.2024 11:30:00",
        "time3": "11:20:32",
        "time4": "12:13:04",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 17:09:48",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:00:40",
        "id_st1": "1",
        "id_st2": "57"
    },
    {
        "id": "488849",
        "id_pas": "30673",
        "datetime": "24.04.2024 21:40:00",
        "time3": "21:39:03",
        "time4": "22:15:37",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 17:10:08",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:00:40",
        "id_st1": "57",
        "id_st2": "1"
    },
    {
        "id": "488858",
        "id_pas": "29253",
        "datetime": "24.04.2024 15:45:00",
        "time3": "15:40:00",
        "time4": "16:19:00",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 17:54:33",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:16:10",
        "id_st1": "96",
        "id_st2": "122"
    },
    {
        "id": "488859",
        "id_pas": "29253",
        "datetime": "24.04.2024 18:45:00",
        "time3": "18:29:54",
        "time4": "19:25:33",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 17:54:54",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:16:10",
        "id_st1": "122",
        "id_st2": "96"
    },
    {
        "id": "488862",
        "id_pas": "40284",
        "datetime": "24.04.2024 9:00:00",
        "time3": "08:54:04",
        "time4": "09:41:14",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 18:06:52",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:11:00",
        "id_st1": "113",
        "id_st2": "109"
    },
    {
        "id": "488863",
        "id_pas": "40774",
        "datetime": "24.04.2024 19:25:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Не подтверждена",
        "tpz": "22.04.2024 18:07:24",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:06:00",
        "id_st1": "29",
        "id_st2": "187"
    },
    {
        "id": "488864",
        "id_pas": "40284",
        "datetime": "24.04.2024 10:15:00",
        "time3": "09:54:40",
        "time4": "10:46:20",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 18:07:37",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:11:00",
        "id_st1": "109",
        "id_st2": "113"
    },
    {
        "id": "488871",
        "id_pas": "30608",
        "datetime": "24.04.2024 7:10:00",
        "time3": "07:14:17",
        "time4": "07:57:42",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 18:23:48",
        "INSP_SEX_M": "5",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:57:30",
        "id_st1": "6",
        "id_st2": "139"
    },
    {
        "id": "488872",
        "id_pas": "44451",
        "datetime": "24.04.2024 6:52:00",
        "time3": "06:55:06",
        "time4": "07:46:50",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 18:24:05",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:01:40",
        "id_st1": "34",
        "id_st2": "228"
    },
    {
        "id": "488874",
        "id_pas": "30608",
        "datetime": "24.04.2024 13:00:00",
        "time3": "12:56:32",
        "time4": "13:12:20",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 18:25:04",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:34:20",
        "id_st1": "145",
        "id_st2": "86"
    },
    {
        "id": "488875",
        "id_pas": "30608",
        "datetime": "24.04.2024 21:30:00",
        "time3": "21:31:09",
        "time4": "22:01:21",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 18:25:48",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:34:20",
        "id_st1": "86",
        "id_st2": "145"
    },
    {
        "id": "488879",
        "id_pas": "6025",
        "datetime": "24.04.2024 17:39:00",
        "time3": "17:41:04",
        "time4": "18:40:50",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 18:39:08",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:03:00",
        "id_st1": "2",
        "id_st2": "332"
    },
    {
        "id": "488880",
        "id_pas": "42177",
        "datetime": "24.04.2024 11:40:00",
        "time3": "11:31:48",
        "time4": "12:17:33",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 18:50:03",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:11:20",
        "id_st1": "151",
        "id_st2": "122"
    },
    {
        "id": "488881",
        "id_pas": "42177",
        "datetime": "24.04.2024 15:00:00",
        "time3": "15:09:21",
        "time4": "16:00:58",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 18:50:39",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:16:20",
        "id_st1": "122",
        "id_st2": "151"
    },
    {
        "id": "488886",
        "id_pas": "32300",
        "datetime": "24.04.2024 6:46:00",
        "time3": "06:52:08",
        "time4": "07:40:14",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 19:13:19",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:11:30",
        "id_st1": "6",
        "id_st2": "107"
    },
    {
        "id": "488894",
        "id_pas": "47374",
        "datetime": "24.04.2024 9:30:00",
        "time3": "09:26:56",
        "time4": "09:40:57",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 19:58:13",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:34:00",
        "id_st1": "37",
        "id_st2": "365"
    },
    {
        "id": "488895",
        "id_pas": "47440",
        "datetime": "24.04.2024 12:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "РДК",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "22.04.2024 20:03:47",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:49:00",
        "id_st1": "1",
        "id_st2": "143"
    },
    {
        "id": "488896",
        "id_pas": "47440",
        "datetime": "24.04.2024 14:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "РДК",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "22.04.2024 20:04:42",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:49:00",
        "id_st1": "143",
        "id_st2": "1"
    },
    {
        "id": "488903",
        "id_pas": "39662",
        "datetime": "24.04.2024 9:30:00",
        "time3": "09:32:55",
        "time4": "10:26:30",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 21:00:46",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:03:40",
        "id_st1": "139",
        "id_st2": "96"
    },
    {
        "id": "488915",
        "id_pas": "31122",
        "datetime": "24.04.2024 17:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "22.04.2024 22:26:55",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:37:45",
        "id_st1": "29",
        "id_st2": "156"
    },
    {
        "id": "488918",
        "id_pas": "37351",
        "datetime": "24.04.2024 11:30:00",
        "time3": "11:30:23",
        "time4": "12:27:44",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 22:44:28",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:30:00",
        "id_st1": "174",
        "id_st2": "363"
    },
    {
        "id": "488926",
        "id_pas": "37351",
        "datetime": "24.04.2024 14:30:00",
        "time3": "14:36:52",
        "time4": "14:48:06",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 22:46:21",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:30:00",
        "id_st1": "363",
        "id_st2": "174"
    },
    {
        "id": "488934",
        "id_pas": "35172",
        "datetime": "24.04.2024 17:00:00",
        "time3": "17:04:26",
        "time4": "18:04:49",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 23:11:23",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:59:30",
        "id_st1": "136",
        "id_st2": "89"
    },
    {
        "id": "488935",
        "id_pas": "45019",
        "datetime": "24.04.2024 17:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Отмена заявки по неявке пассажира",
        "tpz": "22.04.2024 23:11:58",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:59:30",
        "id_st1": "136",
        "id_st2": "89"
    },
    {
        "id": "488936",
        "id_pas": "45019",
        "datetime": "24.04.2024 22:00:00",
        "time3": "21:55:44",
        "time4": "22:48:07",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 23:12:12",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:59:30",
        "id_st1": "89",
        "id_st2": "136"
    },
    {
        "id": "488937",
        "id_pas": "35172",
        "datetime": "24.04.2024 22:00:00",
        "time3": "21:55:57",
        "time4": "22:48:11",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "22.04.2024 23:12:44",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:57:40",
        "id_st1": "29",
        "id_st2": "136"
    },
    {
        "id": "488942",
        "id_pas": "32156",
        "datetime": "24.04.2024 12:40:00",
        "time3": "12:44:22",
        "time4": "13:41:09",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 5:48:37",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:05:10",
        "id_st1": "24",
        "id_st2": "107"
    },
    {
        "id": "488944",
        "id_pas": "6467",
        "datetime": "24.04.2024 17:50:00",
        "time3": "17:51:21",
        "time4": "18:26:25",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 7:17:53",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:46:00",
        "id_st1": "246",
        "id_st2": "174"
    },
    {
        "id": "488946",
        "id_pas": "42162",
        "datetime": "24.04.2024 7:10:00",
        "time3": "06:54:57",
        "time4": "07:56:10",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 7:38:58",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:09:15",
        "id_st1": "40",
        "id_st2": "246"
    },
    {
        "id": "488952",
        "id_pas": "42162",
        "datetime": "24.04.2024 17:10:00",
        "time3": "17:05:29",
        "time4": "18:25:07",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 7:40:31",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:13:30",
        "id_st1": "246",
        "id_st2": "40"
    },
    {
        "id": "488962",
        "id_pas": "1493",
        "datetime": "24.04.2024 7:40:00",
        "time3": "07:41:33",
        "time4": "09:10:20",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 8:16:54",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:38:40",
        "id_st1": "110",
        "id_st2": "93"
    },
    {
        "id": "488964",
        "id_pas": "1493",
        "datetime": "24.04.2024 16:00:00",
        "time3": "15:56:32",
        "time4": "16:09:49",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 8:17:23",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:05:00",
        "id_st1": "111",
        "id_st2": "111"
    },
    {
        "id": "488966",
        "id_pas": "31822",
        "datetime": "24.04.2024 7:10:00",
        "time3": "07:06:25",
        "time4": "07:40:58",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 8:29:51",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:56:20",
        "id_st1": "250",
        "id_st2": "361"
    },
    {
        "id": "488968",
        "id_pas": "47035",
        "datetime": "24.04.2024 9:30:00",
        "time3": "09:32:59",
        "time4": "10:15:26",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 8:53:31",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:46:10",
        "id_st1": "6",
        "id_st2": "15"
    },
    {
        "id": "488972",
        "id_pas": "33916",
        "datetime": "24.04.2024 15:30:00",
        "time3": "15:26:47",
        "time4": "16:00:48",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:23:57",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:47:50",
        "id_st1": "117",
        "id_st2": "116"
    },
    {
        "id": "488973",
        "id_pas": "33916",
        "datetime": "24.04.2024 16:30:00",
        "time3": "16:27:00",
        "time4": "17:00:19",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:24:16",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:47:50",
        "id_st1": "116",
        "id_st2": "117"
    },
    {
        "id": "488974",
        "id_pas": "32894",
        "datetime": "24.04.2024 12:20:00",
        "time3": "12:17:32",
        "time4": "12:29:41",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:24:58",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:32:00",
        "id_st1": "365",
        "id_st2": "40"
    },
    {
        "id": "488977",
        "id_pas": "33916",
        "datetime": "24.04.2024 17:30:00",
        "time3": "17:26:24",
        "time4": "17:59:10",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:25:30",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:47:50",
        "id_st1": "117",
        "id_st2": "116"
    },
    {
        "id": "488978",
        "id_pas": "33916",
        "datetime": "24.04.2024 18:30:00",
        "time3": "18:34:26",
        "time4": "19:19:23",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:26:46",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:47:50",
        "id_st1": "116",
        "id_st2": "117"
    },
    {
        "id": "488979",
        "id_pas": "3666",
        "datetime": "24.04.2024 7:45:00",
        "time3": "07:40:50",
        "time4": "08:30:13",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:27:25",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:08:30",
        "id_st1": "149",
        "id_st2": "246"
    },
    {
        "id": "488983",
        "id_pas": "3666",
        "datetime": "24.04.2024 17:45:00",
        "time3": "17:44:28",
        "time4": "18:38:28",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:28:14",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:58:20",
        "id_st1": "246",
        "id_st2": "149"
    },
    {
        "id": "488988",
        "id_pas": "24032",
        "datetime": "24.04.2024 8:10:00",
        "time3": "07:59:03",
        "time4": "08:17:42",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:32:34",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:50:50",
        "id_st1": "177",
        "id_st2": "97"
    },
    {
        "id": "488989",
        "id_pas": "24032",
        "datetime": "24.04.2024 15:30:00",
        "time3": "15:30:33",
        "time4": "16:52:10",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:33:00",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:23:55",
        "id_st1": "97",
        "id_st2": "190"
    },
    {
        "id": "488991",
        "id_pas": "32406",
        "datetime": "24.04.2024 9:30:00",
        "time3": "09:30:00",
        "time4": "10:19:00",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:33:50",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:49:00",
        "id_st1": "297",
        "id_st2": "304"
    },
    {
        "id": "488992",
        "id_pas": "32406",
        "datetime": "24.04.2024 10:00:00",
        "time3": "10:14:39",
        "time4": "10:44:33",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:34:27",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:13:30",
        "id_st1": "304",
        "id_st2": "122"
    },
    {
        "id": "488994",
        "id_pas": "32406",
        "datetime": "24.04.2024 14:00:00",
        "time3": "14:03:01",
        "time4": "14:30:33",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:34:58",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:13:30",
        "id_st1": "122",
        "id_st2": "304"
    },
    {
        "id": "488996",
        "id_pas": "32406",
        "datetime": "24.04.2024 14:30:00",
        "time3": "14:30:00",
        "time4": "15:19:00",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 9:35:10",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:49:00",
        "id_st1": "304",
        "id_st2": "297"
    },
    {
        "id": "489018",
        "id_pas": "42743",
        "datetime": "24.04.2024 14:00:00",
        "time3": "13:55:55",
        "time4": "14:52:14",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 10:22:56",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:01:45",
        "id_st1": "256",
        "id_st2": "6"
    },
    {
        "id": "489019",
        "id_pas": "3332",
        "datetime": "24.04.2024 10:20:00",
        "time3": "10:23:14",
        "time4": "11:08:07",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 10:23:00",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:58:30",
        "id_st1": "3",
        "id_st2": "181"
    },
    {
        "id": "489022",
        "id_pas": "3332",
        "datetime": "24.04.2024 11:50:00",
        "time3": "11:58:43",
        "time4": "12:50:36",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 10:25:11",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:58:30",
        "id_st1": "181",
        "id_st2": "3"
    },
    {
        "id": "489029",
        "id_pas": "27409",
        "datetime": "24.04.2024 13:10:00",
        "time3": "13:11:08",
        "time4": "13:44:02",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 10:29:27",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:44:30",
        "id_st1": "73",
        "id_st2": "224"
    },
    {
        "id": "489030",
        "id_pas": "27409",
        "datetime": "24.04.2024 20:40:00",
        "time3": "20:35:18",
        "time4": "21:12:58",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 10:29:58",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:55:30",
        "id_st1": "224",
        "id_st2": "30"
    },
    {
        "id": "489033",
        "id_pas": "4566",
        "datetime": "24.04.2024 14:40:00",
        "time3": "14:30:14",
        "time4": "15:14:00",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 10:37:28",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:53:40",
        "id_st1": "134",
        "id_st2": "97"
    },
    {
        "id": "489034",
        "id_pas": "4566",
        "datetime": "24.04.2024 15:55:00",
        "time3": "15:27:52",
        "time4": "15:45:16",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 10:37:40",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:37:00",
        "id_st1": "97",
        "id_st2": "90"
    },
    {
        "id": "489035",
        "id_pas": "27409",
        "datetime": "24.04.2024 21:40:00",
        "time3": "21:40:04",
        "time4": "22:17:41",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 10:48:46",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:34:20",
        "id_st1": "30",
        "id_st2": "73"
    },
    {
        "id": "489043",
        "id_pas": "41705",
        "datetime": "24.04.2024 10:50:00",
        "time3": "11:15:19",
        "time4": "11:54:23",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 11:18:41",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:01:50",
        "id_st1": "72",
        "id_st2": "133"
    },
    {
        "id": "489044",
        "id_pas": "41705",
        "datetime": "24.04.2024 13:50:00",
        "time3": "13:21:40",
        "time4": "14:20:53",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 11:19:15",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:59:50",
        "id_st1": "133",
        "id_st2": "72"
    },
    {
        "id": "489045",
        "id_pas": "47444",
        "datetime": "24.04.2024 11:00:00",
        "time3": "10:51:46",
        "time4": "12:00:14",
        "cat_pas": "ПЛ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 11:30:14",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:44:30",
        "id_st1": "129",
        "id_st2": "138"
    },
    {
        "id": "489046",
        "id_pas": "47445",
        "datetime": "24.04.2024 11:40:00",
        "time3": "11:46:10",
        "time4": "12:25:35",
        "cat_pas": "РДК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 11:31:26",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:51:00",
        "id_st1": "39",
        "id_st2": "6"
    },
    {
        "id": "489047",
        "id_pas": "47446",
        "datetime": "24.04.2024 11:00:00",
        "time3": "11:06:25",
        "time4": "11:32:09",
        "cat_pas": "РДК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 11:33:15",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:32:10",
        "id_st1": "347",
        "id_st2": "16"
    },
    {
        "id": "489048",
        "id_pas": "27924",
        "datetime": "24.04.2024 15:37:00",
        "time3": "15:36:11",
        "time4": "16:26:39",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 11:37:06",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:48:00",
        "id_st1": "29",
        "id_st2": "96"
    },
    {
        "id": "489049",
        "id_pas": "27924",
        "datetime": "24.04.2024 20:00:00",
        "time3": "20:07:00",
        "time4": "20:44:02",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 11:37:41",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:48:00",
        "id_st1": "96",
        "id_st2": "29"
    },
    {
        "id": "489050",
        "id_pas": "38738",
        "datetime": "24.04.2024 6:30:00",
        "time3": "06:37:46",
        "time4": "06:59:28",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 11:39:07",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:33:40",
        "id_st1": "35",
        "id_st2": "29"
    },
    {
        "id": "489051",
        "id_pas": "47446",
        "datetime": "24.04.2024 15:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "РДК",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 11:39:24",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:20:00",
        "id_st1": "16",
        "id_st2": "16"
    },
    {
        "id": "489057",
        "id_pas": "9545",
        "datetime": "24.04.2024 17:00:00",
        "time3": "16:54:50",
        "time4": "17:44:03",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 11:49:53",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:49:10",
        "id_st1": "109",
        "id_st2": "56"
    },
    {
        "id": "489062",
        "id_pas": "13814",
        "datetime": "24.04.2024 13:50:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 12:17:38",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:03:00",
        "id_st1": "311",
        "id_st2": "91"
    },
    {
        "id": "489063",
        "id_pas": "13814",
        "datetime": "24.04.2024 17:15:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 12:18:49",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:12:00",
        "id_st1": "91",
        "id_st2": "122"
    },
    {
        "id": "489065",
        "id_pas": "22006",
        "datetime": "24.04.2024 11:05:00",
        "time3": "11:11:57",
        "time4": "12:50:35",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:25:58",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:30:15",
        "id_st1": "408",
        "id_st2": "129"
    },
    {
        "id": "489066",
        "id_pas": "22006",
        "datetime": "24.04.2024 17:30:00",
        "time3": "17:35:26",
        "time4": "19:10:18",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:26:20",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:31:05",
        "id_st1": "129",
        "id_st2": "408"
    },
    {
        "id": "489067",
        "id_pas": "9992",
        "datetime": "24.04.2024 10:20:00",
        "time3": "10:23:14",
        "time4": "11:16:57",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:27:50",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:58:30",
        "id_st1": "3",
        "id_st2": "181"
    },
    {
        "id": "489068",
        "id_pas": "9992",
        "datetime": "24.04.2024 11:50:00",
        "time3": "11:56:43",
        "time4": "12:46:44",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:28:10",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:03:30",
        "id_st1": "181",
        "id_st2": "3"
    },
    {
        "id": "489069",
        "id_pas": "3388",
        "datetime": "24.04.2024 10:45:00",
        "time3": "10:43:28",
        "time4": "11:25:26",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:28:10",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:44:00",
        "id_st1": "133",
        "id_st2": "84"
    },
    {
        "id": "489070",
        "id_pas": "22917",
        "datetime": "24.04.2024 16:05:00",
        "time3": "15:57:00",
        "time4": "17:11:18",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:29:42",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:49:00",
        "id_st1": "250",
        "id_st2": "96"
    },
    {
        "id": "489071",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "20:10:37",
        "time4": "21:03:19",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:29:58",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:49:00",
        "id_st1": "96",
        "id_st2": "250"
    },
    {
        "id": "489072",
        "id_pas": "22917",
        "datetime": "24.04.2024 16:20:00",
        "time3": "16:16:00",
        "time4": "17:11:22",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:31:01",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:40:00",
        "id_st1": "151",
        "id_st2": "96"
    },
    {
        "id": "489073",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "20:10:41",
        "time4": "20:47:20",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:31:12",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:40:00",
        "id_st1": "96",
        "id_st2": "151"
    },
    {
        "id": "489074",
        "id_pas": "22917",
        "datetime": "24.04.2024 16:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ОГД",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 12:32:29",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:33:00",
        "id_st1": "80",
        "id_st2": "96"
    },
    {
        "id": "489075",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ОГД",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 12:32:51",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:33:00",
        "id_st1": "96",
        "id_st2": "80"
    },
    {
        "id": "489076",
        "id_pas": "38350",
        "datetime": "24.04.2024 15:30:00",
        "time3": "15:29:37",
        "time4": "16:44:34",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:34:05",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:18:00",
        "id_st1": "171",
        "id_st2": "66"
    },
    {
        "id": "489077",
        "id_pas": "38350",
        "datetime": "24.04.2024 23:00:00",
        "time3": "23:04:00",
        "time4": "00:13:00",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:34:40",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:18:00",
        "id_st1": "66",
        "id_st2": "171"
    },
    {
        "id": "489078",
        "id_pas": "22917",
        "datetime": "24.04.2024 15:45:00",
        "time3": "15:49:28",
        "time4": "17:10:32",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:34:52",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:10:50",
        "id_st1": "173",
        "id_st2": "96"
    },
    {
        "id": "489080",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "20:14:14",
        "time4": "21:06:39",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:35:13",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:10:50",
        "id_st1": "96",
        "id_st2": "173"
    },
    {
        "id": "489081",
        "id_pas": "22917",
        "datetime": "24.04.2024 16:05:00",
        "time3": "16:05:31",
        "time4": "17:10:36",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:36:03",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:58:50",
        "id_st1": "168",
        "id_st2": "96"
    },
    {
        "id": "489082",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "20:14:18",
        "time4": "20:52:43",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:36:18",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:58:50",
        "id_st1": "96",
        "id_st2": "168"
    },
    {
        "id": "489083",
        "id_pas": "22917",
        "datetime": "24.04.2024 16:05:00",
        "time3": "16:05:36",
        "time4": "17:10:44",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:39:20",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:58:50",
        "id_st1": "168",
        "id_st2": "96"
    },
    {
        "id": "489084",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "20:14:27",
        "time4": "20:52:29",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:39:34",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:58:50",
        "id_st1": "96",
        "id_st2": "168"
    },
    {
        "id": "489085",
        "id_pas": "22917",
        "datetime": "24.04.2024 16:10:00",
        "time3": "16:12:08",
        "time4": "17:11:00",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:42:16",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:54:50",
        "id_st1": "166",
        "id_st2": "96"
    },
    {
        "id": "489086",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "20:14:36",
        "time4": "20:48:24",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:42:42",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:54:50",
        "id_st1": "96",
        "id_st2": "166"
    },
    {
        "id": "489087",
        "id_pas": "47451",
        "datetime": "24.04.2024 10:58:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по неявке пассажира",
        "tpz": "23.04.2024 12:45:25",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:59:20",
        "id_st1": "310",
        "id_st2": "34"
    },
    {
        "id": "489088",
        "id_pas": "22917",
        "datetime": "24.04.2024 15:55:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ОГД",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 12:47:23",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:54:00",
        "id_st1": "185",
        "id_st2": "96"
    },
    {
        "id": "489089",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ОГД",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 12:47:43",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:54:00",
        "id_st1": "96",
        "id_st2": "185"
    },
    {
        "id": "489090",
        "id_pas": "22917",
        "datetime": "24.04.2024 16:05:00",
        "time3": "15:55:45",
        "time4": "17:10:29",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:48:28",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:51:00",
        "id_st1": "184",
        "id_st2": "96"
    },
    {
        "id": "489091",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "20:12:13",
        "time4": "20:57:18",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:48:42",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:51:00",
        "id_st1": "96",
        "id_st2": "184"
    },
    {
        "id": "489092",
        "id_pas": "22917",
        "datetime": "24.04.2024 16:30:00",
        "time3": "16:32:22",
        "time4": "17:10:32",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:50:06",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:38:40",
        "id_st1": "130",
        "id_st2": "96"
    },
    {
        "id": "489093",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "20:12:22",
        "time4": "20:29:35",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:50:47",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:38:40",
        "id_st1": "96",
        "id_st2": "130"
    },
    {
        "id": "489094",
        "id_pas": "44781",
        "datetime": "24.04.2024 10:30:00",
        "time3": "10:34:14",
        "time4": "10:49:38",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:51:38",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:29:00",
        "id_st1": "2",
        "id_st2": "3"
    },
    {
        "id": "489095",
        "id_pas": "22917",
        "datetime": "24.04.2024 16:05:00",
        "time3": "15:59:14",
        "time4": "17:12:51",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:55:03",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:56:00",
        "id_st1": "66",
        "id_st2": "96"
    },
    {
        "id": "489096",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "20:10:23",
        "time4": "20:52:35",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:55:17",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:56:00",
        "id_st1": "96",
        "id_st2": "66"
    },
    {
        "id": "489101",
        "id_pas": "22917",
        "datetime": "24.04.2024 16:00:00",
        "time3": "15:55:29",
        "time4": "17:12:42",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:56:40",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:56:00",
        "id_st1": "66",
        "id_st2": "96"
    },
    {
        "id": "489102",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "20:10:28",
        "time4": "21:02:40",
        "cat_pas": "ОГД",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:56:53",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:56:00",
        "id_st1": "96",
        "id_st2": "66"
    },
    {
        "id": "489103",
        "id_pas": "43003",
        "datetime": "24.04.2024 9:45:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 12:58:24",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:30:30",
        "id_st1": "107",
        "id_st2": "103"
    },
    {
        "id": "489104",
        "id_pas": "43003",
        "datetime": "24.04.2024 14:00:00",
        "time3": "13:59:03",
        "time4": "14:22:32",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 12:58:46",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:30:30",
        "id_st1": "103",
        "id_st2": "107"
    },
    {
        "id": "489105",
        "id_pas": "22917",
        "datetime": "24.04.2024 16:15:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ОГД",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 13:02:01",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:51:00",
        "id_st1": "64",
        "id_st2": "96"
    },
    {
        "id": "489106",
        "id_pas": "22917",
        "datetime": "24.04.2024 20:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ОГД",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 13:02:15",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:51:00",
        "id_st1": "96",
        "id_st2": "64"
    },
    {
        "id": "489109",
        "id_pas": "24925",
        "datetime": "24.04.2024 8:00:00",
        "time3": "07:58:31",
        "time4": "09:02:10",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:11:11",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:52:45",
        "id_st1": "210",
        "id_st2": "6"
    },
    {
        "id": "489110",
        "id_pas": "34016",
        "datetime": "24.04.2024 8:00:00",
        "time3": "08:09:25",
        "time4": "09:07:23",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:12:00",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:59:10",
        "id_st1": "73",
        "id_st2": "139"
    },
    {
        "id": "489111",
        "id_pas": "34016",
        "datetime": "24.04.2024 16:45:00",
        "time3": "16:42:17",
        "time4": "17:42:21",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:12:25",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:52:10",
        "id_st1": "139",
        "id_st2": "73"
    },
    {
        "id": "489112",
        "id_pas": "24925",
        "datetime": "24.04.2024 9:10:00",
        "time3": "09:09:00",
        "time4": "09:56:08",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:13:13",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:49:10",
        "id_st1": "6",
        "id_st2": "140"
    },
    {
        "id": "489113",
        "id_pas": "24925",
        "datetime": "24.04.2024 11:15:00",
        "time3": "10:59:12",
        "time4": "11:26:40",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:14:47",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:30:00",
        "id_st1": "140",
        "id_st2": "142"
    },
    {
        "id": "489114",
        "id_pas": "24925",
        "datetime": "24.04.2024 18:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 13:15:42",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:46:30",
        "id_st1": "62",
        "id_st2": "122"
    },
    {
        "id": "489115",
        "id_pas": "6296",
        "datetime": "24.04.2024 8:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 13:16:04",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:12:40",
        "id_st1": "40",
        "id_st2": "26"
    },
    {
        "id": "489116",
        "id_pas": "6296",
        "datetime": "24.04.2024 14:00:00",
        "time3": "13:47:46",
        "time4": "14:43:39",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:17:04",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:32:40",
        "id_st1": "26",
        "id_st2": "35"
    },
    {
        "id": "489117",
        "id_pas": "6296",
        "datetime": "24.04.2024 22:00:00",
        "time3": "22:02:25",
        "time4": "22:39:49",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:17:58",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:20:00",
        "id_st1": "35",
        "id_st2": "40"
    },
    {
        "id": "489118",
        "id_pas": "45376",
        "datetime": "24.04.2024 16:30:00",
        "time3": "16:32:15",
        "time4": "17:50:59",
        "cat_pas": "ИУ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:18:44",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:14:20",
        "id_st1": "44",
        "id_st2": "94"
    },
    {
        "id": "489119",
        "id_pas": "45375",
        "datetime": "24.04.2024 16:30:00",
        "time3": "16:31:43",
        "time4": "17:51:06",
        "cat_pas": "ИУ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:19:12",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:14:20",
        "id_st1": "44",
        "id_st2": "94"
    },
    {
        "id": "489127",
        "id_pas": "33535",
        "datetime": "24.04.2024 10:30:00",
        "time3": "10:35:05",
        "time4": "11:13:10",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:23:36",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:51:00",
        "id_st1": "133",
        "id_st2": "90"
    },
    {
        "id": "489128",
        "id_pas": "33535",
        "datetime": "24.04.2024 12:00:00",
        "time3": "12:03:58",
        "time4": "12:52:58",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:24:10",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:52:10",
        "id_st1": "90",
        "id_st2": "133"
    },
    {
        "id": "489129",
        "id_pas": "45001",
        "datetime": "24.04.2024 12:30:00",
        "time3": "12:28:34",
        "time4": "13:16:09",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:40:03",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:54:20",
        "id_st1": "121",
        "id_st2": "357"
    },
    {
        "id": "489131",
        "id_pas": "31256",
        "datetime": "24.04.2024 14:00:00",
        "time3": "14:00:32",
        "time4": "15:03:44",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:42:30",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:13:20",
        "id_st1": "187",
        "id_st2": "118"
    },
    {
        "id": "489133",
        "id_pas": "25959",
        "datetime": "24.04.2024 5:45:00",
        "time3": "05:44:17",
        "time4": "06:40:23",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:46:10",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:48:00",
        "id_st1": "80",
        "id_st2": "65"
    },
    {
        "id": "489135",
        "id_pas": "25959",
        "datetime": "24.04.2024 14:00:00",
        "time3": "14:06:05",
        "time4": "14:52:34",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 13:47:10",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:42:00",
        "id_st1": "65",
        "id_st2": "80"
    },
    {
        "id": "489141",
        "id_pas": "6499",
        "datetime": "24.04.2024 8:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 14:06:08",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:02:25",
        "id_st1": "140",
        "id_st2": "50"
    },
    {
        "id": "489142",
        "id_pas": "6499",
        "datetime": "24.04.2024 13:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 14:06:31",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:59:35",
        "id_st1": "51",
        "id_st2": "140"
    },
    {
        "id": "489143",
        "id_pas": "47339",
        "datetime": "24.04.2024 12:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 14:13:07",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:02:40",
        "id_st1": "173",
        "id_st2": "10"
    },
    {
        "id": "489145",
        "id_pas": "47339",
        "datetime": "24.04.2024 15:00:00",
        "time3": "14:57:25",
        "time4": "15:20:14",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:16:41",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:36:00",
        "id_st1": "32",
        "id_st2": "6"
    },
    {
        "id": "489146",
        "id_pas": "31571",
        "datetime": "24.04.2024 9:30:00",
        "time3": "09:29:42",
        "time4": "10:06:27",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:17:40",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:45:20",
        "id_st1": "96",
        "id_st2": "7"
    },
    {
        "id": "489147",
        "id_pas": "31571",
        "datetime": "24.04.2024 14:25:00",
        "time3": "14:12:48",
        "time4": "14:56:29",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:18:57",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:50:00",
        "id_st1": "7",
        "id_st2": "91"
    },
    {
        "id": "489148",
        "id_pas": "47346",
        "datetime": "24.04.2024 12:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 14:19:13",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:02:40",
        "id_st1": "173",
        "id_st2": "10"
    },
    {
        "id": "489149",
        "id_pas": "31571",
        "datetime": "24.04.2024 15:40:00",
        "time3": "15:46:12",
        "time4": "16:50:15",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:20:42",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:45:00",
        "id_st1": "91",
        "id_st2": "96"
    },
    {
        "id": "489150",
        "id_pas": "47454",
        "datetime": "24.04.2024 12:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 14:24:07",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:02:40",
        "id_st1": "173",
        "id_st2": "10"
    },
    {
        "id": "489151",
        "id_pas": "47454",
        "datetime": "24.04.2024 15:00:00",
        "time3": "14:51:42",
        "time4": "15:14:47",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:25:31",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:30:00",
        "id_st1": "32",
        "id_st2": "34"
    },
    {
        "id": "489152",
        "id_pas": "47043",
        "datetime": "24.04.2024 8:50:00",
        "time3": "08:50:00",
        "time4": "10:18:00",
        "cat_pas": "ИУ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:26:26",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:28:00",
        "id_st1": "311",
        "id_st2": "330"
    },
    {
        "id": "489153",
        "id_pas": "47346",
        "datetime": "24.04.2024 15:00:00",
        "time3": "14:57:33",
        "time4": "15:20:32",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:28:31",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:41:00",
        "id_st1": "32",
        "id_st2": "6"
    },
    {
        "id": "489154",
        "id_pas": "39548",
        "datetime": "24.04.2024 8:30:00",
        "time3": "08:30:00",
        "time4": "09:04:00",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:29:50",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:34:00",
        "id_st1": "296",
        "id_st2": "292"
    },
    {
        "id": "489155",
        "id_pas": "39548",
        "datetime": "24.04.2024 13:30:00",
        "time3": "13:30:00",
        "time4": "14:04:00",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:30:25",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:34:00",
        "id_st1": "292",
        "id_st2": "296"
    },
    {
        "id": "489156",
        "id_pas": "32156",
        "datetime": "24.04.2024 15:00:00",
        "time3": "14:58:12",
        "time4": "15:22:31",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:33:46",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:43:00",
        "id_st1": "107",
        "id_st2": "8"
    },
    {
        "id": "489157",
        "id_pas": "32156",
        "datetime": "24.04.2024 18:30:00",
        "time3": "18:30:12",
        "time4": "19:28:23",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:34:46",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:51:30",
        "id_st1": "8",
        "id_st2": "24"
    },
    {
        "id": "489158",
        "id_pas": "23602",
        "datetime": "24.04.2024 13:31:00",
        "time3": "13:26:56",
        "time4": "14:10:40",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:36:02",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:51:30",
        "id_st1": "61",
        "id_st2": "175"
    },
    {
        "id": "489159",
        "id_pas": "47455",
        "datetime": "24.04.2024 15:40:00",
        "time3": "15:40:47",
        "time4": "16:46:51",
        "cat_pas": "РДК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 14:54:16",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:48:00",
        "id_st1": "117",
        "id_st2": "10"
    },
    {
        "id": "489162",
        "id_pas": "47455",
        "datetime": "24.04.2024 17:40:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "РДК",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 15:02:38",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:48:00",
        "id_st1": "10",
        "id_st2": "117"
    },
    {
        "id": "489163",
        "id_pas": "35648",
        "datetime": "24.04.2024 12:20:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 15:07:36",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:39:05",
        "id_st1": "151",
        "id_st2": "157"
    },
    {
        "id": "489165",
        "id_pas": "35648",
        "datetime": "24.04.2024 18:00:00",
        "time3": "18:05:29",
        "time4": "18:35:34",
        "cat_pas": "ИК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 15:09:39",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:39:05",
        "id_st1": "157",
        "id_st2": "151"
    },
    {
        "id": "489169",
        "id_pas": "45944",
        "datetime": "24.04.2024 16:40:00",
        "time3": "16:47:30",
        "time4": "17:16:08",
        "cat_pas": "РДК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 15:25:15",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:29:00",
        "id_st1": "158",
        "id_st2": "162"
    },
    {
        "id": "489170",
        "id_pas": "45415",
        "datetime": "24.04.2024 10:30:00",
        "time3": "10:24:56",
        "time4": "11:42:05",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 15:25:43",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:40:20",
        "id_st1": "117",
        "id_st2": "64"
    },
    {
        "id": "489171",
        "id_pas": "45944",
        "datetime": "24.04.2024 19:10:00",
        "time3": "19:11:03",
        "time4": "19:33:54",
        "cat_pas": "РДК",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 15:25:48",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:29:00",
        "id_st1": "162",
        "id_st2": "158"
    },
    {
        "id": "489172",
        "id_pas": "45415",
        "datetime": "24.04.2024 15:00:00",
        "time3": "15:01:17",
        "time4": "16:13:00",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 15:26:11",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:40:20",
        "id_st1": "64",
        "id_st2": "117"
    },
    {
        "id": "489177",
        "id_pas": "28863",
        "datetime": "24.04.2024 15:00:00",
        "time3": "14:56:07",
        "time4": "15:24:33",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 15:38:19",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:41:35",
        "id_st1": "190",
        "id_st2": "189"
    },
    {
        "id": "489178",
        "id_pas": "28863",
        "datetime": "24.04.2024 18:30:00",
        "time3": "18:24:10",
        "time4": "19:10:02",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 15:38:34",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:41:35",
        "id_st1": "189",
        "id_st2": "190"
    },
    {
        "id": "489179",
        "id_pas": "646",
        "datetime": "24.04.2024 9:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 15:44:52",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:48:00",
        "id_st1": "341",
        "id_st2": "122"
    },
    {
        "id": "489180",
        "id_pas": "646",
        "datetime": "24.04.2024 14:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 15:45:29",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:53:00",
        "id_st1": "122",
        "id_st2": "341"
    },
    {
        "id": "489182",
        "id_pas": "41603",
        "datetime": "24.04.2024 13:30:00",
        "time3": "13:35:10",
        "time4": "14:39:25",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 15:57:14",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:05:00",
        "id_st1": "1",
        "id_st2": "24"
    },
    {
        "id": "489190",
        "id_pas": "31256",
        "datetime": "24.04.2024 20:00:00",
        "time3": "19:51:15",
        "time4": "20:55:46",
        "cat_pas": "ДИ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 16:38:41",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:13:20",
        "id_st1": "118",
        "id_st2": "187"
    },
    {
        "id": "489192",
        "id_pas": "6333",
        "datetime": "24.04.2024 13:15:00",
        "time3": "13:07:16",
        "time4": "14:16:19",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 16:42:53",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:17:20",
        "id_st1": "169",
        "id_st2": "46"
    },
    {
        "id": "489193",
        "id_pas": "6333",
        "datetime": "24.04.2024 18:00:00",
        "time3": "17:57:46",
        "time4": "19:17:56",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 16:43:51",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:13:20",
        "id_st1": "46",
        "id_st2": "364"
    },
    {
        "id": "489194",
        "id_pas": "15374",
        "datetime": "24.04.2024 14:40:00",
        "time3": "14:21:00",
        "time4": "15:09:21",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 16:47:47",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:47:50",
        "id_st1": "17",
        "id_st2": "169"
    },
    {
        "id": "489200",
        "id_pas": "3648",
        "datetime": "24.04.2024 9:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 17:05:09",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:28:25",
        "id_st1": "259",
        "id_st2": "187"
    },
    {
        "id": "489201",
        "id_pas": "46965",
        "datetime": "24.04.2024 11:30:00",
        "time3": "11:30:14",
        "time4": "11:51:20",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 17:06:00",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:33:00",
        "id_st1": "99",
        "id_st2": "91"
    },
    {
        "id": "489202",
        "id_pas": "3648",
        "datetime": "24.04.2024 12:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 17:06:22",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:28:25",
        "id_st1": "187",
        "id_st2": "259"
    },
    {
        "id": "489203",
        "id_pas": "46965",
        "datetime": "24.04.2024 12:30:00",
        "time3": "12:15:18",
        "time4": "12:26:27",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 17:06:49",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:33:00",
        "id_st1": "91",
        "id_st2": "99"
    },
    {
        "id": "489204",
        "id_pas": "24147",
        "datetime": "24.04.2024 12:54:00",
        "time3": "12:59:02",
        "time4": "13:54:12",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 17:07:50",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:55:00",
        "id_st1": "80",
        "id_st2": "18"
    },
    {
        "id": "489205",
        "id_pas": "33698",
        "datetime": "24.04.2024 9:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "23.04.2024 17:18:18",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:57:40",
        "id_st1": "135",
        "id_st2": "96"
    },
    {
        "id": "489206",
        "id_pas": "19551",
        "datetime": "24.04.2024 18:30:00",
        "time3": "18:32:35",
        "time4": "19:36:30",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 17:26:46",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:03:20",
        "id_st1": "46",
        "id_st2": "255"
    },
    {
        "id": "489207",
        "id_pas": "12032",
        "datetime": "24.04.2024 18:45:00",
        "time3": "18:42:35",
        "time4": "19:29:27",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 18:14:27",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:47:20",
        "id_st1": "35",
        "id_st2": "96"
    },
    {
        "id": "489208",
        "id_pas": "705",
        "datetime": "24.04.2024 15:30:00",
        "time3": "15:16:16",
        "time4": "16:19:32",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 18:18:09",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:23:30",
        "id_st1": "41",
        "id_st2": "122"
    },
    {
        "id": "489209",
        "id_pas": "32685",
        "datetime": "24.04.2024 13:10:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 18:19:22",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:46:30",
        "id_st1": "112",
        "id_st2": "103"
    },
    {
        "id": "489210",
        "id_pas": "32685",
        "datetime": "24.04.2024 16:10:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 18:19:47",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:49:00",
        "id_st1": "103",
        "id_st2": "113"
    },
    {
        "id": "489211",
        "id_pas": "46360",
        "datetime": "24.04.2024 11:10:00",
        "time3": "10:55:58",
        "time4": "12:36:45",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 18:25:16",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:56:05",
        "id_st1": "410",
        "id_st2": "124"
    },
    {
        "id": "489212",
        "id_pas": "46360",
        "datetime": "24.04.2024 15:00:00",
        "time3": "15:07:42",
        "time4": "16:02:22",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 18:25:50",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:56:05",
        "id_st1": "124",
        "id_st2": "410"
    },
    {
        "id": "489219",
        "id_pas": "2797",
        "datetime": "24.04.2024 16:00:00",
        "time3": "15:59:30",
        "time4": "17:09:51",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 18:53:19",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:07:30",
        "id_st1": "130",
        "id_st2": "122"
    },
    {
        "id": "489220",
        "id_pas": "2797",
        "datetime": "24.04.2024 18:30:00",
        "time3": "18:25:31",
        "time4": "19:10:12",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 18:53:38",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:07:30",
        "id_st1": "122",
        "id_st2": "130"
    },
    {
        "id": "489226",
        "id_pas": "8028",
        "datetime": "24.04.2024 14:15:00",
        "time3": "14:08:15",
        "time4": "14:54:38",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 19:24:18",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:49:05",
        "id_st1": "153",
        "id_st2": "91"
    },
    {
        "id": "489227",
        "id_pas": "8028",
        "datetime": "24.04.2024 16:30:00",
        "time3": "16:33:24",
        "time4": "17:19:02",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 19:24:46",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:49:05",
        "id_st1": "91",
        "id_st2": "153"
    },
    {
        "id": "489228",
        "id_pas": "41821",
        "datetime": "24.04.2024 10:00:00",
        "time3": "09:41:19",
        "time4": "10:19:36",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 19:40:38",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:50:10",
        "id_st1": "158",
        "id_st2": "181"
    },
    {
        "id": "489229",
        "id_pas": "389",
        "datetime": "24.04.2024 7:45:00",
        "time3": "07:52:39",
        "time4": "08:10:45",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 19:48:45",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:20:00",
        "id_st1": "6",
        "id_st2": "6"
    },
    {
        "id": "489230",
        "id_pas": "389",
        "datetime": "24.04.2024 9:00:00",
        "time3": "08:56:45",
        "time4": "09:04:44",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 19:49:23",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:20:00",
        "id_st1": "6",
        "id_st2": "6"
    },
    {
        "id": "489231",
        "id_pas": "47457",
        "datetime": "24.04.2024 22:44:00",
        "time3": "22:51:34",
        "time4": "23:33:20",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 19:57:13",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:40:10",
        "id_st1": "80",
        "id_st2": "12"
    },
    {
        "id": "489236",
        "id_pas": "47458",
        "datetime": "24.04.2024 9:40:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "РДК",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 20:30:32",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:45:10",
        "id_st1": "94",
        "id_st2": "125"
    },
    {
        "id": "489239",
        "id_pas": "47458",
        "datetime": "24.04.2024 13:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "РДК",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 20:31:17",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:45:10",
        "id_st1": "125",
        "id_st2": "94"
    },
    {
        "id": "489249",
        "id_pas": "41456",
        "datetime": "24.04.2024 12:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 20:37:30",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:02:40",
        "id_st1": "173",
        "id_st2": "10"
    },
    {
        "id": "489250",
        "id_pas": "41456",
        "datetime": "24.04.2024 15:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 20:39:19",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:44:00",
        "id_st1": "10",
        "id_st2": "34"
    },
    {
        "id": "489258",
        "id_pas": "4514",
        "datetime": "24.04.2024 17:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "23.04.2024 21:40:19",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:46:00",
        "id_st1": "198",
        "id_st2": "167"
    },
    {
        "id": "489259",
        "id_pas": "5584",
        "datetime": "24.04.2024 7:50:00",
        "time3": "08:10:00",
        "time4": "09:56:49",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 21:56:57",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:42:05",
        "id_st1": "256",
        "id_st2": "35"
    },
    {
        "id": "489260",
        "id_pas": "5584",
        "datetime": "24.04.2024 12:50:00",
        "time3": "12:41:43",
        "time4": "13:17:20",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 21:57:51",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:17:10",
        "id_st1": "35",
        "id_st2": "157"
    },
    {
        "id": "489261",
        "id_pas": "2386",
        "datetime": "24.04.2024 12:10:00",
        "time3": "12:08:42",
        "time4": "13:23:49",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 22:01:24",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:13:00",
        "id_st1": "128",
        "id_st2": "332"
    },
    {
        "id": "489267",
        "id_pas": "11450",
        "datetime": "24.04.2024 13:40:00",
        "time3": "13:42:02",
        "time4": "14:32:21",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 22:59:58",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:48:45",
        "id_st1": "250",
        "id_st2": "56"
    },
    {
        "id": "489268",
        "id_pas": "11450",
        "datetime": "24.04.2024 15:15:00",
        "time3": "15:02:51",
        "time4": "15:48:14",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 23:06:55",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:48:45",
        "id_st1": "56",
        "id_st2": "250"
    },
    {
        "id": "489269",
        "id_pas": "44638",
        "datetime": "24.04.2024 16:40:00",
        "time3": "16:37:31",
        "time4": "17:40:24",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 23:34:27",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:27:30",
        "id_st1": "122",
        "id_st2": "66"
    },
    {
        "id": "489270",
        "id_pas": "20913",
        "datetime": "24.04.2024 13:00:00",
        "time3": "12:56:11",
        "time4": "13:47:09",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "2024-04-23 23:37:47",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:04:00",
        "id_st1": "251",
        "id_st2": "97"
    },
    {
        "id": "489271",
        "id_pas": "27045",
        "datetime": "24.04.2024 16:00:00",
        "time3": "16:10:00",
        "time4": "16:48:35",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "23.04.2024 23:40:46",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:43:00",
        "id_st1": "129",
        "id_st2": "34"
    },
    {
        "id": "489272",
        "id_pas": "31965",
        "datetime": "24.04.2024 16:10:00",
        "time3": "16:13:03",
        "time4": "16:44:44",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "24.04.2024 0:32:19",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:43:30",
        "id_st1": "73",
        "id_st2": "224"
    },
    {
        "id": "489277",
        "id_pas": "31965",
        "datetime": "24.04.2024 20:30:00",
        "time3": "20:44:45",
        "time4": "21:18:00",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "24.04.2024 0:34:07",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:41:30",
        "id_st1": "224",
        "id_st2": "73"
    },
    {
        "id": "489284",
        "id_pas": "5825",
        "datetime": "24.04.2024 15:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИО",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 5:39:35",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:25:30",
        "id_st1": "138",
        "id_st2": "60"
    },
    {
        "id": "489285",
        "id_pas": "5825",
        "datetime": "24.04.2024 17:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИО",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 5:40:18",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:31:40",
        "id_st1": "60",
        "id_st2": "138"
    },
    {
        "id": "489288",
        "id_pas": "32644",
        "datetime": "24.04.2024 14:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по неявке пассажира",
        "tpz": "24.04.2024 7:40:46",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:57:30",
        "id_st1": "262",
        "id_st2": "209"
    },
    {
        "id": "489289",
        "id_pas": "32300",
        "datetime": "24.04.2024 14:30:00",
        "time3": "14:27:39",
        "time4": "15:00:10",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "24.04.2024 8:04:44",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:54:30",
        "id_st1": "107",
        "id_st2": "34"
    },
    {
        "id": "489300",
        "id_pas": "2386",
        "datetime": "24.04.2024 17:50:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИО",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 8:51:19",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:55:30",
        "id_st1": "332",
        "id_st2": "105"
    },
    {
        "id": "489304",
        "id_pas": "21084",
        "datetime": "24.04.2024 16:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 9:07:54",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:32:55",
        "id_st1": "183",
        "id_st2": "180"
    },
    {
        "id": "489305",
        "id_pas": "21084",
        "datetime": "24.04.2024 19:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 9:08:32",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:32:55",
        "id_st1": "180",
        "id_st2": "183"
    },
    {
        "id": "489311",
        "id_pas": "31691",
        "datetime": "24.04.2024 23:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 10:01:49",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:40:55",
        "id_st1": "128",
        "id_st2": "183"
    },
    {
        "id": "489312",
        "id_pas": "41821",
        "datetime": "24.04.2024 11:20:00",
        "time3": "10:36:52",
        "time4": "11:15:16",
        "cat_pas": "ИЗ",
        "status": "Заявка закончена",
        "tpz": "24.04.2024 10:08:00",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:50:10",
        "id_st1": "181",
        "id_st2": "158"
    },
    {
        "id": "489321",
        "id_pas": "24925",
        "datetime": "24.04.2024 22:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 10:28:35",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:23:50",
        "id_st1": "226",
        "id_st2": "210"
    },
    {
        "id": "489323",
        "id_pas": "17832",
        "datetime": "24.04.2024 17:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "24.04.2024 10:30:19",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:06:40",
        "id_st1": "25",
        "id_st2": "185"
    },
    {
        "id": "489327",
        "id_pas": "34038",
        "datetime": "24.04.2024 13:00:00",
        "time3": "12:50:09",
        "time4": "13:33:36",
        "cat_pas": "ИУ",
        "status": "Заявка закончена",
        "tpz": "24.04.2024 10:32:33",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:47:00",
        "id_st1": "210",
        "id_st2": "34"
    },
    {
        "id": "489334",
        "id_pas": "41362",
        "datetime": "24.04.2024 16:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 10:51:04",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:49:10",
        "id_st1": "15",
        "id_st2": "140"
    },
    {
        "id": "489354",
        "id_pas": "47451",
        "datetime": "24.04.2024 12:30:00",
        "time3": "12:19:43",
        "time4": "12:51:38",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "24.04.2024 11:28:45",
        "INSP_SEX_M": "1",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:34:00",
        "id_st1": "81",
        "id_st2": "34"
    },
    {
        "id": "489361",
        "id_pas": "3247",
        "datetime": "24.04.2024 17:00:00",
        "time3": "17:56:00",
        "time4": "18:12:52",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "24.04.2024 11:44:37",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:28:00",
        "id_st1": "81",
        "id_st2": "57"
    },
    {
        "id": "489376",
        "id_pas": "30402",
        "datetime": "24.04.2024 16:05:00",
        "time3": "16:05:26",
        "time4": "17:03:44",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "24.04.2024 12:29:06",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "00:53:30",
        "id_st1": "9",
        "id_st2": "66"
    },
    {
        "id": "489377",
        "id_pas": "47466",
        "datetime": "24.04.2024 21:30:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ДИ",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 12:33:57",
        "INSP_SEX_M": "3",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:19:00",
        "id_st1": "37",
        "id_st2": "409"
    },
    {
        "id": "489378",
        "id_pas": "27285",
        "datetime": "24.04.2024 16:20:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИЗТ",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 12:45:43",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:41:45",
        "id_st1": "1",
        "id_st2": "409"
    },
    {
        "id": "489388",
        "id_pas": "1556",
        "datetime": "24.04.2024 16:00:00",
        "time3": "15:38:25",
        "time4": "16:47:13",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "24.04.2024 13:09:41",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:02:05",
        "id_st1": "412",
        "id_st2": "124"
    },
    {
        "id": "489389",
        "id_pas": "1556",
        "datetime": "24.04.2024 21:00:00",
        "time3": "20:57:22",
        "time4": "22:04:02",
        "cat_pas": "ИЗТ",
        "status": "Заявка закончена",
        "tpz": "24.04.2024 13:10:25",
        "INSP_SEX_M": "0",
        "INSP_SEX_F": "1",
        "TIME_OVER": "01:02:05",
        "id_st1": "124",
        "id_st2": "412"
    },
    {
        "id": "489403",
        "id_pas": "47467",
        "datetime": "24.04.2024 15:00:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "РДК",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 14:09:18",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:02:30",
        "id_st1": "269",
        "id_st2": "57"
    },
    {
        "id": "489415",
        "id_pas": "41455",
        "datetime": "24.04.2024 15:37:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "ИК",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 14:37:31",
        "INSP_SEX_M": "4",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:48:00",
        "id_st1": "29",
        "id_st2": "96"
    },
    {
        "id": "489452",
        "id_pas": "47470",
        "datetime": "24.04.2024 17:35:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "РДК",
        "status": "Отмена заявки по просьбе пассажира",
        "tpz": "24.04.2024 17:10:49",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:23:00",
        "id_st1": "159",
        "id_st2": "126"
    },
    {
        "id": "489482",
        "id_pas": "47473",
        "datetime": "24.04.2024 18:20:00",
        "time3": "00:00:00",
        "time4": "00:00:00",
        "cat_pas": "РДК",
        "status": "Не подтверждена",
        "tpz": "24.04.2024 18:19:58",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "00:37:45",
        "id_st1": "243",
        "id_st2": "88"
    },
    {
        "id": "489489",
        "id_pas": "39662",
        "datetime": "24.04.2024 23:20:00",
        "time3": "23:19:00",
        "time4": "00:14:00",
        "cat_pas": "ИО",
        "status": "Заявка закончена",
        "tpz": "24.04.2024 18:33:11",
        "INSP_SEX_M": "2",
        "INSP_SEX_F": "0",
        "TIME_OVER": "01:00:00",
        "id_st1": "89",
        "id_st2": "139"
    }
];

export const timeBetweenStations: ITimeBetweenStations[] = [
    {
        "id_st1": "1",
        "id_st2": "2",
        "time": "2"
    },
    {
        "id_st1": "2",
        "id_st2": "3",
        "time": "4"
    },
    {
        "id_st1": "3",
        "id_st2": "4",
        "time": "3"
    },
    {
        "id_st1": "4",
        "id_st2": "5",
        "time": "2"
    },
    {
        "id_st1": "5",
        "id_st2": "6",
        "time": "2"
    },
    {
        "id_st1": "6",
        "id_st2": "7",
        "time": "2"
    },
    {
        "id_st1": "7",
        "id_st2": "8",
        "time": "1,3"
    },
    {
        "id_st1": "8",
        "id_st2": "9",
        "time": "1,5"
    },
    {
        "id_st1": "9",
        "id_st2": "10",
        "time": "1,4"
    },
    {
        "id_st1": "10",
        "id_st2": "11",
        "time": "1,4"
    },
    {
        "id_st1": "11",
        "id_st2": "12",
        "time": "1,3"
    },
    {
        "id_st1": "12",
        "id_st2": "13",
        "time": "2,1"
    },
    {
        "id_st1": "13",
        "id_st2": "14",
        "time": "2,1"
    },
    {
        "id_st1": "14",
        "id_st2": "15",
        "time": "1,4"
    },
    {
        "id_st1": "15",
        "id_st2": "16",
        "time": "2,4"
    },
    {
        "id_st1": "16",
        "id_st2": "17",
        "time": "3,2"
    },
    {
        "id_st1": "17",
        "id_st2": "18",
        "time": "2,5"
    },
    {
        "id_st1": "18",
        "id_st2": "19",
        "time": "2,3"
    },
    {
        "id_st1": "19",
        "id_st2": "20",
        "time": "3,2"
    },
    {
        "id_st1": "20",
        "id_st2": "21",
        "time": "3"
    },
    {
        "id_st1": "21",
        "id_st2": "22",
        "time": "2,2"
    },
    {
        "id_st1": "22",
        "id_st2": "266",
        "time": "4"
    },
    {
        "id_st1": "266",
        "id_st2": "267",
        "time": "2"
    },
    {
        "id_st1": "267",
        "id_st2": "268",
        "time": "3"
    },
    {
        "id_st1": "268",
        "id_st2": "269",
        "time": "2"
    },
    {
        "id_st1": "244",
        "id_st2": "260",
        "time": "2"
    },
    {
        "id_st1": "260",
        "id_st2": "23",
        "time": "2"
    },
    {
        "id_st1": "23",
        "id_st2": "24",
        "time": "2,2"
    },
    {
        "id_st1": "24",
        "id_st2": "25",
        "time": "3,2"
    },
    {
        "id_st1": "25",
        "id_st2": "26",
        "time": "2,4"
    },
    {
        "id_st1": "26",
        "id_st2": "27",
        "time": "2"
    },
    {
        "id_st1": "27",
        "id_st2": "28",
        "time": "3"
    },
    {
        "id_st1": "28",
        "id_st2": "29",
        "time": "3"
    },
    {
        "id_st1": "29",
        "id_st2": "30",
        "time": "1,5"
    },
    {
        "id_st1": "30",
        "id_st2": "31",
        "time": "1,5"
    },
    {
        "id_st1": "31",
        "id_st2": "32",
        "time": "2"
    },
    {
        "id_st1": "32",
        "id_st2": "33",
        "time": "3"
    },
    {
        "id_st1": "33",
        "id_st2": "34",
        "time": "2"
    },
    {
        "id_st1": "34",
        "id_st2": "35",
        "time": "3"
    },
    {
        "id_st1": "35",
        "id_st2": "36",
        "time": "3"
    },
    {
        "id_st1": "36",
        "id_st2": "37",
        "time": "3"
    },
    {
        "id_st1": "37",
        "id_st2": "38",
        "time": "4"
    },
    {
        "id_st1": "38",
        "id_st2": "39",
        "time": "3"
    },
    {
        "id_st1": "39",
        "id_st2": "40",
        "time": "2"
    },
    {
        "id_st1": "40",
        "id_st2": "41",
        "time": "3"
    },
    {
        "id_st1": "41",
        "id_st2": "42",
        "time": "2"
    },
    {
        "id_st1": "42",
        "id_st2": "43",
        "time": "3"
    },
    {
        "id_st1": "43",
        "id_st2": "44",
        "time": "4"
    },
    {
        "id_st1": "45",
        "id_st2": "46",
        "time": "2"
    },
    {
        "id_st1": "46",
        "id_st2": "47",
        "time": "2"
    },
    {
        "id_st1": "47",
        "id_st2": "48",
        "time": "1,4"
    },
    {
        "id_st1": "48",
        "id_st2": "49",
        "time": "3,3"
    },
    {
        "id_st1": "49",
        "id_st2": "50",
        "time": "7,3"
    },
    {
        "id_st1": "50",
        "id_st2": "51",
        "time": "2,5"
    },
    {
        "id_st1": "51",
        "id_st2": "52",
        "time": "2,5"
    },
    {
        "id_st1": "52",
        "id_st2": "53",
        "time": "2,2"
    },
    {
        "id_st1": "53",
        "id_st2": "54",
        "time": "3,5"
    },
    {
        "id_st1": "54",
        "id_st2": "55",
        "time": "4,15"
    },
    {
        "id_st1": "55",
        "id_st2": "56",
        "time": "1,5"
    },
    {
        "id_st1": "56",
        "id_st2": "57",
        "time": "2,3"
    },
    {
        "id_st1": "57",
        "id_st2": "58",
        "time": "2"
    },
    {
        "id_st1": "58",
        "id_st2": "59",
        "time": "3"
    },
    {
        "id_st1": "59",
        "id_st2": "60",
        "time": "3"
    },
    {
        "id_st1": "60",
        "id_st2": "61",
        "time": "3"
    },
    {
        "id_st1": "61",
        "id_st2": "62",
        "time": "2"
    },
    {
        "id_st1": "62",
        "id_st2": "63",
        "time": "3"
    },
    {
        "id_st1": "63",
        "id_st2": "64",
        "time": "3"
    },
    {
        "id_st1": "64",
        "id_st2": "65",
        "time": "3"
    },
    {
        "id_st1": "65",
        "id_st2": "66",
        "time": "2"
    },
    {
        "id_st1": "67",
        "id_st2": "68",
        "time": "2"
    },
    {
        "id_st1": "68",
        "id_st2": "69",
        "time": "2"
    },
    {
        "id_st1": "69",
        "id_st2": "70",
        "time": "2"
    },
    {
        "id_st1": "70",
        "id_st2": "71",
        "time": "2,2"
    },
    {
        "id_st1": "71",
        "id_st2": "72",
        "time": "3"
    },
    {
        "id_st1": "72",
        "id_st2": "73",
        "time": "2,5"
    },
    {
        "id_st1": "73",
        "id_st2": "74",
        "time": "2,3"
    },
    {
        "id_st1": "74",
        "id_st2": "77",
        "time": "2,15"
    },
    {
        "id_st1": "77",
        "id_st2": "78",
        "time": "2"
    },
    {
        "id_st1": "78",
        "id_st2": "79",
        "time": "1,1"
    },
    {
        "id_st1": "450",
        "id_st2": "449",
        "time": "1,3"
    },
    {
        "id_st1": "449",
        "id_st2": "74",
        "time": "4,3"
    },
    {
        "id_st1": "74",
        "id_st2": "77",
        "time": "2,15"
    },
    {
        "id_st1": "77",
        "id_st2": "78",
        "time": "2"
    },
    {
        "id_st1": "78",
        "id_st2": "79",
        "time": "1,1"
    },
    {
        "id_st1": "80",
        "id_st2": "81",
        "time": "3"
    },
    {
        "id_st1": "81",
        "id_st2": "82",
        "time": "3"
    },
    {
        "id_st1": "82",
        "id_st2": "83",
        "time": "3"
    },
    {
        "id_st1": "83",
        "id_st2": "84",
        "time": "3"
    },
    {
        "id_st1": "84",
        "id_st2": "85",
        "time": "2"
    },
    {
        "id_st1": "85",
        "id_st2": "86",
        "time": "1,5"
    },
    {
        "id_st1": "86",
        "id_st2": "87",
        "time": "3"
    },
    {
        "id_st1": "87",
        "id_st2": "88",
        "time": "3"
    },
    {
        "id_st1": "88",
        "id_st2": "89",
        "time": "3"
    },
    {
        "id_st1": "89",
        "id_st2": "90",
        "time": "2"
    },
    {
        "id_st1": "90",
        "id_st2": "91",
        "time": "4"
    },
    {
        "id_st1": "91",
        "id_st2": "80",
        "time": "3"
    },
    {
        "id_st1": "92",
        "id_st2": "93",
        "time": "3"
    },
    {
        "id_st1": "93",
        "id_st2": "94",
        "time": "2"
    },
    {
        "id_st1": "94",
        "id_st2": "95",
        "time": "2"
    },
    {
        "id_st1": "95",
        "id_st2": "96",
        "time": "3"
    },
    {
        "id_st1": "96",
        "id_st2": "97",
        "time": "2"
    },
    {
        "id_st1": "97",
        "id_st2": "98",
        "time": "3"
    },
    {
        "id_st1": "98",
        "id_st2": "99",
        "time": "2"
    },
    {
        "id_st1": "99",
        "id_st2": "100",
        "time": "2"
    },
    {
        "id_st1": "100",
        "id_st2": "101",
        "time": "1,5"
    },
    {
        "id_st1": "101",
        "id_st2": "102",
        "time": "1,5"
    },
    {
        "id_st1": "102",
        "id_st2": "103",
        "time": "2,4"
    },
    {
        "id_st1": "103",
        "id_st2": "104",
        "time": "2,3"
    },
    {
        "id_st1": "104",
        "id_st2": "105",
        "time": "2"
    },
    {
        "id_st1": "105",
        "id_st2": "106",
        "time": "3"
    },
    {
        "id_st1": "106",
        "id_st2": "107",
        "time": "3"
    },
    {
        "id_st1": "107",
        "id_st2": "108",
        "time": "1,5"
    },
    {
        "id_st1": "108",
        "id_st2": "109",
        "time": "1,4"
    },
    {
        "id_st1": "109",
        "id_st2": "110",
        "time": "2,2"
    },
    {
        "id_st1": "110",
        "id_st2": "111",
        "time": "3,2"
    },
    {
        "id_st1": "111",
        "id_st2": "112",
        "time": "1,5"
    },
    {
        "id_st1": "112",
        "id_st2": "113",
        "time": "2,3"
    },
    {
        "id_st1": "113",
        "id_st2": "114",
        "time": "2,5"
    },
    {
        "id_st1": "114",
        "id_st2": "115",
        "time": "2"
    },
    {
        "id_st1": "116",
        "id_st2": "117",
        "time": "1,5"
    },
    {
        "id_st1": "117",
        "id_st2": "118",
        "time": "3,2"
    },
    {
        "id_st1": "118",
        "id_st2": "119",
        "time": "2"
    },
    {
        "id_st1": "119",
        "id_st2": "120",
        "time": "2"
    },
    {
        "id_st1": "120",
        "id_st2": "121",
        "time": "2,4"
    },
    {
        "id_st1": "121",
        "id_st2": "122",
        "time": "2,5"
    },
    {
        "id_st1": "122",
        "id_st2": "123",
        "time": "2,1"
    },
    {
        "id_st1": "123",
        "id_st2": "124",
        "time": "1,5"
    },
    {
        "id_st1": "124",
        "id_st2": "125",
        "time": "2"
    },
    {
        "id_st1": "125",
        "id_st2": "126",
        "time": "2,3"
    },
    {
        "id_st1": "126",
        "id_st2": "127",
        "time": "2"
    },
    {
        "id_st1": "127",
        "id_st2": "128",
        "time": "2"
    },
    {
        "id_st1": "128",
        "id_st2": "129",
        "time": "3"
    },
    {
        "id_st1": "129",
        "id_st2": "130",
        "time": "2"
    },
    {
        "id_st1": "130",
        "id_st2": "131",
        "time": "2"
    },
    {
        "id_st1": "131",
        "id_st2": "132",
        "time": "4"
    },
    {
        "id_st1": "132",
        "id_st2": "133",
        "time": "3"
    },
    {
        "id_st1": "133",
        "id_st2": "134",
        "time": "3"
    },
    {
        "id_st1": "134",
        "id_st2": "135",
        "time": "2"
    },
    {
        "id_st1": "135",
        "id_st2": "136",
        "time": "4"
    },
    {
        "id_st1": "136",
        "id_st2": "137",
        "time": "2,3"
    },
    {
        "id_st1": "137",
        "id_st2": "138",
        "time": "2"
    },
    {
        "id_st1": "146",
        "id_st2": "145",
        "time": "2"
    },
    {
        "id_st1": "145",
        "id_st2": "144",
        "time": "2"
    },
    {
        "id_st1": "144",
        "id_st2": "143",
        "time": "3"
    },
    {
        "id_st1": "143",
        "id_st2": "142",
        "time": "2"
    },
    {
        "id_st1": "142",
        "id_st2": "141",
        "time": "3"
    },
    {
        "id_st1": "141",
        "id_st2": "140",
        "time": "2"
    },
    {
        "id_st1": "140",
        "id_st2": "139",
        "time": "3,2"
    },
    {
        "id_st1": "147",
        "id_st2": "148",
        "time": "7"
    },
    {
        "id_st1": "148",
        "id_st2": "241",
        "time": "2,3"
    },
    {
        "id_st1": "241",
        "id_st2": "242",
        "time": "2,3"
    },
    {
        "id_st1": "242",
        "id_st2": "243",
        "time": "2,3"
    },
    {
        "id_st1": "243",
        "id_st2": "253",
        "time": "2"
    },
    {
        "id_st1": "253",
        "id_st2": "254",
        "time": "3"
    },
    {
        "id_st1": "254",
        "id_st2": "255",
        "time": "4"
    },
    {
        "id_st1": "255",
        "id_st2": "256",
        "time": "3"
    },
    {
        "id_st1": "256",
        "id_st2": "257",
        "time": "2"
    },
    {
        "id_st1": "257",
        "id_st2": "258",
        "time": "2"
    },
    {
        "id_st1": "258",
        "id_st2": "259",
        "time": "2"
    },
    {
        "id_st1": "259",
        "id_st2": "408",
        "time": "3"
    },
    {
        "id_st1": "408",
        "id_st2": "409",
        "time": "3"
    },
    {
        "id_st1": "149",
        "id_st2": "150",
        "time": "3"
    },
    {
        "id_st1": "150",
        "id_st2": "151",
        "time": "3"
    },
    {
        "id_st1": "151",
        "id_st2": "152",
        "time": "3"
    },
    {
        "id_st1": "152",
        "id_st2": "153",
        "time": "3"
    },
    {
        "id_st1": "153",
        "id_st2": "154",
        "time": "3"
    },
    {
        "id_st1": "154",
        "id_st2": "155",
        "time": "1,3"
    },
    {
        "id_st1": "155",
        "id_st2": "156",
        "time": "1,5"
    },
    {
        "id_st1": "156",
        "id_st2": "157",
        "time": "1,45"
    },
    {
        "id_st1": "157",
        "id_st2": "158",
        "time": "2,1"
    },
    {
        "id_st1": "158",
        "id_st2": "159",
        "time": "2"
    },
    {
        "id_st1": "159",
        "id_st2": "160",
        "time": "3"
    },
    {
        "id_st1": "160",
        "id_st2": "161",
        "time": "2"
    },
    {
        "id_st1": "161",
        "id_st2": "162",
        "time": "2"
    },
    {
        "id_st1": "162",
        "id_st2": "163",
        "time": "3"
    },
    {
        "id_st1": "163",
        "id_st2": "164",
        "time": "4"
    },
    {
        "id_st1": "164",
        "id_st2": "165",
        "time": "2"
    },
    {
        "id_st1": "165",
        "id_st2": "166",
        "time": "2"
    },
    {
        "id_st1": "166",
        "id_st2": "167",
        "time": "2"
    },
    {
        "id_st1": "167",
        "id_st2": "168",
        "time": "2"
    },
    {
        "id_st1": "168",
        "id_st2": "169",
        "time": "3"
    },
    {
        "id_st1": "169",
        "id_st2": "170",
        "time": "2"
    },
    {
        "id_st1": "170",
        "id_st2": "171",
        "time": "3"
    },
    {
        "id_st1": "171",
        "id_st2": "172",
        "time": "2"
    },
    {
        "id_st1": "172",
        "id_st2": "173",
        "time": "2"
    },
    {
        "id_st1": "412",
        "id_st2": "411",
        "time": "3"
    },
    {
        "id_st1": "411",
        "id_st2": "410",
        "time": "3"
    },
    {
        "id_st1": "410",
        "id_st2": "250",
        "time": "3"
    },
    {
        "id_st1": "250",
        "id_st2": "251",
        "time": "2"
    },
    {
        "id_st1": "251",
        "id_st2": "252",
        "time": "3"
    },
    {
        "id_st1": "252",
        "id_st2": "234",
        "time": "2"
    },
    {
        "id_st1": "234",
        "id_st2": "233",
        "time": "3"
    },
    {
        "id_st1": "233",
        "id_st2": "232",
        "time": "3"
    },
    {
        "id_st1": "232",
        "id_st2": "174",
        "time": "3"
    },
    {
        "id_st1": "174",
        "id_st2": "175",
        "time": "2,5"
    },
    {
        "id_st1": "175",
        "id_st2": "176",
        "time": "2,4"
    },
    {
        "id_st1": "176",
        "id_st2": "177",
        "time": "2,1"
    },
    {
        "id_st1": "177",
        "id_st2": "178",
        "time": "2,4"
    },
    {
        "id_st1": "178",
        "id_st2": "179",
        "time": "3"
    },
    {
        "id_st1": "179",
        "id_st2": "180",
        "time": "2,1"
    },
    {
        "id_st1": "180",
        "id_st2": "181",
        "time": "2,1"
    },
    {
        "id_st1": "181",
        "id_st2": "182",
        "time": "2"
    },
    {
        "id_st1": "182",
        "id_st2": "183",
        "time": "3,45"
    },
    {
        "id_st1": "183",
        "id_st2": "184",
        "time": "2,25"
    },
    {
        "id_st1": "184",
        "id_st2": "185",
        "time": "3"
    },
    {
        "id_st1": "185",
        "id_st2": "186",
        "time": "3"
    },
    {
        "id_st1": "186",
        "id_st2": "187",
        "time": "2"
    },
    {
        "id_st1": "187",
        "id_st2": "188",
        "time": "3"
    },
    {
        "id_st1": "188",
        "id_st2": "189",
        "time": "2,2"
    },
    {
        "id_st1": "189",
        "id_st2": "190",
        "time": "1,35"
    },
    {
        "id_st1": "194",
        "id_st2": "195",
        "time": "3"
    },
    {
        "id_st1": "195",
        "id_st2": "196",
        "time": "3"
    },
    {
        "id_st1": "196",
        "id_st2": "197",
        "time": "4"
    },
    {
        "id_st1": "197",
        "id_st2": "198",
        "time": "2"
    },
    {
        "id_st1": "198",
        "id_st2": "199",
        "time": "2"
    },
    {
        "id_st1": "199",
        "id_st2": "200",
        "time": "2"
    },
    {
        "id_st1": "204",
        "id_st2": "205",
        "time": "2,3"
    },
    {
        "id_st1": "205",
        "id_st2": "206",
        "time": "3,3"
    },
    {
        "id_st1": "206",
        "id_st2": "207",
        "time": "2,2"
    },
    {
        "id_st1": "207",
        "id_st2": "208",
        "time": "2,25"
    },
    {
        "id_st1": "208",
        "id_st2": "209",
        "time": "3"
    },
    {
        "id_st1": "209",
        "id_st2": "210",
        "time": "2,2"
    },
    {
        "id_st1": "210",
        "id_st2": "211",
        "time": "2,5"
    },
    {
        "id_st1": "211",
        "id_st2": "212",
        "time": "2,2"
    },
    {
        "id_st1": "212",
        "id_st2": "213",
        "time": "2"
    },
    {
        "id_st1": "213",
        "id_st2": "214",
        "time": "2,2"
    },
    {
        "id_st1": "214",
        "id_st2": "215",
        "time": "2,2"
    },
    {
        "id_st1": "215",
        "id_st2": "216",
        "time": "2,2"
    },
    {
        "id_st1": "216",
        "id_st2": "217",
        "time": "1,4"
    },
    {
        "id_st1": "217",
        "id_st2": "218",
        "time": "1,4"
    },
    {
        "id_st1": "218",
        "id_st2": "219",
        "time": "2,1"
    },
    {
        "id_st1": "219",
        "id_st2": "220",
        "time": "4"
    },
    {
        "id_st1": "220",
        "id_st2": "221",
        "time": "2,4"
    },
    {
        "id_st1": "221",
        "id_st2": "222",
        "time": "4,2"
    },
    {
        "id_st1": "222",
        "id_st2": "452",
        "time": "2"
    },
    {
        "id_st1": "452",
        "id_st2": "224",
        "time": "1,4"
    },
    {
        "id_st1": "224",
        "id_st2": "225",
        "time": "2,1"
    },
    {
        "id_st1": "225",
        "id_st2": "226",
        "time": "2,2"
    },
    {
        "id_st1": "226",
        "id_st2": "227",
        "time": "2,1"
    },
    {
        "id_st1": "227",
        "id_st2": "228",
        "time": "2,2"
    },
    {
        "id_st1": "228",
        "id_st2": "229",
        "time": "2,4"
    },
    {
        "id_st1": "229",
        "id_st2": "230",
        "time": "2,5"
    },
    {
        "id_st1": "230",
        "id_st2": "231",
        "time": "2,5"
    },
    {
        "id_st1": "231",
        "id_st2": "201",
        "time": "2,4"
    },
    {
        "id_st1": "201",
        "id_st2": "202",
        "time": "2,2"
    },
    {
        "id_st1": "202",
        "id_st2": "203",
        "time": "3"
    },
    {
        "id_st1": "203",
        "id_st2": "204",
        "time": "3"
    },
    {
        "id_st1": "261",
        "id_st2": "249",
        "time": "3"
    },
    {
        "id_st1": "249",
        "id_st2": "248",
        "time": "2"
    },
    {
        "id_st1": "248",
        "id_st2": "247",
        "time": "3"
    },
    {
        "id_st1": "247",
        "id_st2": "341",
        "time": "4"
    },
    {
        "id_st1": "341",
        "id_st2": "342",
        "time": "3"
    },
    {
        "id_st1": "342",
        "id_st2": "343",
        "time": "3"
    },
    {
        "id_st1": "343",
        "id_st2": "344",
        "time": "3"
    },
    {
        "id_st1": "344",
        "id_st2": "345",
        "time": "2"
    },
    {
        "id_st1": "345",
        "id_st2": "346",
        "time": "3"
    },
    {
        "id_st1": "346",
        "id_st2": "347",
        "time": "3"
    },
    {
        "id_st1": "347",
        "id_st2": "348",
        "time": "3"
    },
    {
        "id_st1": "348",
        "id_st2": "349",
        "time": "2"
    },
    {
        "id_st1": "349",
        "id_st2": "350",
        "time": "3"
    },
    {
        "id_st1": "350",
        "id_st2": "351",
        "time": "3"
    },
    {
        "id_st1": "351",
        "id_st2": "191",
        "time": "2"
    },
    {
        "id_st1": "191",
        "id_st2": "364",
        "time": "3"
    },
    {
        "id_st1": "364",
        "id_st2": "365",
        "time": "3"
    },
    {
        "id_st1": "365",
        "id_st2": "353",
        "time": "3"
    },
    {
        "id_st1": "353",
        "id_st2": "354",
        "time": "3"
    },
    {
        "id_st1": "354",
        "id_st2": "355",
        "time": "3"
    },
    {
        "id_st1": "355",
        "id_st2": "356",
        "time": "3"
    },
    {
        "id_st1": "356",
        "id_st2": "357",
        "time": "3"
    },
    {
        "id_st1": "357",
        "id_st2": "358",
        "time": "3"
    },
    {
        "id_st1": "358",
        "id_st2": "359",
        "time": "3"
    },
    {
        "id_st1": "359",
        "id_st2": "360",
        "time": "3"
    },
    {
        "id_st1": "360",
        "id_st2": "361",
        "time": "3"
    },
    {
        "id_st1": "361",
        "id_st2": "362",
        "time": "3"
    },
    {
        "id_st1": "362",
        "id_st2": "363",
        "time": "3"
    },
    {
        "id_st1": "363",
        "id_st2": "261",
        "time": "3"
    },
    {
        "id_st1": "261",
        "id_st2": "249",
        "time": "3"
    },
    {
        "id_st1": "249",
        "id_st2": "248",
        "time": "2"
    },
    {
        "id_st1": "248",
        "id_st2": "247",
        "time": "3"
    },
    {
        "id_st1": "247",
        "id_st2": "246",
        "time": "4"
    },
    {
        "id_st1": "246",
        "id_st2": "245",
        "time": "2"
    },
    {
        "id_st1": "335",
        "id_st2": "334",
        "time": "3"
    },
    {
        "id_st1": "334",
        "id_st2": "333",
        "time": "3"
    },
    {
        "id_st1": "333",
        "id_st2": "332",
        "time": "3"
    },
    {
        "id_st1": "332",
        "id_st2": "265",
        "time": "3"
    },
    {
        "id_st1": "265",
        "id_st2": "264",
        "time": "3"
    },
    {
        "id_st1": "264",
        "id_st2": "263",
        "time": "3"
    },
    {
        "id_st1": "263",
        "id_st2": "262",
        "time": "2"
    },
    {
        "id_st1": "270",
        "id_st2": "271",
        "time": "6"
    },
    {
        "id_st1": "271",
        "id_st2": "272",
        "time": "2"
    },
    {
        "id_st1": "272",
        "id_st2": "273",
        "time": "3"
    },
    {
        "id_st1": "273",
        "id_st2": "274",
        "time": "2"
    },
    {
        "id_st1": "274",
        "id_st2": "275",
        "time": "3"
    },
    {
        "id_st1": "275",
        "id_st2": "276",
        "time": "3"
    },
    {
        "id_st1": "276",
        "id_st2": "277",
        "time": "4"
    },
    {
        "id_st1": "277",
        "id_st2": "278",
        "time": "2"
    },
    {
        "id_st1": "278",
        "id_st2": "279",
        "time": "4"
    },
    {
        "id_st1": "279",
        "id_st2": "280",
        "time": "2"
    },
    {
        "id_st1": "280",
        "id_st2": "282",
        "time": "4"
    },
    {
        "id_st1": "282",
        "id_st2": "284",
        "time": "4"
    },
    {
        "id_st1": "284",
        "id_st2": "285",
        "time": "7"
    },
    {
        "id_st1": "285",
        "id_st2": "286",
        "time": "5"
    },
    {
        "id_st1": "286",
        "id_st2": "287",
        "time": "4"
    },
    {
        "id_st1": "287",
        "id_st2": "288",
        "time": "3"
    },
    {
        "id_st1": "288",
        "id_st2": "289",
        "time": "4"
    },
    {
        "id_st1": "289",
        "id_st2": "290",
        "time": "3"
    },
    {
        "id_st1": "290",
        "id_st2": "291",
        "time": "3"
    },
    {
        "id_st1": "291",
        "id_st2": "292",
        "time": "3"
    },
    {
        "id_st1": "292",
        "id_st2": "293",
        "time": "2"
    },
    {
        "id_st1": "293",
        "id_st2": "294",
        "time": "4"
    },
    {
        "id_st1": "294",
        "id_st2": "295",
        "time": "2"
    },
    {
        "id_st1": "295",
        "id_st2": "296",
        "time": "5"
    },
    {
        "id_st1": "297",
        "id_st2": "298",
        "time": "4"
    },
    {
        "id_st1": "298",
        "id_st2": "299",
        "time": "3"
    },
    {
        "id_st1": "299",
        "id_st2": "300",
        "time": "4"
    },
    {
        "id_st1": "300",
        "id_st2": "301",
        "time": "4"
    },
    {
        "id_st1": "301",
        "id_st2": "302",
        "time": "3"
    },
    {
        "id_st1": "302",
        "id_st2": "331",
        "time": "3"
    },
    {
        "id_st1": "331",
        "id_st2": "303",
        "time": "2"
    },
    {
        "id_st1": "303",
        "id_st2": "304",
        "time": "5"
    },
    {
        "id_st1": "304",
        "id_st2": "305",
        "time": "5"
    },
    {
        "id_st1": "305",
        "id_st2": "306",
        "time": "2"
    },
    {
        "id_st1": "306",
        "id_st2": "307",
        "time": "3"
    },
    {
        "id_st1": "307",
        "id_st2": "308",
        "time": "4"
    },
    {
        "id_st1": "308",
        "id_st2": "309",
        "time": "3"
    },
    {
        "id_st1": "309",
        "id_st2": "366",
        "time": "4"
    },
    {
        "id_st1": "366",
        "id_st2": "310",
        "time": "4"
    },
    {
        "id_st1": "310",
        "id_st2": "311",
        "time": "4"
    },
    {
        "id_st1": "311",
        "id_st2": "312",
        "time": "6"
    },
    {
        "id_st1": "312",
        "id_st2": "313",
        "time": "5"
    },
    {
        "id_st1": "313",
        "id_st2": "314",
        "time": "3"
    },
    {
        "id_st1": "314",
        "id_st2": "315",
        "time": "2"
    },
    {
        "id_st1": "315",
        "id_st2": "316",
        "time": "3"
    },
    {
        "id_st1": "316",
        "id_st2": "352",
        "time": "3"
    },
    {
        "id_st1": "352",
        "id_st2": "318",
        "time": "3"
    },
    {
        "id_st1": "318",
        "id_st2": "319",
        "time": "3"
    },
    {
        "id_st1": "319",
        "id_st2": "320",
        "time": "2"
    },
    {
        "id_st1": "320",
        "id_st2": "339",
        "time": "3"
    },
    {
        "id_st1": "339",
        "id_st2": "321",
        "time": "2"
    },
    {
        "id_st1": "321",
        "id_st2": "322",
        "time": "5"
    },
    {
        "id_st1": "322",
        "id_st2": "323",
        "time": "3"
    },
    {
        "id_st1": "323",
        "id_st2": "324",
        "time": "4"
    },
    {
        "id_st1": "324",
        "id_st2": "325",
        "time": "3"
    },
    {
        "id_st1": "325",
        "id_st2": "326",
        "time": "4"
    },
    {
        "id_st1": "326",
        "id_st2": "327",
        "time": "3"
    },
    {
        "id_st1": "327",
        "id_st2": "328",
        "time": "3"
    },
    {
        "id_st1": "328",
        "id_st2": "329",
        "time": "3"
    },
    {
        "id_st1": "329",
        "id_st2": "330",
        "time": "4"
    },
    {
        "id_st1": "367",
        "id_st2": "369",
        "time": "9"
    },
    {
        "id_st1": "369",
        "id_st2": "370",
        "time": "4"
    },
    {
        "id_st1": "370",
        "id_st2": "371",
        "time": "3"
    },
    {
        "id_st1": "371",
        "id_st2": "372",
        "time": "2"
    },
    {
        "id_st1": "372",
        "id_st2": "373",
        "time": "3"
    },
    {
        "id_st1": "373",
        "id_st2": "374",
        "time": "6"
    },
    {
        "id_st1": "374",
        "id_st2": "375",
        "time": "3"
    },
    {
        "id_st1": "375",
        "id_st2": "376",
        "time": "2"
    },
    {
        "id_st1": "376",
        "id_st2": "377",
        "time": "2"
    },
    {
        "id_st1": "377",
        "id_st2": "378",
        "time": "3"
    },
    {
        "id_st1": "378",
        "id_st2": "379",
        "time": "3"
    },
    {
        "id_st1": "379",
        "id_st2": "380",
        "time": "4"
    },
    {
        "id_st1": "380",
        "id_st2": "381",
        "time": "5"
    },
    {
        "id_st1": "381",
        "id_st2": "384",
        "time": "15"
    },
    {
        "id_st1": "384",
        "id_st2": "385",
        "time": "3"
    },
    {
        "id_st1": "385",
        "id_st2": "386",
        "time": "3"
    },
    {
        "id_st1": "386",
        "id_st2": "387",
        "time": "3"
    },
    {
        "id_st1": "387",
        "id_st2": "388",
        "time": "3"
    },
    {
        "id_st1": "388",
        "id_st2": "389",
        "time": "2"
    },
    {
        "id_st1": "389",
        "id_st2": "390",
        "time": "3"
    },
    {
        "id_st1": "390",
        "id_st2": "391",
        "time": "3"
    },
    {
        "id_st1": "391",
        "id_st2": "392",
        "time": "3"
    },
    {
        "id_st1": "392",
        "id_st2": "393",
        "time": "2"
    },
    {
        "id_st1": "393",
        "id_st2": "394",
        "time": "5"
    },
    {
        "id_st1": "394",
        "id_st2": "395",
        "time": "3"
    },
    {
        "id_st1": "395",
        "id_st2": "396",
        "time": "3"
    },
    {
        "id_st1": "396",
        "id_st2": "397",
        "time": "2"
    },
    {
        "id_st1": "397",
        "id_st2": "398",
        "time": "3"
    },
    {
        "id_st1": "398",
        "id_st2": "399",
        "time": "3"
    },
    {
        "id_st1": "399",
        "id_st2": "400",
        "time": "2"
    },
    {
        "id_st1": "400",
        "id_st2": "401",
        "time": "3"
    },
    {
        "id_st1": "401",
        "id_st2": "402",
        "time": "3"
    },
    {
        "id_st1": "402",
        "id_st2": "403",
        "time": "3"
    },
    {
        "id_st1": "403",
        "id_st2": "404",
        "time": "2"
    },
    {
        "id_st1": "404",
        "id_st2": "405",
        "time": "3"
    },
    {
        "id_st1": "405",
        "id_st2": "406",
        "time": "2"
    },
    {
        "id_st1": "406",
        "id_st2": "407",
        "time": "2"
    },
    {
        "id_st1": "413",
        "id_st2": "414",
        "time": "4"
    },
    {
        "id_st1": "414",
        "id_st2": "415",
        "time": "3"
    },
    {
        "id_st1": "415",
        "id_st2": "416",
        "time": "3"
    },
    {
        "id_st1": "416",
        "id_st2": "417",
        "time": "3"
    },
    {
        "id_st1": "417",
        "id_st2": "418",
        "time": "4"
    },
    {
        "id_st1": "418",
        "id_st2": "419",
        "time": "3"
    },
    {
        "id_st1": "419",
        "id_st2": "420",
        "time": "3"
    },
    {
        "id_st1": "420",
        "id_st2": "421",
        "time": "3"
    },
    {
        "id_st1": "421",
        "id_st2": "422",
        "time": "3"
    },
    {
        "id_st1": "422",
        "id_st2": "423",
        "time": "5"
    },
    {
        "id_st1": "423",
        "id_st2": "424",
        "time": "5"
    },
    {
        "id_st1": "424",
        "id_st2": "425",
        "time": "6"
    },
    {
        "id_st1": "425",
        "id_st2": "426",
        "time": "7"
    },
    {
        "id_st1": "426",
        "id_st2": "427",
        "time": "4"
    },
    {
        "id_st1": "427",
        "id_st2": "428",
        "time": "8"
    },
    {
        "id_st1": "428",
        "id_st2": "451",
        "time": "11"
    },
    {
        "id_st1": "451",
        "id_st2": "430",
        "time": "3"
    },
    {
        "id_st1": "430",
        "id_st2": "431",
        "time": "4"
    },
    {
        "id_st1": "431",
        "id_st2": "432",
        "time": "2"
    },
    {
        "id_st1": "432",
        "id_st2": "433",
        "time": "3"
    },
    {
        "id_st1": "433",
        "id_st2": "434",
        "time": "2"
    },
    {
        "id_st1": "434",
        "id_st2": "435",
        "time": "3"
    },
    {
        "id_st1": "435",
        "id_st2": "436",
        "time": "3"
    },
    {
        "id_st1": "436",
        "id_st2": "437",
        "time": "3"
    },
    {
        "id_st1": "437",
        "id_st2": "438",
        "time": "3"
    },
    {
        "id_st1": "438",
        "id_st2": "439",
        "time": "3"
    },
    {
        "id_st1": "439",
        "id_st2": "440",
        "time": "3"
    },
    {
        "id_st1": "440",
        "id_st2": "441",
        "time": "5"
    },
    {
        "id_st1": "441",
        "id_st2": "442",
        "time": "4"
    },
    {
        "id_st1": "442",
        "id_st2": "443",
        "time": "3"
    },
    {
        "id_st1": "443",
        "id_st2": "444",
        "time": "3"
    },
    {
        "id_st1": "444",
        "id_st2": "445",
        "time": "3"
    },
    {
        "id_st1": "445",
        "id_st2": "446",
        "time": "2"
    },
    {
        "id_st1": "446",
        "id_st2": "447",
        "time": "4"
    }
];

export const transferTmeBetweenStations: ITransferTmeBetweenStations[] = [
    {
        "time": "6",
        "id1": "1",
        "id2": "206"
    },
    {
        "time": "7",
        "id1": "2",
        "id2": "207"
    },
    {
        "time": "5",
        "id1": "4",
        "id2": "361"
    },
    {
        "time": "5",
        "id1": "6",
        "id2": "80"
    },
    {
        "time": "30",
        "id1": "6",
        "id2": "311"
    },
    {
        "time": "3",
        "id1": "8",
        "id2": "101"
    },
    {
        "time": "3",
        "id1": "8",
        "id2": "177"
    },
    {
        "time": "3",
        "id1": "9",
        "id2": "127"
    },
    {
        "time": "4",
        "id1": "10",
        "id2": "32"
    },
    {
        "time": "4",
        "id1": "11",
        "id2": "57"
    },
    {
        "time": "2",
        "id1": "11",
        "id2": "79"
    },
    {
        "time": "5",
        "id1": "11",
        "id2": "160"
    },
    {
        "time": "4",
        "id1": "13",
        "id2": "86"
    },
    {
        "time": "7",
        "id1": "15",
        "id2": "221"
    },
    {
        "time": "3",
        "id1": "18",
        "id2": "348"
    },
    {
        "time": "11",
        "id1": "25",
        "id2": "229"
    },
    {
        "time": "26",
        "id1": "25",
        "id2": "306"
    },
    {
        "time": "3",
        "id1": "28",
        "id2": "249"
    },
    {
        "time": "3",
        "id1": "28",
        "id2": "249"
    },
    {
        "time": "2",
        "id1": "29",
        "id2": "89"
    },
    {
        "time": "20",
        "id1": "29",
        "id2": "285"
    },
    {
        "time": "2",
        "id1": "31",
        "id2": "126"
    },
    {
        "time": "3",
        "id1": "31",
        "id2": "159"
    },
    {
        "time": "4",
        "id1": "32",
        "id2": "10"
    },
    {
        "time": "3",
        "id1": "32",
        "id2": "58"
    },
    {
        "time": "2",
        "id1": "33",
        "id2": "103"
    },
    {
        "time": "2",
        "id1": "33",
        "id2": "146"
    },
    {
        "time": "3",
        "id1": "34",
        "id2": "83"
    },
    {
        "time": "9",
        "id1": "35",
        "id2": "216"
    },
    {
        "time": "5",
        "id1": "38",
        "id2": "365"
    },
    {
        "time": "4",
        "id1": "43",
        "id2": "190"
    },
    {
        "time": "19",
        "id1": "40",
        "id2": "322"
    },
    {
        "time": "20",
        "id1": "244",
        "id2": "376"
    },
    {
        "time": "2",
        "id1": "52",
        "id2": "67"
    },
    {
        "time": "4",
        "id1": "52",
        "id2": "344"
    },
    {
        "time": "1",
        "id1": "54",
        "id2": "148"
    },
    {
        "time": "3",
        "id1": "55",
        "id2": "74"
    },
    {
        "time": "3",
        "id1": "55",
        "id2": "74"
    },
    {
        "time": "2",
        "id1": "55",
        "id2": "87"
    },
    {
        "time": "4",
        "id1": "57",
        "id2": "11"
    },
    {
        "time": "3",
        "id1": "57",
        "id2": "79"
    },
    {
        "time": "2",
        "id1": "57",
        "id2": "160"
    },
    {
        "time": "3",
        "id1": "58",
        "id2": "32"
    },
    {
        "time": "2",
        "id1": "59",
        "id2": "81"
    },
    {
        "time": "3",
        "id1": "59",
        "id2": "178"
    },
    {
        "time": "25",
        "id1": "59",
        "id2": "312"
    },
    {
        "time": "7",
        "id1": "61",
        "id2": "360"
    },
    {
        "time": "10",
        "id1": "63",
        "id2": "208"
    },
    {
        "time": "25",
        "id1": "53",
        "id2": "289"
    },
    {
        "time": "25",
        "id1": "52",
        "id2": "290"
    },
    {
        "time": "20",
        "id1": "47",
        "id2": "331"
    },
    {
        "time": "20",
        "id1": "61",
        "id2": "384"
    },
    {
        "time": "2",
        "id1": "67",
        "id2": "52"
    },
    {
        "time": "4",
        "id1": "67",
        "id2": "344"
    },
    {
        "time": "2",
        "id1": "72",
        "id2": "222"
    },
    {
        "time": "3",
        "id1": "74",
        "id2": "55"
    },
    {
        "time": "1",
        "id1": "74",
        "id2": "74"
    },
    {
        "time": "4",
        "id1": "74",
        "id2": "87"
    },
    {
        "time": "1",
        "id1": "77",
        "id2": "77"
    },
    {
        "time": "1",
        "id1": "78",
        "id2": "78"
    },
    {
        "time": "1",
        "id1": "79",
        "id2": "79"
    },
    {
        "time": "3",
        "id1": "79",
        "id2": "57"
    },
    {
        "time": "2",
        "id1": "79",
        "id2": "11"
    },
    {
        "time": "25",
        "id1": "71",
        "id2": "288"
    },
    {
        "time": "9",
        "id1": "450",
        "id2": "452"
    },
    {
        "time": "4",
        "id1": "449",
        "id2": "245"
    },
    {
        "time": "24",
        "id1": "449",
        "id2": "287"
    },
    {
        "time": "3",
        "id1": "74",
        "id2": "55"
    },
    {
        "time": "1",
        "id1": "74",
        "id2": "74"
    },
    {
        "time": "4",
        "id1": "74",
        "id2": "87"
    },
    {
        "time": "1",
        "id1": "77",
        "id2": "77"
    },
    {
        "time": "1",
        "id1": "78",
        "id2": "78"
    },
    {
        "time": "1",
        "id1": "79",
        "id2": "79"
    },
    {
        "time": "3",
        "id1": "79",
        "id2": "57"
    },
    {
        "time": "2",
        "id1": "79",
        "id2": "11"
    },
    {
        "time": "5",
        "id1": "80",
        "id2": "6"
    },
    {
        "time": "25",
        "id1": "80",
        "id2": "311"
    },
    {
        "time": "3",
        "id1": "81",
        "id2": "59"
    },
    {
        "time": "4",
        "id1": "81",
        "id2": "178"
    },
    {
        "time": "19",
        "id1": "81",
        "id2": "312"
    },
    {
        "time": "2",
        "id1": "82",
        "id2": "82"
    },
    {
        "time": "2",
        "id1": "82",
        "id2": "145"
    },
    {
        "time": "3",
        "id1": "83",
        "id2": "34"
    },
    {
        "time": "2",
        "id1": "84",
        "id2": "162"
    },
    {
        "time": "2",
        "id1": "85",
        "id2": "104"
    },
    {
        "time": "4",
        "id1": "86",
        "id2": "13"
    },
    {
        "time": "4",
        "id1": "87",
        "id2": "55"
    },
    {
        "time": "2",
        "id1": "87",
        "id2": "74"
    },
    {
        "time": "2",
        "id1": "87",
        "id2": "74"
    },
    {
        "time": "2",
        "id1": "88",
        "id2": "125"
    },
    {
        "time": "2",
        "id1": "89",
        "id2": "29"
    },
    {
        "time": "20",
        "id1": "89",
        "id2": "285"
    },
    {
        "time": "2",
        "id1": "90",
        "id2": "157"
    },
    {
        "time": "3",
        "id1": "91",
        "id2": "99"
    },
    {
        "time": "2",
        "id1": "95",
        "id2": "203"
    },
    {
        "time": "3",
        "id1": "99",
        "id2": "91"
    },
    {
        "time": "3",
        "id1": "101",
        "id2": "8"
    },
    {
        "time": "2",
        "id1": "101",
        "id2": "177"
    },
    {
        "time": "1",
        "id1": "102",
        "id2": "128"
    },
    {
        "time": "2",
        "id1": "103",
        "id2": "33"
    },
    {
        "time": "1",
        "id1": "103",
        "id2": "146"
    },
    {
        "time": "2",
        "id1": "104",
        "id2": "85"
    },
    {
        "time": "2",
        "id1": "106",
        "id2": "220"
    },
    {
        "time": "3",
        "id1": "110",
        "id2": "350"
    },
    {
        "time": "2",
        "id1": "115",
        "id2": "194"
    },
    {
        "time": "5",
        "id1": "98",
        "id2": "362"
    },
    {
        "time": "20",
        "id1": "98",
        "id2": "310"
    },
    {
        "time": "8",
        "id1": "121",
        "id2": "227"
    },
    {
        "time": "4",
        "id1": "122",
        "id2": "247"
    },
    {
        "time": "4",
        "id1": "122",
        "id2": "247"
    },
    {
        "time": "8",
        "id1": "122",
        "id2": "225"
    },
    {
        "time": "2",
        "id1": "125",
        "id2": "88"
    },
    {
        "time": "2",
        "id1": "126",
        "id2": "31"
    },
    {
        "time": "3",
        "id1": "126",
        "id2": "159"
    },
    {
        "time": "3",
        "id1": "127",
        "id2": "9"
    },
    {
        "time": "1",
        "id1": "128",
        "id2": "102"
    },
    {
        "time": "2",
        "id1": "129",
        "id2": "82"
    },
    {
        "time": "3",
        "id1": "129",
        "id2": "145"
    },
    {
        "time": "3",
        "id1": "130",
        "id2": "180"
    },
    {
        "time": "2",
        "id1": "136",
        "id2": "265"
    },
    {
        "time": "17",
        "id1": "123",
        "id2": "286"
    },
    {
        "time": "18",
        "id1": "118",
        "id2": "304"
    },
    {
        "time": "20",
        "id1": "120",
        "id2": "305"
    },
    {
        "time": "5",
        "id1": "132",
        "id2": "356"
    },
    {
        "time": "17",
        "id1": "132",
        "id2": "316"
    },
    {
        "time": "20",
        "id1": "134",
        "id2": "390"
    },
    {
        "time": "20",
        "id1": "135",
        "id2": "391"
    },
    {
        "time": "20",
        "id1": "136",
        "id2": "392"
    },
    {
        "time": "20",
        "id1": "136",
        "id2": "393"
    },
    {
        "time": "2",
        "id1": "146",
        "id2": "33"
    },
    {
        "time": "1",
        "id1": "146",
        "id2": "103"
    },
    {
        "time": "2",
        "id1": "145",
        "id2": "82"
    },
    {
        "time": "3",
        "id1": "145",
        "id2": "129"
    },
    {
        "time": "2",
        "id1": "144",
        "id2": "179"
    },
    {
        "time": "21",
        "id1": "144",
        "id2": "313"
    },
    {
        "time": "6",
        "id1": "143",
        "id2": "358"
    },
    {
        "time": "6",
        "id1": "142",
        "id2": "210"
    },
    {
        "time": "20",
        "id1": "143",
        "id2": "386"
    },
    {
        "time": "2",
        "id1": "147",
        "id2": "245"
    },
    {
        "time": "30",
        "id1": "147",
        "id2": "287"
    },
    {
        "time": "1",
        "id1": "148",
        "id2": "54"
    },
    {
        "time": "4",
        "id1": "253",
        "id2": "347"
    },
    {
        "time": "2",
        "id1": "152",
        "id2": "202"
    },
    {
        "time": "2",
        "id1": "153",
        "id2": "234"
    },
    {
        "time": "20",
        "id1": "153",
        "id2": "380"
    },
    {
        "time": "2",
        "id1": "156",
        "id2": "261"
    },
    {
        "time": "2",
        "id1": "156",
        "id2": "261"
    },
    {
        "time": "2",
        "id1": "157",
        "id2": "90"
    },
    {
        "time": "3",
        "id1": "158",
        "id2": "176"
    },
    {
        "time": "3",
        "id1": "159",
        "id2": "31"
    },
    {
        "time": "3",
        "id1": "159",
        "id2": "126"
    },
    {
        "time": "5",
        "id1": "160",
        "id2": "11"
    },
    {
        "time": "2",
        "id1": "160",
        "id2": "57"
    },
    {
        "time": "2",
        "id1": "162",
        "id2": "84"
    },
    {
        "time": "15",
        "id1": "164",
        "id2": "218"
    },
    {
        "time": "2",
        "id1": "167",
        "id2": "191"
    },
    {
        "time": "1",
        "id1": "173",
        "id2": "196"
    },
    {
        "time": "25",
        "id1": "154",
        "id2": "282"
    },
    {
        "time": "25",
        "id1": "156",
        "id2": "284"
    },
    {
        "time": "17",
        "id1": "155",
        "id2": "309"
    },
    {
        "time": "30",
        "id1": "252",
        "id2": "280"
    },
    {
        "time": "7",
        "id1": "252",
        "id2": "201"
    },
    {
        "time": "2",
        "id1": "234",
        "id2": "153"
    },
    {
        "time": "20",
        "id1": "234",
        "id2": "380"
    },
    {
        "time": "5",
        "id1": "174",
        "id2": "363"
    },
    {
        "time": "17",
        "id1": "174",
        "id2": "366"
    },
    {
        "time": "3",
        "id1": "176",
        "id2": "158"
    },
    {
        "time": "3",
        "id1": "177",
        "id2": "8"
    },
    {
        "time": "2",
        "id1": "177",
        "id2": "101"
    },
    {
        "time": "2",
        "id1": "178",
        "id2": "59"
    },
    {
        "time": "4",
        "id1": "178",
        "id2": "81"
    },
    {
        "time": "25",
        "id1": "178",
        "id2": "312"
    },
    {
        "time": "2",
        "id1": "179",
        "id2": "144"
    },
    {
        "time": "21",
        "id1": "179",
        "id2": "313"
    },
    {
        "time": "3",
        "id1": "180",
        "id2": "130"
    },
    {
        "time": "10",
        "id1": "181",
        "id2": "215"
    },
    {
        "time": "5",
        "id1": "183",
        "id2": "355"
    },
    {
        "time": "15",
        "id1": "183",
        "id2": "352"
    },
    {
        "time": "29",
        "id1": "185",
        "id2": "318"
    },
    {
        "time": "4",
        "id1": "190",
        "id2": "43"
    },
    {
        "time": "20",
        "id1": "232",
        "id2": "381"
    },
    {
        "time": "20",
        "id1": "411",
        "id2": "277"
    },
    {
        "time": "2",
        "id1": "194",
        "id2": "115"
    },
    {
        "time": "1",
        "id1": "196",
        "id2": "173"
    },
    {
        "time": "13",
        "id1": "206",
        "id2": "1"
    },
    {
        "time": "13",
        "id1": "207",
        "id2": "2"
    },
    {
        "time": "17",
        "id1": "208",
        "id2": "63"
    },
    {
        "time": "13",
        "id1": "210",
        "id2": "142"
    },
    {
        "time": "17",
        "id1": "212",
        "id2": "335"
    },
    {
        "time": "17",
        "id1": "212",
        "id2": "357"
    },
    {
        "time": "17",
        "id1": "215",
        "id2": "181"
    },
    {
        "time": "16",
        "id1": "216",
        "id2": "35"
    },
    {
        "time": "22",
        "id1": "218",
        "id2": "164"
    },
    {
        "time": "9",
        "id1": "220",
        "id2": "106"
    },
    {
        "time": "10",
        "id1": "221",
        "id2": "15"
    },
    {
        "time": "9",
        "id1": "222",
        "id2": "72"
    },
    {
        "time": "16",
        "id1": "452",
        "id2": "450"
    },
    {
        "time": "24",
        "id1": "452",
        "id2": "287"
    },
    {
        "time": "15",
        "id1": "224",
        "id2": "246"
    },
    {
        "time": "15",
        "id1": "225",
        "id2": "122"
    },
    {
        "time": "15",
        "id1": "225",
        "id2": "247"
    },
    {
        "time": "15",
        "id1": "225",
        "id2": "247"
    },
    {
        "time": "15",
        "id1": "226",
        "id2": "121"
    },
    {
        "time": "15",
        "id1": "227",
        "id2": "121"
    },
    {
        "time": "18",
        "id1": "229",
        "id2": "25"
    },
    {
        "time": "14",
        "id1": "201",
        "id2": "252"
    },
    {
        "time": "9",
        "id1": "202",
        "id2": "152"
    },
    {
        "time": "9",
        "id1": "203",
        "id2": "95"
    },
    {
        "time": "25",
        "id1": "201",
        "id2": "280"
    },
    {
        "time": "23",
        "id1": "228",
        "id2": "306"
    },
    {
        "time": "17",
        "id1": "213",
        "id2": "315"
    },
    {
        "time": "20",
        "id1": "231",
        "id2": "379"
    },
    {
        "time": "20",
        "id1": "211",
        "id2": "387"
    },
    {
        "time": "25",
        "id1": "261",
        "id2": "284"
    },
    {
        "time": "2",
        "id1": "261",
        "id2": "156"
    },
    {
        "time": "1",
        "id1": "261",
        "id2": "261"
    },
    {
        "time": "3",
        "id1": "249",
        "id2": "28"
    },
    {
        "time": "1",
        "id1": "249",
        "id2": "249"
    },
    {
        "time": "1",
        "id1": "248",
        "id2": "248"
    },
    {
        "time": "4",
        "id1": "247",
        "id2": "122"
    },
    {
        "time": "1",
        "id1": "247",
        "id2": "247"
    },
    {
        "time": "8",
        "id1": "247",
        "id2": "225"
    },
    {
        "time": "4",
        "id1": "344",
        "id2": "52"
    },
    {
        "time": "4",
        "id1": "344",
        "id2": "67"
    },
    {
        "time": "4",
        "id1": "347",
        "id2": "253"
    },
    {
        "time": "3",
        "id1": "348",
        "id2": "18"
    },
    {
        "time": "3",
        "id1": "350",
        "id2": "110"
    },
    {
        "time": "2",
        "id1": "191",
        "id2": "167"
    },
    {
        "time": "2",
        "id1": "365",
        "id2": "38"
    },
    {
        "time": "5",
        "id1": "355",
        "id2": "183"
    },
    {
        "time": "15",
        "id1": "355",
        "id2": "352"
    },
    {
        "time": "5",
        "id1": "356",
        "id2": "132"
    },
    {
        "time": "17",
        "id1": "356",
        "id2": "316"
    },
    {
        "time": "10",
        "id1": "357",
        "id2": "335"
    },
    {
        "time": "10",
        "id1": "357",
        "id2": "212"
    },
    {
        "time": "6",
        "id1": "358",
        "id2": "143"
    },
    {
        "time": "7",
        "id1": "360",
        "id2": "61"
    },
    {
        "time": "5",
        "id1": "361",
        "id2": "4"
    },
    {
        "time": "5",
        "id1": "362",
        "id2": "98"
    },
    {
        "time": "20",
        "id1": "362",
        "id2": "310"
    },
    {
        "time": "5",
        "id1": "363",
        "id2": "174"
    },
    {
        "time": "17",
        "id1": "363",
        "id2": "366"
    },
    {
        "time": "20",
        "id1": "360",
        "id2": "384"
    },
    {
        "time": "20",
        "id1": "358",
        "id2": "386"
    },
    {
        "time": "4",
        "id1": "247",
        "id2": "122"
    },
    {
        "time": "1",
        "id1": "247",
        "id2": "247"
    },
    {
        "time": "8",
        "id1": "247",
        "id2": "225"
    },
    {
        "time": "8",
        "id1": "246",
        "id2": "224"
    },
    {
        "time": "2",
        "id1": "245",
        "id2": "147"
    },
    {
        "time": "4",
        "id1": "245",
        "id2": "449"
    },
    {
        "time": "30",
        "id1": "245",
        "id2": "287"
    },
    {
        "time": "10",
        "id1": "335",
        "id2": "357"
    },
    {
        "time": "10",
        "id1": "335",
        "id2": "212"
    },
    {
        "time": "2",
        "id1": "265",
        "id2": "136"
    },
    {
        "time": "20",
        "id1": "265",
        "id2": "392"
    },
    {
        "time": "20",
        "id1": "265",
        "id2": "393"
    },
    {
        "time": "25",
        "id1": "280",
        "id2": "201"
    },
    {
        "time": "30",
        "id1": "280",
        "id2": "252"
    },
    {
        "time": "25",
        "id1": "282",
        "id2": "154"
    },
    {
        "time": "15",
        "id1": "284",
        "id2": "156"
    },
    {
        "time": "15",
        "id1": "284",
        "id2": "261"
    },
    {
        "time": "20",
        "id1": "285",
        "id2": "89"
    },
    {
        "time": "20",
        "id1": "285",
        "id2": "29"
    },
    {
        "time": "17",
        "id1": "286",
        "id2": "123"
    },
    {
        "time": "24",
        "id1": "287",
        "id2": "449"
    },
    {
        "time": "24",
        "id1": "287",
        "id2": "452"
    },
    {
        "time": "25",
        "id1": "287",
        "id2": "450"
    },
    {
        "time": "25",
        "id1": "287",
        "id2": "245"
    },
    {
        "time": "30",
        "id1": "287",
        "id2": "147"
    },
    {
        "time": "25",
        "id1": "288",
        "id2": "71"
    },
    {
        "time": "25",
        "id1": "289",
        "id2": "53"
    },
    {
        "time": "25",
        "id1": "290",
        "id2": "52"
    },
    {
        "time": "20",
        "id1": "277",
        "id2": "411"
    },
    {
        "time": "20",
        "id1": "331",
        "id2": "47"
    },
    {
        "time": "18",
        "id1": "304",
        "id2": "118"
    },
    {
        "time": "20",
        "id1": "305",
        "id2": "120"
    },
    {
        "time": "23",
        "id1": "306",
        "id2": "228"
    },
    {
        "time": "26",
        "id1": "306",
        "id2": "25"
    },
    {
        "time": "17",
        "id1": "309",
        "id2": "155"
    },
    {
        "time": "17",
        "id1": "366",
        "id2": "174"
    },
    {
        "time": "17",
        "id1": "366",
        "id2": "363"
    },
    {
        "time": "20",
        "id1": "310",
        "id2": "98"
    },
    {
        "time": "20",
        "id1": "310",
        "id2": "362"
    },
    {
        "time": "25",
        "id1": "311",
        "id2": "80"
    },
    {
        "time": "30",
        "id1": "311",
        "id2": "6"
    },
    {
        "time": "19",
        "id1": "312",
        "id2": "81"
    },
    {
        "time": "25",
        "id1": "312",
        "id2": "59"
    },
    {
        "time": "25",
        "id1": "312",
        "id2": "178"
    },
    {
        "time": "21",
        "id1": "313",
        "id2": "179"
    },
    {
        "time": "21",
        "id1": "313",
        "id2": "144"
    },
    {
        "time": "17",
        "id1": "315",
        "id2": "213"
    },
    {
        "time": "17",
        "id1": "316",
        "id2": "132"
    },
    {
        "time": "17",
        "id1": "316",
        "id2": "356"
    },
    {
        "time": "15",
        "id1": "352",
        "id2": "183"
    },
    {
        "time": "15",
        "id1": "352",
        "id2": "355"
    },
    {
        "time": "29",
        "id1": "318",
        "id2": "185"
    },
    {
        "time": "19",
        "id1": "322",
        "id2": "40"
    },
    {
        "time": "20",
        "id1": "376",
        "id2": "244"
    },
    {
        "time": "20",
        "id1": "379",
        "id2": "231"
    },
    {
        "time": "20",
        "id1": "380",
        "id2": "153"
    },
    {
        "time": "20",
        "id1": "380",
        "id2": "234"
    },
    {
        "time": "20",
        "id1": "381",
        "id2": "232"
    },
    {
        "time": "20",
        "id1": "384",
        "id2": "61"
    },
    {
        "time": "20",
        "id1": "384",
        "id2": "360"
    },
    {
        "time": "20",
        "id1": "386",
        "id2": "143"
    },
    {
        "time": "20",
        "id1": "386",
        "id2": "358"
    },
    {
        "time": "20",
        "id1": "387",
        "id2": "211"
    },
    {
        "time": "20",
        "id1": "390",
        "id2": "134"
    },
    {
        "time": "20",
        "id1": "391",
        "id2": "135"
    },
    {
        "time": "20",
        "id1": "392",
        "id2": "265"
    },
    {
        "time": "20",
        "id1": "392",
        "id2": "136"
    },
    {
        "time": "20",
        "id1": "393",
        "id2": "265"
    },
    {
        "time": "20",
        "id1": "393",
        "id2": "136"
    },
    {
        "time": "20",
        "id1": "418",
        "id2": "139"
    },
    {
        "time": "20",
        "id1": "419",
        "id2": "140"
    },
    {
        "time": "20",
        "id1": "421",
        "id2": "388"
    },
    {
        "time": "20",
        "id1": "422",
        "id2": "357"
    },
    {
        "time": "20",
        "id1": "422",
        "id2": "212"
    },
    {
        "time": "20",
        "id1": "422",
        "id2": "335"
    },
    {
        "time": "20",
        "id1": "423",
        "id2": "144"
    },
    {
        "time": "20",
        "id1": "423",
        "id2": "179"
    },
    {
        "time": "20",
        "id1": "423",
        "id2": "313"
    },
    {
        "time": "20",
        "id1": "423",
        "id2": "357"
    },
    {
        "time": "20",
        "id1": "424",
        "id2": "81"
    },
    {
        "time": "20",
        "id1": "424",
        "id2": "59"
    },
    {
        "time": "20",
        "id1": "424",
        "id2": "178"
    },
    {
        "time": "20",
        "id1": "424",
        "id2": "312"
    },
    {
        "time": "20",
        "id1": "425",
        "id2": "80"
    },
    {
        "time": "20",
        "id1": "425",
        "id2": "6"
    },
    {
        "time": "20",
        "id1": "425",
        "id2": "311"
    },
    {
        "time": "20",
        "id1": "426",
        "id2": "363"
    },
    {
        "time": "20",
        "id1": "426",
        "id2": "174"
    },
    {
        "time": "20",
        "id1": "426",
        "id2": "366"
    },
    {
        "time": "20",
        "id1": "427",
        "id2": "261"
    },
    {
        "time": "20",
        "id1": "427",
        "id2": "284"
    },
    {
        "time": "20",
        "id1": "427",
        "id2": "156"
    },
    {
        "time": "20",
        "id1": "427",
        "id2": "261"
    },
    {
        "time": "20",
        "id1": "428",
        "id2": "29"
    },
    {
        "time": "20",
        "id1": "428",
        "id2": "89"
    },
    {
        "time": "20",
        "id1": "428",
        "id2": "285"
    },
    {
        "time": "20",
        "id1": "451",
        "id2": "452"
    },
    {
        "time": "20",
        "id1": "451",
        "id2": "450"
    },
    {
        "time": "20",
        "id1": "451",
        "id2": "287"
    },
    {
        "time": "20",
        "id1": "430",
        "id2": "72"
    },
    {
        "time": "20",
        "id1": "430",
        "id2": "222"
    },
    {
        "time": "20",
        "id1": "431",
        "id2": "54"
    },
    {
        "time": "20",
        "id1": "431",
        "id2": "148"
    },
    {
        "time": "20",
        "id1": "432",
        "id2": "241"
    },
    {
        "time": "20",
        "id1": "434",
        "id2": "346"
    },
    {
        "time": "20",
        "id1": "139",
        "id2": "418"
    },
    {
        "time": "20",
        "id1": "419",
        "id2": "140"
    },
    {
        "time": "20",
        "id1": "421",
        "id2": "388"
    },
    {
        "time": "20",
        "id1": "357",
        "id2": "422"
    },
    {
        "time": "20",
        "id1": "212",
        "id2": "422"
    },
    {
        "time": "20",
        "id1": "335",
        "id2": "422"
    },
    {
        "time": "20",
        "id1": "144",
        "id2": "423"
    },
    {
        "time": "20",
        "id1": "179",
        "id2": "423"
    },
    {
        "time": "20",
        "id1": "313",
        "id2": "423"
    },
    {
        "time": "20",
        "id1": "357",
        "id2": "423"
    },
    {
        "time": "20",
        "id1": "81",
        "id2": "424"
    },
    {
        "time": "20",
        "id1": "59",
        "id2": "424"
    },
    {
        "time": "20",
        "id1": "178",
        "id2": "424"
    },
    {
        "time": "20",
        "id1": "312",
        "id2": "424"
    },
    {
        "time": "20",
        "id1": "80",
        "id2": "425"
    },
    {
        "time": "20",
        "id1": "6",
        "id2": "425"
    },
    {
        "time": "20",
        "id1": "311",
        "id2": "425"
    },
    {
        "time": "20",
        "id1": "363",
        "id2": "426"
    },
    {
        "time": "20",
        "id1": "174",
        "id2": "426"
    },
    {
        "time": "20",
        "id1": "366",
        "id2": "426"
    },
    {
        "time": "20",
        "id1": "261",
        "id2": "427"
    },
    {
        "time": "20",
        "id1": "284",
        "id2": "427"
    },
    {
        "time": "20",
        "id1": "156",
        "id2": "427"
    },
    {
        "time": "20",
        "id1": "261",
        "id2": "427"
    },
    {
        "time": "20",
        "id1": "29",
        "id2": "428"
    },
    {
        "time": "20",
        "id1": "89",
        "id2": "428"
    },
    {
        "time": "20",
        "id1": "285",
        "id2": "428"
    },
    {
        "time": "20",
        "id1": "452",
        "id2": "451"
    },
    {
        "time": "20",
        "id1": "450",
        "id2": "451"
    },
    {
        "time": "20",
        "id1": "287",
        "id2": "451"
    },
    {
        "time": "20",
        "id1": "72",
        "id2": "430"
    },
    {
        "time": "20",
        "id1": "222",
        "id2": "430"
    },
    {
        "time": "20",
        "id1": "54",
        "id2": "431"
    },
    {
        "time": "20",
        "id1": "148",
        "id2": "431"
    },
    {
        "time": "20",
        "id1": "241",
        "id2": "432"
    },
    {
        "time": "20",
        "id1": "346",
        "id2": "434"
    }
];

export const nameStations: INameStations[] = [
    {
        "name_station": "Бульвар Рокоссовского",
        "name_line": "1",
        "id": "1",
        "id_line": "1"
    },
    {
        "name_station": "Черкизовская",
        "name_line": "1",
        "id": "2",
        "id_line": "1"
    },
    {
        "name_station": "Преображенская площадь",
        "name_line": "1",
        "id": "3",
        "id_line": "1"
    },
    {
        "name_station": "Сокольники",
        "name_line": "1",
        "id": "4",
        "id_line": "1"
    },
    {
        "name_station": "Красносельская",
        "name_line": "1",
        "id": "5",
        "id_line": "1"
    },
    {
        "name_station": "Комсомольская СЛ",
        "name_line": "1",
        "id": "6",
        "id_line": "1"
    },
    {
        "name_station": "Красные ворота",
        "name_line": "1",
        "id": "7",
        "id_line": "1"
    },
    {
        "name_station": "Чистые пруды",
        "name_line": "1",
        "id": "8",
        "id_line": "1"
    },
    {
        "name_station": "Лубянка",
        "name_line": "1",
        "id": "9",
        "id_line": "1"
    },
    {
        "name_station": "Охотный ряд",
        "name_line": "1",
        "id": "10",
        "id_line": "1"
    },
    {
        "name_station": "Библиотека имени Ленина",
        "name_line": "1",
        "id": "11",
        "id_line": "1"
    },
    {
        "name_station": "Кропоткинская",
        "name_line": "1",
        "id": "12",
        "id_line": "1"
    },
    {
        "name_station": "Парк культуры СЛ",
        "name_line": "1",
        "id": "13",
        "id_line": "1"
    },
    {
        "name_station": "Фрунзенская",
        "name_line": "1",
        "id": "14",
        "id_line": "1"
    },
    {
        "name_station": "Спортивная",
        "name_line": "1",
        "id": "15",
        "id_line": "1"
    },
    {
        "name_station": "Воробьёвы горы",
        "name_line": "1",
        "id": "16",
        "id_line": "1"
    },
    {
        "name_station": "Университет",
        "name_line": "1",
        "id": "17",
        "id_line": "1"
    },
    {
        "name_station": "Проспект Вернадского",
        "name_line": "1",
        "id": "18",
        "id_line": "1"
    },
    {
        "name_station": "Юго-Западная",
        "name_line": "1",
        "id": "19",
        "id_line": "1"
    },
    {
        "name_station": "Тропарёво",
        "name_line": "1",
        "id": "20",
        "id_line": "1"
    },
    {
        "name_station": "Румянцево",
        "name_line": "1",
        "id": "21",
        "id_line": "1"
    },
    {
        "name_station": "Саларьево",
        "name_line": "1",
        "id": "22",
        "id_line": "1"
    },
    {
        "name_station": "Филатов Луг",
        "name_line": "1",
        "id": "266",
        "id_line": "1"
    },
    {
        "name_station": "Прокшино",
        "name_line": "1",
        "id": "267",
        "id_line": "1"
    },
    {
        "name_station": "Ольховая",
        "name_line": "1",
        "id": "268",
        "id_line": "1"
    },
    {
        "name_station": "Коммунарка",
        "name_line": "1",
        "id": "269",
        "id_line": "1"
    },
    {
        "name_station": "Ховрино",
        "name_line": "2",
        "id": "244",
        "id_line": "2"
    },
    {
        "name_station": "Беломорская",
        "name_line": "2",
        "id": "260",
        "id_line": "2"
    },
    {
        "name_station": "Речной вокзал",
        "name_line": "2",
        "id": "23",
        "id_line": "2"
    },
    {
        "name_station": "Водный стадион",
        "name_line": "2",
        "id": "24",
        "id_line": "2"
    },
    {
        "name_station": "Войковская",
        "name_line": "2",
        "id": "25",
        "id_line": "2"
    },
    {
        "name_station": "Сокол",
        "name_line": "2",
        "id": "26",
        "id_line": "2"
    },
    {
        "name_station": "Аэропорт",
        "name_line": "2",
        "id": "27",
        "id_line": "2"
    },
    {
        "name_station": "Динамо",
        "name_line": "2",
        "id": "28",
        "id_line": "2"
    },
    {
        "name_station": "Белорусская ЗЛ",
        "name_line": "2",
        "id": "29",
        "id_line": "2"
    },
    {
        "name_station": "Маяковская",
        "name_line": "2",
        "id": "30",
        "id_line": "2"
    },
    {
        "name_station": "Тверская",
        "name_line": "2",
        "id": "31",
        "id_line": "2"
    },
    {
        "name_station": "Театральная",
        "name_line": "2",
        "id": "32",
        "id_line": "2"
    },
    {
        "name_station": "Новокузнецкая",
        "name_line": "2",
        "id": "33",
        "id_line": "2"
    },
    {
        "name_station": "Павелецкая ЗЛ",
        "name_line": "2",
        "id": "34",
        "id_line": "2"
    },
    {
        "name_station": "Автозаводская",
        "name_line": "2",
        "id": "35",
        "id_line": "2"
    },
    {
        "name_station": "Технопарк",
        "name_line": "2",
        "id": "36",
        "id_line": "2"
    },
    {
        "name_station": "Коломенская",
        "name_line": "2",
        "id": "37",
        "id_line": "2"
    },
    {
        "name_station": "Каширская ЗЛ",
        "name_line": "2",
        "id": "38",
        "id_line": "2"
    },
    {
        "name_station": "Кантемировская",
        "name_line": "2",
        "id": "39",
        "id_line": "2"
    },
    {
        "name_station": "Царицыно",
        "name_line": "2",
        "id": "40",
        "id_line": "2"
    },
    {
        "name_station": "Орехово",
        "name_line": "2",
        "id": "41",
        "id_line": "2"
    },
    {
        "name_station": "Домодедовская",
        "name_line": "2",
        "id": "42",
        "id_line": "2"
    },
    {
        "name_station": "Красногвардейская",
        "name_line": "2",
        "id": "43",
        "id_line": "2"
    },
    {
        "name_station": "Алма-Атинская",
        "name_line": "2",
        "id": "44",
        "id_line": "2"
    },
    {
        "name_station": "Пятницкое шоссе",
        "name_line": "3",
        "id": "45",
        "id_line": "3"
    },
    {
        "name_station": "Митино",
        "name_line": "3",
        "id": "46",
        "id_line": "3"
    },
    {
        "name_station": "Волоколамская",
        "name_line": "3",
        "id": "47",
        "id_line": "3"
    },
    {
        "name_station": "Мякинино",
        "name_line": "3",
        "id": "48",
        "id_line": "3"
    },
    {
        "name_station": "Строгино",
        "name_line": "3",
        "id": "49",
        "id_line": "3"
    },
    {
        "name_station": "Крылатское",
        "name_line": "3",
        "id": "50",
        "id_line": "3"
    },
    {
        "name_station": "Молодёжная",
        "name_line": "3",
        "id": "51",
        "id_line": "3"
    },
    {
        "name_station": "Кунцевская АПЛ",
        "name_line": "3",
        "id": "52",
        "id_line": "3"
    },
    {
        "name_station": "Славянский бульвар",
        "name_line": "3",
        "id": "53",
        "id_line": "3"
    },
    {
        "name_station": "Парк победы АПЛ",
        "name_line": "3",
        "id": "54",
        "id_line": "3"
    },
    {
        "name_station": "Киевская АПЛ",
        "name_line": "3",
        "id": "55",
        "id_line": "3"
    },
    {
        "name_station": "Смоленская АПЛ",
        "name_line": "3",
        "id": "56",
        "id_line": "3"
    },
    {
        "name_station": "Арбатская АПЛ",
        "name_line": "3",
        "id": "57",
        "id_line": "3"
    },
    {
        "name_station": "Площадь революции",
        "name_line": "3",
        "id": "58",
        "id_line": "3"
    },
    {
        "name_station": "Курская АПЛ",
        "name_line": "3",
        "id": "59",
        "id_line": "3"
    },
    {
        "name_station": "Бауманская",
        "name_line": "3",
        "id": "60",
        "id_line": "3"
    },
    {
        "name_station": "Электрозаводская",
        "name_line": "3",
        "id": "61",
        "id_line": "3"
    },
    {
        "name_station": "Семёновская",
        "name_line": "3",
        "id": "62",
        "id_line": "3"
    },
    {
        "name_station": "Партизанская",
        "name_line": "3",
        "id": "63",
        "id_line": "3"
    },
    {
        "name_station": "Измайловская",
        "name_line": "3",
        "id": "64",
        "id_line": "3"
    },
    {
        "name_station": "Первомайская",
        "name_line": "3",
        "id": "65",
        "id_line": "3"
    },
    {
        "name_station": "Щёлковская",
        "name_line": "3",
        "id": "66",
        "id_line": "3"
    },
    {
        "name_station": "Кунцевская ФЛ",
        "name_line": "4",
        "id": "67",
        "id_line": "4"
    },
    {
        "name_station": "Пионерская",
        "name_line": "4",
        "id": "68",
        "id_line": "4"
    },
    {
        "name_station": "Филёвский парк",
        "name_line": "4",
        "id": "69",
        "id_line": "4"
    },
    {
        "name_station": "Багратионовская",
        "name_line": "4",
        "id": "70",
        "id_line": "4"
    },
    {
        "name_station": "Фили",
        "name_line": "4",
        "id": "71",
        "id_line": "4"
    },
    {
        "name_station": "Кутузовская",
        "name_line": "4",
        "id": "72",
        "id_line": "4"
    },
    {
        "name_station": "Студенческая",
        "name_line": "4",
        "id": "73",
        "id_line": "4"
    },
    {
        "name_station": "Киевская ФЛ",
        "name_line": "4",
        "id": "74",
        "id_line": "4"
    },
    {
        "name_station": "Смоленская ФЛ",
        "name_line": "4",
        "id": "77",
        "id_line": "4"
    },
    {
        "name_station": "Арбатская ФЛ",
        "name_line": "4",
        "id": "78",
        "id_line": "4"
    },
    {
        "name_station": "Александровский сад",
        "name_line": "4",
        "id": "79",
        "id_line": "4"
    },
    {
        "name_station": "Москва-Сити ФЛ",
        "name_line": "4А",
        "id": "450",
        "id_line": "4"
    },
    {
        "name_station": "Деловой центр ФЛ",
        "name_line": "4А",
        "id": "449",
        "id_line": "4"
    },
    {
        "name_station": "Киевская ФЛ",
        "name_line": "4А",
        "id": "74",
        "id_line": "4"
    },
    {
        "name_station": "Смоленская ФЛ",
        "name_line": "4А",
        "id": "77",
        "id_line": "4"
    },
    {
        "name_station": "Арбатская ФЛ",
        "name_line": "4А",
        "id": "78",
        "id_line": "4"
    },
    {
        "name_station": "Александровский сад",
        "name_line": "4А",
        "id": "79",
        "id_line": "4"
    },
    {
        "name_station": "Комсомольская КЛ",
        "name_line": "5",
        "id": "80",
        "id_line": "5"
    },
    {
        "name_station": "Курская КЛ",
        "name_line": "5",
        "id": "81",
        "id_line": "5"
    },
    {
        "name_station": "Таганская КЛ",
        "name_line": "5",
        "id": "82",
        "id_line": "5"
    },
    {
        "name_station": "Павелецкая КЛ",
        "name_line": "5",
        "id": "83",
        "id_line": "5"
    },
    {
        "name_station": "Добрынинская",
        "name_line": "5",
        "id": "84",
        "id_line": "5"
    },
    {
        "name_station": "Октябрьская КЛ",
        "name_line": "5",
        "id": "85",
        "id_line": "5"
    },
    {
        "name_station": "Парк культуры КЛ",
        "name_line": "5",
        "id": "86",
        "id_line": "5"
    },
    {
        "name_station": "Киевская КЛ",
        "name_line": "5",
        "id": "87",
        "id_line": "5"
    },
    {
        "name_station": "Краснопресненская",
        "name_line": "5",
        "id": "88",
        "id_line": "5"
    },
    {
        "name_station": "Белорусская КЛ",
        "name_line": "5",
        "id": "89",
        "id_line": "5"
    },
    {
        "name_station": "Новослободская",
        "name_line": "5",
        "id": "90",
        "id_line": "5"
    },
    {
        "name_station": "Проспект мира КЛ",
        "name_line": "5",
        "id": "91",
        "id_line": "5"
    },
    {
        "name_station": "Комсомольская КЛ",
        "name_line": "5",
        "id": "80",
        "id_line": "5"
    },
    {
        "name_station": "Медведково",
        "name_line": "6",
        "id": "92",
        "id_line": "6"
    },
    {
        "name_station": "Бабушкинская",
        "name_line": "6",
        "id": "93",
        "id_line": "6"
    },
    {
        "name_station": "Свиблово",
        "name_line": "6",
        "id": "94",
        "id_line": "6"
    },
    {
        "name_station": "Ботанический сад",
        "name_line": "6",
        "id": "95",
        "id_line": "6"
    },
    {
        "name_station": "ВДНХ",
        "name_line": "6",
        "id": "96",
        "id_line": "6"
    },
    {
        "name_station": "Алексеевская",
        "name_line": "6",
        "id": "97",
        "id_line": "6"
    },
    {
        "name_station": "Рижская",
        "name_line": "6",
        "id": "98",
        "id_line": "6"
    },
    {
        "name_station": "Проспект Мира КРЛ",
        "name_line": "6",
        "id": "99",
        "id_line": "6"
    },
    {
        "name_station": "Сухаревская",
        "name_line": "6",
        "id": "100",
        "id_line": "6"
    },
    {
        "name_station": "Тургеневская",
        "name_line": "6",
        "id": "101",
        "id_line": "6"
    },
    {
        "name_station": "Китай город КРЛ",
        "name_line": "6",
        "id": "102",
        "id_line": "6"
    },
    {
        "name_station": "Третьяковская КРЛ",
        "name_line": "6",
        "id": "103",
        "id_line": "6"
    },
    {
        "name_station": "Октябрьская КРЛ",
        "name_line": "6",
        "id": "104",
        "id_line": "6"
    },
    {
        "name_station": "Шаболовская",
        "name_line": "6",
        "id": "105",
        "id_line": "6"
    },
    {
        "name_station": "Ленинский проспект",
        "name_line": "6",
        "id": "106",
        "id_line": "6"
    },
    {
        "name_station": "Академическая",
        "name_line": "6",
        "id": "107",
        "id_line": "6"
    },
    {
        "name_station": "Профсоюзная",
        "name_line": "6",
        "id": "108",
        "id_line": "6"
    },
    {
        "name_station": "Новые Черёмушки",
        "name_line": "6",
        "id": "109",
        "id_line": "6"
    },
    {
        "name_station": "Калужская",
        "name_line": "6",
        "id": "110",
        "id_line": "6"
    },
    {
        "name_station": "Беляево",
        "name_line": "6",
        "id": "111",
        "id_line": "6"
    },
    {
        "name_station": "Коньково",
        "name_line": "6",
        "id": "112",
        "id_line": "6"
    },
    {
        "name_station": "Тёплый стан",
        "name_line": "6",
        "id": "113",
        "id_line": "6"
    },
    {
        "name_station": "Ясенево",
        "name_line": "6",
        "id": "114",
        "id_line": "6"
    },
    {
        "name_station": "Новоясеневская",
        "name_line": "6",
        "id": "115",
        "id_line": "6"
    },
    {
        "name_station": "Планерная",
        "name_line": "7",
        "id": "116",
        "id_line": "7"
    },
    {
        "name_station": "Сходненская",
        "name_line": "7",
        "id": "117",
        "id_line": "7"
    },
    {
        "name_station": "Тушинская",
        "name_line": "7",
        "id": "118",
        "id_line": "7"
    },
    {
        "name_station": "Спартак",
        "name_line": "7",
        "id": "119",
        "id_line": "7"
    },
    {
        "name_station": "Щукинская",
        "name_line": "7",
        "id": "120",
        "id_line": "7"
    },
    {
        "name_station": "Октябрьское поле",
        "name_line": "7",
        "id": "121",
        "id_line": "7"
    },
    {
        "name_station": "Полежаевская",
        "name_line": "7",
        "id": "122",
        "id_line": "7"
    },
    {
        "name_station": "Беговая",
        "name_line": "7",
        "id": "123",
        "id_line": "7"
    },
    {
        "name_station": "Улица 1905 года",
        "name_line": "7",
        "id": "124",
        "id_line": "7"
    },
    {
        "name_station": "Баррикадная",
        "name_line": "7",
        "id": "125",
        "id_line": "7"
    },
    {
        "name_station": "Пушкинская",
        "name_line": "7",
        "id": "126",
        "id_line": "7"
    },
    {
        "name_station": "Кузнецкий мост",
        "name_line": "7",
        "id": "127",
        "id_line": "7"
    },
    {
        "name_station": "Китай-город ТКЛ",
        "name_line": "7",
        "id": "128",
        "id_line": "7"
    },
    {
        "name_station": "Таганская ТКЛ",
        "name_line": "7",
        "id": "129",
        "id_line": "7"
    },
    {
        "name_station": "Пролетарская",
        "name_line": "7",
        "id": "130",
        "id_line": "7"
    },
    {
        "name_station": "Волгоградский проспект",
        "name_line": "7",
        "id": "131",
        "id_line": "7"
    },
    {
        "name_station": "Текстильщики",
        "name_line": "7",
        "id": "132",
        "id_line": "7"
    },
    {
        "name_station": "Кузьминки",
        "name_line": "7",
        "id": "133",
        "id_line": "7"
    },
    {
        "name_station": "Рязанский проспект",
        "name_line": "7",
        "id": "134",
        "id_line": "7"
    },
    {
        "name_station": "Выхино",
        "name_line": "7",
        "id": "135",
        "id_line": "7"
    },
    {
        "name_station": "Лермонтовский проспект",
        "name_line": "7",
        "id": "136",
        "id_line": "7"
    },
    {
        "name_station": "Жулебино",
        "name_line": "7",
        "id": "137",
        "id_line": "7"
    },
    {
        "name_station": "Котельники",
        "name_line": "7",
        "id": "138",
        "id_line": "7"
    },
    {
        "name_station": "Третьяковская КЛ",
        "name_line": "8",
        "id": "146",
        "id_line": "8"
    },
    {
        "name_station": "Марксистская",
        "name_line": "8",
        "id": "145",
        "id_line": "8"
    },
    {
        "name_station": "Площадь Ильича",
        "name_line": "8",
        "id": "144",
        "id_line": "8"
    },
    {
        "name_station": "Авиамоторная",
        "name_line": "8",
        "id": "143",
        "id_line": "8"
    },
    {
        "name_station": "Шоссе Энтузиастов",
        "name_line": "8",
        "id": "142",
        "id_line": "8"
    },
    {
        "name_station": "Перово",
        "name_line": "8",
        "id": "141",
        "id_line": "8"
    },
    {
        "name_station": "Новогиреево",
        "name_line": "8",
        "id": "140",
        "id_line": "8"
    },
    {
        "name_station": "Новокосино",
        "name_line": "8",
        "id": "139",
        "id_line": "8"
    },
    {
        "name_station": "Деловой центр",
        "name_line": "8А",
        "id": "147",
        "id_line": "8"
    },
    {
        "name_station": "Парк Победы СЛ",
        "name_line": "8А",
        "id": "148",
        "id_line": "8"
    },
    {
        "name_station": "Минская",
        "name_line": "8А",
        "id": "241",
        "id_line": "8"
    },
    {
        "name_station": "Ломоносовский проспект",
        "name_line": "8А",
        "id": "242",
        "id_line": "8"
    },
    {
        "name_station": "Раменки",
        "name_line": "8А",
        "id": "243",
        "id_line": "8"
    },
    {
        "name_station": "Мичуринский проспект",
        "name_line": "8А",
        "id": "253",
        "id_line": "8"
    },
    {
        "name_station": "Озерная",
        "name_line": "8А",
        "id": "254",
        "id_line": "8"
    },
    {
        "name_station": "Говорово",
        "name_line": "8А",
        "id": "255",
        "id_line": "8"
    },
    {
        "name_station": "Солнцево",
        "name_line": "8А",
        "id": "256",
        "id_line": "8"
    },
    {
        "name_station": "Боровское шоссе",
        "name_line": "8А",
        "id": "257",
        "id_line": "8"
    },
    {
        "name_station": "Новопеределкино",
        "name_line": "8А",
        "id": "258",
        "id_line": "8"
    },
    {
        "name_station": "Рассказовка",
        "name_line": "8А",
        "id": "259",
        "id_line": "8"
    },
    {
        "name_station": "Пыхтино",
        "name_line": "8А",
        "id": "408",
        "id_line": "8"
    },
    {
        "name_station": "Аэропорт Внуково",
        "name_line": "8А",
        "id": "409",
        "id_line": "8"
    },
    {
        "name_station": "Алтуфьево",
        "name_line": "9",
        "id": "149",
        "id_line": "9"
    },
    {
        "name_station": "Бибирево",
        "name_line": "9",
        "id": "150",
        "id_line": "9"
    },
    {
        "name_station": "Отрадное",
        "name_line": "9",
        "id": "151",
        "id_line": "9"
    },
    {
        "name_station": "Владыкино",
        "name_line": "9",
        "id": "152",
        "id_line": "9"
    },
    {
        "name_station": "Петровско-Разумовская",
        "name_line": "9",
        "id": "153",
        "id_line": "9"
    },
    {
        "name_station": "Тимирязевская",
        "name_line": "9",
        "id": "154",
        "id_line": "9"
    },
    {
        "name_station": "Дмитровская",
        "name_line": "9",
        "id": "155",
        "id_line": "9"
    },
    {
        "name_station": "Савеловская",
        "name_line": "9",
        "id": "156",
        "id_line": "9"
    },
    {
        "name_station": "Менделеевская",
        "name_line": "9",
        "id": "157",
        "id_line": "9"
    },
    {
        "name_station": "Цветной бульвар",
        "name_line": "9",
        "id": "158",
        "id_line": "9"
    },
    {
        "name_station": "Чеховская",
        "name_line": "9",
        "id": "159",
        "id_line": "9"
    },
    {
        "name_station": "Боровицкая",
        "name_line": "9",
        "id": "160",
        "id_line": "9"
    },
    {
        "name_station": "Полянка",
        "name_line": "9",
        "id": "161",
        "id_line": "9"
    },
    {
        "name_station": "Серпуховская",
        "name_line": "9",
        "id": "162",
        "id_line": "9"
    },
    {
        "name_station": "Тульская",
        "name_line": "9",
        "id": "163",
        "id_line": "9"
    },
    {
        "name_station": "Нагатинская",
        "name_line": "9",
        "id": "164",
        "id_line": "9"
    },
    {
        "name_station": "Нагорная",
        "name_line": "9",
        "id": "165",
        "id_line": "9"
    },
    {
        "name_station": "Нахимовский проспект",
        "name_line": "9",
        "id": "166",
        "id_line": "9"
    },
    {
        "name_station": "Севастопольская",
        "name_line": "9",
        "id": "167",
        "id_line": "9"
    },
    {
        "name_station": "Чертановская",
        "name_line": "9",
        "id": "168",
        "id_line": "9"
    },
    {
        "name_station": "Южная",
        "name_line": "9",
        "id": "169",
        "id_line": "9"
    },
    {
        "name_station": "Пражская",
        "name_line": "9",
        "id": "170",
        "id_line": "9"
    },
    {
        "name_station": "Улица Академика Янгеля",
        "name_line": "9",
        "id": "171",
        "id_line": "9"
    },
    {
        "name_station": "Аннино",
        "name_line": "9",
        "id": "172",
        "id_line": "9"
    },
    {
        "name_station": "Бульвар Дмитрия Донского",
        "name_line": "9",
        "id": "173",
        "id_line": "9"
    },
    {
        "name_station": "Физтех",
        "name_line": "10",
        "id": "412",
        "id_line": "10"
    },
    {
        "name_station": "Лианозово",
        "name_line": "10",
        "id": "411",
        "id_line": "10"
    },
    {
        "name_station": "Яхромская",
        "name_line": "10",
        "id": "410",
        "id_line": "10"
    },
    {
        "name_station": "Селигерская",
        "name_line": "10",
        "id": "250",
        "id_line": "10"
    },
    {
        "name_station": "Верхние Лихоборы",
        "name_line": "10",
        "id": "251",
        "id_line": "10"
    },
    {
        "name_station": "Окружная",
        "name_line": "10",
        "id": "252",
        "id_line": "10"
    },
    {
        "name_station": "Петровско-Разумовская ЛДЛ",
        "name_line": "10",
        "id": "234",
        "id_line": "10"
    },
    {
        "name_station": "Фонвизинская",
        "name_line": "10",
        "id": "233",
        "id_line": "10"
    },
    {
        "name_station": "Бутырская",
        "name_line": "10",
        "id": "232",
        "id_line": "10"
    },
    {
        "name_station": "Марьина Роща",
        "name_line": "10",
        "id": "174",
        "id_line": "10"
    },
    {
        "name_station": "Достоевская",
        "name_line": "10",
        "id": "175",
        "id_line": "10"
    },
    {
        "name_station": "Трубная",
        "name_line": "10",
        "id": "176",
        "id_line": "10"
    },
    {
        "name_station": "Сретенский бульвар",
        "name_line": "10",
        "id": "177",
        "id_line": "10"
    },
    {
        "name_station": "Чкаловская",
        "name_line": "10",
        "id": "178",
        "id_line": "10"
    },
    {
        "name_station": "Римская",
        "name_line": "10",
        "id": "179",
        "id_line": "10"
    },
    {
        "name_station": "Крестьянская застава",
        "name_line": "10",
        "id": "180",
        "id_line": "10"
    },
    {
        "name_station": "Дубровка",
        "name_line": "10",
        "id": "181",
        "id_line": "10"
    },
    {
        "name_station": "Кожуховская",
        "name_line": "10",
        "id": "182",
        "id_line": "10"
    },
    {
        "name_station": "Печатники",
        "name_line": "10",
        "id": "183",
        "id_line": "10"
    },
    {
        "name_station": "Волжская",
        "name_line": "10",
        "id": "184",
        "id_line": "10"
    },
    {
        "name_station": "Люблино",
        "name_line": "10",
        "id": "185",
        "id_line": "10"
    },
    {
        "name_station": "Братиславская",
        "name_line": "10",
        "id": "186",
        "id_line": "10"
    },
    {
        "name_station": "Марьино",
        "name_line": "10",
        "id": "187",
        "id_line": "10"
    },
    {
        "name_station": "Борисово",
        "name_line": "10",
        "id": "188",
        "id_line": "10"
    },
    {
        "name_station": "Шипиловская",
        "name_line": "10",
        "id": "189",
        "id_line": "10"
    },
    {
        "name_station": "Зябликово",
        "name_line": "10",
        "id": "190",
        "id_line": "10"
    },
    {
        "name_station": "Битцевский парк",
        "name_line": "Л1",
        "id": "194",
        "id_line": "12"
    },
    {
        "name_station": "Лесопарковая",
        "name_line": "Л1",
        "id": "195",
        "id_line": "12"
    },
    {
        "name_station": "Улица Старокачаловская",
        "name_line": "Л1",
        "id": "196",
        "id_line": "12"
    },
    {
        "name_station": "Улица Скобелевская",
        "name_line": "Л1",
        "id": "197",
        "id_line": "12"
    },
    {
        "name_station": "Бульвар Адмирала Ушакова",
        "name_line": "Л1",
        "id": "198",
        "id_line": "12"
    },
    {
        "name_station": "Улица Горчакова",
        "name_line": "Л1",
        "id": "199",
        "id_line": "12"
    },
    {
        "name_station": "Бунинская аллея",
        "name_line": "Л1",
        "id": "200",
        "id_line": "12"
    },
    {
        "name_station": "МЦК Ростокино",
        "name_line": "14",
        "id": "204",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Белокаменная",
        "name_line": "14",
        "id": "205",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Бульвар Рокоссовского",
        "name_line": "14",
        "id": "206",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Локомотив",
        "name_line": "14",
        "id": "207",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Измайлово",
        "name_line": "14",
        "id": "208",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Соколиная Гора",
        "name_line": "14",
        "id": "209",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Шоссе Энтузиастов",
        "name_line": "14",
        "id": "210",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Андроновка",
        "name_line": "14",
        "id": "211",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Нижегородская",
        "name_line": "14",
        "id": "212",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Новохохловская",
        "name_line": "14",
        "id": "213",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Угрешская",
        "name_line": "14",
        "id": "214",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Дубровка",
        "name_line": "14",
        "id": "215",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Автозаводская",
        "name_line": "14",
        "id": "216",
        "id_line": "14"
    },
    {
        "name_station": "МЦК ЗИЛ",
        "name_line": "14",
        "id": "217",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Верхние Котлы",
        "name_line": "14",
        "id": "218",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Крымская",
        "name_line": "14",
        "id": "219",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Площадь Гагарина",
        "name_line": "14",
        "id": "220",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Лужники",
        "name_line": "14",
        "id": "221",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Кутузовская",
        "name_line": "14",
        "id": "222",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Москва-Сити",
        "name_line": "14",
        "id": "452",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Шелепиха",
        "name_line": "14",
        "id": "224",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Хорошёво",
        "name_line": "14",
        "id": "225",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Зорге",
        "name_line": "14",
        "id": "226",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Панфиловская",
        "name_line": "14",
        "id": "227",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Стрешнево",
        "name_line": "14",
        "id": "228",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Балтийская",
        "name_line": "14",
        "id": "229",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Коптево",
        "name_line": "14",
        "id": "230",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Лихоборы",
        "name_line": "14",
        "id": "231",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Окружная",
        "name_line": "14",
        "id": "201",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Владыкино",
        "name_line": "14",
        "id": "202",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Ботанический сад",
        "name_line": "14",
        "id": "203",
        "id_line": "14"
    },
    {
        "name_station": "МЦК Ростокино",
        "name_line": "14",
        "id": "204",
        "id_line": "14"
    },
    {
        "name_station": "БКЛ Савеловская",
        "name_line": "БКЛ",
        "id": "261",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Петровский Парк",
        "name_line": "БКЛ",
        "id": "249",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ ЦСКА",
        "name_line": "БКЛ",
        "id": "248",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Хорошёвская",
        "name_line": "БКЛ",
        "id": "247",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Народное Ополчение",
        "name_line": "БКЛ",
        "id": "341",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Мнёвники",
        "name_line": "БКЛ",
        "id": "342",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Терехово",
        "name_line": "БКЛ",
        "id": "343",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Кунцевская",
        "name_line": "БКЛ",
        "id": "344",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Давыдково",
        "name_line": "БКЛ",
        "id": "345",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Аминьевская",
        "name_line": "БКЛ",
        "id": "346",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Мичуринский проспект",
        "name_line": "БКЛ",
        "id": "347",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Проспект Вернадского",
        "name_line": "БКЛ",
        "id": "348",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Новаторская",
        "name_line": "БКЛ",
        "id": "349",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Воронцовская",
        "name_line": "БКЛ",
        "id": "350",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Зюзино",
        "name_line": "БКЛ",
        "id": "351",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Каховская",
        "name_line": "БКЛ",
        "id": "191",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Варшавская",
        "name_line": "БКЛ",
        "id": "364",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Каширская",
        "name_line": "БКЛ",
        "id": "365",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Кленовый бульвар",
        "name_line": "БКЛ",
        "id": "353",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Нагатинский Затон",
        "name_line": "БКЛ",
        "id": "354",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Печатники",
        "name_line": "БКЛ",
        "id": "355",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Текстильщики",
        "name_line": "БКЛ",
        "id": "356",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Нижегородская",
        "name_line": "БКЛ",
        "id": "357",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Авиамоторная",
        "name_line": "БКЛ",
        "id": "358",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Лефортово",
        "name_line": "БКЛ",
        "id": "359",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Электрозаводская",
        "name_line": "БКЛ",
        "id": "360",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Сокольники",
        "name_line": "БКЛ",
        "id": "361",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Рижская",
        "name_line": "БКЛ",
        "id": "362",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Марьина Роща",
        "name_line": "БКЛ",
        "id": "363",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Савеловская",
        "name_line": "БКЛ",
        "id": "261",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Савеловская",
        "name_line": "БКЛ(А)",
        "id": "261",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Петровский Парк",
        "name_line": "БКЛ(А)",
        "id": "249",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ ЦСКА",
        "name_line": "БКЛ(А)",
        "id": "248",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Хорошёвская",
        "name_line": "БКЛ(А)",
        "id": "247",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Шелепиха",
        "name_line": "БКЛ(А)",
        "id": "246",
        "id_line": "11"
    },
    {
        "name_station": "БКЛ Деловой центр",
        "name_line": "БКЛ(А)",
        "id": "245",
        "id_line": "11"
    },
    {
        "name_station": "Нижегородская",
        "name_line": "15",
        "id": "335",
        "id_line": "15"
    },
    {
        "name_station": "Стахановская",
        "name_line": "15",
        "id": "334",
        "id_line": "15"
    },
    {
        "name_station": "Окская",
        "name_line": "15",
        "id": "333",
        "id_line": "15"
    },
    {
        "name_station": "Юго-Восточная",
        "name_line": "15",
        "id": "332",
        "id_line": "15"
    },
    {
        "name_station": "Косино",
        "name_line": "15",
        "id": "265",
        "id_line": "15"
    },
    {
        "name_station": "Улица Дмитриевского",
        "name_line": "15",
        "id": "264",
        "id_line": "15"
    },
    {
        "name_station": "Лухмановская",
        "name_line": "15",
        "id": "263",
        "id_line": "15"
    },
    {
        "name_station": "Некрасовка",
        "name_line": "15",
        "id": "262",
        "id_line": "15"
    },
    {
        "name_station": "Лобня МЦД-1(П)",
        "name_line": "Д1",
        "id": "270",
        "id_line": "16"
    },
    {
        "name_station": "Шереметьевская МЦД-1(П)",
        "name_line": "Д1",
        "id": "271",
        "id_line": "16"
    },
    {
        "name_station": "Хлебниково МЦД-1(П)",
        "name_line": "Д1",
        "id": "272",
        "id_line": "16"
    },
    {
        "name_station": "Водники МЦД-1(П)",
        "name_line": "Д1",
        "id": "273",
        "id_line": "16"
    },
    {
        "name_station": "Долгопрудная МЦД-1(П)",
        "name_line": "Д1",
        "id": "274",
        "id_line": "16"
    },
    {
        "name_station": "Новодачная МЦД-1(П)",
        "name_line": "Д1",
        "id": "275",
        "id_line": "16"
    },
    {
        "name_station": "Марк МЦД-1",
        "name_line": "Д1",
        "id": "276",
        "id_line": "16"
    },
    {
        "name_station": "Лианозово МЦД-1",
        "name_line": "Д1",
        "id": "277",
        "id_line": "16"
    },
    {
        "name_station": "Бескудниково МЦД-1",
        "name_line": "Д1",
        "id": "278",
        "id_line": "16"
    },
    {
        "name_station": "Дегунино МЦД-1",
        "name_line": "Д1",
        "id": "279",
        "id_line": "16"
    },
    {
        "name_station": "Окружная МЦД-1",
        "name_line": "Д1",
        "id": "280",
        "id_line": "16"
    },
    {
        "name_station": "Тимирязевская МЦД-1",
        "name_line": "Д1",
        "id": "282",
        "id_line": "16"
    },
    {
        "name_station": "Савёловский вокзал МЦД-1",
        "name_line": "Д1",
        "id": "284",
        "id_line": "16"
    },
    {
        "name_station": "Белорусский вокзал МЦД-1",
        "name_line": "Д1",
        "id": "285",
        "id_line": "16"
    },
    {
        "name_station": "Беговая МЦД-1",
        "name_line": "Д1",
        "id": "286",
        "id_line": "16"
    },
    {
        "name_station": "Тестовская МЦД-1",
        "name_line": "Д1",
        "id": "287",
        "id_line": "16"
    },
    {
        "name_station": "Фили МЦД-1",
        "name_line": "Д1",
        "id": "288",
        "id_line": "16"
    },
    {
        "name_station": "Славянский бульвар МЦД-1",
        "name_line": "Д1",
        "id": "289",
        "id_line": "16"
    },
    {
        "name_station": "Кунцевская МЦД-1",
        "name_line": "Д1",
        "id": "290",
        "id_line": "16"
    },
    {
        "name_station": "Рабочий Посёлок МЦД-1",
        "name_line": "Д1",
        "id": "291",
        "id_line": "16"
    },
    {
        "name_station": "Сетунь МЦД-1",
        "name_line": "Д1",
        "id": "292",
        "id_line": "16"
    },
    {
        "name_station": "Немчиновка МЦД-1(П)",
        "name_line": "Д1",
        "id": "293",
        "id_line": "16"
    },
    {
        "name_station": "Сколково МЦД-1(П)",
        "name_line": "Д1",
        "id": "294",
        "id_line": "16"
    },
    {
        "name_station": "Баковка МЦД-1(П)",
        "name_line": "Д1",
        "id": "295",
        "id_line": "16"
    },
    {
        "name_station": "Одинцово МЦД-1(П)",
        "name_line": "Д1",
        "id": "296",
        "id_line": "16"
    },
    {
        "name_station": "Нахабино МЦД-2(П)",
        "name_line": "Д2",
        "id": "297",
        "id_line": "17"
    },
    {
        "name_station": "Аникеевка МЦД-2(П)",
        "name_line": "Д2",
        "id": "298",
        "id_line": "17"
    },
    {
        "name_station": "Опалиха МЦД-2(П)",
        "name_line": "Д2",
        "id": "299",
        "id_line": "17"
    },
    {
        "name_station": "Красногорская МЦД-2(П)",
        "name_line": "Д2",
        "id": "300",
        "id_line": "17"
    },
    {
        "name_station": "Павшино МЦД-2(П)",
        "name_line": "Д2",
        "id": "301",
        "id_line": "17"
    },
    {
        "name_station": "Пенягино МЦД-2(П)",
        "name_line": "Д2",
        "id": "302",
        "id_line": "17"
    },
    {
        "name_station": "Волоколамская МЦД-2",
        "name_line": "Д2",
        "id": "331",
        "id_line": "17"
    },
    {
        "name_station": "Трикотажная МЦД-2",
        "name_line": "Д2",
        "id": "303",
        "id_line": "17"
    },
    {
        "name_station": "Тушинская МЦД-2",
        "name_line": "Д2",
        "id": "304",
        "id_line": "17"
    },
    {
        "name_station": "Щукинская МЦД-2",
        "name_line": "Д2",
        "id": "305",
        "id_line": "17"
    },
    {
        "name_station": "Стрешнево МЦД-2",
        "name_line": "Д2",
        "id": "306",
        "id_line": "17"
    },
    {
        "name_station": "Красный Балтиец МЦД-2",
        "name_line": "Д2",
        "id": "307",
        "id_line": "17"
    },
    {
        "name_station": "Гражданская МЦД-2",
        "name_line": "Д2",
        "id": "308",
        "id_line": "17"
    },
    {
        "name_station": "Дмитровская МЦД-2",
        "name_line": "Д2",
        "id": "309",
        "id_line": "17"
    },
    {
        "name_station": "Марьина Роща МЦД-2",
        "name_line": "Д2",
        "id": "366",
        "id_line": "17"
    },
    {
        "name_station": "Рижская МЦД-2",
        "name_line": "Д2",
        "id": "310",
        "id_line": "17"
    },
    {
        "name_station": "Площадь трёх вокзалов МЦД-2",
        "name_line": "Д2",
        "id": "311",
        "id_line": "17"
    },
    {
        "name_station": "Курская МЦД-2",
        "name_line": "Д2",
        "id": "312",
        "id_line": "17"
    },
    {
        "name_station": "Москва-Товарная МЦД-2",
        "name_line": "Д2",
        "id": "313",
        "id_line": "17"
    },
    {
        "name_station": "Калитники МЦД-2",
        "name_line": "Д2",
        "id": "314",
        "id_line": "17"
    },
    {
        "name_station": "Новохохловская МЦД-2",
        "name_line": "Д2",
        "id": "315",
        "id_line": "17"
    },
    {
        "name_station": "Текстильщики МЦД-2",
        "name_line": "Д2",
        "id": "316",
        "id_line": "17"
    },
    {
        "name_station": "Печатники МЦД-2",
        "name_line": "Д2",
        "id": "352",
        "id_line": "17"
    },
    {
        "name_station": "Кубанская МЦД-2",
        "name_line": "Д2",
        "id": "318",
        "id_line": "17"
    },
    {
        "name_station": "Депо МЦД-2",
        "name_line": "Д2",
        "id": "319",
        "id_line": "17"
    },
    {
        "name_station": "Перерва МЦД-2",
        "name_line": "Д2",
        "id": "320",
        "id_line": "17"
    },
    {
        "name_station": "Курьяново",
        "name_line": "Д2",
        "id": "339",
        "id_line": "17"
    },
    {
        "name_station": "Москворечье МЦД-2",
        "name_line": "Д2",
        "id": "321",
        "id_line": "17"
    },
    {
        "name_station": "Царицыно МЦД-2",
        "name_line": "Д2",
        "id": "322",
        "id_line": "17"
    },
    {
        "name_station": "Покровское МЦД-2",
        "name_line": "Д2",
        "id": "323",
        "id_line": "17"
    },
    {
        "name_station": "Красный Строитель МЦД-2",
        "name_line": "Д2",
        "id": "324",
        "id_line": "17"
    },
    {
        "name_station": "Битца МЦД-2",
        "name_line": "Д2",
        "id": "325",
        "id_line": "17"
    },
    {
        "name_station": "Бутово МЦД-2",
        "name_line": "Д2",
        "id": "326",
        "id_line": "17"
    },
    {
        "name_station": "Щербинка МЦД-2",
        "name_line": "Д2",
        "id": "327",
        "id_line": "17"
    },
    {
        "name_station": "Остафьево МЦД-2",
        "name_line": "Д2",
        "id": "328",
        "id_line": "17"
    },
    {
        "name_station": "Силикатная МЦД-2(П)",
        "name_line": "Д2",
        "id": "329",
        "id_line": "17"
    },
    {
        "name_station": "Подольск МЦД-2(П)",
        "name_line": "Д2",
        "id": "330",
        "id_line": "17"
    },
    {
        "name_station": "Крюково МЦД-3 (П)",
        "name_line": "Д3",
        "id": "367",
        "id_line": "18"
    },
    {
        "name_station": "Фирсановская МЦД-3(П)",
        "name_line": "Д3",
        "id": "369",
        "id_line": "18"
    },
    {
        "name_station": "Сходня МЦД-3(П)",
        "name_line": "Д3",
        "id": "370",
        "id_line": "18"
    },
    {
        "name_station": "Подрезково МЦД-3(П)",
        "name_line": "Д3",
        "id": "371",
        "id_line": "18"
    },
    {
        "name_station": "Новоподрезково МЦД-3(П)",
        "name_line": "Д3",
        "id": "372",
        "id_line": "18"
    },
    {
        "name_station": "Молжаниново МЦД-3(П)",
        "name_line": "Д3",
        "id": "373",
        "id_line": "18"
    },
    {
        "name_station": "Химки МЦД-3(П)",
        "name_line": "Д3",
        "id": "374",
        "id_line": "18"
    },
    {
        "name_station": "Левобережная МЦД-3(П)",
        "name_line": "Д3",
        "id": "375",
        "id_line": "18"
    },
    {
        "name_station": "Ховрино МЦД-3",
        "name_line": "Д3",
        "id": "376",
        "id_line": "18"
    },
    {
        "name_station": "Грачёвская МЦД-3",
        "name_line": "Д3",
        "id": "377",
        "id_line": "18"
    },
    {
        "name_station": "Моссельмаш МЦД-3",
        "name_line": "Д3",
        "id": "378",
        "id_line": "18"
    },
    {
        "name_station": "Лихоборы МЦД-3",
        "name_line": "Д3",
        "id": "379",
        "id_line": "18"
    },
    {
        "name_station": "Петровско-Разумовская МЦД-3",
        "name_line": "Д3",
        "id": "380",
        "id_line": "18"
    },
    {
        "name_station": "Останкино МЦД-3",
        "name_line": "Д3",
        "id": "381",
        "id_line": "18"
    },
    {
        "name_station": "Электрозаводская МЦД-3",
        "name_line": "Д3",
        "id": "384",
        "id_line": "18"
    },
    {
        "name_station": "Сортировочная МЦД-3",
        "name_line": "Д3",
        "id": "385",
        "id_line": "18"
    },
    {
        "name_station": "Авиамоторная МЦД-3",
        "name_line": "Д3",
        "id": "386",
        "id_line": "18"
    },
    {
        "name_station": "Андроновка МЦД-3",
        "name_line": "Д3",
        "id": "387",
        "id_line": "18"
    },
    {
        "name_station": "Перово МЦД-3",
        "name_line": "Д3",
        "id": "388",
        "id_line": "18"
    },
    {
        "name_station": "Плющево МЦД-3",
        "name_line": "Д3",
        "id": "389",
        "id_line": "18"
    },
    {
        "name_station": "Вешняки МЦД-3",
        "name_line": "Д3",
        "id": "390",
        "id_line": "18"
    },
    {
        "name_station": "Выхино МЦД-3",
        "name_line": "Д3",
        "id": "391",
        "id_line": "18"
    },
    {
        "name_station": "Косино МЦД-3",
        "name_line": "Д3",
        "id": "392",
        "id_line": "18"
    },
    {
        "name_station": "Ухтомская МЦД-3",
        "name_line": "Д3",
        "id": "393",
        "id_line": "18"
    },
    {
        "name_station": "Люберцы МЦД-3(П)",
        "name_line": "Д3",
        "id": "394",
        "id_line": "18"
    },
    {
        "name_station": "Панки МЦД-3(П)",
        "name_line": "Д3",
        "id": "395",
        "id_line": "18"
    },
    {
        "name_station": "Томилино МЦД3(П)",
        "name_line": "Д3",
        "id": "396",
        "id_line": "18"
    },
    {
        "name_station": "Красково МЦД-3(П)",
        "name_line": "Д3",
        "id": "397",
        "id_line": "18"
    },
    {
        "name_station": "Малаховка МЦД-3(П)",
        "name_line": "Д3",
        "id": "398",
        "id_line": "18"
    },
    {
        "name_station": "Удельная МЦД-3(П)",
        "name_line": "Д3",
        "id": "399",
        "id_line": "18"
    },
    {
        "name_station": "Быково МЦД-3(П)",
        "name_line": "Д3",
        "id": "400",
        "id_line": "18"
    },
    {
        "name_station": "Ильинская МЦД-3(П)",
        "name_line": "Д3",
        "id": "401",
        "id_line": "18"
    },
    {
        "name_station": "Отдых МЦД-3(П)",
        "name_line": "Д3",
        "id": "402",
        "id_line": "18"
    },
    {
        "name_station": "Кратово МЦД-3(П)",
        "name_line": "Д3",
        "id": "403",
        "id_line": "18"
    },
    {
        "name_station": "Есенинская МЦД-3(П)",
        "name_line": "Д3",
        "id": "404",
        "id_line": "18"
    },
    {
        "name_station": "Фабричная МЦД-3(П)",
        "name_line": "Д3",
        "id": "405",
        "id_line": "18"
    },
    {
        "name_station": "Раменское МЦД-3(П)",
        "name_line": "Д3",
        "id": "406",
        "id_line": "18"
    },
    {
        "name_station": "Ипподром МЦД-3(П)",
        "name_line": "Д3",
        "id": "407",
        "id_line": "18"
    },
    {
        "name_station": "Железнодорожная МЦД-4(П)",
        "name_line": "Д4",
        "id": "413",
        "id_line": "19"
    },
    {
        "name_station": "Ольгино МЦД-4(П)",
        "name_line": "Д4",
        "id": "414",
        "id_line": "19"
    },
    {
        "name_station": "Кучино МЦД-4(П)",
        "name_line": "Д4",
        "id": "415",
        "id_line": "19"
    },
    {
        "name_station": "Салтыковская МЦД-4(П)",
        "name_line": "Д4",
        "id": "416",
        "id_line": "19"
    },
    {
        "name_station": "Никольское МЦД-4(П)",
        "name_line": "Д4",
        "id": "417",
        "id_line": "19"
    },
    {
        "name_station": "Реутов МЦД-4",
        "name_line": "Д4",
        "id": "418",
        "id_line": "19"
    },
    {
        "name_station": "Новогиреево МЦД-4",
        "name_line": "Д4",
        "id": "419",
        "id_line": "19"
    },
    {
        "name_station": "Кусково МЦД-4",
        "name_line": "Д4",
        "id": "420",
        "id_line": "19"
    },
    {
        "name_station": "Чухлинка МЦД-4",
        "name_line": "Д4",
        "id": "421",
        "id_line": "19"
    },
    {
        "name_station": "Нижегородская МЦД-4",
        "name_line": "Д4",
        "id": "422",
        "id_line": "19"
    },
    {
        "name_station": "Серп и Молот МЦД-4",
        "name_line": "Д4",
        "id": "423",
        "id_line": "19"
    },
    {
        "name_station": "Курская МЦД-4",
        "name_line": "Д4",
        "id": "424",
        "id_line": "19"
    },
    {
        "name_station": "Площадь трёх вокзалов МЦД-4",
        "name_line": "Д4",
        "id": "425",
        "id_line": "19"
    },
    {
        "name_station": "Марьина Роща МЦД-4",
        "name_line": "Д4",
        "id": "426",
        "id_line": "19"
    },
    {
        "name_station": "Савеловская МЦД-4",
        "name_line": "Д4",
        "id": "427",
        "id_line": "19"
    },
    {
        "name_station": "Белорусская МЦД-4",
        "name_line": "Д4",
        "id": "428",
        "id_line": "19"
    },
    {
        "name_station": "Тестовская (Москва-Сити) МЦД-4",
        "name_line": "Д4",
        "id": "451",
        "id_line": "19"
    },
    {
        "name_station": "Кутузовская МЦД-4",
        "name_line": "Д4",
        "id": "430",
        "id_line": "19"
    },
    {
        "name_station": "Поклонная МЦД-4",
        "name_line": "Д4",
        "id": "431",
        "id_line": "19"
    },
    {
        "name_station": "Минская МЦД-4",
        "name_line": "Д4",
        "id": "432",
        "id_line": "19"
    },
    {
        "name_station": "Матвеевская МЦД-4",
        "name_line": "Д4",
        "id": "433",
        "id_line": "19"
    },
    {
        "name_station": "Аминьевская МЦД-4",
        "name_line": "Д4",
        "id": "434",
        "id_line": "19"
    },
    {
        "name_station": "Очаково МЦД-4",
        "name_line": "Д4",
        "id": "435",
        "id_line": "19"
    },
    {
        "name_station": "Мещерская МЦД-4",
        "name_line": "Д4",
        "id": "436",
        "id_line": "19"
    },
    {
        "name_station": "Солнечная МЦД-4",
        "name_line": "Д4",
        "id": "437",
        "id_line": "19"
    },
    {
        "name_station": "Переделкино МЦД-4",
        "name_line": "Д4",
        "id": "438",
        "id_line": "19"
    },
    {
        "name_station": "Мичуринец МЦД-4",
        "name_line": "Д4",
        "id": "439",
        "id_line": "19"
    },
    {
        "name_station": "Внуково МЦД-4",
        "name_line": "Д4",
        "id": "440",
        "id_line": "19"
    },
    {
        "name_station": "Лесной Городок МЦД-4(П)",
        "name_line": "Д4",
        "id": "441",
        "id_line": "19"
    },
    {
        "name_station": "Толстопальцево МЦД-4(П)",
        "name_line": "Д4",
        "id": "442",
        "id_line": "19"
    },
    {
        "name_station": "Кокошкино МЦД-4(П)",
        "name_line": "Д4",
        "id": "443",
        "id_line": "19"
    },
    {
        "name_station": "Санино МЦД-4(П)",
        "name_line": "Д4",
        "id": "444",
        "id_line": "19"
    },
    {
        "name_station": "Крёкшино МЦД-4(П)",
        "name_line": "Д4",
        "id": "445",
        "id_line": "19"
    },
    {
        "name_station": "Победа МЦД-4(П)",
        "name_line": "Д4",
        "id": "446",
        "id_line": "19"
    },
    {
        "name_station": "Апрелевка МЦД-4(П)",
        "name_line": "Д4",
        "id": "447",
        "id_line": "19"
    }
];

export const passengerNonAppearance: IPassengerNonAppearance[] = [{"ID_BID":"489087","DATE_TIME":"24.04.2024 11:12"},
    {"ID_BID":"488717","DATE_TIME":"24.04.2024 12:28"},
    {"ID_BID":"488523","DATE_TIME":"24.04.2024 14:12"},
    {"ID_BID":"488527","DATE_TIME":"24.04.2024 14:13"},
    {"ID_BID":"489288","DATE_TIME":"24.04.2024 14:27"},
    {"ID_BID":"489051","DATE_TIME":"24.04.2024 15:58"},
    {"ID_BID":"488935","DATE_TIME":"24.04.2024 17:08"}];

export const cancellationsOfApplications: ICancellationsOfApplications[] = [{"ID_BID":"487705","DATE_TIME":"22.04.2024 22:25"},
    {"ID_BID":"486993","DATE_TIME":"23.04.2024 13:53"},
    {"ID_BID":"488210","DATE_TIME":"23.04.2024 18:05"},
    {"ID_BID":"488318","DATE_TIME":"23.04.2024 19:59"},
    {"ID_BID":"481912","DATE_TIME":"23.04.2024 16:30"},
    {"ID_BID":"481183","DATE_TIME":"04.04.2024 18:49"},
    {"ID_BID":"489141","DATE_TIME":"23.04.2024 20:44"},
    {"ID_BID":"488273","DATE_TIME":"23.04.2024 13:55"},
    {"ID_BID":"489115","DATE_TIME":"23.04.2024 17:20"},
    {"ID_BID":"489179","DATE_TIME":"24.04.2024 7:33"},
    {"ID_BID":"489205","DATE_TIME":"23.04.2024 22:36"},
    {"ID_BID":"488059","DATE_TIME":"24.04.2024 0:17"},
    {"ID_BID":"487728","DATE_TIME":"23.04.2024 15:06"},
    {"ID_BID":"488337","DATE_TIME":"23.04.2024 23:38"},
    {"ID_BID":"488744","DATE_TIME":"23.04.2024 19:38"},
    {"ID_BID":"488895","DATE_TIME":"24.04.2024 9:24"},
    {"ID_BID":"489142","DATE_TIME":"23.04.2024 20:44"},
    {"ID_BID":"489062","DATE_TIME":"23.04.2024 22:52"},
    {"ID_BID":"489180","DATE_TIME":"24.04.2024 7:33"},
    {"ID_BID":"487710","DATE_TIME":"22.04.2024 22:25"},
    {"ID_BID":"488842","DATE_TIME":"24.04.2024 9:48"},
    {"ID_BID":"488896","DATE_TIME":"24.04.2024 9:54"},
    {"ID_BID":"488554","DATE_TIME":"23.04.2024 21:59"},
    {"ID_BID":"488067","DATE_TIME":"23.04.2024 22:04"},
    {"ID_BID":"488275","DATE_TIME":"23.04.2024 13:55"},
    {"ID_BID":"489088","DATE_TIME":"24.04.2024 9:29"},
    {"ID_BID":"489105","DATE_TIME":"24.04.2024 8:44"},
    {"ID_BID":"489074","DATE_TIME":"24.04.2024 14:38"},
    {"ID_BID":"486997","DATE_TIME":"23.04.2024 13:53"},
    {"ID_BID":"489323","DATE_TIME":"24.04.2024 13:29"},
    {"ID_BID":"489063","DATE_TIME":"23.04.2024 22:52"},
    {"ID_BID":"488915","DATE_TIME":"24.04.2024 17:25"},
    {"ID_BID":"489452","DATE_TIME":"24.04.2024 17:13"},
    {"ID_BID":"481199","DATE_TIME":"04.04.2024 18:49"},
    {"ID_BID":"489162","DATE_TIME":"24.04.2024 11:32"},
    {"ID_BID":"489114","DATE_TIME":"24.04.2024 16:17"},
    {"ID_BID":"488843","DATE_TIME":"24.04.2024 9:48"},
    {"ID_BID":"488745","DATE_TIME":"23.04.2024 19:38"},
    {"ID_BID":"487875","DATE_TIME":"24.04.2024 9:33"},
    {"ID_BID":"488559","DATE_TIME":"23.04.2024 21:59"},
    {"ID_BID":"489075","DATE_TIME":"24.04.2024 14:38"},
    {"ID_BID":"489089","DATE_TIME":"24.04.2024 9:29"},
    {"ID_BID":"489106","DATE_TIME":"24.04.2024 8:44"},
    {"ID_BID":"487724","DATE_TIME":"23.04.2024 15:06"}];

export const postponementOfApplicationsByTime: IPostponementOfApplicationsByTime[] = [
    {
        "id_bid": "487736",
        "time_edit": "19.04.2024 14:51:11",
        "time_s": "19:30",
        "time_f": "20:00"
    },
    {
        "id_bid": "488742",
        "time_edit": "22.04.2024 11:48:32",
        "time_s": "17:15",
        "time_f": "17:20"
    },
    {
        "id_bid": "488944",
        "time_edit": "23.04.2024 7:18:49",
        "time_s": "18:00",
        "time_f": "17:50"
    },
    {
        "id_bid": "488233",
        "time_edit": "23.04.2024 9:32:59",
        "time_s": "08:10",
        "time_f": "10:20"
    },
    {
        "id_bid": "488045",
        "time_edit": "23.04.2024 10:12:56",
        "time_s": "08:25",
        "time_f": "09:00"
    },
    {
        "id_bid": "488050",
        "time_edit": "23.04.2024 10:13:09",
        "time_s": "17:00",
        "time_f": "14:15"
    },
    {
        "id_bid": "488863",
        "time_edit": "23.04.2024 16:18:56",
        "time_s": "10:15",
        "time_f": "19:25"
    },
    {
        "id_bid": "488196",
        "time_edit": "23.04.2024 16:51:14",
        "time_s": "09:40",
        "time_f": "09:50"
    },
    {
        "id_bid": "488736",
        "time_edit": "23.04.2024 18:00:19",
        "time_s": "09:45",
        "time_f": "10:10"
    },
    {
        "id_bid": "488825",
        "time_edit": "23.04.2024 18:04:09",
        "time_s": "10:00",
        "time_f": "11:50"
    },
    {
        "id_bid": "489127",
        "time_edit": "23.04.2024 18:19:07",
        "time_s": "09:00",
        "time_f": "10:30"
    },
    {
        "id_bid": "489163",
        "time_edit": "23.04.2024 18:39:03",
        "time_s": "11:00",
        "time_f": "12:20"
    },
    {
        "id_bid": "489069",
        "time_edit": "23.04.2024 18:45:41",
        "time_s": "10:30",
        "time_f": "10:45"
    },
    {
        "id_bid": "489094",
        "time_edit": "23.04.2024 19:10:06",
        "time_s": "10:05",
        "time_f": "10:30"
    },
    {
        "id_bid": "488771",
        "time_edit": "23.04.2024 19:19:26",
        "time_s": "10:30",
        "time_f": "10:40"
    },
    {
        "id_bid": "489193",
        "time_edit": "23.04.2024 20:12:45",
        "time_s": "19:00",
        "time_f": "18:00"
    },
    {
        "id_bid": "488240",
        "time_edit": "23.04.2024 22:20:34",
        "time_s": "15:00",
        "time_f": "17:00"
    },
    {
        "id_bid": "489268",
        "time_edit": "23.04.2024 23:08:06",
        "time_s": "15:10",
        "time_f": "15:15"
    },
    {
        "id_bid": "487542",
        "time_edit": "24.04.2024 5:49:47",
        "time_s": "07:00",
        "time_f": "06:46"
    },
    {
        "id_bid": "488962",
        "time_edit": "24.04.2024 6:34:51",
        "time_s": "07:25",
        "time_f": "07:40"
    },
    {
        "id_bid": "489259",
        "time_edit": "24.04.2024 7:05:29",
        "time_s": "07:40",
        "time_f": "07:50"
    },
    {
        "id_bid": "489230",
        "time_edit": "24.04.2024 8:10:55",
        "time_s": "08:20",
        "time_f": "09:00"
    },
    {
        "id_bid": "488875",
        "time_edit": "24.04.2024 8:43:50",
        "time_s": "20:00",
        "time_f": "21:30"
    },
    {
        "id_bid": "488952",
        "time_edit": "24.04.2024 8:52:54",
        "time_s": "17:30",
        "time_f": "17:10"
    },
    {
        "id_bid": "489128",
        "time_edit": "24.04.2024 9:26:23",
        "time_s": "13:00",
        "time_f": "12:00"
    },
    {
        "id_bid": "488625",
        "time_edit": "24.04.2024 10:18:48",
        "time_s": "14:15",
        "time_f": "14:00"
    },
    {
        "id_bid": "489311",
        "time_edit": "24.04.2024 10:43:17",
        "time_s": "22:00",
        "time_f": "23:30"
    },
    {
        "id_bid": "488198",
        "time_edit": "24.04.2024 11:43:15",
        "time_s": "16:00",
        "time_f": "16:10"
    },
    {
        "id_bid": "489321",
        "time_edit": "24.04.2024 12:33:57",
        "time_s": "22:00",
        "time_f": "22:30"
    },
    {
        "id_bid": "489147",
        "time_edit": "24.04.2024 13:21:49",
        "time_s": "15:30",
        "time_f": "14:25"
    },
    {
        "id_bid": "489206",
        "time_edit": "24.04.2024 13:34:23",
        "time_s": "18:00",
        "time_f": "18:30"
    },
    {
        "id_bid": "489149",
        "time_edit": "24.04.2024 14:25:01",
        "time_s": "16:40",
        "time_f": "15:40"
    },
    {
        "id_bid": "489376",
        "time_edit": "24.04.2024 15:16:52",
        "time_s": "17:00",
        "time_f": "16:05"
    },
    {
        "id_bid": "487634",
        "time_edit": "24.04.2024 20:35:30",
        "time_s": "20:40",
        "time_f": "21:00"
    },
    {
        "id_bid": "489077",
        "time_edit": "24.04.2024 21:10:31",
        "time_s": "22:00",
        "time_f": "23:00"
    },
    {
        "id_bid": "489231",
        "time_edit": "24.04.2024 21:53:09",
        "time_s": "22:40",
        "time_f": "22:44"
    }
];

export const employeeList: IEmployeeList[] = [
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"142","FIO":"Болотов Г.Е.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"965","FIO":"Шварева М.В.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦСИ","SEX":"Женский"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"813","FIO":"Кузьмичев В.К.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"227","FIO":"Синяков А.В.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"231","FIO":"Фролов К.В.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"160","FIO":"Шарфутов А.В.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"325","FIO":"Вихров Р.Т.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"77","FIO":"Нижневский П.А.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"894","FIO":"Ноздряков М.С","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"774","FIO":"Марухина Н.А.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦСИ","SEX":"Женский"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"850","FIO":"Арзамасцев В.В.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"945","FIO":"Куклина Ф.Н.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"457","FIO":"Кондратенко А.Н.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"712","FIO":"Миронова Л.В.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"373","FIO":"Наротьев М.А.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"23.04.2024","TIME_WORK":"20:00-08:00","ID":"631","FIO":"Хализев В.И.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"142","FIO":"Болотов Г.Е.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"965","FIO":"Шварева М.В.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦСИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"813","FIO":"Кузьмичев В.К.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"227","FIO":"Синяков А.В.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"231","FIO":"Фролов К.В.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"160","FIO":"Шарфутов А.В.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"325","FIO":"Вихров Р.Т.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"77","FIO":"Нижневский П.А.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"894","FIO":"Ноздряков М.С","UCHASTOK":"ЦУ-3 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"62","FIO":"Бушуев А.А.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦУ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"917","FIO":"Кольцов М.Ю.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"342","FIO":"Лазутин Д.В.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"269","FIO":"Чернявская В.А.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦСИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"64","FIO":"Гавриленко О.В.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"18","FIO":"Горохова Е.Н.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"70","FIO":"Гусева Н.И.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"74","FIO":"Мазеин А.П.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"67","FIO":"Борисов А.Ю.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"69","FIO":"Будников А.В.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1249","FIO":"Бодров О.В.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"86","FIO":"Инкин Г.А.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"647","FIO":"Ковалева Ю.Г.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1208","FIO":"Першин А.А.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"79","FIO":"Силаева О.И.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"21","FIO":"Скрябин С.Н.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"529","FIO":"Свечников В.В.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1222","FIO":"Садов К.К.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"659","FIO":"Филиппов В.М.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1148","FIO":"Фокина Е.А.","UCHASTOK":"ЦУ-2","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"155","FIO":"Воробьёв С.В.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦУ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"123","FIO":"Быков Е.А.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"4","FIO":"Жукова Г.Б.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦСИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"20","FIO":"Сироткин А.Н.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"8","FIO":"Дядищев С.В.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1064","FIO":"Аггеев Д.А.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"9","FIO":"Корнеев К.В.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"525","FIO":"Серухин А.В.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"15","FIO":"Неустроева С.В.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"23","FIO":"Тихомирова Е.Е.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"28","FIO":"Минкина Е.К.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"297","FIO":"Кузнецов Е.Б.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"298","FIO":"Макарова А.С.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"52","FIO":"Теленкова В.А.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"437","FIO":"Шейман И.Г.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"705","FIO":"Захарова К.Г.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"709","FIO":"Аниськина Е.А.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"991","FIO":"Таковникова Н.А.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"788","FIO":"Бабенков А. А.","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"65","FIO":"Цыбаков С.Ю","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦУ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"973","FIO":"Исаева Э.Е.","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦСИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"651","FIO":"Сажнева О.В.","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"1257","FIO":"Андрианов С.Д,","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"961","FIO":"Билжа С.Й","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1253","FIO":"Ефремов П.С,","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"939","FIO":"Зиновьев С.В.","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"406","FIO":"Карева Т.Ю.","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"960","FIO":"Медведев П.С.","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"685","FIO":"Савченко А.В.","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"1060","FIO":"Смирнова О.В.","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"736","FIO":"Тимонин А.В.","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"683","FIO":"Ходорко В.Э.","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"203","FIO":"Шувалова Т.А.","UCHASTOK":"ЦУ-8","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"121","FIO":"Нехаев А.В.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦУ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"695","FIO":"Боталов А.М.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"860","FIO":"Акульшин А.П.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"642","FIO":"Киселева Н.В.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"133","FIO":"Ратникова Т.И.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"131","FIO":"Захаров Д.И.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"319","FIO":"Коваленко А.В.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-16:00","ID":"682","FIO":"Исаев М.М.","UCHASTOK":"ЦУ-3 (Н)","SMENA":"1Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1171","FIO":"Столярова И.В.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"3","FIO":"Белоусова Е,В.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"245","FIO":"Ходченкова М.Н.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"35","FIO":"Горностаев И.Б.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1045","FIO":"Мурзак Д.Г.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1215","FIO":"Болвачева И. А.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"10:00-22:00","ID":"1254","FIO":"Колесникова Е,И.","UCHASTOK":"ЦУ-3","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"11","FIO":"Курочкина И.В.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"770","FIO":"Солодовникова Н.В.","UCHASTOK":"ЦУ-1","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"208","FIO":"Мусин Р.М.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"305","FIO":"Костин В.Ю.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"199","FIO":"Тушинок С.Н.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦСИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"200","FIO":"Шипунов А.В.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"187","FIO":"Кобзев Д.В.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"182","FIO":"Викторов В.В.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1140","FIO":"Акимов В.И.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1216","FIO":"Костюков Н.В.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1218","FIO":"Демидов А.С.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1221","FIO":"Герасименко А.Т.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1256","FIO":"Тарасова Ю.П.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"236","FIO":"Бубнова Е.В.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"10:00-22:00","ID":"746","FIO":"Пилатова А.Е. ","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"192","FIO":"Новожилов С.В.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1258","FIO":"Лобова Е.В.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"1177","FIO":"Козлова Е. В.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"1255","FIO":"Шуйкова С.М.","UCHASTOK":"ЦУ-4","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"945","FIO":"Куклина Ф.Н.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"850","FIO":"Арзамасцев В.В.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"774","FIO":"Марухина Н.А.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦСИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"712","FIO":"Миронова Л.В.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"631","FIO":"Хализев В.И.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"457","FIO":"Кондратенко А.Н.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"20:00-08:00","ID":"373","FIO":"Наротьев М.А.","UCHASTOK":"ЦУ-4 (Н)","SMENA":"2Н","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"07:00-19:00","ID":"1202","FIO":"Носова А.А.","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"608","FIO":"Павленко Г.Е.","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"514","FIO":"Колобков К.М","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"460","FIO":"Удовенко М.С.","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"10:00-22:00","ID":"418","FIO":"Кузнецов А.В. ","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"304","FIO":"Щедрин М.А.","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"296","FIO":"Уткин Н.С.","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"246","FIO":"Афанасьева Н.В.","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"177","FIO":"Алексеев А.Г.","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"148","FIO":"Солтан Д. С.","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦСИ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"111","FIO":"Лыков К.А.","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦУ","SEX":"Мужской"},
    {"DATE":"24.04.2024","TIME_WORK":"10:00-22:00","ID":"85","FIO":"Христофорова О.С.","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦСИ","SEX":"Женский"},
    {"DATE":"24.04.2024","TIME_WORK":"08:00-20:00","ID":"24","FIO":"Тришкина Е.В.","UCHASTOK":"ЦУ-5","SMENA":"1","RANK":"ЦИ","SEX":"Женский"}];