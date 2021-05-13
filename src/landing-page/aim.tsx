import React, { useState } from 'react';
import { Card, Col, Image, Modal, Row, Typography } from 'antd';

import Connect from '../static/assets/connection.svg';
import Direct from '../static/assets/transmission.svg';
import BestPrize from '../static/assets/best.svg';
import LiveInfo from '../static/assets/agronomy.svg';
import Mission from '../static/assets/mission.svg';
import Handshake from '../static/assets/handshake.svg';

const { Link, Text, Title } = Typography;

const Aim = () => { 
    const [viewVideo, setVideo] = useState(false);

    return (
        <div id="aim">
            <Modal
                visible={viewVideo}
                onCancel={() => setVideo(!viewVideo)}
                width={"95%"}
                className="about-us-video-modal"
                maskClosable={true}
                footer={null}
            >
                <iframe
                    width="95%"
                    height="100%"
                    src="https://www.youtube.com/embed/p4CZAGgJ-wM?playlist=p4CZAGgJ-wM&loop=1&autoplay=1&mute=1"
                    allowFullScreen
                />
            </Modal>
            <Title className="col-green aim-title">VikasBandhu helps you in</Title>
            <img className="handshake-image" src={Handshake} alt="handshake-image" />
            <Row className="aim-card-row">
                <Col span={8}>
                    <Card className="aim-card">
                        <div className="hex1"></div>
                        <div className="hex2"><Image className="icon-inside-hex" src={Connect} preview={false} /></div>
                        <div className="hex3"></div>
                        <Text className="col-white">Connecting buyers and sellers</Text>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="aim-card">
                        <div className="hex1"></div>
                        <div className="hex2"><Image className="icon-inside-hex" src={Direct} preview={false} /></div>
                        <div className="hex3"></div> 
                        <Text className="col-white">Direct selling of agricultural produce</Text>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="aim-card">
                        <div className="hex1"></div>
                        <div className="hex2"><Image className="icon-inside-hex" src={BestPrize} preview={false} /></div>
                        <div className="hex3"></div> 
                        <Text className="col-white">Ensuring best price for both buyer and seller</Text>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="aim-card" style={{float: "right", marginRight: "5rem"}}>
                        <div className="hex1"></div>
                        <div className="hex2"><Image className="icon-inside-hex" src={LiveInfo} preview={false} /></div>
                        <div className="hex3"></div>
                        <Text className="col-white">Providing live information on pricing for study</Text>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className="aim-card">
                        <div className="hex1"></div>
                        <div className="hex2"><Image className="icon-inside-hex" src={Mission} preview={false} /></div>
                        <div className="hex3"></div>
                        <Text className="col-white">Partnering Government's vision</Text>
                    </Card>
                </Col>
            </Row>
            <Text className="aim-video-link">Please view this video to understand &nbsp;
                <Link onClick={() => setVideo(true)} style={{textDecoration: "underline"}}>
                    VikasBandhu aim and solution
                </Link>
                .
            </Text>
        </div>
    );
};

export default Aim;
