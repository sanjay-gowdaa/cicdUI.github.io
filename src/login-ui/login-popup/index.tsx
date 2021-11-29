import React, { useEffect, useState } from 'react';
import { Alert, Button, Checkbox, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import ForgotPasswordModal from './forgotPasswordModal';
import NewPasswordModal from './newPasswordModal';
import { validatePhoneNumber } from './utils';

import PrimaryBtn from '../../app-components/primaryBtn';
import { signIn } from '../../store/loginReducer/actions';
import { RootState } from '../../store/rootReducer';
import { UserStateModel } from '../../store/loginReducer/types';
import { routesMap } from '../../constants';

const { Text } = Typography;

const LoginPopup = (props: any) => {
    const { history } = props;
    const loginState: UserStateModel = useSelector((state: RootState) => state.loginUser);
    const { msg, redirect } = loginState.errorInLogin;
    const [showForgotPassword, setForgotPassword] = useState(false);
    const [confirmLoading, showConfirmLoading] = useState(false);
    const [showNewPassword, setNewPassword] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loginState.isNewUser)
            setNewPassword(true);
    }, [loginState.isNewUser]);

    useEffect(() => {
        redirect ? history.push(routesMap.loginUser) : showConfirmLoading(false);
    }, [loginState.errorInLogin]);

    const onFinish = (values: any) => {
        const { userName, password } = values;
        dispatch(signIn(userName, password));
    };

    const onFinishFailed = (value: any) => {
        console.log('Failed', value);
    };

    return (
        <React.Fragment>
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name='login-form'
                className='user-login-form'
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name='userName'
                    className='margin-unset login-phone-number'
                    label='Phone Number'
                    rules={[{
                        required: true,
                        validator: (rule, value) => validatePhoneNumber(rule, value)
                    }]}
                >
                    <Input className='custom-input' />
                </Form.Item>
                <Form.Item
                    name='password'
                    className='margin-unset login-password'
                    label='Password'
                    rules={[{
                        required: true,
                        message: 'Please input your password!'
                    }]}
                >
                    <Input.Password />
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                    <Button type='text' onClick={() => setForgotPassword(true)}>
                        <Text style={{ textDecoration: 'underline', color: 'grey' }}>Forgot Password?</Text>
                    </Button>
                </div>
                <Form.Item
                    name='remember'
                    className='margin-unset'
                    valuePropName='checked'
                >
                    <Checkbox disabled>Remember Me</Checkbox>
                </Form.Item>
                {!isEmpty(msg) &&
                    <Alert message={msg} type='error' style={{ marginBottom: '2%' }} />
                }
                <PrimaryBtn
                    className='login-button'
                    style={{ width: '100%' }}
                    loading={confirmLoading}
                    htmlType='submit'
                    content='Login'
                />
            </Form>
            <ForgotPasswordModal showModal={showForgotPassword} setModal={setForgotPassword} />
            <NewPasswordModal showModal={showNewPassword} setModal={setNewPassword} />
        </React.Fragment >
    );
};

export default LoginPopup;
