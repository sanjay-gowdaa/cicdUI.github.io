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

const accessToken = (window as any).userToken ? (window as any).userToken : null;
    const encryptedToken = CryptoJS.AES.encrypt(accessToken, TOKEN_GRANT).toString();
    const uuid = uuidv4();
    const redirectData = {
        key: uuid,
        value: encryptedToken,
    }
    
    window.localStorage.setItem('user', JSON.stringify(redirectData));

const PayButton = (transDetails: any) => {
    //console.log(transDetails);
    const loginState = useSelector((state: RootState) => state.loginUser);
    const [viewPaymentDetails, setPaymentDetails] = useState(false);
    
    const payNow = () => {
        console.log("Payment gateway to be called");
        console.log("loginState", loginState);
    };

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
                    <form className="payment" method="POST" action="https://i4pu6pqe64.execute-api.ap-south-1.amazonaws.com/dev/request">
                        <Space direction="vertical">
                        <Input className="custom-input" type="text" value="order_251" name="orderId" />
                        <Input type="text" value="8000" name="orderAmount"/> 
                        <Input type="hidden" value="INR" name="orderCurrency" />  
                        <Input type="text" value="Test note" name="orderNote"/>
                        <Input type="text" value={loginState.name} name="customerName"/>
                        <Input type="email" value={loginState.email} name="customerEmail"/>
                        <Input type="tel" value={loginState.phone_no} name="customerPhone"/>
                        <Input type="hidden" value={uuid} name="uuid"/>
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
