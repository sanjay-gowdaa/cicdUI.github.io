import React, { useState } from 'react';
import { Form, Input, Modal, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { confirmReEnteredPassword, ShowPasswordMessage, validatePassword } from './utils';

import PrimaryBtn from '../../app-components/primaryBtn';
import { setNewPassword, setUserPassword } from '../../store/loginReducer/actions';

const { Text, Title } = Typography;

const NewPasswordModal = (props: any) => {
    const { showModal, setModal } = props;
    const [isValidated, setValidated] = useState({ lower: false, upper: false, number: false, length: false });
    const [showMessage, setMessage] = useState(false);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onFinish = (values: any) => {
        dispatch(setUserPassword(password));
        setModal(!showModal);
        dispatch(setNewPassword(false));
    };

    const onFinishFailed = (values: any) => {
        console.log('Failed', values);
    };

    return (
        <Modal
            title={null}
            visible={showModal}
            footer={null}
            width={'30%'}
            maskClosable={false}
            className='custom-new-password-modal'
            centered
            closeIcon={null}
            wrapClassName='new-password-popup-container'
        >
            <Title level={5}>Change Password</Title>
            <Text>Please enter your new password below</Text>
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name='set-new-password-form'
                className='set-new-password-form'
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
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
                <PrimaryBtn style={{ width: '100%' }} htmlType='submit' content='Confirm' />
            </Form>
        </Modal>

    );
};

export default NewPasswordModal;
