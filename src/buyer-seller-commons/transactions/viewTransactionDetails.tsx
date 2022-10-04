import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Row, Col, Timeline, Button, Form, Radio } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { isEmpty, isUndefined } from 'lodash';
import moment from 'moment';

import { getStatus } from '../actions';

import { RootState } from '../../store/rootReducer';
import { TransactionStatus } from '../../buyer-seller-commons/types';
import { isDeliveryRecievedPayload } from '../../store/buyerReducer/actions';

const { Text } = Typography;

const TransactionDetailsModal = (props: any) => {
    const { pk, tab } = props;
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.loginUser);
    const userState = useSelector((state: RootState) =>
        loginState.is_buyer ? state.buyer : state.seller,
    );
    const { status, eventTemplate, currentStatusDetails } = userState;
    const [count, setCount] = useState(status.length - 1);
    const [currentStatus, setCurrentStatus] = useState([]);
    const [latestStatus, setLatestStatus]:any = useState('');
    const [deliveryValue, setDeliveryValue]: any = useState('');
    var id = pk;
    id = id.substring(12);

    console.log(pk,'pk')

    const data = {
        transactionId: id,
        user: loginState.is_buyer ? 'buyer' : 'seller',
    };

    useEffect(() => {
        dispatch(getStatus(data));
        for (let i = 0; i < currentStatusDetails.length; i++) {
            if (currentStatusDetails[i].pk === pk) {
                setLatestStatus(currentStatusDetails[i].event_description);
            }
        }
    }, []);

    useEffect(() => {
        for (let i = 0; i < status.length; i++) {
            if (status[i].key === id) {
                setCurrentStatus(status[i].details);
                setCount(status[i].details.length);
            }
        }
    }, [status]);

    const showDetails = (details: any, isDownload: boolean) => {
        console.log(details, 'details');
        let showDetails = [];

        for (const key in details) {
            showDetails.push(details[key]);
        }
        return showDetails.map((list: any) => {
            return isDownload ? (
                <React.Fragment>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {!isUndefined(list.pdf_link) ? (
                            <Button
                                type="link"
                                href={`${list.pdf_link}`}
                                target="_blank"
                                download={''}
                            >
                                Download
                            </Button>
                        ) : null}
                    </div>
                </React.Fragment> :
                <React.Fragment>
                    <Text>{list.event_name} ({list.event_time})</Text>
                    <br />
                </React.Fragment>
            );
        });
    };

    const showDeliveryConfirm = () => {

        const submitForm = (value: any) => {
            
            const deliveryPayload = {
                userType: loginState.is_buyer ? 'buyer' : 'seller',
                transactionId: id,
                isgoodsreceived: value.deliveryRecived
            };
            if(value.deliveryRecived === 'no'){
                return window.alert('Please select yes,This feature is in progress')
            }if(value.deliveryRecived === 'yes'){
                setDeliveryValue(value.deliveryRecived);
                console.log(deliveryPayload, 'deliveryPayload');
                dispatch(isDeliveryRecievedPayload(deliveryPayload))
            }            
        };
        
        return (
            <React.Fragment>
                <Form onFinish={submitForm} layout="inline">
                    <Form.Item
                        label="Delivery Recived"
                        name="deliveryRecived"
                        rules={[{ required: true, message: 'This value is manditory' }]}
                    >
                        <Radio.Group>
                            <Radio value="yes" onChange={(e: any) => e.target.value}>
                                {' '}
                                Yes{' '}
                            </Radio>
                            <Radio value="no" onChange={(e: any) => e.target.value}>
                                {' '}
                                No{' '}
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">submit</Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    };
    return (
        <React.Fragment>
            <Timeline
                mode="left"
                style={{ float: 'left' }}
                className="transaction-timeline"
                pending={tab === TransactionStatus.on_going && count !== eventTemplate.length}
            >
                {currentStatus.map((completedStatus: any) => {
                    const isPending =
                        completedStatus.event_description === latestStatus &&
                        tab !== TransactionStatus.completed;
                    return (
                        <Timeline.Item
                            label={isPending ? '-' : completedStatus.event_timestamp}
                            dot={isPending ? null : <CheckCircleFilled style={{ color: '#12805C' }} />}
                            color={'#F5A31A'}
                            className={isPending ? 'is-pending' : 'is-complete'}
                        >
                            <Row>
                                <Col span={6}>
                                    <Row>
                                        <Text>{completedStatus.event_description}</Text>
                                    </Row>
                                    <Row>
                                        <Text>
                                            {!isEmpty(completedStatus.event_details) &&
                                                showDetails(completedStatus.event_details, false)}
                                        </Text>
                                    </Row>
                                </Col>
                                <Col span={2} className={isPending ? 'display-none' : ''}>
                                    <Text style={{ color: '#12805C' }}>Complete</Text>
                                </Col>
                                <Col span={8}>
                                    {showDetails(completedStatus.event_details, true)}
                                </Col>
                            </Row>
                        </Timeline.Item>
                    );
                })}
                {/* {console.log(deliveryValue,'deliveryValue')} */}
                {/* {console.log(latestStatus,'latestStatus')} */}
                {deliveryValue === 'yes' ? null : (
                    <Row
                        style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {latestStatus === 'Is goods recieved?' ? showDeliveryConfirm() : null}
                    </Row>
                 )}
            </Timeline>
        </React.Fragment>
    );
};

export default TransactionDetailsModal;
