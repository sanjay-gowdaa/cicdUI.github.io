import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Typography } from 'antd';
import 'antd/dist/antd.css';
import {useTranslation } from 'react-i18next';
import Amplify from 'aws-amplify';
import { History } from 'history';

import Header from './header';
import Footer from './footer';
import { getConfigurations } from './store/registrationReducer/actions';
import MobileRegisterModal from './app-components/mobileRegisterModal';
import LandingPage from './landing-page/index';
import Home from './landing-page/home';

import './App.scss';


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

    useEffect(() => {
        dispatch(getConfigurations());
        document.title = `${t('title')}`;
    }, []);

    return (
        <div>
            <Header
                history={history}
                showActions={true}
                popUpTrigger={{ setSignUpPopupVisible, signUpPopupVisible }}
            />
            <React.Fragment>
                <div className='main-content'>
                    <Home history={history} popUpTrigger setSignUpPopupVisible={setSignUpPopupVisible} />
                    <LandingPage />
                </div>
                <Footer />
            </React.Fragment>
            <MobileRegisterModal
                showModal={openMobileRegModel}
                setModal={setMobileRegModal} />
        </div>);
}; export default App;
