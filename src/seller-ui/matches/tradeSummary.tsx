import React from 'react';
import { Col, Row, Typography } from 'antd';
import { MatchRequirementModel } from '../../buyer-seller-commons/types';

const { Title } = Typography;

interface componentProps {
    cropDetails: MatchRequirementModel;
}

const TradeSummary = (props: componentProps) => {
    const {cropDetails} = props;
    const { buyer_id, produce, matched_quantity, buyer_location, seller_price } = cropDetails;
    return (
        <>
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
        </>
    );
};

export default TradeSummary;
