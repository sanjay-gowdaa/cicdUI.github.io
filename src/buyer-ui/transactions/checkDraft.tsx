import React from 'react';
import { Input,Button,Form,DatePicker } from 'antd';
import {customIfscValidator} from '../../login-ui/registration/utils';
import {cashAndCheckPayment} from '../../store/buyerReducer/actions';

import {useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import UploadDocument from '../../app-components/uploadDocument';


const CheckDraft = () => {
    const loginState = useSelector((state: RootState) => state.loginUser);
    const buyerState = useSelector((state: RootState) => state.buyer);

    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const OnCheckDetailsSave=(values:any)=>{
        console.log(values.Amount);
        const payload = {
            "user":"buyer",
            "userId": `${loginState.pk}`,
            "payment":"cash005",
            "paymentType":"Check/Draft",
            "Mode of payment":"Check/Draft",
            "Amount":`₹${values.Amount}`,
            "Cheque/Challan Number":`${values.ChequeChallanNumber}`,
            "Date":`${values.Date}`,
            "ifsc_code":`${values.ifsc_code}`,
            "BankDocument":`${values.BankDocument}`,
            "BankName":`${values.BankName}`,
        }
        form.resetFields();
        dispatch(cashAndCheckPayment(payload));
        }

        
    return (
        <div className="checkDraftSection">
            <Form 
                form={form}
                labelCol={{ span:10}}
                wrapperCol={{ span:10}}
                colon={false}
                labelAlign='left'
                onFinish={OnCheckDetailsSave}
                >

                <Form.Item 
                className='payment-form-text'
                    name='ChequeChallanNumber'
                    label='Cheque/Challan No.'
                    rules={[
                        {
                            required: true,
                            message: 'please enter a valid Cheque/Challan Number ',
                        },
                    ]}>
                    <Input name='ChequeChallanNumber'
                    />
                </Form.Item>

                <Form.Item
                className='payment-form-text'
                    name='BankName'
                    label='Bank Name'
                    rules={[
                        { required: true },
                    ]}
                >
                    <Input name='BankName' />
                </Form.Item>

                <Form.Item
                className='payment-form-text'
                    label='IFSC Code'
                    name='ifsc_code'
                    rules={[{ required: true },{ validator: (rule, value) => customIfscValidator(rule, value) }]}
                >
                    <Input name='ifsc_code' style={{ textTransform: 'uppercase' }} />
                </Form.Item>

                <Form.Item name='Date' label='Date' className='payment-form-text'
                 rules={[
                    { required: true },
                ]}>
                <DatePicker
                    className="custom-input"
                    format="DD-MM-YYYY"
                    placeholder="DD-MM-YYYY"
                />
                </Form.Item>

                <Form.Item name='Amount' label='Amount' className='payment-form-text'
                 rules={[
                    { required: true }
                ]}>
                    <Input name='amount'/>
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
                <Button className='other-btn-cancel' htmlType="button">Cancel</Button>
                <Button className='other-btn-save' htmlType='submit'>Save</Button>
                </div>
                
            </Form>
        </div>
    )
}

export default CheckDraft;

