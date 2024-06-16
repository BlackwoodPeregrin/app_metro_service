import { useEffect, useState } from 'react';

import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import {LoaderWrapper} from "./styled";
import { auth } from '../../services/FileBrowserService';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
const phoneRegExp = /^(?:\+7|8)?\s?\d{10}$/;
export const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ phoneNumber?: string; password?: string }>({});
    const [form] = Form.useForm();
    const {login} = useAuth();
    const navigate = useNavigate();
    const {isAuth} = useAuth();

    useEffect(() => {
        if (isAuth) {
            navigate('/support');
        }
    }, []);

    const validate = () => {
        const newErrors: { phoneNumber?: string; password?: string } = {};
        if (!phoneNumber.match(phoneRegExp)) {
            newErrors.phoneNumber = 'Phone number is not valid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async () => {
        if (!validate()) return;

        const loggedIn = await auth(phoneNumber, password);
        if (loggedIn) {
            login();
            navigate('/support')
        }
        
    };
    const handleClearForm = () => {
        form.resetFields();
    }
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <LoaderWrapper>
            <div className="login-title">Добро пожаловать в систему управления заявками на сопровождение маломобильных пассажиров!</div>
            <div className="login-description">Пожалуйста, войдите в систему, чтобы получить доступ к функционалу.</div>
            <Form
                form={form}
                className="login-form"
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Логин"
                    name="username"
                    validateStatus={errors.phoneNumber ? 'error' : ''}
                    help={errors.phoneNumber}
                    rules={[{ required: true, message: 'Пожалуйста, введите свой логин!' }]}

                >
                    <Input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder="Логин" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password}
                    rules={[{ required: true, message: 'Пожалуйста, введите свой пароль!' }]}
                >
                    <Input.Password placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} value={password} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                    <Button danger onClick={handleClearForm} className="login-btn">
                        Сбросить
                    </Button>
                </Form.Item>
            </Form>
        </LoaderWrapper>
    )
}