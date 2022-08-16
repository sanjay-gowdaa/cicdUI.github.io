import React from 'react'
import { Modal, Button, Form, Input, Select, Radio, Typography } from 'antd';
import { useState } from 'react';
import { RuleObject } from 'antd/lib/form';
import { useForm } from 'antd/lib/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { isEmpty } from 'lodash';
import { ACCESS_TOKEN } from '../store/api';
import { rejectFormPayload } from '../store/buyerReducer/actions';

const { Text } = Typography;

const RejectionModal = (props: any) => {

    const [buyqunt, setbuyqunt] = useState("");
    const [optval, setoptval] = useState("");
    const [reason, setreason] = useState("");
    const [option, setoption] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { record } = props;
    const { Option } = Select;

    const [form] = useForm();
    const dispatch = useDispatch();

    const loginState = useSelector((state: RootState) => state.loginUser);
    const userToken = (window as any).userToken ? (window as any).userToken : ACCESS_TOKEN;

    const rejectfun = () => {
        setIsModalVisible(true);
    };

    const onValChange = (value: string) => {
        setoptval(value);
    };

    const validateQuantityInReject = (rule: RuleObject, value: string) => {
        const regExp = /^[0-9]*$/;
        if (isEmpty(value)) {
            return Promise.reject('Please input the Quantity!');
        } else if (!regExp.test(value)) {
            return Promise.reject('Please enter a valid quantity!');
        } else if (parseInt(value) === 0) {
            return Promise.reject('Quantity cannot be Zero');
        } else if (parseInt(value) > record.matched_quantity) {
            return Promise.reject('The maximum value for quantity Should not exceed matched Quantity');
        } else {
            return Promise.resolve();
        }
    };

    const submitForm = (values: any) => {
        const rejectPayload = {
            ...values,
            quantity: record.matched_quantity,
            sk: loginState.is_buyer ? record.buyer_crop_id : record.seller_crop_id,
            accessToken: userToken,
            userType: loginState.is_buyer ? 'buyer' : 'seller',
            transactionId: record.pk,
        };
        dispatch(rejectFormPayload(rejectPayload));
        form.resetFields();
        setIsModalVisible(false);
    };

    return (
        <React.Fragment>
            <Button
                danger
                onClick={rejectfun}
            >
                Reject
            </Button>
            <Modal
                title='Rejection Form'
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 15 }}
                    initialValues={{ remember: true }}
                    labelAlign={'left'}
                    onFinish={submitForm}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Rejected Quantity"
                        name="RejectedQuantity"
                        rules={[{
                            required: true,
                            validator: (rules, value) => validateQuantityInReject(rules, value)
                        }]}
                    >
                        <Input
                            value={buyqunt}
                            onChange={(value: any) => { setbuyqunt(value) }} />
                    </Form.Item>

                    <Form.Item
                        label="Reason Of Reject"
                        name="Reason"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Select
                            placeholder="Choose The Reason"
                            value={optval}
                            onChange={onValChange}
                            allowClear
                        >
                            <Option value="Quantity mismatched">Quantity mismatched</Option>
                            <Option value="Quality not satisfied">Quality not satisfied</Option>
                            <Option value="Delay in delivery">Delay in delivery</Option>
                            <Option value="Package not satisfied">Package not satisfied</Option>
                            <Option value="others"> Other </Option>

                        </Select>
                    </Form.Item>

                    {optval == "others" &&
                        <Form.Item
                            label="Reason for decline"
                            name="BreifText"
                            rules={[{ required: true, message: 'Please input your Reason' }]}
                        >
                            <Input value={reason}
                                placeholder="Your reason"
                                onChange={(value: any) => { setreason(value) }} />
                        </Form.Item>
                    }

                    <Text>Do you want to retain the crop or delete it ?</Text>

                    <Form.Item
                        name="CropDeletion"
                        rules={[{ required: true, message: "This value is manditory" }]}
                    >
                        <Radio.Group>
                            <Radio value="yes" onChange={(value: any) => { setoption(value) }}> Yes </Radio>
                            <Radio value="no" onChange={(value: any) => { setoption(value) }}> No </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div
                        style=
                        {{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Button htmlType="submit">
                            Save
                        </Button>
                        <Button onClick={() => {
                            form.resetFields();
                            setIsModalVisible(false)
                        }}>Cancel</Button>
                    </div>
                </Form>
            </Modal>
        </React.Fragment>
    )
};

export default RejectionModal;
