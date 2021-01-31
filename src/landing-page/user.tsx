import React from 'react';
import { Card, Image, Typography } from 'antd';

import SellerIcon from '../static/assets/man.svg';
import BuyerIcon from '../static/assets/teacher.svg';
import Transport from '../static/assets/transport.svg';

const { Paragraph, Text, Title } = Typography;

const User = () => {
    return (
        <div id="users">
            <Title className="col-green user-title" level={2}>VikasBandhu for</Title>
            <Card className="user-card">
                <Title className="col-green" level={2}>Sellers</Title>
                <Text>Atmanirbar Farmers towards Atmanirbhar Bharat</Text>
                <Image width={125} height={125} src={SellerIcon} preview={false} />
                <Paragraph>
                The farmer and farmer-self help groups are the centre of our
                    efforts. We help to connect sellers to buyers directly. We 
                    aim to provide Logistics and better price for their produce 
                    at their doorstep.
                </Paragraph>
            </Card>
            <Card className="user-card">
                <Title className="col-green" level={2}>Buyers</Title>
                <Text>Buyer Community -Optimize and enable a direct connect</Text>
                <Image width={125} height={125} src={BuyerIcon} preview={false} />
                <Paragraph>
                    VikasBandhu attempts to identify the right quantity 
                    source, taking care of the logistics, minimizing on 
                    overheads with customized packing where requested.             
                </Paragraph>
            </Card>
            <Image className="transport-image" src={Transport} preview={false} />
        </div>
    );
};

export default User;
