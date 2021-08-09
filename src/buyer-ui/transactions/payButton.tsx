import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Col, Input, Row, Space, Modal, Typography } from 'antd';

import PrimaryBtn from '../../app-components/primaryBtn';
import { RootState } from '../../store/rootReducer';
import { isEmpty } from 'lodash';

const { Text, Title } = Typography;

// const TOKEN_GRANT = process.env.REACT_APP_TOKEN_GRANT as string;
// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const STAGE = process.env.REACT_APP_ENV;
// const PAYMENT_REQUEST = 'paymentrequest';

const PayButton = (props: any) => {
    const { record } = props;
    const loginState = useSelector((state: RootState) => state.loginUser);
    const buyerState = useSelector((state: RootState) => state.buyer);
    const status = buyerState.currentStatusDetails;
    const [userStatus, setUserStatus] = useState('');
    const [viewPaymentDetails, setPaymentDetails] = useState(false);
    const uuid = uuidv4() ;
    const accessToken = (window as any).userToken ? (window as any).userToken : null;
    
    const seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    const id = "order_" + seq;

    const user = loginState. is_buyer && "buyer";
    const displayPay = 
        (userStatus === "pay advance of 20 %") ||
            (userStatus === "Sorry error occured, payment unsucessfull")
                ? true : false;
    const isError = userStatus === "Sorry error occured, payment unsucessfull"? true : false;

    useEffect(() => {
        if(!isEmpty(status)) {
            for(let i=0; i<status.length; i++) {
                if(status[i].pk === record.pk) {
                    setUserStatus(status[i].event_description);
                }
            }
        }
    }, [status]);

    return (
        <>
        <PrimaryBtn
            className={
                displayPay ?
                    isError ? 
                        "pay-retry": "vikas-btn-radius" :
                    "display-none"
                }
            onClick={() => setPaymentDetails(true)}
            content={isError? "Retry and Pay" : "Pay Now"}
        />
        <Modal
            visible={viewPaymentDetails}
            title={<Title level={3}>Payment Details</Title>}
            onCancel={() => setPaymentDetails(!viewPaymentDetails)}
            footer = {null}
        >
            <Row>
                <Col span={12}>
                    <Space direction="vertical">
                        <Text>OrderNumber:</Text>
                        <Text>OrderAmount:</Text>
                        <Text>OrderNote:</Text>
                        <Text>Name:</Text>
                        <Text>EmailId:</Text>
                        <Text>PhoneNumber:</Text>
                    </Space>
                </Col>
                <Col span={12}>
                    <form className="payment" method="POST" action="http://13.233.91.84:8086/paymentrequest">
                        <Space direction="vertical">
                            <Input className="custom-input" type="text" value={id} name="orderId" />
                            <Input type="text" value={ record.buyer_final_price} name="orderAmount"/> 
                            <Input type="hidden" value="INR" name="orderCurrency" />
                            <Input type="text" value="Test note" name="orderNote"/>
                            <Input type="text" value={loginState.name} name="customerName"/>
                            <Input type="email" value={loginState.email} name="customerEmail"/>
                            <Input type="tel" value={loginState.phone_no} name="customerPhone"/>
                            <Input type="hidden" value={user} name="user"/>
                            <Input type="hidden" value={loginState.pk} name="userId"/>
                            <Input type="hidden" value={record.pk} name="transactionId"/>
                            <Input type="hidden" value={record.produce} name="produce"/>
                            <Input type="hidden" value={record.seller_id} name="sellerId"/>
                            <Input type="hidden" value= "payment Gateway" name="paymentType"/>
                            <Input type="hidden" value= "1" name="payment"/>
                            <Input type="hidden" value={uuid} name="uuid"/>
                            <Input type="hidden" value={accessToken} name="token"/>
                            <button className="pay-button" type="submit" value="Pay">Pay</button>
                        </Space>
                    </form>
                </Col>
            </Row>
        </Modal>
        </>
    );
};

export default PayButton;
