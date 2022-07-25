import React from 'react'
import { Modal, Button, Form, Input, Select, Checkbox, Radio, Typography } from 'antd';
import { useState } from 'react';
import type { FormInstance } from 'antd/es/form';
import { useForm } from 'antd/lib/form/Form';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
const { Text } = Typography;




function RejectionModal(props: any) {

    const [buyqunt, setbuyqunt] = useState("")
    const [optval, setoptval] = useState("")
    const [reason, setreason] = useState("")
    const [option, setoption] = useState("")
    const [FormDetails, setFormDetails] = useState({ quantity: '', reason: '', option: '' })
    
    const { Option } = Select;
    const [form] = useForm();
    const { record } = props
    const [isModalVisible, setIsModalVisible] = useState(false);
    const loginState = useSelector((state: RootState) => state.loginUser);
    console.log(loginState);

    const rejectfun = () => {
        setIsModalVisible(true);
    }
    const onValChange = (value: string) => {
        setoptval(value);
    }
    const submitForm = (values: any) => {
        setIsModalVisible(false);
        console.log(values);
    }
    return (
        <>
            <Button danger onClick={rejectfun}>
                Reject
            </Button>
            <Modal
                title='Rejection Form' visible={isModalVisible} onCancel={()=>setIsModalVisible(false)}
                footer={null}>
                <Form
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
                        <Input placeholder={loginState.is_buyer? `${record.buyer_quantity} qtl`:`${record.seller_quantity} qtl`} value={buyqunt} onChange={(e) => { setbuyqunt(e.target.value) }} />
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
                        <>
                            <Form.Item
                                label="Reason for decline"
                                name="BreifText"
                                rules={[{ required: true, message: 'Please input your Reason' }]}
                            >
                                <Input value={reason} placeholder="Your reason" onChange={(e) => { setreason(e.target.value) }} />
                            </Form.Item>
                        </>}
                    <Text>Do you want to retain the crop or delete it</Text>


                    <Form.Item name="CropDeletion" rules={[{ required: true, message: "This value is manditory" }]}>
                        <Radio.Group>
                            <Radio value="yes" onChange={(e) => { setoption(e.target.value) }}> Yes </Radio>
                            <Radio value="no" onChange={(e) => { setoption(e.target.value) }}> No </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 0, span: 15 }} labelAlign={'left'}>
                        <Button htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default RejectionModal