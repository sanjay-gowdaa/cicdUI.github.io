import React from 'react';
import { Col, Image, Row, Space, Typography } from 'antd';

import Tractor from '../static/assets/tractor.svg';
import Network from '../static/assets/network.svg';
import Rupee from '../static/assets/rupee.svg';
import Sync from '../static/assets/sync.svg';
import Lorry from '../static/assets/lorry.svg';
import SocialCare from '../static/assets/social-care.svg';
import Nature from '../static/assets/nature.svg';

const { Text, Title } = Typography;

const Ecosystem = () => {
    return (
        <div id="ecosystem">
            <Image className="tractor-image" src={Tractor} preview={false} />
            <div className="ecosystem-content">
                <Title className="col-green ecosystem-title" level={2}>At VikasBandhu, we build an ecosystem that would</Title>
                <Row>
                    <Col span={2}>
                        <Space direction="vertical" className="bulletin-image" size="large">
                        <Image className="first-bulletin-image" src={Network} preview={false} />
                        <Image src={Rupee} preview={false} />
                        <Image src={Sync} preview={false} />
                        <Image src={Lorry} preview={false} />
                        <Image className="last-bulletin-image" src={SocialCare} preview={false} />
                        </Space>
                    </Col>
                    <Col>
                        <Space direction="vertical" className="bulletin-text" size="small">
                        <Text className="bulletin-points">
                            Connect buyers and sellers in a simple to use platform.<br/>
                        </Text>
                        <Text className="bulletin-points">
                            <br/>Provide dynamic information on pricing.<br/>
                        </Text>
                        <Text className="bulletin-points">
                            <br/>Meet demand and supply.<br/>
                        </Text>
                        <Text className="bulletin-points">
                            <br/>Facilitate a Door-to-door solution of logistics.<br/>
                        </Text>
                        <Text className="bulletin-points">
                            <br/>Boost rural economy by providing local employment.
                        </Text>
                        </Space>
                    </Col>
                </Row>
                <img className="nature-image" src={Nature} alt="nature-image" />
            </div>
        </div>
    );
};

export default Ecosystem;
