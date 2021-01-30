import React from 'react';
import { Card, Image, Space, Typography } from 'antd';

import Banner from '../static/assets/Mask \Group 3.png';
import Join from '../static/assets/friends.svg';


import PrimaryBtn from '../app-components/primaryBtn';

const { Title } = Typography;

const withFixedElement = (WrappedComponent: any) => {
    const WithFixedElement = () => {
        return (
            <div className="with-fixed-component">
                <div className="fixed-content">
                    <Image id="banner-div" src={Banner} preview={false} />
                    <Card className="join-us">
                        <Space direction="vertical">
                        <Title className="col-green" level={3}>
                            Be part of VikasBandhu family!
                        </Title>
                        <Image src={Join} preview={false} />
                        <PrimaryBtn className="vikas-btn-radius" content="Register" />
                        </Space>
                    </Card>
                </div>
                <WrappedComponent />
            </div>
        );
    };

    return WithFixedElement;
};

export default withFixedElement;
