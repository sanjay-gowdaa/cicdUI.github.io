import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Divider, Select, Upload, message, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../header';
import { RootState } from '../../store/rootReducer';
import { resetOtpState, setRegisterMsg, setResgiterVerifiedFlag, submitRegsiter, updateForm } from '../../store/registrationReducer/actions';
import { routesMap } from '../../constants';
import { customPincodeValidator, generateFormData } from './utils';
import RegisterConfirmation from './registerConfirmationModal';
import { workingHours } from '../constants';
import RequestSubmittedPopup from './requestSubmittedPopup';

const { home } = routesMap;
const { Option } = Select;

const singleLabelFieldLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 18 },
};

const getWorkingHoursOptions = () => {
    return (
        workingHours.map((curOption) => {
            const {name, label, disabled} = curOption;
            return (
                <Option disabled={disabled} value={name}>{label}</Option>
            )
        }
        )
    )
}


const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const Buyer = (props: any) => {
    const { history } = props;
    const [addressForPin, setAddressForPin] = useState('')
    const [registerFormValues, setRegisterFormValues] = useState({});
    const [showConfirmation, toggleShowConfirmation] = useState(false);
    const [showSubmitMsgPopup, toggleShowSubmitMsgPopup] = useState(false);
    const [workHoursDisbaled, toggleWorkHoursDisbaled] = useState({weekday: false, saturday: false, sunday: false} as any);

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const registrationState = useSelector((state: RootState) => state.registration);

    useEffect(() => {
        if(registrationState.registerResponse.verified) {
            dispatch(setRegisterMsg(''))
            dispatch(setResgiterVerifiedFlag(false))
            toggleShowConfirmation(!showConfirmation)
            toggleShowSubmitMsgPopup(!showSubmitMsgPopup)
        }
    }, [registrationState.registerResponse.verified])
    const onConfirmRegister = () => {
        const userType = registrationState.entityType;
        const multipartFormData = generateFormData({formSubmitValues: registerFormValues, userType, addressForPin})
        dispatch(updateForm(registerFormValues as any));
        dispatch(submitRegsiter(userType, multipartFormData));
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setRegisterFormValues(values)
        toggleShowConfirmation(!showConfirmation)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeAllDay = (e: any, relatedEntity: string) => {
        const {checked} = e.target || {}
        if (checked) {
            form.setFieldsValue({[relatedEntity]: 'all_day'});
        } else {
            form.setFieldsValue({[relatedEntity]: '9am_to_5pm'});
        }
        const updatedWorkHoursStatus = {...workHoursDisbaled, [relatedEntity]: !workHoursDisbaled[relatedEntity]}
        toggleWorkHoursDisbaled(updatedWorkHoursStatus);
    }

    const checkIfDisabled = (fieldName: string) => workHoursDisbaled[fieldName];

    const onReset = () => {
        dispatch(resetOtpState())
        history.push(home);
    }
    
    return (
        <React.Fragment>
            <RegisterConfirmation
                registerResponse={registrationState.registerResponse}
                showConfirmation={showConfirmation}
                onConfirmRegister={onConfirmRegister}
                toggleShowConfirmation={toggleShowConfirmation}
            />
            <RequestSubmittedPopup history={history} showSubmitMsgPopup={showSubmitMsgPopup} />
            <Header />
            <div className="entity-details-container">
                <h1>Buyer Profile Verification</h1>
                <Divider />
                <Form
                    labelAlign='left'
                    form={form}
                    colon={false}
                    {...singleLabelFieldLayout}
                    name="basic"
                    initialValues={
                        {
                            ...registrationState.formData,
                            saturday: '9am_to_5pm',
                            sunday: 'holiday',
                            weekday: '9am_to_9pm'
                        }
                    }
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label="Buyer Type"
                                name="type"
                            >
                                <Input bordered={false} disabled={true} />
                            </Form.Item>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label="Buyer Name"
                                name="name"
                            >
                                <Input bordered={false} disabled={true} />
                            </Form.Item>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label="Phone Number"
                                name="number"
                            >
                                <Input bordered={false} disabled={true} />
                            </Form.Item>
                            <Form.Item
                                labelAlign='left'
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 12 }}
                                label="Email"
                                name="email"
                            >
                                <Input bordered={false} disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item 
                                labelCol={{span: 24}}
                                wrapperCol={{span: 18}}
                                label="PAN card Number" 
                            >
                                <Form.Item
                                    name="pan"
                                    rules={[{ required: true, message: 'Please provide PAN!' }]}
                                    style={{ display: 'inline-block', width: '60%' }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="pan_card"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    rules={[{ required: true, message: 'Upload ID!' }]}
                                    style={{ display: 'inline-block', width: '20%', margin: '0 1em' }}
                                >
                                    <Upload
                                        beforeUpload={(file) => {
                                            const isRequiredFileType =
                                                file.type === 'image/jpeg' ||
                                                file.type === 'image/png';
                                            if (!isRequiredFileType) {
                                                message.error(
                                                    `${file.name} is not an Image file`,
                                                );
                                            }
                                            return !isRequiredFileType;
                                        }}
                                        name="pan"
                                        listType="text"
                                    >
                                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                                    </Upload>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item 
                                labelCol={{span: 24}}
                                wrapperCol={{span: 18}}
                                label='Aadhaar card Number'
                            >
                                <Form.Item
                                    name="uidai"
                                    rules={[{ required: true, message: 'Please provide Aadhaar card Number!' }]}
                                    style={{ display: 'inline-block', width: '60%' }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="aadhar_card"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    rules={[{ required: true, message: 'Upload ID!' }]}
                                    style={{ display: 'inline-block', width: '20%', margin: '0 1em' }}
                                >
                                    <Upload
                                        beforeUpload={(file) => {
                                            const isRequiredFileType =
                                                file.type === 'image/jpeg' ||
                                                file.type === 'image/png';
                                            if (!isRequiredFileType) {
                                                message.error(
                                                    `${file.name} is not an Image file`,
                                                );
                                            }
                                            return !isRequiredFileType;
                                        }}
                                        name="aadhar"
                                        listType="text"
                                    >
                                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                                    </Upload>
                                </Form.Item>
                            </Form.Item>

                            <h2>Location Information</h2>
                            <div className='display-flex-row align-flex-end'>
                                <Form.Item
                                    label="Pin Code"
                                    name="pinCode"
                                    rules={[
                                        {
                                            validator: (rule, value) => customPincodeValidator(rule, value, setAddressForPin) 
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <p className='margin-b-2em'>{addressForPin}</p>
                            </div>
                            <Form.Item
                                label="Address"
                                name="addressLine"
                                rules={[{ required: true, message: 'Please input your Address!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <h2>Working Hours*</h2>
                    <Row gutter={16} justify="start">
                        <Col sm={24} md={24} lg={12}>
                            <Form.Item 
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                label="Monday to Friday" 
                            >
                                <Form.Item 
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    name="weekday"
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        disabled={checkIfDisabled('weekday')}
                                        style={{ width: '50%' }}
                                        placeholder="Please Select">
                                        { getWorkingHoursOptions() }
                                    </Select>
                                </Form.Item>
                                <Form.Item 
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    valuePropName='checked'
                                >
                                    <Checkbox onChange={(e) => onChangeAllDay(e, 'weekday')} className='full-time-checkbox'> 24 hours </Checkbox>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item 
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                label="Saturday" 
                            >
                                <Form.Item 
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    name="saturday"
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        disabled={checkIfDisabled('saturday')}
                                        style={{ width: '50%' }}
                                        placeholder="Please Select">
                                        { getWorkingHoursOptions() }
                                    </Select>
                                </Form.Item>
                                <Form.Item 
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    valuePropName='checked'
                                    
                                >
                                    <Checkbox onChange={(e) => onChangeAllDay(e, 'saturday')} className='full-time-checkbox'> 24 hours </Checkbox>
                                </Form.Item>
                            </Form.Item>


                            <Form.Item 
                                labelCol={{span: 6}}
                                wrapperCol={{span: 18}}
                                label="Sunday" 
                            >
                                <Form.Item 
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    name="sunday"
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        disabled={checkIfDisabled('sunday')}
                                        style={{ width: '50%' }}
                                        placeholder="Please Select">
                                        { getWorkingHoursOptions() }
                                    </Select>
                                </Form.Item>
                                <Form.Item 
                                    wrapperCol={{span: 10}}
                                    noStyle
                                    valuePropName='checked'
                                    
                                >
                                    <Checkbox onChange={(e) => onChangeAllDay(e, 'sunday')} className='full-time-checkbox'> 24 hours </Checkbox>
                                </Form.Item>
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
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="IFSC Code"
                                        name="ifsc_code"
                                        rules={[{ required: true, message: 'Please input IFSC Code!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Account Number"
                                        name="account_number"
                                        rules={[{ required: true, message: 'Please input Account Number!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Confirm Account Number"
                                        name="confirm_account_number"
                                        rules={[{ required: true, message: 'Please Confirm Account Number!' }]}
                                    >
                                        <Input />
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
                                    beforeUpload={(file) => {
                                        const isRequiredFileType =
                                            file.type === 'image/jpeg' ||
                                            file.type === 'image/png';
                                        if (!isRequiredFileType) {
                                            message.error(
                                                `${file.name} is not an Image file`,
                                            );
                                        }
                                        return !isRequiredFileType;
                                    }}
                                    name="logo"
                                    listType="text"
                                >
                                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="UPI ID(optional)"
                                name="upi_id"
                            >
                                <Input />
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
                                <Checkbox>
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
                                        <Button
                                            className="margin-l-r-1em width-full"
                                            htmlType="button"
                                            onClick={onReset}
                                        >
                                            Cancel
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item>
                                        <Button className="margin-l-r-1em width-full" type="primary" htmlType="submit">
                                            Submit
                                        </Button>
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

export default Buyer;
