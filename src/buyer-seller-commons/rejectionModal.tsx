import React, { useEffect } from 'react'
import { Modal, Button, Form, Input, Select, Radio, Typography, Collapse, Row, Space, Col } from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { RuleObject } from 'antd/lib/form';
import { useForm } from 'antd/lib/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { isEmpty } from 'lodash';
import { ACCESS_TOKEN } from '../store/api';
import './rejectionStyles.scss';

import { parseIDfromHash } from '../app-components/utils';

const { Text, Title } = Typography;

const RejectionModal = (props: any) => {

    const [buyqunt, setbuyqunt] = useState("");
    const [optval, setoptval] = useState("");
    const [reason, setreason] = useState("");
    const [option, setoption] = useState("");
    const [userStatus, setUserStatus] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [notifyReject, setNotifyReject] = useState(false);
    const [disableTradeSummary, setDisableTradeSummary] = useState(1)
    const { Option } = Select;

    const { Panel } = Collapse;
    const { record } = props;
    const [form] = useForm();
    const dispatch = useDispatch();

    const loginState = useSelector((state: RootState) => state.loginUser);
    const buyerStates = useSelector((state: RootState) => state.buyer);
    const sellerStates = useSelector((state: RootState) => state.seller);
    const userToken = (window as any).userToken ? (window as any).userToken : ACCESS_TOKEN;

    const status = buyerStates.currentStatusDetails

    console.log(status, 'status');

    const transactionId = parseIDfromHash(props?.record?.key);
    const userId = parseIDfromHash(props?.record?.gsi);
    const buyerCropId = (props?.record?.buyer_crop_id);
    const sellerCropId = (props?.record?.seller_crop_id);
    const buyerCropIdPayload = parseIDfromHash(props?.record?.buyer_crop_id);
    const sellerCropIdPayload = parseIDfromHash(props?.record?.seller_crop_id);

    const isEditableValueBuyer = buyerStates.produceList;
    const isEditableValueSeller = sellerStates.cropsList;
    console.log(isEditableValueSeller, 'isEditableValueSeller');
    const objectOne = loginState.is_buyer ? isEditableValueBuyer.find((x: any) => x.sk === `${buyerCropId}`) : isEditableValueSeller.find((x: any) => x.sk === `${sellerCropId}`);
    console.log(objectOne, 'objectOne')
    
    const [masterCategory = '', produceCateogry = '', cropType = '', grade = ''] = !isEmpty(record?.produce) ? record?.produce.split('-') : [];
    // console.log(search,'search');
    const text = (
        <Title className='trade-summary-header'><Text className='trade-summary-title'>Trade summary</Text></Title>
    )
    const rejectionNotificationFunc = () => {
        setNotifyReject(true);
    }

    const rejectfun = () => {
        setIsModalVisible(true);
    };

    const onValChange = (value: string) => {
        setoptval(value);
    };

    const getDisplay = (status: string) => {
        var substring = status.substring(0, 4).toLowerCase();
        if (substring === 'reject' || status === 'Sorry error occured, crop rejected unsucessfull') {
            return true;
        }
        return false;
    };
    const displayReject = getDisplay(userStatus);
    const isError = userStatus === 'Sorry error occured, crop rejected unsucessfull' ? true : false;

    useEffect(() => {
        if (!isEmpty(status)) {
            for (let i = 0; i < status.length; i++) {
                if (status[i].pk === record.pk) {
                    setUserStatus(status[i].event_description);
                }
            }
        }
    }, [status]);

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

    // console.log(record.is_editable,'isEditable')
    console.log(record, 'record')


    const okOnReject = () => {
        const consentPayload = {
            userchoice: 'continue',
            access_token: userToken
        }
        console.log(consentPayload, 'consentPayload')
    }


    const submitForm = (values: any) => {
        console.log(values, 'values')
        console.log(masterCategory, 'masterCategory')
        console.log(produceCateogry, 'produceCateogry')
        console.log(cropType, 'cropType')
        console.log(grade, 'grade')

        const rejectPayloadOne = [
            {
                transactionId: transactionId,
                userType: loginState.is_buyer ? 'buyer' : 'seller',
                event_description: optval === 'others' ? reason : optval,
                Userchoice: values.CropDeletion,
                QuanityRejected: values.RejectedQuantity,
                quantity: record.matched_quantity,
                access_token: userToken,
                userid: userId,
                cropid: loginState.is_buyer ? buyerCropIdPayload : sellerCropIdPayload,
                gsiStatus: record.gsi_status
            },
            {
                ...loginState.is_buyer ?
                    { ...objectOne } :
                    {
                        additional_info: {},
                        category: produceCateogry,
                        created_timestamp: record.created_at,
                        crop_name: masterCategory,
                        district: record.buyer_location,
                        grade: grade,
                        isEditable: true,//couldnt find this.
                        is_delete: "no",
                        pk: "user#8105616993",
                        quantity: "81",
                        sk: "buyer_crop#16e4f9cb296c2db370d2928db8be0a3055a79390",
                        sub_type: cropType,
                        urd_status: false,
                        zip: "587101"
                    }
            }
            ,
            {
                ...loginState.is_seller ? { ...objectOne } :
                    {
                        crop_name: masterCategory,
                        category: produceCateogry,
                        district: "Koppal",
                        grade: grade,
                        isEditable: true,
                        is_delete: "no",
                        pk: record.seller_id,
                        quantity: record.seller_quantity,
                        sk: record.seller_crop_id,
                        sub_type: cropType,
                        urd_status: false,
                        zip: "583231",
                        price_per_qnt: record.seller_quoted_price_per_quintal
                    }
            }
        ];
        console.log(rejectPayloadOne, 'rejectPayloadOne')
        // dispatch(rejectFormPayload(rejectPayload));
        form.resetFields();
        setIsModalVisible(false);
    };

    return (
        <React.Fragment>
            {displayReject ?
                <Button
                    danger
                    type="link"
                    onClick={rejectionNotificationFunc}
                >
                    View Details
                </Button>
                :
                <Button
                    danger
                    onClick={rejectfun}
                >
                    Reject
                </Button>
            }
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

            <Modal
                title='Crop Rejection Notification'
                visible={notifyReject}
                onCancel={() => setNotifyReject(false)}
                footer={null}
                className='rejection-notification'
            >

                <Collapse
                    bordered={false}
                    defaultActiveKey={disableTradeSummary}
                    expandIconPosition={'left'}
                    destroyInactivePanel={true}
                    expandIcon={({ isActive }) => <CaretUpOutlined rotate={isActive ? 0 : 180} />}
                    className="rejection-collpase"
                >
                    <Panel header={text} key="1">
                        <Row className='trade-summary-row'>
                            <Col span={6}>
                                <Space direction='vertical'>
                                    <Text className='inner-text'>Seller Id</Text>
                                    <Text className='inner-text'>Category</Text>
                                    <Text className='inner-text'>Produce</Text>
                                    <Text className='inner-text'>Grade</Text>
                                    <Text className='inner-text'>Quantity</Text>
                                    <Text className='inner-text'>Price per quintal</Text>
                                    <Text className='inner-text'>Location</Text>
                                    <Text className='inner-text'>Tentative Delivery</Text>
                                </Space>
                            </Col>
                            <Col span={18}>
                                <Space direction='vertical'>
                                    <Text className='inner-text'>: {record.destinyId}</Text>
                                    <Text className='inner-text'>: {masterCategory}</Text>
                                    <Text className='inner-text'>: {produceCateogry}</Text>
                                    <Text className='inner-text'>: {grade}</Text>
                                    <Text className='inner-text'>: {record.buyer_quantity}qtl</Text>
                                    <Text className='inner-text'>: ₹{record.buyer_price_per_quintal}</Text>
                                    <Text className='inner-text'>: {record.seller_location}</Text>
                                    <Text className='inner-text'>: Tentative Delivery</Text>
                                </Space>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text>your Crop has been Rejected</Text>
                    <Button type='primary' onClick={() => okOnReject}>
                        ok
                    </Button>
                </div>
            </Modal>
        </React.Fragment>
    )
};

export default RejectionModal;
