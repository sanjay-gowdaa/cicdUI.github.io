import React, { useState } from 'react';
import { 
    Button,
    Checkbox,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Select,
    Typography
} from 'antd';
import { uniqBy } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/rootReducer';
import {
    sendOTP,
    updateBasicRegistrationData,
    updateEntityType,
} from '../../store/registrationReducer/actions';
import ConfirmOTPModal from './confirmOTPModal';
import {
    registerBasicFormMainLayout,
    registerBasicFormTailLayout
} from '../constants';
import { UserTypes } from '../../store/genericTypes';
import DefaultBtn from '../../app-components/defaultBtn';
import PrimaryBtn from '../../app-components/primaryBtn';
import { TAndCPopup } from '../../terms-and-conditions/index';

const { Option } = Select;
const { Title } = Typography;

const getUserTypeOption = (configs: [any], currentType: string) => {
    const filterUserTypeOptns = uniqBy(configs.filter(config => config.type === currentType), 'sub_type');
    return (
        filterUserTypeOptns.map((userSubType) => {
            const { sub_type } = userSubType;
            return(
                <Option value={sub_type}>{sub_type}</Option>
            );
        })
    );
};

const Register = ({ history, setSignUpPopupVisible }: { history: any, setSignUpPopupVisible: Function }) => {
    const [currentType, setCurrentType] = useState('Buyer');
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [displayTandC, setTandC] = useState(false);
    const dispatch = useDispatch();
    const registrationState = useSelector((state: RootState) => state.registration);

    const onFinish = (values: any) => {
        const { name, number, email, type } = values;
        dispatch(sendOTP(`91${number}`));
        dispatch(updateEntityType(currentType));
        dispatch(updateBasicRegistrationData({ name, number, email, type }));
        setSignUpPopupVisible(false);
        setShowOTPModal(!showOTPModal);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const setUserType = (userType: string) => setCurrentType(userType);

    const closeRegForm = () => {
        setSignUpPopupVisible(false);
    }
    
    return (
        <React.Fragment>
            <ConfirmOTPModal
                history={history}
                setShowOTPModal={setShowOTPModal}
                showOTPModal={showOTPModal}
                currentType={currentType}
            />
            <Title level={4} type="secondary">
                Please register to use Vikasbandhu services
            </Title>
            <Divider />
            <p className="">I am a</p>
            <Row gutter={16}>
                <Col span={12}>
                    <DefaultBtn
                        onClick={() => setUserType(UserTypes.SELLER)}
                        size={'large'}
                        className={`width-full ${
                            currentType === UserTypes.SELLER ? 'color-green-shade' : null
                        }`}
                        content="Seller"
                    />
                </Col>
                <Col span={12}>
                    <DefaultBtn
                        onClick={() => setUserType(UserTypes.BUYER)}
                        size={'large'}
                        className={`width-full ${
                            currentType === UserTypes.BUYER ? 'color-green-shade' : null
                        }`}
                        content="Buyer"
                    />
                </Col>
            </Row>

            <Form
                {...registerBasicFormMainLayout}
                name="basic"
                className="register-basic-form"
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
                        className="custom-select"
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
                    <Input className="custom-input" />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="number"
                    rules={[{ required: true, message: 'Please input your Phone number!' }]}
                >
                    <Input className="custom-input" />
                </Form.Item>

                {
                    (currentType === UserTypes.BUYER) ?
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: currentType === UserTypes.BUYER, message: 'Please input your Email!' }]}
                    >
                        <Input className="custom-input" />
                    </Form.Item> : null
                }

                <Form.Item
                    {...registerBasicFormTailLayout}
                    name="remember"
                    valuePropName="checked"
                    rules={[{ required: true, message: 'Please accept the terms and conditions!' }]}
                >
                    <Checkbox className="custom-checkbox">
                        I have read and accept to
                        <Button type="link" onClick={() => setTandC(true)}>
                            terms and conditions
                        </Button>
                        .
                    </Checkbox>
                </Form.Item>

                <Form.Item {...registerBasicFormTailLayout}>
                    <PrimaryBtn style={{width: "50%"}} htmlType="submit" content="Request OTP" />
                    <DefaultBtn style={{width: "50%"}} onClick={() => closeRegForm} content="Cancel" />
                </Form.Item>
            </Form>
            { displayTandC && <TAndCPopup initialDisplayType="general" viewTAndC={displayTandC} /> }
        </React.Fragment>
    );
};

export default Register;
