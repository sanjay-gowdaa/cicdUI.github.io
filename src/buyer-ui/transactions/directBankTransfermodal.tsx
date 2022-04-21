import React from 'react';
import { Input, Button, Form, DatePicker } from 'antd';
import {customNameValidator } from '../../login-ui/registration/utils';
import { cashAndCheckPayment } from '../../store/buyerReducer/actions';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import UploadDocument from '../../app-components/uploadDocument';
import { parseIDfromHash } from '../../app-components/utils';


const DirectBankTransferModal = (props: { record: any,viewPaymentDetails:any,setPaymentDetails:any }) => {
    const { record,viewPaymentDetails, setPaymentDetails } = props;
    const loginState = useSelector((state: RootState) => state.loginUser);
    const buyerState = useSelector((state: RootState) => state.buyer);

    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const transactionId = parseIDfromHash(props?.record?.key);
    const produce=props?.record?.produce;
    const quantity=props?.record?.buyer_quantity;

    const OnCheckDetailsSave = (values: any) => {
        const payload = {
            "userType": "buyer",
            "transactionId": `${transactionId}`,
            "produce": `${produce}`,
            "quantity": `${quantity}`,
            "userId": `${loginState.pk}`,
            "paymentType": "directBankTransfer",
            "Amount": `${buyerState.paymentAmount}`,
            "Date": `${values.Date}`,
            "BankDocument": `${values.BankDocument}`,
            "BankName":`${values.BankName}`,
            "bankTransactionID":`${values.bankTransactionID}`,
        }

        form.resetFields();
        dispatch(cashAndCheckPayment(payload));
    }

    const cancelClick = () => {
        form.resetFields();
        setPaymentDetails(!viewPaymentDetails);
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
                    name='BankName'
                    label='Bank Name'
                    rules={[{required: true},{ validator: (rule, value) => customNameValidator(rule, value, 'Bank Name is Required') }]}
                >
                    <Input name='BankName' />
                </Form.Item>

                <Form.Item
                    className='payment-form-text'
                    name='bankTransactionID'
                    label='Transaction ID'
                    rules={[
                        { required: true },
                    ]}
                >
                    <Input name='bankTransactionID'/>
                </Form.Item>

                <Form.Item name='Date' label='Date' className='payment-form-text'
                rules={[
                    { required: true },
                ]}
                >
                <DatePicker
                    className="custom-input"
                    format="DD-MM-YYYY"
                    placeholder="DD-MM-YYYY"
                />
                </Form.Item>

                <Form.Item name='Amount' label='Amount' className='payment-form-text'>
                     <Input name='amount' type='textarea' disabled={true} defaultValue={`₹ ${buyerState.paymentAmount}`} allowClear={false}/>
                </Form.Item>

                <Form.Item name='BankDocument' label='Bank Document' className='doc-upload-required'
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

export default DirectBankTransferModal;

