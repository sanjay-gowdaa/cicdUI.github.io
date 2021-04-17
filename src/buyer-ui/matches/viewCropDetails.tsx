import React from 'react';
import { Col, Divider, Modal, Row } from 'antd';
import DefaultBtn from '../../app-components/defaultBtn';
import TradeSumary from './tradeSummary';
import { MatchRequirementModel } from '../../buyer-seller-commons/types';

interface componentProps {
    openDetailsModal: boolean;
    setOpenDetailsModal: any;
    cropDetails: MatchRequirementModel;
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
