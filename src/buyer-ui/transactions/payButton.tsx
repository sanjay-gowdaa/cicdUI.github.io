import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Col, Input, Row, Space, Modal, Typography } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';

import PrimaryBtn from '../../app-components/primaryBtn';
import { RootState } from '../../store/rootReducer';
import { getAmount, rejectMatches } from '../../store/buyerReducer/actions';
import { ACCESS_TOKEN, BASE_URL, STAGE } from '../../store/api';

const { Text, Title } = Typography;

const PAYMENT_REQUEST = 'paymentrequest';

const PayButton = (props: { record: any }) => {
    const { record } = props;
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.loginUser);
    const buyerState = useSelector((state: RootState) => state.buyer);
    const status = buyerState.currentStatusDetails;

    const [userStatus, setUserStatus] = useState('');
    const [viewPaymentDetails, setPaymentDetails] = useState(false);
    const uuid = uuidv4();
    const accessToken = (window as any).userToken ? (window as any).userToken : null;

    const seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    const id = 'order_' + seq;

    const user = loginState.is_buyer && 'buyer';
    const getDisplay = (status: string) => {
        var substring = status.substring(0, 4).toLowerCase();
        if (substring === 'pay ' || status === 'Sorry error occured, payment unsucessfull') {
            return true;
        }
        return false;
    };
    const displayPay = getDisplay(userStatus);
    const isError = userStatus === 'Sorry error occured, payment unsucessfull' ? true : false;

    useEffect(() => {
        if (!isEmpty(status)) {
            for (let i = 0; i < status.length; i++) {
                if (status[i].pk === record.pk) {
                    setUserStatus(status[i].event_description);
                }
            }
        }
    }, [status]);

    useEffect(() => {
        if (!isEmpty(record)) {
            const newDate = new Date();
            const updatedDate = record.updated_timestamp;

            const diffInDays = parseInt(moment(newDate).format('YYYYMMDD')) - parseInt(moment(updatedDate).format('YYYYMMDD'));

            if (diffInDays === 1) {
                Modal.info({
                    title: 'Kindly pay the seller within 24hrs!',
                    content: (
                        <p>
                            Kindly do the payment for <b>{record.produce}</b> within 24hrs or the transaction will be terminated!
                        </p>
                    )
                });
            }

            if (diffInDays >= 2) {
                Modal.info({
                    title: 'No action were taken in the last 48 hrs',
                    content: (
                        <p>
                            The <b>{record.produce}</b> transaction is auto rejected since there were no actions taken in 48hrs!
                        </p>
                    )
                });
                // Change the transaction status to complete
                const { buyer_crop_id, seller_id, seller_crop_id, matched_quantity, pk } = record;
                const rejectData = {
                    buyer_id: loginState.pk,
                    buyer_crop_id,
                    seller_id,
                    seller_crop_id,
                    matched_quantity,
                    transaction_id: pk,
                    buyer_event: 'auto_reject'
                }
                dispatch(rejectMatches(rejectData));
            }
        }
    }, [record]);

    const payNow = () => {
        dispatch(getAmount(record.pk));
        setPaymentDetails(true);
    };

    return (
        <React.Fragment>
            <PrimaryBtn
                className={
                    displayPay ?
                        isError ?
                            'pay-retry' : 'vikas-btn-radius' :
                        'display-none'
                }
                onClick={() => payNow()}
                content={isError ? 'Retry and Pay' : 'Pay Now'}
            />
            <Modal
                visible={viewPaymentDetails}
                title={<Title level={3}>Payment Details</Title>}
                onCancel={() => setPaymentDetails(!viewPaymentDetails)}
                footer={null}
            >
                <Row>
                    <Col span={12}>
                        <Space direction='vertical'>
                            <Text>OrderNumber:</Text>
                            <Text>OrderAmount:</Text>
                            <Text>Name:</Text>
                            <Text>EmailId:</Text>
                            <Text>PhoneNumber:</Text>
                        </Space>
                    </Col>
                    <Col span={12}>
                        <form className='payment' method='POST' action={`${BASE_URL}/${STAGE}/${PAYMENT_REQUEST}`}>
                            <Space direction='vertical'>
                                <Input
                                    className='payment-custom-input'
                                    type='text'
                                    value={id}
                                    name='orderId'
                                />
                                <Input
                                    className='payment-custom-input'
                                    type='text'
                                    value={buyerState.paymentAmount}
                                    name='orderAmount'
                                />
                                <Input
                                    className='payment-custom-input'
                                    type='hidden'
                                    value='Test note'
                                    name='orderNote'
                                />
                                <Input
                                    className='payment-custom-input'
                                    type='text'
                                    value={loginState.name}
                                    name='customerName'
                                />
                                <Input
                                    className='payment-custom-input'
                                    type='email'
                                    value={loginState.email}
                                    name='customerEmail'
                                />
                                <Input
                                    className='payment-custom-input'
                                    type='tel'
                                    value={loginState.phone_no}
                                    name='customerPhone'
                                />
                                <Input type='hidden' value='INR' name='orderCurrency' />
                                <Input type='hidden' value={user} name='user' />
                                <Input type='hidden' value={loginState.pk} name='userId' />
                                <Input type='hidden' value={record.pk} name='transactionId' />
                                <Input type='hidden' value={record.produce} name='produce' />
                                <Input type='hidden' value={record.seller_id} name='sellerId' />
                                <Input type='hidden' value='payment Gateway' name='paymentType' />
                                <Input type='hidden' value='1' name='payment' />
                                <Input type='hidden' value={uuid} name='uuid' />
                                <Input type='hidden' value={accessToken || ACCESS_TOKEN} name='token' />
                                <button className='pay-button' type='submit' value='Pay'>Pay</button>
                            </Space>
                        </form>
                    </Col>
                </Row>
            </Modal>
        </React.Fragment>
    );
};

export default PayButton;
