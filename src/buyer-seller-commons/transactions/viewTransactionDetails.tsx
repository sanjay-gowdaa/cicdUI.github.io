import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Row, Col, Timeline, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import moment from 'moment';

import { getStatus } from '../actions';

import { RootState } from '../../store/rootReducer';
import { TransactionStatus } from '../../buyer-seller-commons/types';

const { Text } = Typography;

const TransactionDetailsModal = (props: any) => {
    const { pk, tab } = props;
    const dispatch = useDispatch();
    const loginState = useSelector((state: RootState) => state.loginUser);
    const userState = useSelector((state: RootState) => loginState.is_buyer ? state.buyer : state.seller);
    const { status, eventTemplate, currentStatusDetails } = userState;
    const [count, setCount] = useState(status.length - 1);
    const [currentStatus, setCurrentStatus] = useState([]);
    const [latestStatus, setLatestStatus] = useState('');
    var id = pk;
    id = id.substring(12);

    const data = {
        'transactionId': id,
        'user': loginState.is_buyer ? 'buyer' : 'seller'
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
        let showDetails = [];

        for (const key in details) {
            showDetails.push(details[key]);
        }
        return showDetails.map((list: any) => {
            return (isDownload ?
                <React.Fragment>
                    {!isEmpty(list.pdf_link) ?
                        <Button type='link'>Download</Button> : null
                    }
                </React.Fragment> :
                <React.Fragment>
                    <Text>{list.event_name} ({moment(list.event_time).format('DD-MM-YYYY HH:MM')})</Text>
                    <br />
                </React.Fragment>
            )
        })
    };

    const showRemainingTimeline = () => {
        return (
            <Timeline>
                <Timeline.Item
                    label='-'
                    color={'#F5A31A'}
                    className='is-pending'
                >
                    {eventTemplate[count]}
                </Timeline.Item>
                <Timeline.Item
                    label='-'
                    color={'#F5A31A'}
                    className='is-pending'
                >
                    {eventTemplate[count + 1]}
                </Timeline.Item>
            </Timeline>
        );
    };

    return (
        <React.Fragment>
            <Timeline
                mode='left'
                style={{ float: 'left' }}
                className='transaction-timeline'
                pending={tab === TransactionStatus.on_going && count !== eventTemplate.length}
            >
                {currentStatus.map((completedStatus: any) => {
                    return (
                        <Timeline.Item
                            label={completedStatus.event_description === latestStatus ? '-' : moment(completedStatus.event_timestamp).format('DD-MM-YYYY HH:MM')}
                            dot={completedStatus.event_description === latestStatus ? null : <CheckCircleFilled style={{ color: '#12805C' }} />}
                            color={'#F5A31A'}
                            className={completedStatus.event_description === latestStatus ? 'is-pending' : 'is-complete'}
                        >
                            <Row>
                                <Col span={6}>
                                    <Row>
                                        <Text>{completedStatus.event_description}</Text>
                                    </Row>
                                    <Row>
                                        <Text>{!isEmpty(completedStatus.event_details) &&
                                            showDetails(completedStatus.event_details, false)
                                        }</Text>
                                    </Row>
                                </Col>
                                <Col span={2} className={completedStatus.event_description === latestStatus ? 'display-none' : ''}>
                                    <Text style={{ color: '#12805C' }}>Complete</Text>
                                </Col>
                                <Col span={8}>
                                    {!isEmpty(completedStatus.pdf_link) &&
                                        <Button type='link'>Download</Button>
                                    }
                                    {showDetails(completedStatus.event_details, true)}
                                </Col>
                            </Row>
                        </Timeline.Item>
                    )
                })}
                {/* {tab === TransactionStatus.on_going ?
                    showRemainingTimeline() :
                    <Timeline.Item
                        dot={<CheckCircleFilled style={{ color: '#12805C' }} />}
                        color={'#F5A31A'}
                        className='is-complete'
                    >
                        Transaction Completed
                    </Timeline.Item>
                } */}
            </Timeline>
        </React.Fragment>
    );
};

export default TransactionDetailsModal;
