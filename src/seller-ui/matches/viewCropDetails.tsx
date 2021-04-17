import React from 'react';
import { Col, Divider, Modal, Row, Typography } from 'antd';
import DefaultBtn from '../../app-components/defaultBtn';
import { MatchRequirementModel } from '../../buyer-seller-commons/types';

const { Title } = Typography;

interface componentProps {
    openDetailsModal: boolean;
    setOpenDetailsModal: Function;
    cropDetails: MatchRequirementModel;
}

const ViewCropDetails = (props: componentProps) => {
    const { openDetailsModal, setOpenDetailsModal, cropDetails } = props;
    const { buyer_id, produce, matched_quantity, buyer_location, seller_price } = cropDetails;
    const closeModal = () => setOpenDetailsModal(!openDetailsModal);
    return (
        <Modal visible={openDetailsModal} title="Details" onCancel={closeModal} footer={null}>
            <Title level={4}>Trade summary</Title>
            <Row>
                <Col sm={24} md={12}>
                    Buyer Id
                </Col>
                <Col sm={24} md={12}>
                    : {buyer_id}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Produce
                </Col>
                <Col sm={24} md={12}>
                    : {produce}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Quantity
                </Col>
                <Col sm={24} md={12}>
                    : {matched_quantity}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Price per quintal
                </Col>
                <Col sm={24} md={12}>
                    : {}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Total price
                </Col>
                <Col sm={24} md={12}>
                    : {seller_price}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Location
                </Col>
                <Col sm={24} md={12}>
                    : {buyer_location}
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
