
const localHost = 'http://194.113.35.17:8000';
const authServiceAddr = 'http://194.113.35.17:8080';

export type Category = 'ИЗТ' | 'ИЗ' | 'ИС' | 'ИК' | 'ИО' | 'ДИ' | 'ПЛ' | 'РД' | 'РДК' | 'ОГД' | 'ОВ' | 'ИУ';

export interface IListOfEmployees {
    id: number,
    lastName: string,
    firstName: string,
    surName: string,
    role: string,
    workAria: string,
    sex: string,
    phone: string,
    active: boolean,
    sick: boolean
}

export interface IResponseGetAllEmployees {
    employee: IListOfEmployees[],
    code: number,
    message: string,
}

export interface IListOfPassengers {
    id: number,
    lastName: string,
    firstName: string,
    surName: string,
    category: Category,
    phone: string,
    active: boolean
}

interface IResponseAllPassengers {
    passengers: IListOfPassengers[],
    code: number,
    message: string,
}


export interface IPassenger {
    lastName: string,
    firstName: string,
    surName: string,
    phone: string,
    sex: string,
    category: Category
}

export interface IWorkSchedulePerDay {
    "work": {
        "start": string,
        "end": string
    },
    "dinner": {
        "start": string,
        "end": string
    }
}
export type workDay = "1" | "2" | "3" | "4" | "5" | "6" | "7";

export interface IEmployeeWorkSchedule {
    "employeeId": number,
    "weekIntervals": {
        [key in workDay]: IWorkSchedulePerDay

    }
}


export interface IResponseAddNewPassenger {
    code: number;
    message: string;
}

export interface IResponseAddNewEmployee {
    password: string,
    code: number,
    message: string,
}

export interface IEditWorkSchedule {
    id: number;
    workSchedule: IEmployeeWorkSchedule
}

export interface WorkTimeState {
    [key: string]: {
        work: { start: string, end: string },
        dinner: { start: string, end: string }
    };
}

export interface IWorkScheduleChangeResponse {
    "bidsId": number[],
    "code": number,
    "message": string
}

export interface IBids {
    "id": number,
    "passengerId": number,
    "createdDate": string,
    "createdTime": string,
    "date": string,
    "time": string,
    "status": string,
    "stID1": number,
    "stID2": number,
    "countMale": number,
    "countFemale": number,
    "timePredict": string,
    "timeStart": string,
    "timeOver": string
}

export interface IListOfBids {
    "bid": IBids,
    "employeesId": number[]
}


export interface IResponseListOfBids {
    bids: IListOfBids[],
    code: number,
    message: string,
}

export interface ICalculateBidResponse {
    "timePredict": string,
    "code":number,
    "message": string
}

export interface IAddBidProps {
    "countMale": number,
    "countFemale": number,
    "passengerId": number,
    "date": string,
    "time": string,
    "stID1": number,
    "stID2": number,
    timePredict?: string
}

export interface IAddBidResponse {
    "code":number,
    "message": string
    "added"?:boolean,
    "freeSlots"?: string[],
}

export interface IListFilterBid {
    id?: number,
    passenger_lastName?: string,
    passenger_firstName?: string,
    passenger_surName?: string,
    category?: string,
    id_st1?: number,
    id_st2?: number,
    status?: string | null,
    uchastok?: string | null,
    employee_lastName?: string,
    employee_firstName?: string,
    employee_surName?: string,
    startDate?: string,
    endDate?: string,
    startTime?: string
}

export interface IListOfBidsResult {
    "id": number,
    "passengerId": number,
    "createdDate": string,
    "createdTime": string,
    "date": string,
    "time": string,
    "status": string,
    "stID1": number,
    "stID2": number,
    "countMale": number,
    "countFemale": number,
    "timePredict": string,
    "timeStart": null,
    "timeOver": null
}

export interface IListOfBidsResultResponse {
    "bids": IListOfBidsResult[],
    "code": number,
    "message": string
}

