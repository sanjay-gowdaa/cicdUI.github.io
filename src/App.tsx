import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Col, Image, Row, Space, Typography } from 'antd';
import 'antd/dist/antd.css';
import { useTranslation } from 'react-i18next';
import Amplify from 'aws-amplify';
import { ArrowRightOutlined } from '@ant-design/icons';

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
import VB_Logo from './static/assets/vbLogo.png';
import DefaultBtn from './app-components/defaultBtn';

const { Title } = Typography;

const USER_POOL_ID = process.env.REACT_APP_USER_POOL_ID;
const CLIENT_ID = process.env.REACT_APP_COGNITO_CLIENT_ID;

Amplify.configure({
    Auth: {
        region: 'ap-south-1',
        userPoolId: USER_POOL_ID,
        userPoolWebClientId: CLIENT_ID
    }
});

const App = (props: any) => {
    const { history } = props;
    const dispatch = useDispatch();
    const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);
    const [openMobileRegModel, setMobileRegModal] = useState(false);
    const { t } = useTranslation('common');
    const customStyles = isEnglish(t('language')) ? englishStyling : kannadaStyling;
    const banner = isEnglish(t('language')) ? Banner : KannadaBanner;
    const [showLandingPage, setLandingPage] = useState(false);
    const [showLogin, setLogin] = useState(false);

    useEffect(() => {
        dispatch(getConfigurations());
        document.title = `${t('title')}`;
    }, []);

    const onRegisterClick = () => {
        if (window.screen.width < 767) {
            setMobileRegModal(!openMobileRegModel);
        } else {
            setSignUpPopupVisible(!signUpPopupVisible);
        }
    };

    return (
        <div className='app-container'>
            {showLandingPage &&
                <Header
                    history={history}
                    showActions={true}
                    popUpTrigger={{ setSignUpPopupVisible, signUpPopupVisible }}
                />
            }
            {!showLandingPage &&
                <div className='new-landing-page'>
                    <Image
                        src={VB_Logo}
                        preview={false}
                        className='new-landing-page-logo'
                    />
                    <Title level={1} className='landing-title'>
                        Welcome to <strong>VikasBandhu</strong>
                    </Title>
                    <div className='new-landing-page-button'>
                        <DefaultBtn
                            className='vikas-btn-radius wid150 custom-login-button'
                            content='Login'
                            onClick={() => setLogin(true)}
                            size='large'
                        />
                        <PrimaryBtn
                            id='header-register-button'
                            className='margin-l-r-1em vikas-btn-radius wid150 custom-register-button'
                            type='primary'
                            size='large'
                            onClick={() => setSignUpPopupVisible(!signUpPopupVisible)}
                            content='Register'
                        />
                    </div>
                    <div className='landing-footer'>
                        <Title level={1} className='footer-text'>
                            A friendly digital E-market place for agricultural produce
                        </Title>
                        <Button
                            type='primary'
                            style={{
                                height: 'fit-content',
                                backgroundColor: '#F5A31A',
                                borderColor: '#F5A31A',
                                marginTop: '2vh'
                            }}
                            onClick={() => setLandingPage(true)}
                        >
                            <Title level={3} className='footer-button-text'>
                                Explore Vikasbandhu <ArrowRightOutlined />
                            </Title>
                        </Button>
                    </div>
                </div>
            }
            {showLandingPage &&
                <React.Fragment>
                    <div className='main-content'>
                        <Home />
                        <Row>
                            <Col span={4} className='mobile-display-none'>
                                <div className='fixed-landing-page-banner'>
                                    <Image src={banner} preview={false} />
                                </div>
                            </Col>
                            <Col span={16}>
                                <LandingPage />
                            </Col>
                            <Col span={4}>
                                <div className='fixed-card-join'>
                                    <Card className='join-us'>
                                        <Space direction='vertical'>
                                            <Title className={`col-green ${customStyles.fixedTitle}`} level={3}>
                                                {t('home_page.landing_page_card_title')}
                                            </Title>
                                            <Image className='join-image' src={Join} preview={false} />
                                            <PrimaryBtn
                                                onClick={onRegisterClick}
                                                className='vikas-btn-radius join-us-reg'
                                                content={t('landing_page.actions.register')}
                                            />
                                        </Space>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Footer />
                </React.Fragment>
            }
            <MobileRegisterModal showModal={openMobileRegModel} setModal={setMobileRegModal} />
        </div>
    );
};

export default App;
