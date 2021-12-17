import React from 'react';
import { Col, Divider, Modal, Row } from 'antd';

import TradeSummary from './tradeSummary';

import { MatchRequirementModel } from '../../buyer-seller-commons/types';
import DefaultBtn from '../../app-components/defaultBtn';

interface componentProps {
    openDetailsModal: boolean;
    setOpenDetailsModal: any;
    cropDetails: MatchRequirementModel;
};

const ViewCropDetails = (props: componentProps) => {
    const { openDetailsModal, setOpenDetailsModal, cropDetails } = props;
    const closeModal = () => setOpenDetailsModal(!openDetailsModal);

    return (
        <Modal visible={openDetailsModal} title='Details' onCancel={closeModal} footer={null}>
            <TradeSummary cropDetails={cropDetails} />
            <Divider />
            <Row justify='center'>
                <Col>
                    <DefaultBtn onClick={closeModal} content='Close' />
                </Col>
            </Row>
        </Modal>
    );
};

export default ViewCropDetails;
