import styled from "styled-components";

export const LoaderWrapper = styled.div`
    display: flex;    
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    font-family: 'Roboto',sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    margin: auto;
    max-width: 785px;
    
    .login-title {
        font-size: 24px;
        font-weight: 600;
        line-height: 32px;
        text-align: center;
        margin-top: 32px;
    }
    
    .login-description {
        text-align: center;
        margin-top: 32px;
    }
    
    .login-form {
        margin-top: 50px;        
        width: 100%;
        padding: 12px 50px;
        @media (max-width: 480px) {
            padding: 12px 24px;
            margin-top: 16px;
        }
    }
    
    .login-btn {
        margin-left: 16px;
    }
`