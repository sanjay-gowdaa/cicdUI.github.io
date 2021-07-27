import React from 'react';
import { Col, Row, Typography } from 'antd';
import { MatchRequirementModel } from '../../buyer-seller-commons/types';
import { parseIDfromHash, maskData } from '../../app-components/utils';

const { Title } = Typography;

interface componentProps {
    cropDetails: MatchRequirementModel;
}

const TradeSummary = (props: componentProps) => {
    const { cropDetails } = props;
    const { buyer_id, produce, matched_quantity, buyer_location, seller_price_per_quintal, seller_quantity, seller_price } = cropDetails;
    const totalPrice =  (seller_price/seller_quantity) * matched_quantity;

    return (
        <>
            <Title level={4}>Trade Summary</Title>
            <Row>
                <Col sm={24} md={12}>
                    Buyer Id
                </Col>
                <Col sm={24} md={12}>
                    : {maskData(parseIDfromHash(buyer_id))}
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
                    : {seller_price_per_quintal}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Total price
                </Col>
                <Col sm={24} md={12}>
                    : {totalPrice}
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
