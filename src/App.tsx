import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Card, Image, Space, Typography } from 'antd';

import Header from './header';
import Footer from './footer';
import { getConfigurations } from './store/registrationReducer/actions';
import LandingPage from './landing-page/index';
import Home from './landing-page/home';
import PrimaryBtn from './app-components/primaryBtn';
import Banner from './static/assets/banner.png';
import Join from './static/assets/friends.svg';

import './App.scss';
import 'antd/dist/antd.css';

const { Title } = Typography;

const App = (props: any) => {
    const { history } = props;
    const dispatch = useDispatch();
    const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);

    useEffect(() => {
        dispatch(getConfigurations());
    }, []);

    return (
        <div className="app-container">
            <Header history={history} showActions={true} popUpTrigger={{setSignUpPopupVisible, signUpPopupVisible}} />
            <div className="main-content">
                <Home />
                <div className="fixed-landing-page-banner">
                    <Image src={Banner} preview={false} />
                </div>
                <div className="fixed-card-join">
                    <Card className="join-us">
                        <Space direction="vertical">
                        <Title className="col-green fixed-title" level={3}>
                            Be part of VikasBandhu family!
                        </Title>
                        <Image src={Join} preview={false} />
                        <PrimaryBtn className="vikas-btn-radius" content="Register" />
                        </Space>
                    </Card>
                </div>
                <LandingPage />
            </div>
            <Footer />
        </div>
    );
};

export default App;