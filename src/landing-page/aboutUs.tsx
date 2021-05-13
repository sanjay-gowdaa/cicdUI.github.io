import React from 'react';
import { Card, Col, Image, Row, Typography } from 'antd';

import Outline from '../static/assets/Outline.svg';
import Vision from '../static/assets/vision.svg';
import Philosophy from '../static/assets/philosophy.svg';

const { Paragraph, Title } = Typography;

const AboutUs = () => {
    return (
        <div id="aboutUs">
            <Title className="col-green about-us-title" level={2}>About us</Title>
            <img className="outline-image" src={Outline} />
            <Paragraph className="outline-paragraph">
                We are a young enterprise working with knowledge and passion 
                for partnering Government's vision of Freedom, Protection, and 
                Higher Income to farmer communities. We have worked tirelessly 
                with farmers and everyone in the value chain to understand the needs.
                We are committed to ensure a meaningful facilitation to the buyers and sellers.
            </Paragraph>
            <Row>
                <Col span={12}>
                    <Card className="vision-card">
                        <Image src={Vision} preview={false} />
                        <Title className="col-green card-title" level={3}>Our Vision</Title>
                        <Paragraph className="card-paragraph">
                            Ensure that we create a brand which is synonymous with trust and respect 
                            amongst communities in the agriculture space.
                        </Paragraph>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="vision-card">
                        <Image src={Philosophy} preview={false} />
                        <Title className="col-green card-title" level={3}>Our Philosophy</Title>
                        <Paragraph  className="card-paragraph">
                            Continuously improve our services to add value and Brand to our business, 
                            our partners and our communities. 
                        </Paragraph>
                    </Card>
                </Col>
            </Row>
            <div className="vision-div">
                <Title className="col-green" level={3}>Partnering Government's Vision</Title>
                <Paragraph className="vision-paragraph">
                    We take pride in partnering Government's vision of doubling farmer's income by 
                    reducing middlemen. This is our contribution to nation building and making it truly
                    'Atmanirbhar Bharat'.
                </Paragraph>
            </div>
        </div>
    );
};

export default AboutUs;
