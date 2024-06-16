import styled from "styled-components";

export const HomePageWrapper = styled.div`
    margin-top: 20px;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #1890ff;
        color: white;
        font-size: 18px;
        margin-bottom: 20px;
    }
    .management-btn {
        display: flex;
    }
    .btn-edit {
        margin-left: 10px;
    }
    .dayOfWeek {
        display: flex;
    }
    .ant-card-body {
        padding: 10px;
    }
    .card-day {
        font-size: 10px;
        margin-right: 2px;
    }
    .working-day {
        background: linear-gradient(45deg, transparent 25%, rgba(0, 128, 0, 0.1) 25%, rgba(0, 128, 0, 0.1) 50%, transparent 50%, transparent 75%, rgba(0, 128, 0, 0.1) 75%, rgba(0, 128, 0, 0.1));
        background-size: 10px 10px;
    }
    .day-name {
        margin-right: 5px;
    }
    .card-day {
        background: none;
    }

    .sikOff {
        background: none;
    }

    .working-day {
        background: linear-gradient(45deg, transparent 25%, rgba(0, 128, 0, 0.1) 25%, rgba(0, 128, 0, 0.1) 50%, transparent 50%, transparent 75%, rgba(0, 128, 0, 0.1) 75%, rgba(0, 128, 0, 0.1));
        background-size: 10px 10px;
    }

    .sikOn {
        background: linear-gradient(45deg, transparent 25%, rgba(255, 0, 0, 0.1) 25%, rgba(255, 0, 0, 0.1) 50%, transparent 50%, transparent 75%, rgba(255, 0, 0, 0.1) 75%, rgba(255, 0, 0, 0.1));
        background-size: 10px 10px;
    }

    

`