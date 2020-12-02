import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Menu, Select, Row, Col } from 'antd';
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

const { Option } = Select;
const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};

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
        const { username, phone, email, type } = values;
        dispatch(sendOTP(`91${phone}`))
        dispatch(updateEntityType(currentType));
        dispatch(updateBasicRegistrationData({ username, phone, email, type }));
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
            
            <p className=''>I am a</p>
            <Row gutter={16}>
                <Col span={12}>
                    <Button 
                        onClick={() => setUserType('Seller')} 
                        size={'large'} 
                        className='width-full'
                    >
                        Seller
                    </Button>
                </Col>
                <Col span={12}>
                    <Button 
                        onClick={() => setUserType('Buyer')} 
                        size={'large'} 
                        className='width-full'
                    >
                        Buyer
                    </Button>
                </Col>
            </Row>

            <Form
                {...layout}
                name="basic"
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        {getUserTypeOption(registrationState.configs, currentType)}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your Phone number!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    {...tailLayout}
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

                <Form.Item {...tailLayout}>
                    <Button className="width-full" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};

export default Register;
