import React from 'react';
import { Card, Image, Space, Typography } from 'antd';

import Outline from '../static/assets/Outline.svg';
import Vision from '../static/assets/vision.svg';
import Philosophy from '../static/assets/philosophy.svg';
import Nagappa from '../static/assets/nagappa.png';
import Suma from '../static/assets/suma.png';
import Sadananda from '../static/assets/sadananda.png';

const { Paragraph, Text, Title } = Typography;

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
            <Card className="vision-card float-left">
                <Image className="card-image" src={Vision} preview={false} />
                <Title className="col-green card-title" level={3}>Our Vision</Title>
                <Paragraph className="card-paragraph">
                    Ensure that we create a brand which is synonymous with trust and respect 
                    amongst communities in the agriculture space.
                </Paragraph>
            </Card>
            <Card className="philosophy-card float-right">
                <Image className="card-image" src={Philosophy} preview={false} />
                <Title className="col-green card-title" level={3}>Our Philosophy</Title>
                <Paragraph  className="card-paragraph">
                    Continuously improve our services to add value and Brand to our business, 
                    our partners and our communities. 
                </Paragraph>
            </Card>
            <div className="float-left">
                <Title className="col-green" level={3}>Partnering Government's Vision</Title>
                <Paragraph style={{width: "52em"}}>
                    We take pride in partnering Government's vision of doubling farmer's income by 
                    reducing middlemen. This is our contribution to nation building and making it truly
                    'Atmanirbhar Bharat'.
                </Paragraph>
            </div>
            <div className="about-us-our-team float-left">
                <Title className="col-green" level={3}>Our Team</Title>
                <Space direction="horizontal">
                    <div className="our-team">
                        <Image src={Nagappa} preview={false} />
                        <Title className="person-name" level={4}>G S Nagappa</Title>
                        <Text>Director</Text>
                    </div>
                    <div className="our-team">
                        <Image src={Suma} preview={false} />
                        <Title className="person-name" level={4}>Suma Sadananda</Title>
                        <Text>Director</Text>
                    </div>
                    <div className="our-team">
                        <Image src={Sadananda} preview={false} />
                        <Title className="person-name" level={4}>Sadananda Murthy</Title>
                        <Text>VP, Leads Engg. & Ops.</Text>
                    </div>
                </Space>
            </div>
        </div>
    );
};

export default AboutUs;
