import React, { useEffect, useState } from 'react';
import  DefaultBtn  from '../../app-components/defaultBtn';
import { RootState } from '../../store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Button, Row, Space, Modal, Typography } from 'antd';
import {StatusDetails} from '../../store/sellerReducer/actions'

const { Text, Title } = Typography;


const StatusDetailsModel = (props: any) => {
    const [viewStatusDetails, setviewStatusDetails] = useState(false);
    const closeModal = () => setviewStatusDetails(!viewStatusDetails);
    const dispatch = useDispatch();
    const sellerState = useSelector((state: RootState) => state.seller);
   // console.log("inside response page paymentdetails", buyerState)
    const {statusDetails } = sellerState; 


    useEffect(() => {
        dispatch(StatusDetails())
        //console.log("inside response page paymentdetails", buyerState)
   }, [statusDetails]);    


    return (
        <>
            <Button
                        type="link"
                        onClick={() => {
                            setviewStatusDetails(true);
                            //dispatch(StatusDetails(props))
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
                : {statusDetails.map(function(d:any, idx:any){
                return (<li key={idx}>{d.event_description}</li>)
                })}
                   
                </Col>
                <Col sm={24} md={12}>
                : {statusDetails.map(function(d:any, idx:any){
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

