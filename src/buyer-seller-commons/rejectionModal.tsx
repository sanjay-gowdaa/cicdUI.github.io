import React, { useEffect } from 'react';
import {
    Modal,
    Button,
    Form,
    Input,
    Select,
    Radio,
    Typography,
    Collapse,
    Row,
    Space,
    Col,
} from 'antd';
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
import { rejectFormPayload } from '../store/buyerReducer/actions';
import confirmationPopup from './confirmationPopup';

const { Text, Title } = Typography;

const RejectionModal = (props: any) => {
    const [buyqunt, setbuyqunt] = useState('');
    const [optval, setoptval] = useState('');
    const [reason, setreason] = useState('');
    const [option, setoption] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [notifyReject, setNotifyReject] = useState(false);
    const [disableTradeSummary, setDisableTradeSummary] = useState(1);
    const { Option } = Select;

    const { Panel } = Collapse;
    const { record } = props;
    const [form] = useForm();
    const dispatch = useDispatch();

    const loginState = useSelector((state: RootState) => state.loginUser);
    const buyerStates = useSelector((state: RootState) => state.buyer);
    const sellerStates = useSelector((state: RootState) => state.seller);
    const userToken = (window as any).userToken ? (window as any).userToken : ACCESS_TOKEN;

    const status = buyerStates.currentStatusDetails;
    const transactionId = parseIDfromHash(props?.record?.key);
    const userId = parseIDfromHash(props?.record?.gsi);
    const buyerCropId = props?.record?.buyer_crop_id;
    const sellerCropId = props?.record?.seller_crop_id;
    const buyerCropIdPayload = parseIDfromHash(props?.record?.buyer_crop_id);
    const sellerCropIdPayload = parseIDfromHash(props?.record?.seller_crop_id);

    const isEditableValueBuyer = buyerStates.produceList;
    const isEditableValueSeller = sellerStates.cropsList;

    const objectOne = loginState.is_buyer
        ? isEditableValueBuyer.find((x: any) => x.sk === `${buyerCropId}`)
        : isEditableValueSeller.find((x: any) => x.sk === `${sellerCropId}`);
    console.log(objectOne, 'objectOne');

    const [category = '', produce = '', variety = '', grade = ''] = !isEmpty(record?.produce)
        ? record?.produce.split('-')
        : [];

    const text = (
        <Title className="trade-summary-header">
            <Text className="trade-summary-title">Trade summary</Text>
        </Title>
    );
    const rejectionNotificationFunc = () => {
        setNotifyReject(true);
    };

    const rejectfun = () => {
        setIsModalVisible(true);
    };

    const onValChange = (value: string) => {
        setoptval(value);
    };

    const getDisplay = (status: string) => {
        var substring = status.substring(0, 4).toLowerCase();
        if (
            substring === 'reject' ||
            status === 'Sorry error occured, crop rejected unsucessfull'
        ) {
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
            return Promise.reject(
                'The maximum value for quantity Should not exceed matched Quantity',
            );
        } else {
            return Promise.resolve();
        }
    };

    // console.log(category, 'category');
    // console.log(produce, 'produce');
    // console.log(variety, 'variety');
    // console.log(grade, 'grade');
    // console.log(record, 'record');

    const okOnReject = () => {
        const consentPayload = {
            userchoice: 'continue',
            access_token: userToken,
        };
        console.log(consentPayload, 'consentPayload');
    };

    const onSave = async (rejectPayloadOne: any) => {
        try {
            console.log(rejectPayloadOne, 'rejectFormValues');
            dispatch(rejectFormPayload(rejectPayloadOne));
        } catch {
            console.log('error to save');
        }
    };

    const submitText = 'reject the transaction, rejection fee will be applied';

    const submitForm = (values: any) => {
        const rejectPayloadOne = [
            {
                transactionId: transactionId,
                userType: loginState.is_buyer ? 'buyer' : 'seller',
                event_description: optval === 'others' ? reason : optval,
                Userchoice: values.CropDeletion,
                QuanityRejected: values.RejectedQuantity,
                access_token: userToken,
                userid: userId,
                cropid: loginState.is_buyer ? buyerCropIdPayload : sellerCropIdPayload,
                gsiStatus: record.gsi_status,
            },
            {
                ...(loginState.is_buyer
                    ? { ...objectOne }
                    : {
                          additional_info: {},
                          category: category,
                          created_timestamp: record.created_at,
                          produce: produce,
                          district: record.buyer_location,
                          grade: grade,
                          isEditable: true, //couldnt find this.
                          is_delete: 'no',
                          pk: record.buyer_id,
                          quantity: record.matched_quantity,
                          sk: buyerCropId,
                          variety: variety,
                          urd_status: false,
                          zip: '587101',
                      }),
            },
            {
                ...(loginState.is_seller
                    ? { ...objectOne }
                    : {
                          produce: produce,
                          category: category,
                          district: 'Koppal',
                          grade: grade,
                          isEditable: true,
                          is_delete: 'no',
                          pk: record.seller_id,
                          quantity: record.seller_quantity,
                          sk: record.seller_crop_id,
                          variety: variety,
                          urd_status: false,
                          zip: '583231',
                          price_per_qnt: record.seller_quoted_price_per_quintal,
                      }),
            },
        ];
        console.log(rejectPayloadOne, 'rejectPayloadOne');
        confirmationPopup(`${submitText}`, onSave, rejectPayloadOne);
    };

    return (
        <React.Fragment>
            <Button danger onClick={rejectfun}>
                Reject
            </Button>

            <Modal
                title="Rejection Form"
                visible={isModalVisible}
                closable={false}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
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
                        rules={[
                            {
                                required: true,
                                validator: (rules, value) => validateQuantityInReject(rules, value),
                            },
                        ]}
                    >
                        <Input
                            value={buyqunt}
                            placeholder={record.matched_quantity}
                            onChange={(value: any) => {
                                setbuyqunt(value);
                            }}
                        />
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

                    {optval == 'others' && (
                        <Form.Item
                            label="Reason for decline"
                            name="BreifText"
                            rules={[{ required: true, message: 'Please input your Reason' }]}
                        >
                            <Input
                                value={reason}
                                placeholder="Your reason"
                                onChange={(value: any) => {
                                    setreason(value);
                                }}
                            />
                        </Form.Item>
                    )}

                    <Text>Do you want to retain the crop or delete it ?</Text>

                    <Form.Item
                        name="CropDeletion"
                        rules={[{ required: true, message: 'This value is manditory' }]}
                    >
                        <Radio.Group>
                            <Radio
                                value="yes"
                                onChange={(value: any) => {
                                    setoption(value);
                                }}
                            >
                                {' '}
                                Yes{' '}
                            </Radio>
                            <Radio
                                value="no"
                                onChange={(value: any) => {
                                    setoption(value);
                                }}
                            >
                                {' '}
                                No{' '}
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                        }}
                    >
                        <Button htmlType="submit">Save</Button>
                        <Button
                            onClick={() => {
                                form.resetFields();
                                setIsModalVisible(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Modal>

            {/* <Modal
                title="Crop Rejection Notification"
                visible={notifyReject}
                onCancel={() => setNotifyReject(false)}
                footer={null}
                className="rejection-notification"
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
                        <Row className="trade-summary-row">
                            <Col span={6}>
                                <Space direction="vertical">
                                    <Text className="inner-text">Seller Id</Text>
                                    <Text className="inner-text">Category</Text>
                                    <Text className="inner-text">Produce</Text>
                                    <Text className="inner-text">Grade</Text>
                                    <Text className="inner-text">Quantity</Text>
                                    <Text className="inner-text">Price per quintal</Text>
                                    <Text className="inner-text">Location</Text>
                                    <Text className="inner-text">Tentative Delivery</Text>
                                </Space>
                            </Col>
                            <Col span={18}>
                                <Space direction="vertical">
                                    <Text className="inner-text">: {record.destinyId}</Text>
                                    <Text className="inner-text">: {category}</Text>
                                    <Text className="inner-text">: {produce}</Text>
                                    <Text className="inner-text">: {grade}</Text>
                                    <Text className="inner-text">: {record.buyer_quantity}qtl</Text>
                                    <Text className="inner-text">
                                        : ₹{record.buyer_price_per_quintal}
                                    </Text>
                                    <Text className="inner-text">: {record.seller_location}</Text>
                                    <Text className="inner-text">: Tentative Delivery</Text>
                                </Space>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text>your Crop has been Rejected</Text>
                    <Button type="primary" onClick={() => okOnReject}>
                        ok
                    </Button>
                </div>
            </Modal> */}
        </React.Fragment>
    );
};

export default RejectionModal;
