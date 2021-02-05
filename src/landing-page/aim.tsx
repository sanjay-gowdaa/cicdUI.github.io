import React from 'react';
import { Card, Image, Row, Typography } from 'antd';

import Connect from '../static/assets/connection.svg';
import Direct from '../static/assets/transmission.svg';
import BestPrize from '../static/assets/best.svg';
import LiveInfo from '../static/assets/agronomy.svg';
import Mission from '../static/assets/mission.svg';
import Handshake from '../static/assets/handshake.svg';

const { Text, Title } = Typography;

const Aim = () => {    
    return (
        <div id="aim">
            <Title className="col-green aim-title">VikasBandhu helps you in</Title>
            <img className="handshake-image" src={Handshake} alt="handshake-image" />
            <Row className="aim-card-row">
                <Card className="aim-card">
                    <div className="hex1"></div>
                    <div className="hex2"><Image className="icon-inside-hex" src={Connect} preview={false} /></div>
                    <div className="hex3"></div>
                    <Text className="col-white">Connecting buyers and sellers</Text>
                </Card>
                <Card className="aim-card">
                    <div className="hex1"></div>
                    <div className="hex2"><Image className="icon-inside-hex" src={Direct} preview={false} /></div>
                    <div className="hex3"></div> 
                    <Text className="col-white">Direct selling of agricultural produce</Text>
                </Card>
                <Card className="aim-card">
                    <div className="hex1"></div>
                    <div className="hex2"><Image className="icon-inside-hex" src={BestPrize} preview={false} /></div>
                    <div className="hex3"></div> 
                    <Text className="col-white">Ensuring best price for both buyer and seller</Text>
                </Card>
                <Card className="aim-card">
                    <div className="hex1"></div>
                    <div className="hex2"><Image className="icon-inside-hex" src={LiveInfo} preview={false} /></div>
                    <div className="hex3"></div>
                    <Text className="col-white">Providing live information on pricing for study</Text>
                </Card>
                <Card className="aim-card">
                    <div className="hex1"></div>
                    <div className="hex2"><Image className="icon-inside-hex" src={Mission} preview={false} /></div>
                    <div className="hex3"></div>
                    <Text className="col-white">Partnering Government's vision</Text>
                </Card>
            </Row>
        </div>
    );
};

export default Aim;
