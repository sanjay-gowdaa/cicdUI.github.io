import React, { useState } from 'react';
import { Col, Divider, Modal, Row, Typography } from 'antd';

import { MatchRequirementModel } from '../../store/buyerReducer/types';
import DefaultBtn from '../../app-components/defaultBtn';
import TradeSumary from './tradeSummary';

const { Title } = Typography;

interface componentProps {
    openDetailsModal: boolean;
    setOpenDetailsModal: any;
    // cropDetails: MatchRequirementModel;
    cropDetails: any;
};

const ViewCropDetails = (props: componentProps) => {
    const { openDetailsModal, setOpenDetailsModal, cropDetails } = props;
    const closeModal = () => setOpenDetailsModal(!openDetailsModal);
    
    return (
        <Modal visible={openDetailsModal} title="Details" onCancel={closeModal} footer={null}>
            <TradeSumary cropDetails={cropDetails} />
            <Divider />
            <Row justify="center">
                <Col>
                    <DefaultBtn onClick={closeModal} content="Close" />
                </Col>
            </Row>
        </Modal>
    );
};

export default ViewCropDetails;
