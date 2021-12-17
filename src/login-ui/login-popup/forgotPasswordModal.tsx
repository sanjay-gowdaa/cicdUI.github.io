import React, { useState } from 'react';
import { Alert, Form, Input, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { confirmReEnteredPassword, ShowPasswordMessage, validatePassword } from './utils';

import PrimaryBtn from '../../app-components/primaryBtn';
import { sendConfirmationCode, submitForgotPassword } from '../../store/loginReducer/actions';
import { RootState } from '../../store/rootReducer';
import { maskData } from '../../app-components/utils';

const { Text, Title } = Typography;

const ForgotPasswordModal = (props: any) => {
    const { showModal, setModal } = props;
    const [userName, setUserName] = useState('');
    const [resetPassword, setResetPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [showMessage, setMessage] = useState(false);
    const [isValidated, setValidated] = useState({ lower: false, upper: false, number: false, length: false });
    const loginState = useSelector((state: RootState) => state.loginUser);
    const dispatch = useDispatch();

    const onFinish = (values: any) => {
        dispatch(submitForgotPassword(userName, values.code, values.password));
        setModal(!showModal);
    };

    const onFinishFailed = (values: any) => {
        console.log('failed', values);
    };

    return (
        <Modal
            title={null}
            visible={showModal}
            footer={null}
            width={'30%'}
            maskClosable={false}
            className='custom-forgot-password-modal'
            onCancel={() => setModal(!showModal)}
            centered
            wrapClassName='forgot-password-popup-container'
        >
            {resetPassword ?
                <React.Fragment>
                    <Text>We have sent a password code by sms to +91-{maskData(userName)}. Enter it below to reset your password</Text>
                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name='reset-password-form'
                        className='reset-password-form'
                        initialValues={{}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name='code'
                            label={<Title level={5}>Code</Title>}
                            rules={[{ required: true, message: 'Enter the code you recieved to your registered phone number!' }]}
                        >
                            <Input className='custom-input' />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label={<Title level={5}>New Password</Title>}
                            rules={[{ required: true, message: 'Please enter a new password!' }]}
                        >
                            <Input.Password
                                className='custom-input'
                                onChange={(event) => {
                                    setMessage(true);
                                    validatePassword(event.target.value, isValidated, setPassword, setValidated);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='confirmPassword'
                            label={<Title level={5}>Enter New Password Again</Title>}
                            rules={[{
                                required: true,
                                validator: (rules, value) => confirmReEnteredPassword(rules, value, password)
                            }]}
                        >
                            <Input.Password className='custom-input' />
                        </Form.Item>
                        {showMessage && <ShowPasswordMessage isValidated={isValidated} />}
                        {!isEmpty(loginState?.passwordChangeError) &&
                            <Alert message={loginState?.passwordChangeError} type='error' />
                        }
                        <PrimaryBtn style={{ width: '100%' }} htmlType='submit' content='Submit' />
                    </Form>
                </React.Fragment> :
                <React.Fragment>
                    <Title level={4}>Forgot your password?</Title>
                    <Text>Enter your registered phone number below and we will send a message to reset your password</Text>
                    <Input
                        className='custom-input'
                        style={{ marginBottom: '5px' }}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <PrimaryBtn
                        disabled={isEmpty(userName) || userName.length !== 10}
                        style={{ width: '100%' }}
                        onClick={() => {
                            setResetPassword(true);
                            dispatch(sendConfirmationCode(userName));
                        }}
                        content='Reset my password'
                    />
                </React.Fragment>
            }
        </Modal>
    );
};

export default ForgotPasswordModal;
