import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Select, Row, Col, Typography, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import {
    getConfigurations,
    sendOTP,
    updateBasicRegistrationData,
    updateEntityType,
} from '../../store/registrationReducer/actions';
import ConfirmOTPModal from './confirmOTPModal';
import {uniqBy} from 'lodash';
import { registerBasicFormMainLayout, registerBasicFormTailLayout, UserTypes } from '../constants';

const { Option } = Select;
const { Title } = Typography;

const getUserTypeOption = (configs: [any], currentType: string) => {
        const filterUserTypeOptns = uniqBy(configs.filter(config => config.type === currentType), 'sub_type');
        console.log('filterUserTypeOptns', filterUserTypeOptns)

    return (
        filterUserTypeOptns.map((userSubType) => {
            const {sub_type} = userSubType;
            return (
                <Option value={sub_type}>{sub_type}</Option>
            )
        })
    )
}

const Register = ({ history, setSignUpPopupVisible }: { history: any, setSignUpPopupVisible: Function }) => {
    const [currentType, setCurrentType] = useState('Buyer');
    const [showOTPModal, setShowOTPModal] = useState(false)
    const dispatch = useDispatch();
    const registrationState = useSelector((state: RootState) => state.registration);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        const { name, number, email, type } = values;
        dispatch(sendOTP(`91${number}`))
        dispatch(updateEntityType(currentType));
        dispatch(updateBasicRegistrationData({ name, number, email, type }));
        setSignUpPopupVisible(false);
        setShowOTPModal(!showOTPModal)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const setUserType = (userType: string) => setCurrentType(userType);
    return (
        <React.Fragment>
            <ConfirmOTPModal 
                history={history}
                setShowOTPModal={setShowOTPModal}
                showOTPModal={showOTPModal}
                currentType={currentType}
            />
            <Title level={4} type='secondary'>Please register to use Vikasbandhu services</Title>
            <Divider />
            <p className=''>I am a</p>
            <Row gutter={16}>
                <Col span={12}>
                    <Button 
                        onClick={() => setUserType(UserTypes.SELLER)} 
                        size={'large'} 
                        className={`width-full ${currentType === UserTypes.SELLER ? 'color-green-shade' : null}`}
                    >
                        Seller
                    </Button>
                </Col>
                <Col span={12}>
                    <Button 
                        onClick={() => setUserType(UserTypes.BUYER)} 
                        size={'large'} 
                        className={`width-full ${currentType === UserTypes.BUYER ? 'color-green-shade' : null}`}
                    >
                        Buyer
                    </Button>
                </Col>
            </Row>

            <Form
                {...registerBasicFormMainLayout}
                name="basic"
                className='register-basic-form'
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item 
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: `Please select ${currentType} type` }]}
                >
                    <Select
                        placeholder={`Select ${currentType} type`}
                        allowClear
                    >
                        {getUserTypeOption(registrationState.configs, currentType)}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="number"
                    rules={[{ required: true, message: 'Please input your Phone number!' }]}
                >
                    <Input />
                </Form.Item>

                {
                    (currentType === UserTypes.BUYER) ? 
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: currentType === UserTypes.BUYER, message: 'Please input your Email!' }]}
                    >
                        <Input />
                    </Form.Item> : null
                }

                <Form.Item
                    {...registerBasicFormTailLayout}
                    name="remember"
                    valuePropName="checked"
                    rules={[{ required: true, message: 'Please accept the terms and conditions!' }]}
                >
                    <Checkbox>
                        I have read and accept to
                        <a
                            className="terms-and-conditions"
                            href="https://www.google.com/"
                            target="_blank"
                        >
                            terms and conditions
                        </a>
                    </Checkbox>
                </Form.Item>

                <Form.Item {...registerBasicFormTailLayout}>
                    <Button className="width-full" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};

export default Register;
