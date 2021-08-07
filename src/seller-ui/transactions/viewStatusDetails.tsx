import React, { useState } from 'react';
import { Col, Button, Row, Modal, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/rootReducer';
import { getStatus } from '../../store/sellerReducer/actions'

const { Title } = Typography;

const StatusDetailsModel = (pk: any) => {
    const [viewStatusDetails, setviewStatusDetails] = useState(false);
    const closeModal = () => setviewStatusDetails(!viewStatusDetails);
    const dispatch = useDispatch();
    const sellerState = useSelector((state: RootState) => state.seller);
    const {statusDetails } = sellerState; 
    var id = pk.data;
    id= id.substring(12);

    const data ={
        "transactionId": id,
        "user": "seller"
    };

    return (
        <>
            <Button
                type="link"
                onClick={() => {
                    setviewStatusDetails(true);
                    dispatch(getStatus(data))
                }}
            >
                View Details
            </Button>
            <Modal
                visible={viewStatusDetails}
                title={<Title level={3}>Transaction Status Details</Title>}
                onCancel={closeModal}
                footer = {null}
            >
                <Row>
                    <Col sm={24} md={12}>
                        event_description:
                    </Col>
                    <Col sm={24} md={12}>
                        event_timestamp:
                    </Col>
                </Row>
                <Row>
                    <Col sm={24} md={12}>
                    : { statusDetails.map(function(d:any, idx:any){
                        return (<li key={idx}>{d.event_description}</li>)
                    })}
                    
                    </Col>
                    <Col sm={24} md={12}>
                    : { statusDetails.map(function(d:any, idx:any){
                        return (<li key={idx}>{d.event_timestamp}</li>)
                    })}
                    </Col>
                </Row>
                <Row>
                    <Col sm={24} md={12}>
                        {}
                    </Col>
                    <Col sm={24} md={12}>
                        {}
                    </Col>
                </Row>

            </Modal>
        </>
    ); 
};

export default StatusDetailsModel;
