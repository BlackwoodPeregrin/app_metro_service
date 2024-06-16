import styled from "styled-components";

export const ApplicationsForEmployeeWrapper = styled.div`
    .app-header {
        padding: 12px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #949494;
        background: gainsboro;
    }
    .button-call {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        & div {
            margin-right: 20px;
        }
    }
    .dispatcher-call {
        background-color: #28a745;
    }
    .ant-tabs-nav {
        padding: 0 24px;
    }
    .ant-list-items > li {
        padding: 12px 24px;
    }
    
    .ant-card {
        border-bottom: 1px solid #949494;
    }
`