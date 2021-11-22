import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Row, Col, Timeline, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import moment from 'moment';

import { RootState } from '../../store/rootReducer';
import { getStatus } from '../../store/buyerReducer/actions';
import { TransactionStatus } from '../../buyer-seller-commons/types';

const { Text } = Typography;

const TransactionDetailsModal = (props: any) => {
    const { pk, tab } = props;
    const dispatch = useDispatch();
    const sellerState = useSelector((state: RootState) => state.seller);
    const { status, eventTemplate } = sellerState;
    const [count, setCount] = useState(status.length - 1);
    const [currentStatus, setCurrentStatus] = useState([]);
    var id = pk;
    id = id.substring(12);

    const data = {
        "transactionId": id,
        "user": "seller"
    };

    useEffect(() => {
        dispatch(getStatus(data))
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
                <>
                    {!isEmpty(list.pdf_link) ?
                        <Button type="link">Download</Button> : null
                    }
                </> :
                <>
                    <Text>{list.event_name} ({moment(list.event_time).format("DD-MM-YYYY HH:MM")})</Text>
                    <br />
                </>
            )
        })
    };

    const showRemainingTimeline = () => {
        return (
            <Timeline>
                <Timeline.Item
                    label="-"
                    color={"#F5A31A"}
                    className="is-pending"
                >
                    {eventTemplate[count]}
                </Timeline.Item>
                <Timeline.Item
                    label="-"
                    color={"#F5A31A"}
                    className="is-pending"
                >
                    {eventTemplate[count + 1]}
                </Timeline.Item>
            </Timeline>
        );
    };

    return (
        <>
            <Timeline
                mode="left"
                style={{ float: 'left' }}
                className="transaction-timeline"
                pending={tab === TransactionStatus.on_going && count !== eventTemplate.length}
            >
                {currentStatus.map((completedStatus: any) => {
                    return (
                        <Timeline.Item
                            label={moment(completedStatus.event_timestamp).format("DD-MM-YYYY HH:MM")}
                            dot={<CheckCircleFilled style={{ color: "#12805C" }} />}
                            color={"#F5A31A"}
                            className="is-complete"
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
                                <Col span={2}>
                                    <Text style={{ color: "#12805C" }}>Complete</Text>
                                </Col>
                                <Col span={8}>
                                    {!isEmpty(completedStatus.pdf_link) &&
                                        <Button type="link">Download</Button>
                                    }
                                    {showDetails(completedStatus.event_details, true)}
                                </Col>
                            </Row>
                        </Timeline.Item>
                    )
                })}
                {tab === TransactionStatus.on_going ?
                    showRemainingTimeline() :
                    <Timeline.Item
                        dot={<CheckCircleFilled style={{ color: "#12805C" }} />}
                        color={"#F5A31A"}
                        className="is-complete"
                    >
                        Transaction Completed
                    </Timeline.Item>
                }
            </Timeline>
        </>
    );
};

export default TransactionDetailsModal;
