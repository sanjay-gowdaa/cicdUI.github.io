import React from 'react';
import { Input, Button, Form, DatePicker } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import UploadDocument from '../../app-components/uploadDocument';
import { customNameValidator } from '../../login-ui/registration/utils';
import { cashAndCheckPayment } from '../../store/buyerReducer/actions';
import { parseIDfromHash } from '../../app-components/utils';
import { generateFormData } from '../../profile/utils';
import { cloneDeep } from 'lodash';

const CashPaymentModal = (props: any) => {
    const { record, viewPaymentDetails, setPaymentDetails, bankDoc, setBankDoc } = props;
    const loginState = useSelector((state: RootState) => state.loginUser);
    const buyerState = useSelector((state: RootState) => state.buyer);

    const dispatch = useDispatch()

    const [form] = Form.useForm();

    const transactionId = parseIDfromHash(props?.record?.key);
    const produce = props?.record?.produce;
    const quantity = props?.record?.buyer_quantity;


    const OnCheckDetailsSave = (values: any) => {
        var files:any
        const registerDataPromise =
            generateFormData(cloneDeep({
                ...values,
            }));
            registerDataPromise.then((data) =>
            {   
                const payload = {
                    "userType": "buyer",
                    "transactionId": `${transactionId}`,
                    "produce": `${produce}`,
                    "quantity": `${quantity}`,
                    "userId": `${loginState.pk}`,
                    "paymentType": "cash",
                    "Amount": `${buyerState.paymentAmount}`,
                    "CollectedDate": `${values.CollectedDate}`,
                    "CollectedBy": `${values.CollectedBy}`,
                    "Receipt": data.files,
                    "envType":process.env.REACT_APP_ENV
                }
                dispatch(cashAndCheckPayment(payload));
                form.resetFields();
                setPaymentDetails(!viewPaymentDetails);
            }
        );
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
                    name='Amount'
                    label='Amount'>
                    <Input name='amount' type='textarea' disabled={true} defaultValue={`₹ ${buyerState.paymentAmount}`} allowClear={false} />
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
                    rules={[{ required: true }, { validator: (rule, value) => customNameValidator(rule, value, 'collected By is Required') }]}
                >
                    <Input name='CollectedBy' />
                </Form.Item>

                <Form.Item name='Receipt' label='Receipt' className='doc-upload-required'
                    rules={[
                        { required: true }
                    ]}>
                    <UploadDocument
                        className='margin-zero'
                        name='reciept'
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