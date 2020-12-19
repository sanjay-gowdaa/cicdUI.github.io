import React, { useState } from 'react';
import { Col, Divider, Modal, Row, Typography } from 'antd';

import { MatchRequirementModel } from '../../store/sellerReducer/types';
import DefaultBtn from '../../app-components/defaultBtn';

const { Title } = Typography;

interface componentProps {
    openDetailsModal: boolean;
    setOpenDetailsModal: Function;
    cropDetails: MatchRequirementModel;
}

const ViewCropDetails = (props: componentProps) => {
    const { openDetailsModal, setOpenDetailsModal, cropDetails } = props;
    const { buyerId, cropName, quantityRequired, pricePerQnt, location } = cropDetails;
    const closeModal = () => setOpenDetailsModal(!openDetailsModal);
    return (
        <Modal visible={openDetailsModal} title="Details" onCancel={closeModal} footer={null}>
            <Title level={4}>Trade summary</Title>
            <Row>
                <Col sm={24} md={12}>
                    Buyer Id
                </Col>
                <Col sm={24} md={12}>
                    : {buyerId}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Crop
                </Col>
                <Col sm={24} md={12}>
                    : {cropName}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Quantity
                </Col>
                <Col sm={24} md={12}>
                    : {quantityRequired}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Price per quintal
                </Col>
                <Col sm={24} md={12}>
                    : {pricePerQnt}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Total price
                </Col>
                <Col sm={24} md={12}>
                    : {quantityRequired * pricePerQnt}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Location
                </Col>
                <Col sm={24} md={12}>
                    : {location}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Tentative pickup
                </Col>
                <Col sm={24} md={12}>
                    : {'12/08/2020 to 15/08/2020'}
                </Col>
            </Row>
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
