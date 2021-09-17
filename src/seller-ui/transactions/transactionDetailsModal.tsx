import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Row, Col, Timeline, Button } from 'antd';
import { CheckCircleFilled, FileTextOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';

import { RootState } from '../../store/rootReducer';
import { getStatus } from '../../store/buyerReducer/actions';

const { Text } = Typography;

const TransactionDetailsModal = (pk: any) => {
    var completedEvents = [""];
    const dispatch = useDispatch();
    // Should be changed to seller
    const buyerState = useSelector((state: RootState) => state.buyer);
    const { statusDetails, eventTemplate } = buyerState;
    var id = pk.data;
    id = id.substring(12);

    const data = {
        "transactionId": id,
        "user": "seller"
    };

    useEffect(() => {
        dispatch(getStatus(data))
    }, []);

    for (let i = 0; i < statusDetails.length; i++) {
        completedEvents.push(statusDetails[i].event_description);
    }

    eventTemplate.splice(0, completedEvents.length, ...completedEvents);
    const getEvent = (event: string) => {
        for (let i = 0; i < completedEvents.length; i++) {
            if (completedEvents[i] === event) {
                return true;
            }
        }
        return false;
    };

    return (
        <>
            <Timeline mode="left" style={{ float: 'left' }} className="transaction-timeline">
                {eventTemplate.map((event: any) => {
                    const isComplete = getEvent(event);

                    return (!isEmpty(event) &&
                        <Timeline.Item
                            label={isComplete ?
                                <Text style={{ textAlign: "center" }}>08/08/20</Text> :
                                <Text style={{ textAlign: "center" }}>-</Text>
                            }
                            dot={isComplete && <CheckCircleFilled style={{ color: "#12805C" }} />}
                            color={"#F5A31A"}
                            className={isComplete ? "is-complete" : "is-pending"}
                        >
                            <Row>
                                <Col span={8}>
                                    <Text>{event}</Text>
                                </Col>
                                <Col span={8}>
                                    <Text style={{ color: "#12805C" }}>{isComplete ? "Complete" : null}</Text>
                                </Col>
                                <Col span={8}>
                                    <Button type="link">
                                        {isComplete ? <Text>Recipt<FileTextOutlined /></Text> : null}
                                    </Button>
                                </Col>
                            </Row>
                        </Timeline.Item>
                    )
                })}
            </Timeline>
        </>
    );
}

export default TransactionDetailsModal;
