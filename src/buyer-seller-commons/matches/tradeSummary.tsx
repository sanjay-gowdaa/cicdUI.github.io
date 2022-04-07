import React from 'react';
import { Col, Row, Space, Statistic, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

import { MatchRequirementModel } from '../../buyer-seller-commons/types';
import { RootState } from '../../store/rootReducer';

const { Text, Title } = Typography;

interface componentProps {
    cropDetails: MatchRequirementModel;
};

const TradeSummary = (props: componentProps) => {
    const { cropDetails } = props;
    const loginState = useSelector((state: RootState) => state.loginUser);
    const { is_buyer } = loginState;
    const { buyer_location,  seller_price, destinyId, produce, gst_amount,
        buyer_price_per_quintal, matched_quantity, seller_location, seller_final_price,seller_quoted_price_per_quintal,
        buyer_total_price, seller_total_price, seller_facilitation_gst,buyer_facilitation_gst, 
        buyer_facilitation_cost,seller_facilitation_cost, seller_final_price_per_quintal,seller_initial_produce_cost,
    } = cropDetails;

    
    const produce_total_cost = seller_price + gst_amount
    const seller_faci_with_gst = Math.round(seller_facilitation_cost + seller_facilitation_gst)
    const buyer_faci_with_gst = Math.round(buyer_facilitation_cost + buyer_facilitation_gst)
    const diffAmt = Math.round(produce_total_cost - seller_initial_produce_cost);
    const isIncrease = diffAmt > 0;
    const color = isIncrease ? '#12805C' : '#E90000';

    return (
        <React.Fragment>
            <Title level={4}>Trade summary </Title>
            <Row>
                <Col span={8}>
                {is_buyer ? <>Seller </> : <>Buyer </>}Id
                </Col>
                <Col span={16}>
                    : {destinyId}
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    Produce
                </Col>
                <Col span={16}>
                    : {produce}
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    Quantity
                </Col>
                <Col span={16}>
                    : {matched_quantity}
                </Col>
            </Row>
            {is_buyer ? 
                <Row>
                    <Col span={8}>
                        Price per quintal
                    </Col>
                    <Col span={16}>
                        : {buyer_price_per_quintal}
                    </Col>
                </Row> :
                <div><Row>
                    <Col span={8}>
                        Quoted price/Qtl
                    </Col>
                    <Col span={16} className='required-form-field-after'>
                        : {seller_quoted_price_per_quintal}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        Vikasbandhu price/Qtl
                    </Col>
                    <Col span={16} className='required-form-field-after'>
                        : {seller_final_price_per_quintal}
                    </Col>
                </Row></div>
            }
            <Row>
                <Col span={8}>
                    Produce cost
                </Col>
                <Col span={16}>
                    :{seller_price} + {gst_amount} ( 5% GST) = <strong>{produce_total_cost}</strong>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    Facilitation cost
                </Col>
                <Col span={16}>
                    : {is_buyer ? buyer_facilitation_cost : seller_facilitation_cost} +  {is_buyer ? buyer_facilitation_gst : seller_facilitation_gst} (18% GST) = <strong>{is_buyer? buyer_faci_with_gst : seller_faci_with_gst}</strong>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <strong>Total price</strong>
                </Col>
                <Col span={16}>
                    : <Space direction='horizontal'>
                        <strong>
                            {is_buyer ? buyer_total_price : seller_total_price}
                        </strong>
                    {is_buyer ?
                        <React.Fragment></React.Fragment> :
                        <React.Fragment>
                            <Statistic
                                value={diffAmt}
                                valueStyle={{ color, fontSize: '12px' }}
                                prefix={isIncrease ? <CaretUpOutlined /> : <CaretDownOutlined />}
                            />
                        </React.Fragment>
                    }
                    </Space>
                </Col>
            </Row>
             
            <Row>
                <Col span={8}>
                    Location
                </Col>
                <Col span={16}>
                    : {is_buyer ? seller_location : buyer_location}
                </Col>
            </Row>
            {/* <Row>
                <Col span={8}>
                    Tentative pickup
                </Col>
                <Col span={16}>
                    : {'12/08/2020 to 15/08/2020'}
                </Col>
            </Row> */}
            {is_buyer ? <></> : 
            <Text className='required-form-field' style={{ color: 'red'}}>
                Including all taxes
            </Text>
            }
        </React.Fragment>
    );
};

export default TradeSummary;
