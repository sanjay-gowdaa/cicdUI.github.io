import React from 'react';
import { Button, Image, Typography } from 'antd';

import Logo from '../static/assets/vbLogo.png';

const { Title } = Typography;

const Home = () => {

    const goToAim = (url: any) => {
        window.location = url;
    }

    return (
        <div id="home">
            <div className="home-content-wrapper">
            <div className="home-content">
                <Image className="logo" height={100} width={100} src={Logo} preview={false} />
                <div className="home-paragraph">
                    <Title className="col-white" level={4}>
                        VikasBandhu -
                    </Title>
                    <Title className="col-white margin-none" level={5}>
                        Friendly E-Market Place for
                    </Title>
                    <Title className="col-white margin-none" level={5}>
                        Buyers and Sellers to connect,
                    </Title>
                    <Title className="col-white margin-none" level={5}>
                        engage and transact seamlessly
                    </Title>
                    <Title className="col-white margin-none" level={5}>
                        for win-win relationships
                    </Title>
                </div>
                <Button className="explore-vb-btn" onClick={() => goToAim("#aim")}>
                    <Title className="col-white margin-none" level={5}>
                        Explore Vikasbandhu
                    </Title>
                </Button>
            </div>
            </div>
        </div>
    );
};

export default Home;
