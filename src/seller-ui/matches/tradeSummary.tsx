import React from 'react';
import { Col, Row, Typography } from 'antd';
import { MatchRequirementModel } from '../../store/sellerReducer/types';

const { Title } = Typography;

interface componentProps {
    cropDetails: MatchRequirementModel;
}

const TradeSummary = (props: componentProps) => {
    const {cropDetails} = props;
    const { buyerId, cropName, quantityRequired, pricePerQnt, location } = cropDetails;
    return (
        <>
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
                    Produce
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
        </>
    );
};

export default TradeSummary;
