import React, { useEffect, useState } from 'react';
import {
    Button,
    Checkbox,
    Col,
    Divider,
    Form,
    message,
    Input,
    Radio,
    Row,
    Upload
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../header';
import { RootState } from '../../store/rootReducer';
import {
    resetOtpState,
    setRegisterMsg,
    setResgiterVerifiedFlag,
    submitRegister,
    updateForm
} from '../../store/registrationReducer/actions';
import { routesMap } from '../../constants';
import { customIfscValidator, customPincodeValidator, generateFormData } from './utils';
import DocumentsUploadComponents from './formComponents/documentsUpload';
import RegisterConfirmation from './registerConfirmationModal';
import RequestSubmittedPopup from './requestSubmittedPopup';
import DefaultBtn from '../../app-components/defaultBtn';
import CancelBtn from '../../app-components/cancelBtn';
import PrimaryBtn from '../../app-components/primaryBtn';

const { home } = routesMap;

const singleLabelFieldLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 18 },
};

const normFile = (e: any) => {
    console.log("normFile seller");
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    // return e && e.fileList.filter((file: any) => !!file.status);
    return e && e.fileList;
};

const Seller = (props: any) => {
    const { history } = props;
    const [addressForPin, setAddressForPin] = useState('');
    const [district, setDistrict] = useState('');
    const [taluk, setTaluk] = useState('');
    const [state, setStateName] = useState('');
    const [registerFormValues, setRegisterFormValues] = useState({});
    const [showConfirmation, toggleShowConfirmation] = useState(false);
    const [showSubmitMsgPopup, toggleShowSubmitMsgPopup] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const registrationState = useSelector((state: RootState) => state.registration);
    const {entityType, formData: partialUserData, registerResponse} = registrationState;
    const {type: subType} = partialUserData || {};

    useEffect(() => {
        if(registerResponse.verified) {
            dispatch(setRegisterMsg(''));
            dispatch(setResgiterVerifiedFlag(false));
            toggleShowConfirmation(!showConfirmation);
            toggleShowSubmitMsgPopup(!showSubmitMsgPopup);
        }
    }, [registerResponse.verified]);

    const onConfirmRegister = () => {
        const multipartFormData = generateFormData({formSubmitValues: registerFormValues, userType: entityType, addressForPin, district, taluk, state});
        dispatch(updateForm(registerFormValues as any));
        dispatch(submitRegister(entityType, multipartFormData));
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setRegisterFormValues(values);
        toggleShowConfirmation(!showConfirmation);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        dispatch(resetOtpState());
        history.push(home);
    };

    return (
        <React.Fragment>
            <RegisterConfirmation
                registerResponse={registerResponse}
                showConfirmation={showConfirmation}
                onConfirmRegister={onConfirmRegister}
                toggleShowConfirmation={toggleShowConfirmation}
            />
            <RequestSubmittedPopup history={history} showSubmitMsgPopup={showSubmitMsgPopup} />
            <Header />
            <div className="entity-details-container">
                <h1>Seller Profile Verification</h1>
                <Divider />
                <Form
                    labelAlign='left'
                    form={form}
                    colon={false}
                    {...singleLabelFieldLayout}
                    name="basic"
                    initialValues={{...registrationState.formData}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label="Seller Type"
                                name="type"
                            >
                                <Input className="custom-input" bordered={false} disabled={true} />
                            </Form.Item>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label="Seller Name"
                                name="name"
                            >
                                <Input className="custom-input" bordered={false} disabled={true} />
                            </Form.Item>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label="Phone Number"
                                name="number"
                            >
                                <Input className="custom-input" bordered={false} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <DocumentsUploadComponents subType={subType} userType={entityType} documents_list={registrationState.configs} />

                            {/* For testing purpose comment above line and uncomment below *farmer**/}
                            {/* <DocumentsUploadComponents subType={'Institution'} userType={'Seller'} documents_list={registrationState.configs} /> */}

                            <Form.Item
                                label='Email (optional)'
                                name='email'
                            >
                                <Input className="custom-input" />
                            </Form.Item>
                            <h2>Location Information</h2>
                            <div className='display-flex-row align-flex-end'>
                                <Form.Item
                                    label="Pin Code"
                                    name="zip"
                                    rules={[{validator: (rule, value) => customPincodeValidator(rule, value, setAddressForPin, setDistrict, setTaluk, setStateName)}]}
                                >
                                    <Input className="custom-input" />
                                </Form.Item>
                                <p className='margin-b-2em'>{addressForPin}</p>
                            </div>
                            <Form.Item
                                label="Address"
                                name="address1"
                                rules={[{ required: true, message: 'Please input your Address!' }]}
                            >
                                <Input className="custom-input" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <h2>Bank Account Information</h2>
                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="Account Holder Name"
                                        name="account_name"
                                        rules={[{ required: true, message: 'Please input Account Holder Name!' }]}
                                    >
                                        <Input className="custom-input" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="IFSC Code"
                                        name="ifsc_code"
                                        rules={[{validator: (rule, value) => customIfscValidator(rule, value)}]}
                                    >
                                        <Input className="custom-input" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Account Number"
                                        name="account_number"
                                        rules={[{ required: true, message: 'Please input Account Number!' }]}
                                    >
                                        <Input className="custom-input" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Confirm Account Number"
                                        name="confirm_account_number"
                                        rules={[{ required: true, message: 'Please Confirm Account Number!' }]}
                                    >
                                        <Input className="custom-input" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item
                                labelCol={{span: 12}}
                                wrapperCol={{span: 8}}
                                name="bank_statement"
                                label="Upload Bank Passbook or Statement"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[{ required: true, message: 'Upload the statment!' }]}
                            >
                                <Upload
                                    accept="image/*"
                                    beforeUpload={(file) => {
                                        // const isRequiredFileType =
                                        //     file.type === 'image/jpeg' ||
                                        //     file.type === 'image/png';
                                        // if (!isRequiredFileType) {
                                        //     message.error(
                                        //         `${file.name} is not an Image file`,
                                        //     );
                                        // }
                                        // return isRequiredFileType;
                                        return false;
                                    }}
                                    name="logo"
                                    listType="text"
                                >
                                    <DefaultBtn icon={<UploadOutlined />} content="Upload Image" />
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="UPI ID(optional)"
                                name="upi_id"
                            >
                                <Input className="custom-input" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item
                                name="consent"
                                valuePropName="checked"
                                rules={[{ required: true, message: 'Please accept the terms and conditions!' }]}
                            >
                                <Checkbox className="custom-checkbox" >
                                    I certify that the information submitted above is true and correct to the best of my knowledge.
                                    I further understand that any false statements may result in denial or revocation of the services.
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
                                            className="margin-l-r-1em width-full"
                                            onClick={onReset}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item>
                                        <PrimaryBtn
                                            className="margin-l-r-1em width-full"
                                            htmlType="submit"
                                            content="Submit"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        </React.Fragment>
    );
};

export default Seller;
