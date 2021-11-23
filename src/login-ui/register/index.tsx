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

import ConfirmOTPModal from './confirmOTPModal';
import { emailRequired, validatePhoneNumber, validateUserName } from './utils';

import {
    customConsentValidator,
    registerBasicFormMainLayout,
    registerBasicFormTailLayout
} from '../constants';

import { RootState } from '../../store/rootReducer';
import {
    sendOTP,
    updateBasicRegistrationData,
    updateEntityType,
} from '../../store/registrationReducer/actions';
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
            return (
                <Option value={sub_type}>{sub_type}</Option>
            );
        })
    );
};

const getUserCategoryOption = (config: [any], currentType: string, type: string) => {
    const filterUserSubTypeOptns =
        uniqBy(config.filter(config => config.type === currentType && config.sub_type === type), 'category');

    return (
        filterUserSubTypeOptns.map((categoryType) => {
            const { category } = categoryType;
            return (
                <Option value={category}>{category}</Option>
            );
        })
    );
};

const Register = ({ history, setSignUpPopupVisible }: { history: any, setSignUpPopupVisible: Function }) => {
    const [currentType, setCurrentType] = useState('Buyer');
    const [subType, setSubType] = useState('');
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [displayTandC, setTandC] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const dispatch = useDispatch();
    const registrationState = useSelector((state: RootState) => state.registration);
    const { configs } = registrationState;

    const onFinish = (values: any) => {
        const { name, number, email, type, category } = values;
        dispatch(sendOTP(`91${number}`));
        dispatch(updateEntityType(currentType));
        dispatch(updateBasicRegistrationData({ name, number, email, type, category }));
        setSignUpPopupVisible(false);
        setShowOTPModal(!showOTPModal);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const setUserType = (userType: string) => setCurrentType(userType);

    const onSelectType = (type: any, currentType: string) => {
        setSubType(type);
        const filter = uniqBy(configs.filter((config: any) => config.type === currentType && config.sub_type === type), 'category');
        (filter.length > 1) ? setShowCategory(true) : setShowCategory(false);
    };

    return (
        <React.Fragment>
            <ConfirmOTPModal
                history={history}
                setShowOTPModal={setShowOTPModal}
                showOTPModal={showOTPModal}
                currentType={currentType}
            />
            <Title level={4} type='secondary'>
                Please register to use Vikasbandhu services
            </Title>
            <Divider />
            <p className=''>I am a</p>
            <Row gutter={16}>
                <Col span={12}>
                    <DefaultBtn
                        onClick={() => setUserType(UserTypes.SELLER)}
                        size={'large'}
                        className={`width-full ${currentType === UserTypes.SELLER ? 'color-green-shade' : null
                            }`}
                        content='Seller'
                    />
                </Col>
                <Col span={12}>
                    <DefaultBtn
                        onClick={() => setUserType(UserTypes.BUYER)}
                        size={'large'}
                        className={`width-full ${currentType === UserTypes.BUYER ? 'color-green-shade' : null
                            }`}
                        content='Buyer'
                    />
                </Col>
            </Row>
            <Form
                {...registerBasicFormMainLayout}
                name='basic'
                className='register-basic-form'
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name='type'
                    label='Type'
                    rules={[{ required: true, message: `Please select ${currentType} type` }]}
                >
                    <Select
                        className='custom-select'
                        placeholder={`Select ${currentType} type`}
                        onSelect={(type: any) => onSelectType(type, currentType)}
                        allowClear
                    >
                        {getUserTypeOption(configs, currentType)}
                    </Select>
                </Form.Item>
                {showCategory ?
                    <Form.Item
                        label='Category'
                        name='category'
                        rules={[{
                            required: true,
                            message: `Select ${subType} category`
                        }]}
                    >
                        <Select
                            className='custom-select'
                            placeholder={`Select ${subType} category`}
                            allowClear
                        >
                            {getUserCategoryOption(configs, currentType, subType)}
                        </Select>
                    </Form.Item> : null
                }
                <Form.Item
                    label='Name'
                    name='name'
                    rules={[{
                        required: true,
                        validator: (rule, value) => validateUserName(rule, value)
                    }]}
                >
                    <Input className='custom-input' />
                </Form.Item>
                <Form.Item
                    label='Phone Number'
                    name='number'
                    rules={[{
                        required: true,
                        validator: (rule, value) => validatePhoneNumber(rule, value)
                    }]}
                >
                    <Input className='custom-input' />
                </Form.Item>
                {(currentType === UserTypes.BUYER) || (currentType === UserTypes.SELLER && showCategory) ?
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[{
                            required: (currentType === UserTypes.BUYER) || (currentType === UserTypes.SELLER && showCategory),
                            validator: (rule, value) => emailRequired(rule, value)
                        }]}
                    >
                        <Input className='custom-input' />
                    </Form.Item> : null
                }
                <Form.Item
                    {...registerBasicFormTailLayout}
                    name='remember'
                    valuePropName='checked'
                    rules={[{ required: true, validator: (rule, value) => customConsentValidator(rule, value) }]}
                >
                    <Checkbox className='custom-checkbox'>
                        I have read and accept to
                        <Button type='link' onClick={() => setTandC(true)}>
                            terms and conditions
                        </Button>
                        .
                    </Checkbox>
                </Form.Item>
                <Form.Item {...registerBasicFormTailLayout}>
                    <PrimaryBtn style={{ width: '50%' }} htmlType='submit' content='Request OTP' />
                    <DefaultBtn style={{ width: '50%' }} onClick={() => setSignUpPopupVisible(false)} content='Cancel' />
                </Form.Item>
            </Form>
            {displayTandC && <TAndCPopup initialDisplayType='general' viewTAndC={displayTandC} />}
        </React.Fragment>
    );
};

export default Register;
