import React, { useState } from 'react';
import PrimaryBtn from '../../app-components/primaryBtn';
import { RootState } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import { Col, Input, Row, Space, Modal, Typography } from 'antd';
import { TransactioModel } from '../../buyer-seller-commons/types';
const TOKEN_GRANT = process.env.REACT_APP_TOKEN_GRANT as string;
const { Text, Title } = Typography;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const STAGE = process.env.REACT_APP_ENV;
const PAYMENT_REQUEST = 'paymentrequest';

const PayButton = (tranDetails: any) => {
    console.log(tranDetails);
    const {buyer_final_price} = tranDetails
    const loginState = useSelector((state: RootState) => state.loginUser);
    const [viewPaymentDetails, setPaymentDetails] = useState(false);
    const [selecteduuid, setSelecteduuid] = useState('');
    const uuid = uuidv4() ;
    const accessToken = (window as any).userToken ? (window as any).userToken : null;
    //console.log(uuid);
    const seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    const id = "order_"+seq
    //console.log(seq);

    return (
        <>
        <PrimaryBtn 
            className="vikas-btn-radius"
            onClick={() => setPaymentDetails(true)}
            content="Pay Now" 
            //onClick={()=> payNow()}
            
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
                    <form className="payment" method="POST" action="https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com/dev/paymentrequest">
                        <Space direction="vertical">
                        <Input className="custom-input" type="text" value={id} name="orderId" />
                        <Input type="text" value={buyer_final_price} name="orderAmount"/> 
                        <Input type="hidden" value="INR" name="orderCurrency" />  
                        <Input type="text" value="Test note" name="orderNote"/>
                        <Input type="text" value={loginState.name} name="customerName"/>
                        <Input type="email" value={loginState.email} name="customerEmail"/>
                        <Input type="tel" value={loginState.phone_no} name="customerPhone"/>
                        <Input type="hidden" value={selecteduuid} name="uuid"/>
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