export interface IBidAllEmployeeList {
    "id": number,
    "passengerId": number,
    "createdDate": string,
    "createdTime": string,
    "date": string,
    "time": string,
    "status": string,
    "stID1": number,
    "stID2": number,
    "countMale": number,
    "countFemale": number,
    "timePredict": string,
    "timeStart": null,
    "timeOver": null

}

export interface IBidAllEmployeeResponse {
    "bids": IBidAllEmployeeList[],
    "code": number,
    "message": string

}

export interface IResponseListOfPassenger extends IResponseAddNewPassenger {
    passengers: IListOfPassengers[];
}

export const requestListOfPassengers = async (): Promise<IResponseAllPassengers> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/passenger/all`);
    return response.json();
}

export const addNewPassenger = async (passengerData: IPassenger): Promise<IResponseAddNewPassenger> => {
    try {
        const response = await fetch(`${localHost}/api/v1/metro/service/passenger/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passengerData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const changePassenger = async (passengerData: IListOfPassengers): Promise<void> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/passenger/change`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(passengerData),
    });
    return await response.json();
}

export const deletePassenger = async (idPassenger: number): Promise<void> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/passenger/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(idPassenger),
    });
    return await response.json();
}

export const requestListOfEmployee = async (): Promise<IResponseGetAllEmployees> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/employee/all`);
    return await response.json();
}

export const addNewEmployee = async (employeeData: IPassenger): Promise<IResponseAddNewEmployee> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/employee/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    });
    return await response.json();
}

export const changeEmployee = async (employeeData: IListOfPassengers): Promise<void> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/employee/change`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    });
    return await response.json();
}


export const workSchedule = async () => {
    const response = await fetch(`${localHost}/api/v1/metro/service/employee/get/schedule`);
    return await response.json();
}

export const changeEmployeeSchedule = async (employeeScheduleData: unknown): Promise<IWorkScheduleChangeResponse> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/employee/change/schedule`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeScheduleData),
    });
    return await response.json();
}

export const employeeSickLeave = async (id: number, sick: string): Promise<IWorkScheduleChangeResponse> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/employee/sick_leave/${sick}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
    });
    return await response.json();
}

export const requestListOfBid = async (): Promise<IResponseListOfBids> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/bid/all`);
    return await response.json();
}

export const calculateNewBid = async (bidCalculateData: IAddBidProps): Promise<ICalculateBidResponse> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/bid/calculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidCalculateData),
    });
    return await response.json();
}

export const addNewBid = async (bidData: IAddBidProps): Promise<IAddBidResponse> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/bid/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidData),
    });
    return await response.json();
}

export const findBid = async (bidData: IListFilterBid): Promise<IListOfBidsResultResponse> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/bid/all/filter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidData),
    });
    return await response.json();
}

export const bidAllEmployee = async (id: number): Promise<IBidAllEmployeeResponse> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/bid/all/employee`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
    });
    return await response.json();

}

export const updateStatus = async (status: string, idApplication: number): Promise<void> => {
    console.log(status)
    const response = await fetch(`${localHost}/api/v1/metro/service/bid/${status}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(idApplication),
    });
    console.log(response)
    return await response.json();
}

export const dateAutoDistribution = async (date: string, formResponse: string): Promise<void> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/bid/redistribute/${formResponse}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(date),
    });
    return await response.json();
}

interface TokenPair {
    access: string
    refresh: string
}

export const auth = async (username: string, password: string) => {
    const response = await fetch(`${authServiceAddr}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        }),
    });

    if (response.ok) {
        const res : TokenPair = await response.json();
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
    }
    
    return response.ok;
}

export const refreshAuth = async (token: string) => {
    const response = await fetch(`${authServiceAddr}/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token
        }),
    });
    if (response.ok) {
        const newToken = (await response.json()).newToken;
        localStorage.setItem('refresh', newToken);
        return true;
    }
    return false;
}

