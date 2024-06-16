import styled from "styled-components";
import {Form} from "antd";

export const EditEmployeeDialogWrapper = styled.div`
    
    .working-day {
        background: linear-gradient(45deg, transparent 25%, rgba(0, 128, 0, 0.1) 25%, rgba(0, 128, 0, 0.1) 50%, transparent 50%, transparent 75%, rgba(0, 128, 0, 0.1) 75%, rgba(0, 128, 0, 0.1));
        background-size: 10px 10px;
    }
`
export const EditEmployeeForm = styled(Form)`
    margin-bottom: 20px;
    .working-day {
        background: linear-gradient(45deg, transparent 25%, rgba(0, 128, 0, 0.1) 25%, rgba(0, 128, 0, 0.1) 50%, transparent 50%, transparent 75%, rgba(0, 128, 0, 0.1) 75%, rgba(0, 128, 0, 0.1));
        background-size: 10px 10px;
    }
    .ant-card-body {
        padding: 12px;
    }
    .workDate-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        margin-top: 15px;
        height: 60px
    }
    .shiftScheduleWrapper {
        margin-left: 10px;
        display: none;
    }
    
    .shiftScheduleWrapper__block {
        margin-left: 10px;
        display: block;
    }
    .card-day {
        cursor: pointer;
        width: 50px;
        margin-right: 70px;
    }
    .time-picker {
        width: 150px;
    }
`;