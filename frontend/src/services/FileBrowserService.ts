
const localHost = 'http://10.10.10.9:8080';
const authServiceAddr = 'http://localhost:8080';

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
type workDay = "1" | "2" | "3" | "4" | "5" | "6" | "7";

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



export interface IResponseListOfPassenger extends IResponseAddNewPassenger {
    passengers: IListOfPassengers[];
}

export const requestListOfPassengers = async (): Promise<IResponseAllPassengers> => {
    const response = await fetch('http://10.10.10.9:8080/api/v1/metro/service/passenger/all');
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

export const addNewEmployee = async (employeeData: IPassenger): Promise<IResponseAddNewPassenger> => {
    const response = await fetch(`${localHost}/api/v1/metro/service/employee/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    });
    return await response.json();
}





export const updateStatus = async (status: string, idApplication: number): Promise<void> => {
    console.log(status)
    const response = await fetch(`http://10.10.10.9:8080/api/v1/metro/service/${status}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(idApplication),
    });
    console.log(response)
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
