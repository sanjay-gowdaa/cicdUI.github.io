import React from 'react';
import { Card, Col, Image, Row, Space, Typography } from 'antd';

import Nagappa from '../static/assets/nagappa.png';
import Suma from '../static/assets/suma.png';
import Sadananda from '../static/assets/sadananda.png';
import Chikkaramu from '../static/assets/Chikkaramu.jpg';
import Sachin from '../static/assets/Sachin.jpg';
import CVKulkarni from '../static/assets/CVKulkarni.jpg';

const { Text, Title } = Typography;

const Team = () => {
    return (
        <div id="team">
            <Title className="col-green" level={2}>Our Team</Title>
            <div className="management-team">
                <Title className="col-green margin-none" level={3}>Management</Title>
                <Space direction="horizontal">
                    <div className="management-our-team">
                        <Image src={Nagappa} preview={false} />
                        <Title className="person-name" level={4}>G S Nagappa</Title>
                        <Text>Director</Text>
                    </div>
                    <div className="management-our-team">
                        <Image src={Suma} preview={false} />
                        <Title className="person-name suma" level={4}>Suma Sadananda</Title>
                        <Text className="suma">Director</Text>
                    </div>
                    <div className="management-our-team">
                        <Image src={Sadananda} preview={false} />
                        <Title className="person-name" level={4}>Sadananda Murthy</Title>
                        <Text>Leads Engg. & Ops.</Text>
                    </div>
                </Space>
            </div>
            <div className="advisors-team">
                <Title className="col-green margin-none" level={3}>Advisors</Title>
                <Row>
                    <Col span={8}>
                        <Card className="advisors-card">
                            <Image src={Chikkaramu} preview={false} className="advisors-pic" />
                            <Title className="person-name" level={4}>Chikkaramu S</Title>
                            <Text>Agricultural expert (B. Tech -Agriculture Engineering)
                                with over 15 years of technical experience on the field.
                                He is Guiding us with training, Quality, and technical ground operations.
                            </Text>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="advisors-card">
                            <Image src={Sachin} preview={false} className="advisors-pic" />
                            <Title className="person-name" level={4}>Sachin Narang</Title>
                            <Text>Marketing Professional (MBA) withover two decades of marketing
                                leadership experience at leading FMCG and lifestyle companies
                                encompassing Personal Care and Food & Beverages. He is guiding 
                                us on the Go to Market strategies.
                            </Text>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="advisors-card">
                            <Image src={CVKulkarni} preview={false} className="advisors-pic" />
                            <Title className="person-name" level={4}>C V Kulkarni</Title>
                            <Text>Sales and operations Professional with over three decades
                                of experience with focus on FMCG and beverages. He is helping
                                define and structure the sales and operations.
                            </Text>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Team;
