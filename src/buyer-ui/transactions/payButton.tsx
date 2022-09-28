import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Col, Input, Row, Space, Modal, Typography, Collapse, Select, Button } from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import moment from 'moment';
import CheckDraft from '../../buyer-ui/transactions/checkDraft';
import vectorDown from '../../static/assets/Vector_down.png';

import PrimaryBtn from '../../app-components/primaryBtn';
import { RootState } from '../../store/rootReducer';
import { getAmount, rejectMatches } from '../../store/buyerReducer/actions';
import { ACCESS_TOKEN, BASE_URL, STAGE } from '../../store/api';
import CashPaymentModal from '../../buyer-ui/transactions/cashPaymentmodal';
import DirectBankTransferModal from './directBankTransfermodal';
import { render } from '@testing-library/react';
import RejectionModal from '../../buyer-seller-commons/rejectionModal';




const { Text, Title } = Typography;

const PAYMENT_REQUEST = 'paymentrequest';

const PayButton = (props: { record: any }) => {
    const { record } = props;
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.loginUser);
    const buyerState = useSelector((state: RootState) => state.buyer);
    const status = buyerState.currentStatusDetails;

    const [userStatus, setUserStatus] = useState('');
    const [proceedToPayBtn, setProceedToPayBtn] = useState(true);
    const [disableTradeSummary, setDisableTradeSummary] = useState(1)
    const [payAmountDetails, setPayAmountDetails] = useState(true);
    const [viewPaymentDetails, setPaymentDetails] = useState(false);
    const [displayCheckModal, setDisplayCheckModal] = useState(false);
    const [payBtnDisplay, setPayBtnDisplay] = useState(false);
    const [displayCashModal, setDisplayCashModal] = useState(false);
    const [directBankTransferModal, setDirectBankTransferModal] = useState(false);
    const [installmentNumber, setInstallmentNumber] = useState('')
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
                const { buyer_crop_id, seller_id, seller_crop_id, matched_quantity, pk, destinyId } = record;
                const rejectData = {
                    buyer_id: loginState.pk,
                    buyer_crop_id,
                    seller_id,
                    seller_crop_id,
                    matched_quantity,
                    transaction_id: pk,
                    destinyId,
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

    const text = (
        <Title className='trade-summary-header'><Text className='trade-summary-title'>Trade summary</Text></Title>
    )

    const handlePayment = () => {
        // console.log('i am clicked')
        setProceedToPayBtn(false);
        setPayAmountDetails(false);
        setPaymentDetails(true);
        setPayBtnDisplay(true);
    }




    const ChangeTheSelectValue = (value: string) => {
        if (value === 'Payment Gateway') {
            setPaymentDetails(true)
            setProceedToPayBtn(true);
            setPayAmountDetails(true);
            setDisplayCheckModal(false);
            setDisplayCashModal(false);
            setDirectBankTransferModal(false);
        }
        if (value === 'Cheque/Draft') {
            setPaymentDetails(true)
            setPayAmountDetails(false);
            setDisplayCheckModal(true)
            setDisplayCashModal(false)
            setPayBtnDisplay(false);
            setProceedToPayBtn(false);
            setDirectBankTransferModal(false);
        }
        if (value === 'cash') {
            setPaymentDetails(true)
            setDisplayCashModal(true)
            setPayAmountDetails(false);
            setDisplayCheckModal(false)
            setPayBtnDisplay(false);
            setProceedToPayBtn(false);
            setDirectBankTransferModal(false);
        }
        if (value === 'Direct Bank Transfer') {
            setDirectBankTransferModal(true);
            setPaymentDetails(true)
            setDisplayCashModal(false)
            setPayAmountDetails(false);
            setDisplayCheckModal(false)
            setPayBtnDisplay(false);
            setProceedToPayBtn(false);
        }
    }
    
    let findNumber = /\d+/;
    let percent = userStatus.match(findNumber);
    // console.log(percent)
    // console.log(userStatus)
    // console.log(record.installment_count,'record.installment_count')
    // console.log(record.installment,'record.installment')
    // console.log(record.transaction_type,'record.transaction_type')

    useEffect(() => {
        if (record.installment == '1') {
            return setInstallmentNumber('First Advance Payment Details')
        }
        if (record.installment == '2') {
            return setInstallmentNumber('Second Advance Payment Details')
        }
        if (record.installment == '3') {
            return setInstallmentNumber('Final Payment Details')
        }
    }, [installmentNumber])

    const { Panel } = Collapse;
    const { Option, OptGroup } = Select;
    const [masterCategory = '', produceCateogry = '', cropType = '', grade = ''] = !isEmpty(record?.produce) ? record?.produce.split('-') : [];
    return (
        <React.Fragment>
                <PrimaryBtn
                    className={
                        displayPay ?
                            isError ?
                                'pay-retry' : 'vikas-btn-radius pay-button-position' :
                            'display-none'
                    }
                    onClick={() => payNow()}
                    content={isError ? 'Retry and Pay' : 'Pay Now'}
                />
            
            {record.installment === record.Installment_count ? <RejectionModal record={record} />:null}

            <Modal
                // bodyStyle={{width:466,height:530}}
                className='payment-modal'
                visible={viewPaymentDetails}
                closable={false}
                onCancel={() => setPaymentDetails(!viewPaymentDetails)}
                footer={null}
                centered={true}
            >
                <Title className='payment-title'><Text className='payment-title-text'>{installmentNumber}</Text></Title>

                <Collapse
                    bordered={false}
                    defaultActiveKey={disableTradeSummary}
                    expandIconPosition={'right'}
                    destroyInactivePanel={true}
                    expandIcon={({ isActive }) => <CaretUpOutlined rotate={isActive ? 0 : 180} />}
                    className="site-collapse-custom-collapse"
                >
                    <Panel header={text} key="1" className="site-collapse-custom-panel">
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
                <Title className='payment-summary'><Text className='paymentsummarytext'>Payment Summary</Text></Title>
                <Row className='payment-summary-row'>
                    <Col span={24} className='mode-column'>
                        <Text className='mode-of-payment'>Mode of payment</Text>
                        <img src={vectorDown}></img>
                        <Select className='selectMode' defaultValue="Payment Gateway" showArrow={false}
                            onChange={ChangeTheSelectValue}>
                            <Option value="Payment Gateway">Payment Gateway</Option>
                            <OptGroup label="Other">
                                <Option value="cash">Cash</Option>
                                <Option value="Cheque/Draft">Cheque/Draft</Option>
                                <Option value="Direct Bank Transfer">Direct Bank Transfer</Option>
                            </OptGroup>
                        </Select>
                    </Col>
                    {payAmountDetails ? <Col span={24} className='pay-amount'>
                        <Text className='payment-amount'>Pay Amount</Text>
                        <Text className='amount'><strong>₹{buyerState.paymentAmount}</strong>({percent}% of ₹{record.buyer_total_price})</Text>
                    </Col> : null}
                    <form method='POST' action={`${BASE_URL}/${STAGE}/${PAYMENT_REQUEST}`}>
                        <Input
                            className='payment-custom-input'
                            type='hidden'
                            value={record.destinyId}
                            name='sellerId'
                        />
                        <Input
                            className='payment-custom-input'
                            type='hidden'
                            value={record.produce}
                            name='produce'
                        />
                        <Input
                            className='payment-custom-input'
                            type='hidden'
                            value='Test note'
                            name='orderNote'
                        />
                        <Input
                            className='payment-custom-input'
                            type='hidden'
                            value={loginState.name}
                            name='customerName'
                        />
                        <Input
                            className='payment-custom-input'
                            type='hidden'
                            value={record.seller_location}
                            name='customerLocation'
                        />
                        <Input type='hidden' value='INR' name='orderCurrency' />
                        <Input type='hidden' value={user} name='user' />
                        <Input type='hidden' value={loginState.pk} name='userId' />
                        <Input type='hidden' value={record.pk} name='transactionId' />
                        <Input type='hidden' value={record.produce} name='produce' />
                        <Input type='hidden' value={record.destinyId} name='sellerId' />
                        <Input type='hidden' value='payment Gateway' name='paymentType' />
                        <Input type='hidden' value='1' name='payment' />
                        <Input type='hidden' value={uuid} name='uuid' />
                        <Input type='hidden' value={accessToken || ACCESS_TOKEN} name='token' />
                        <Input type='hidden' value={id} name='orderId' />
                        <Input type='hidden' value={loginState.phone_no} name='customerPhone' />
                        <Input type='hidden' value={loginState.email} name='customerEmail' />
                        <Input type='hidden' value={loginState.name} name='customerName' />

                        {displayCheckModal &&
                            <CheckDraft record={record}
                                viewPaymentDetails={viewPaymentDetails}
                                setPaymentDetails={setPaymentDetails}
                            />
                        }
                        {displayCashModal &&
                            <CashPaymentModal
                                record={record}
                                viewPaymentDetails={viewPaymentDetails}
                                setPaymentDetails={setPaymentDetails}
                            />
                        }
                        {directBankTransferModal &&
                            <DirectBankTransferModal
                                record={record}
                                viewPaymentDetails={viewPaymentDetails}
                                setPaymentDetails={setPaymentDetails}
                            />
                        }
                        {proceedToPayBtn ?
                            <div className='payment-btn-block'>
                                <button
                                    className='pay-button-btn'
                                    type='submit'
                                    onClick={handlePayment}>Proceed to Pay ₹{buyerState.paymentAmount}
                                </button>
                            </div>
                            : null
                        }
                        {payBtnDisplay ?
                            <div className='payment-btn-block-position'>
                                <button className='pay-btn-width' type='submit' value='pay'>Pay</button>
                            </div>
                            : null
                        }
                    </form>
                </Row>
            </Modal>
        </React.Fragment>
    );
};

export default PayButton;
