import React, { useEffect, useState } from 'react';
import {
    Checkbox,
    Col,
    Divider,
    Form,
    Input,
    Row
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEmpty } from 'lodash';
import { History } from 'history';

import './registration.scss';
import RegisterConfirmation from './registerConfirmationModal';
import { customPincodeValidator, emailValidator, generateFormData } from './utils';
import RequestSubmittedPopup from './requestSubmittedPopup';
import DocumentsUploadComponents from './documentsUpload';
import WorkingHours from './workingHours';
import BankDocumentsUpload from './bankDocumentUpload';

import { customConsentValidator } from '../constants';

import Header from '../../header';

import { RootState } from '../../store/rootReducer';
import {
    resetOtpState,
    setRegisterMsg,
    setResgiterVerifiedFlag,
    submitRegister,
    updateForm
} from '../../store/registrationReducer/actions';
import { UserTypes } from '../../store/genericTypes';
import CancelBtn from '../../app-components/cancelBtn';
import PrimaryBtn from '../../app-components/primaryBtn';

const singleLabelFieldLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 18 },
};

const { TextArea } = Input;

const Registration = (props: { history: History }) => {
    const { history } = props;
    const [addressForPin, setAddressForPin] = useState({ taluk: '', district: '', state: '' });
    const [registerFormValues, setRegisterFormValues] = useState({});
    const [showConfirmation, toggleShowConfirmation] = useState(false);
    const [showSubmitMsgPopup, toggleShowSubmitMsgPopup] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const registrationState = useSelector((state: RootState) => state.registration);
    const { configs, entityType, formData, registerResponse, isProcessing } = registrationState;
    const { type, category, urd_status } = formData;
    
    useEffect(() => {
        if (registerResponse.verified) {
            dispatch(setRegisterMsg(''));
            dispatch(setResgiterVerifiedFlag(false));
            toggleShowConfirmation(!showConfirmation);
            toggleShowSubmitMsgPopup(!showSubmitMsgPopup);
        }
    }, [registerResponse.verified]);

    const onConfirmRegister = () => {
        const registerDataPromise = generateFormData({
            formSubmitValues: cloneDeep(registerFormValues),
            userType: entityType,
            addressForPin
        });
        registerDataPromise.then((registerFromData) => {
            dispatch(updateForm(registerFormValues as any));
            dispatch(submitRegister(registerFromData));
        });
       
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setRegisterFormValues(values);
        toggleShowConfirmation(!showConfirmation);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    window.onbeforeunload = function () {
        return 'The data will be lost on reload of page. Are you sure?';
    };

    const onReset = () => {
        dispatch(resetOtpState());
        window.history.back();
    };

    const initialValues = entityType === UserTypes.BUYER ?
        {
            ...formData,
            saturday: '9am_to_5pm',
            sunday: 'holiday',
            weekday: '9am_to_9pm'
        } :
        { ...formData };

    return (
        <div className='register'>
            <RegisterConfirmation
                isProcessing={isProcessing}
                registerResponse={registerResponse}
                showConfirmation={showConfirmation}
                onConfirmRegister={onConfirmRegister}
                toggleShowConfirmation={toggleShowConfirmation}
            />
            <RequestSubmittedPopup
                history={history}
                showSubmitMsgPopup={showSubmitMsgPopup}
            />
            <Header />
            <div className='entity-details-container'>
                <h1>{entityType} Profile Verification</h1>
                <Divider />
                <Form
                    labelAlign='left'
                    form={form}
                    colon={false}
                    scrollToFirstError
                    {...singleLabelFieldLayout}
                    name='basic'
                    initialValues={initialValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16} justify='start'>
                        {/* User Basic Information */}
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label={`${entityType} Type`}
                                name='type'
                            >
                                <Input
                                    className='custom-input'
                                    bordered={false}
                                    disabled={true}
                                />
                            </Form.Item>
                            {!isEmpty(category) ?
                                <Form.Item
                                    labelAlign='left'
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 12 }}
                                    label='Category'
                                    name='category'
                                >
                                    <Input
                                        className='custom-input'
                                        bordered={false}
                                        disabled={true}
                                    />
                                </Form.Item> : null
                            }
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label={`${entityType} Name`}
                                name='name'
                            >
                                <Input
                                    className='custom-input'
                                    bordered={false}
                                    disabled={true}
                                />
                            </Form.Item>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label='Phone Number'
                                name='number'
                            >
                                <Input
                                    className='custom-input'
                                    bordered={false}
                                    disabled={true}
                                />
                            </Form.Item>
                            {!isEmpty(formData.email) ?
                                <Form.Item
                                    labelAlign='left'
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 12 }}
                                    label='Email'
                                    name='email'
                                >
                                    <Input
                                        className='custom-input'
                                        bordered={false}
                                        disabled={true}
                                    />
                                </Form.Item> : null
                            }
                            
                                <Form.Item
                                    labelAlign='left'
                                    labelCol={{ span: 10 }}
                                    wrapperCol={{ span: 12 }}
                                    label='Registered user'
                                    name='urd_status'
                                >
                                    <Input
                                        className='custom-input'
                                        bordered={false}
                                        disabled={true}
                                    />
                                </Form.Item> 
                            
                        </Col>
                    </Row>
                    <Row gutter={16} justify='start'>
                        {/* User Documents and location information */}
                        <Col sm={24} md={24} lg={12}>
                            <DocumentsUploadComponents
                                userType={entityType}
                                subType={type}
                                documents_list={configs}
                            />
                            {isEmpty(formData.email) ?
                                <Form.Item
                                    label='Email'
                                    name='email'
                                    rules={[{ validator: (rule, value) => emailValidator(rule, value) }]}
                                >
                                    <Input className='custom-input' />
                                </Form.Item> : null
                            }
                            <h2>Location Information</h2>
                            <div className='display-flex-row align-flex-end'>
                                <Form.Item
                                    label='Pin Code'
                                    name='zip'
                                    rules={[{
                                        required: true,
                                        validator: (rule, value) => customPincodeValidator(rule, value, setAddressForPin)
                                    }]}
                                >
                                    <Input className='custom-input' />
                                </Form.Item>
                                <p className='margin-b-2em'>{addressForPin.taluk} {addressForPin.district} {addressForPin.state}</p>
                            </div>
                            <Form.Item
                                label='Address'
                                name='address1'
                                rules={[{ required: true, message: 'Please input your Address!' }]}
                            >
                                <TextArea className='custom-input' />
                            </Form.Item>
                            {!isEmpty(category) && entityType === UserTypes.SELLER ?
                                <Form.Item
                                    label='Facilities Provided'
                                    name='facilitiesProvided'
                                >
                                    <TextArea className='custom-input' />
                                </Form.Item> : null
                            }
                        </Col>
                    </Row>
                    {entityType === UserTypes.BUYER &&
                        <WorkingHours form={form} />
                    }
                    <BankDocumentsUpload form={form} />
                    <Row gutter={16} justify='start'>
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item
                                name='consent'
                                valuePropName='checked'
                                rules={[{ required: true, validator: (rule, value) => customConsentValidator(rule, value) }]}
                            >
                                <Checkbox className='custom-checkbox' >
                                    I certify that the information submitted above is true and correct to the best of my knowledge.
                                    I further understand that any false statements may result in denial or revocation of the services
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col sm={24} md={24} lg={12}>
                            <Row gutter={32} justify='space-around'>
                                <Col span={8}>
                                    <Form.Item>
                                        <CancelBtn
                                            className='margin-l-r-1em width-full'
                                            onClick={onReset}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item>
                                        <PrimaryBtn
                                            className='margin-l-r-1em width-full'
                                            htmlType='submit'
                                            content='Submit'
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default Registration;
