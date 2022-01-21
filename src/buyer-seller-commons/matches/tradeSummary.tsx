import React from 'react';
import { Col, Row, Statistic, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

import { MatchRequirementModel } from '../../buyer-seller-commons/types';
import { parseIDfromHash, maskData } from '../../app-components/utils';
import { RootState } from '../../store/rootReducer';

const { Title } = Typography;

interface componentProps {
    cropDetails: MatchRequirementModel;
};

const TradeSummary = (props: componentProps) => {
    const { cropDetails } = props;
    const loginState = useSelector((state: RootState) => state.loginUser);
    const { is_buyer } = loginState;
    const { buyer_id, buyer_location, seller_price_per_quintal, seller_price, seller_id,
        produce, buyer_price_per_quintal, matched_quantity, location, buyer_final_price, seller_final_price
    } = cropDetails;

    const userId = is_buyer ? maskData(parseIDfromHash(seller_id)) : maskData(parseIDfromHash(buyer_id));
    const diffAmt = seller_final_price - seller_price;
    const isIncrease = diffAmt > 0;
    const color = isIncrease ? '#12805C' : '#E90000';

    return (
        <React.Fragment>
            <Title level={4}>Trade summary</Title>
            <Row>
                <Col sm={24} md={12}>
                    {is_buyer ? <>Seller </> : <>Buyer </>}Id
                </Col>
                <Col sm={24} md={12}>
                    : {userId}
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
                    : {is_buyer ? buyer_price_per_quintal : seller_price_per_quintal}
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Total price
                </Col>
                <Col sm={24} md={12}>
                    : {is_buyer ? buyer_final_price : seller_final_price}
                    {is_buyer ?
                        <span className='heading-alerttext'>&nbsp;(excl. all taxes)</span> :
                        <span>
                            <Statistic
                                value={diffAmt}
                                valueStyle={{ color, fontSize: '12px' }}
                                prefix={diffAmt ? <CaretUpOutlined /> : <CaretDownOutlined />}
                            />
                        </span>
                    }
                </Col>
            </Row>
            <Row>
                <Col sm={24} md={12}>
                    Location
                </Col>
                <Col sm={24} md={12}>
                    : {is_buyer ? location : buyer_location}
                </Col>
            </Row>
            {/* <Row>
                <Col sm={24} md={12}>
                    Tentative pickup
                </Col>
                <Col sm={24} md={12}>
                    : {'12/08/2020 to 15/08/2020'}
                </Col>
            </Row> */}
        </React.Fragment>
    );
};

export default TradeSummary;
