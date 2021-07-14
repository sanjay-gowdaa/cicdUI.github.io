import React, { useState } from 'react';
import PrimaryBtn from '../../app-components/primaryBtn';
import { RootState } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { Col, Input, Row, Space, Modal, Typography } from 'antd';
import { TransactioModel } from '../../buyer-seller-commons/types';

const { Text, Title } = Typography;




const PayButton = (tranDetails: any) => {
    const loginState = useSelector((state: RootState) => state.loginUser);
    const buyerState = useSelector((state: RootState) => state.buyer);
    
    const [viewPaymentDetails, setPaymentDetails] = useState(false);
    
    
    var user;
    if(loginState. is_buyer){
        user = "buyer"
    }

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
                        <Input className="custom-input" type="text" value="" name="orderId" />
                        <Input type="text" value={ buyerState.transactionList.Pending[0].buyer_final_price} name="orderAmount"/> 
                        <Input type="hidden" value="INR" name="orderCurrency" />  
                        <Input type="text" value="Test note" name="orderNote"/>
                        <Input type="text" value={loginState.name} name="customerName"/>
                        <Input type="email" value={loginState.email} name="customerEmail"/>
                        <Input type="tel" value={loginState.phone_no} name="customerPhone"/>
                        <Input type="hidden" value={user} name="user"/>
                        <Input type="hidden" value={loginState.pk} name="userId"/>
                        <Input type="hidden" value={buyerState.transactionList.Pending[0].pk} name="transactionId"/>
                        <Input type="hidden" value={buyerState.transactionList.Pending[0].produce} name="produce"/>
                        <Input type="hidden" value={buyerState.transactionList.Pending[0].seller_id} name="sellerId"/>
                        <Input type="hidden" value= "payment Gateway" name="paymentType"/>
                        <Input type="hidden" value= "1" name="payment"/>
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
