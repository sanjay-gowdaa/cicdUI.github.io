import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import {
    accountNumberValidator,
    confirmAccountValidator,
    customIfscValidator,
    customNameValidator,
    customUpiValidator
} from './utils';

import UploadDocument from '../../app-components/uploadDocument';

const { TextArea } = Input;

const BankDocumentsUpload = (props: any) => {
    const { form } = props;

    return (
        <React.Fragment>
            <h2>Bank Account Information</h2>
            <Row gutter={16} justify='start'>
                <Col sm={24} md={24} lg={12}>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label='Account Holder Name'
                                name='account_name'
                                rules={[{ validator: (rule, value) => customNameValidator(rule, value, 'Account Holder Name') }]}
                            >
                                <Input className='custom-input' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='IFSC Code'
                                name='ifsc_code'
                                rules={[{ validator: (rule, value) => customIfscValidator(rule, value) }]}
                            >
                                <Input className='custom-input' style={{ textTransform: 'uppercase' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Account Number'
                                name='account_number'
                                rules={[{ validator: (rule, value) => accountNumberValidator(rule, value) }]}
                            >
                                <Input className='custom-input' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Confirm Account Number'
                                name='confirm_account_number'
                                rules={[{ validator: (rule, value) => confirmAccountValidator(rule, value, form.getFieldsValue().account_number) }]}
                            >
                                <Input className='custom-input' />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={16} justify='start'>
                <Col sm={24} md={24} lg={12}>
                    <UploadDocument
                        name='bank_doc'
                        label='Upload Bank Passbook or Statement'
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 8 }}
                    />
                    <Form.Item
                        label='UPI ID'
                        name='upi_id'
                        rules={[{ validator: (rule, value) => customUpiValidator(rule, value) }]}
                    >
                        <Input className='custom-input' />
                    </Form.Item>
                    <Form.Item
                        label='Additional Information'
                        name='additional_info'
                    >
                        <TextArea className='custom-input' />
                    </Form.Item>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BankDocumentsUpload;
