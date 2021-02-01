import React from 'react';
import { Image, Space, Typography } from 'antd';

import Tractor from '../static/assets/tractor.svg';
import Bulletin from '../static/assets/bulletin.svg';
import Nature from '../static/assets/nature.svg';

const { Text, Title } = Typography;

const Ecosystem = () => {
    return (
        <div id="ecosystem">
            <Image src={Tractor} preview={false} />
            <div className="ecosystem-content">
                <Title className="col-green ecosystem-title" level={2}>At VikasBandhu, we build an ecosystem that would</Title>
                <Image className="bulletin-image" src={Bulletin} preview={false} />
                <Space direction="vertical" className="bulletin-content">
                    <Text className="col-green bulletin-points">Connect buyers and sellers in a simple to use platform.</Text>
                    <Text className="col-green bulletin-points">Provide dynamic information on pricing.</Text>
                    <Text className="col-green bulletin-points">Meet demand and supply.</Text>
                    <Text className="col-green bulletin-points">Facilitate a Door-to-door solution of logistics.</Text>
                    <Text className="col-green bulletin-points">Boost rural economy by providing local employment.</Text>
                </Space>
                <Image className="nature-image" src={Nature} preview={false} />
            </div>
        </div>
    );
};

export default Ecosystem;
