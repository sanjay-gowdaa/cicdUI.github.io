import React from 'react';
import { Space, Typography } from 'antd';
import { RuleObject } from 'rc-field-form/lib/interface';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import './login.scss';

import {
    PHONE_NUMBER_10_DIGIT_MSG,
    PHONE_NUMBER_INVALID
} from '../constants';

const { Text, Title } = Typography;

export const validatePhoneNumber = (rule: RuleObject, value: any) => {
    const regExp = /^[0-9]*$/;

    if (!value) {
        return Promise.reject('Please input your registered phone number!');
    } else if (!regExp.test(value)) {
        return Promise.reject(PHONE_NUMBER_INVALID);
    } else if (value.length !== 10) {
        return Promise.reject(PHONE_NUMBER_10_DIGIT_MSG);
    } else {
        return Promise.resolve();
    }
};

export const validatePassword = (
    value: any,
    isValidated: any,
    setNewPassword: any,
    setValidated: any
) => {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;

    var validate = isValidated;
    if (value.match(upperCaseLetters)) {
        validate = { ...validate, upper: true };
    } else {
        validate = { ...validate, upper: false };
    }

    if (value.match(lowerCaseLetters)) {
        validate = { ...validate, lower: true };
    } else {
        validate = { ...validate, lower: false };
    }

    if (value.match(numbers)) {
        validate = { ...validate, number: true };
    } else {
        validate = { ...validate, number: false };
    }

    if (value.length >= 8) {
        validate = { ...validate, length: true };
    } else {
        validate = { ...validate, length: false };
    }

    setNewPassword(value);
    setValidated(validate);
};

export const confirmReEnteredPassword = (rule: RuleObject, value: any, password: any) => {
    if (value === password) {
        return Promise.resolve();
    } else {
        return Promise.reject('Password did not match!');
    }
};

export const ShowPasswordMessage = (props: any) => {
    const { isValidated } = props;

    return (
        <React.Fragment>
            <Title level={5} className='password-rules-text'>Password must contain the following:</Title>
            <Space direction='vertical'>
                <Text>
                    {isValidated.lower ?
                        <CheckOutlined style={{ color: '#4cbf42' }} /> :
                        <CloseOutlined style={{ color: '#df3312' }} />
                    }&nbsp;
                    <Text style={isValidated.lower ? { color: '#4cbf42' } : { color: '#df3312' }}>
                        Password must contain a lower case letter
                    </Text>
                </Text>
                <Text>
                    {isValidated.upper ?
                        <CheckOutlined style={{ color: '#4cbf42' }} /> :
                        <CloseOutlined style={{ color: '#df3312' }} />
                    }&nbsp;
                    <Text style={isValidated.upper ? { color: '#4cbf42' } : { color: '#df3312' }}>
                        Password must contain an upper case letter
                    </Text>
                </Text>
                <Text>
                    {isValidated.number ?
                        <CheckOutlined style={{ color: '#4cbf42' }} /> :
                        <CloseOutlined style={{ color: '#df3312' }} />
                    }&nbsp;
                    <Text style={isValidated.number ? { color: '#4cbf42' } : { color: '#df3312' }}>
                        Password must contain a number
                    </Text>
                </Text>
                <Text>
                    {isValidated.length ?
                        <CheckOutlined style={{ color: '#4cbf42' }} /> :
                        <CloseOutlined style={{ color: '#df3312' }} />
                    }&nbsp;
                    <Text style={isValidated.length ? { color: '#4cbf42' } : { color: '#df3312' }}>
                        Password must contain at least 8 characters
                    </Text>
                </Text>
            </Space>
        </React.Fragment>
    );
};
