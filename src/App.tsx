import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Image, Modal, Typography } from 'antd';
import 'antd/dist/antd.css';
import { Trans, useTranslation } from 'react-i18next';
import Amplify from 'aws-amplify';
import { ArrowRightOutlined } from '@ant-design/icons';
import { History } from 'history';

import Header from './header';
import Footer from './footer';
import { getConfigurations } from './store/registrationReducer/actions';
import MobileRegisterModal from './app-components/mobileRegisterModal';
import LandingPage from './landing-page/index';
import Home from './landing-page/home';
import PrimaryBtn from './app-components/primaryBtn';

import './App.scss';
import VB_Logo from './static/assets/vbLogo.png';
import DefaultBtn from './app-components/defaultBtn';
import LoginPopup from './login-ui/login-popup';
import Register from './login-ui/register';

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

const App = (props: { history: History }) => {
    const { history } = props;
    const dispatch = useDispatch();
    const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);
    const [openMobileRegModel, setMobileRegModal] = useState(false);
    const { t } = useTranslation('common');
    const [showLandingPage, setLandingPage] = useState(false);
    const [showLogin, setLogin] = useState(false);

    useEffect(() => {
        dispatch(getConfigurations());
        document.title = `${t('title')}`;
    }, []);

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
                        <Trans
                            i18nKey='landing_page.welcomeText'
                            components={{ italic: <i />, bold: <strong /> }}
                        />
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
                        <Modal
                            title={null}
                            visible={signUpPopupVisible}
                            footer={null}
                            maskClosable={false}
                            className='custom-register-modal'
                            onCancel={() => setSignUpPopupVisible(!signUpPopupVisible)}
                            centered
                            wrapClassName='register-popup-container'
                        >
                            <Register history={history} setSignUpPopupVisible={setSignUpPopupVisible} />
                        </Modal>
                        <Modal
                            title={null}
                            visible={showLogin}
                            footer={null}
                            width={'30%'}
                            maskClosable={false}
                            className='custom-login-modal'
                            onCancel={() => setLogin(!showLogin)}
                            centered
                            wrapClassName='login-popup-container'
                        >
                            <LoginPopup history={history} />
                        </Modal>
                    </div>
                    <div className='landing-footer'>
                        <Title level={1} className='footer-text'>
                            {t('landing_page.footerText')}
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
                                {t('landing_page.actions.explore')} <ArrowRightOutlined />
                            </Title>
                        </Button>
                    </div>
                </div>
            }
            {showLandingPage &&
                <React.Fragment>
                    <div className='main-content'>
                        <Home history={history} popUpTrigger setSignUpPopupVisible={setSignUpPopupVisible} /><LandingPage /></div><Footer /></React.Fragment>}<MobileRegisterModal showModal={openMobileRegModel} setModal={setMobileRegModal} /></div>);
}; export default App;
