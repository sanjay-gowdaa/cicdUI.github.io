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
import KannadaBanner from './static/assets/banner_Kannada.png';

import Join from './static/assets/friends.svg';

import './App.scss';
import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';
import { title } from 'process';

const { Title } = Typography;

const App = (props: any) => {
    const { history } = props;
    const dispatch = useDispatch();
    const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);
    const [t, i18n] = useTranslation('common');
    const banner = t("language") == "en" ? Banner : KannadaBanner ;
    // const eng_title ="Vikasabandhu";
    // const kan_title = "ವಿಕಾಸ ಬಂಧು"
    // const tab_title = t("title")== "title_en" ? eng_title :kan_title;
   
    useEffect(() => {
        dispatch(getConfigurations());
        document.title = `${t('title')}`
    }, []);
   
    return (
        <div className="app-container">
            <Header history={history} showActions={true} popUpTrigger={{setSignUpPopupVisible, signUpPopupVisible}} />
            <div className="main-content">
                <Home />
                <div className="fixed-landing-page-banner">
                    <Image src={banner} preview={false} />
                </div>
                <div className="fixed-card-join">
                    <Card className="join-us">
                        <Space direction="vertical">
                        <Title className={`col-green ${t('styles.fixed-title')}`} level={3}>
                            {t('home_page.landing_page_card_title')}
                        </Title>
                        <Image src={Join} preview={false} />
                        <PrimaryBtn
                            onClick={() => setSignUpPopupVisible(!signUpPopupVisible)}
                            className="vikas-btn-radius join-us-reg"
                            content={t('landing_page.actions.register')}
                        />
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
