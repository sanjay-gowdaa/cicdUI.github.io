import React, { useEffect } from 'react';
import { Button, Image, Typography } from 'antd';

import Logo from '../static/assets/Mask Group 9.png';

const { Title } = Typography;

const Home = () => {

    useEffect(() => {
        document.getElementById("home")?.parentElement?.classList.add("home-page-fixed-element");
    },[]);

    const goToAim = (url: any) => {
        window.location = url;
    }

    return (
        <div id="home">
            <div className="home-content">
                <Image className="logo" height={100} width={100} src={Logo} preview={false} />
                <div className="home-paragraph">
                    <Title className="col-white" level={3}>
                        VikasBandhu -
                    </Title>
                    <Title className="col-white margin-none" level={3}>
                        Friendly E-Market Place for
                    </Title>
                    <Title className="col-white margin-none" level={3}>
                        Buyers and Sellers to connect,
                    </Title>
                    <Title className="col-white margin-none" level={3}>
                        engage and transact seamlessly
                    </Title>
                    <Title className="col-white margin-none" level={3}>
                        for win-win relationships
                    </Title>
                </div>
                <Button className="explore-vb-btn" onClick={() => goToAim("#aim")}>
                    <Title className="col-white margin-none" level={4}>
                        Explore Vikasbandhu
                    </Title>
                </Button>
            </div>
        </div>
    )
}

export default Home;
