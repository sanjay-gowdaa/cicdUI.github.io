import React from 'react'
import { Modal, Button, Form, Input, Select, Checkbox, Radio, Typography } from 'antd';
import { useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import { useForm } from 'antd/lib/form/Form';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { ProduceModel } from '../store/buyerReducer/types';
import { isEmpty } from 'lodash';
import { ACCESS_TOKEN } from '../store/api';
const { Text } = Typography;




const RejectionModal = (props: any) => {

    const [buyqunt, setbuyqunt] = useState("")
    const [optval, setoptval] = useState("")
    const [reason, setreason] = useState("")
    const [option, setoption] = useState("")
    const { record } = props;
    const { Option } = Select;
    const [form] = useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const loginState = useSelector((state: RootState) => state.loginUser);
    const userToken = (window as any).userToken ? (window as any).userToken : ACCESS_TOKEN;

    console.log(record, 'record')
    const rejectfun = () => {
        setIsModalVisible(true);
    };

    const onValChange = (value: string) => {
        setoptval(value);
    };

    const submitForm = (values: any) => {
        const rejectPayload = {
            ...values,
            quantity: record.matched_quantity,
            sk: loginState.is_buyer ? record.buyer_crop_id : record.seller_crop_id,
            accessToken: userToken,
            userType: loginState.is_buyer ? 'buyer' : 'seller',
            transactionId: record.pk,
        }
        form.resetFields();
        setIsModalVisible(false)
        console.log(rejectPayload, "rejectPayload")
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
                    form = {form}
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
                        rules={[{ required: true, message: 'Please input your quantity' }]}
                    >
                        <Input
                            value={buyqunt}
                            onChange={(e) => { setbuyqunt(e.target.value) }} />
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
                            <Option value="r1">Reason 1</Option>
                            <Option value="r2">Reason 2</Option>
                            <Option value="r3">Reason 3</Option>
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
                                onChange={(e) => { setreason(e.target.value) }} />
                        </Form.Item>
                    }

                    <Text>Do you want to retain the crop or delete it ?</Text>

                    <Form.Item
                        name="CropDeletion"
                        rules={[{ required: true, message: "This value is manditory" }]}
                    >
                        <Radio.Group>
                            <Radio value="yes" onChange={(e) => { setoption(e.target.value) }}> Yes </Radio>
                            <Radio value="no" onChange={(e) => { setoption(e.target.value) }}> No </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div
                    style=
                    {{display: 'flex', flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
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
