import React from 'react';
import { Input, Typography, Collapse, Select, Button, Form, DatePicker } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import UploadDocument from '../../app-components/uploadDocument';
import { customIfscValidator } from '../../login-ui/registration/utils';
import { cashAndCheckPayment } from '../../store/buyerReducer/actions';

const CashPaymentModal = () => {
    const loginState = useSelector((state: RootState) => state.loginUser);
    const buyerState = useSelector((state: RootState) => state.buyer);

    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const OnCheckDetailsSave = (values: any) => {
        console.log(values.Amount);
        const payload = {
            "user": "buyer",
            "userId": `${loginState.pk}`,
            "payment": "cash005",
            "paymentType": "cash",
            "Mode of payment": "Cash",
            "Amount": `${values.Amount}`,
            "Collected Date": `${values.CollectedDate}`,
            "Collected By": `${values.CollectedBy}`,
            "Receipt": `${values.bank_doc}`,
        }
        form.resetFields();
        dispatch(cashAndCheckPayment(payload));
    }

    const cancelClick=()=>{
        form.resetFields();
    }

    return (
        <div className="checkDraftSection">
            <Form
                form={form}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 10 }}
                colon={false}
                labelAlign='left'
                onFinish={OnCheckDetailsSave}
            >

                <Form.Item
                    className='payment-form-text'
                    name='Amount'
                    label='Amount'
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                    ]}>
                    <Input name='Amount' type='number'
                    />
                </Form.Item>

                <Form.Item name='CollectedDate' label='Collected Date' className='payment-form-text'
                 rules={[
                    { required: true }
                ]}>
                    <DatePicker
                        className="custom-input"
                        format="DD-MM-YYYY"
                        placeholder="DD-MM-YYYY"
                    />
                </Form.Item>

                <Form.Item
                    className='payment-form-text'
                    label='Collected By'
                    name='CollectedBy'
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                    ]}
                >
                    <Input name='CollectedBy' type='text'/>
                </Form.Item>

                <Form.Item name='BankDocument' label='Receipt' className='doc-upload-required'
                    rules={[
                        { required: true }
                    ]}>
                    <UploadDocument
                        className='margin-zero'
                        name='bank_doc'
                    />
                </Form.Item>
                <div className='other-btn-section'>
                    <Button className='other-btn-cancel' htmlType="button" onClick={cancelClick}>Cancel</Button>
                    <Button className='other-btn-save' htmlType='submit'>Save</Button>
                </div>

            </Form>
        </div>
    )
}

export default CashPaymentModal;