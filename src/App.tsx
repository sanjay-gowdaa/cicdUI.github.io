import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Card, Col, Image, Row, Space, Typography } from 'antd';
import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';

import Header from './header';
import Footer from './footer';
import { getConfigurations } from './store/registrationReducer/actions';
import MobileRegisterModal from './app-components/mobileRegisterModal';
import LandingPage from './landing-page/index';
import Home from './landing-page/home';
import PrimaryBtn from './app-components/primaryBtn';
import Banner from './static/assets/banner.png';
import KannadaBanner from './static/assets/banner_Kannada.png';
import Join from './static/assets/friends.svg';
import './App.scss';

import { englishStyling, isEnglish, kannadaStyling } from './static/translations/constants';

const { Title } = Typography;

const App = (props: any) => {
    const { history } = props;
    const dispatch = useDispatch();
    const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);
    const [openMobileRegModel, setMobileRegModal] = useState(false);
    const [t, i18n] = useTranslation('common');
    const customStyles = isEnglish(t("language")) ? englishStyling : kannadaStyling;
    const banner = isEnglish(t("language")) ? Banner : KannadaBanner ;

    useEffect(() => {
        dispatch(getConfigurations());
        document.title = `${t('title')}`;
    }, []);

    const onRegisterClick = () => {
        if(window.screen.width < 767) {
            setMobileRegModal(!openMobileRegModel);
        }else {
            setSignUpPopupVisible(!signUpPopupVisible);
        }
    };

    return (
        <div className="app-container">
            <Header
                history={history}
                showActions={true}
                popUpTrigger={{setSignUpPopupVisible, signUpPopupVisible}}
            />
            <div className="main-content">
                <Home />
                <Row>
                    <Col span={4} className="mobile-display-none">
                        <div className="fixed-landing-page-banner">
                            <Image src={banner} preview={false} />
                        </div>
                    </Col>
                    <Col span={16}>
                        <LandingPage />
                    </Col>
                    <Col span={4}>
                        <div className="fixed-card-join">
                            <Card className="join-us">
                                <Space direction="vertical">
                                <Title className={`col-green ${customStyles.fixedTitle}`} level={3}>
                                    {t('home_page.landing_page_card_title')}
                                </Title>
                                <Image className="join-image" src={Join} preview={false} />
                                <PrimaryBtn
                                    onClick={onRegisterClick}
                                    className="vikas-btn-radius join-us-reg"
                                    content={t('landing_page.actions.register')}
                                />
                                </Space>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
            <Footer />
            <MobileRegisterModal visible={openMobileRegModel} setVisible={setMobileRegModal} />
        </div>
    );
};

export default App;
