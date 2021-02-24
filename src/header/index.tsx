import React from 'react';
import { Breadcrumb, Image, Popover } from 'antd';

import Register from '../login-ui/register';
import UserHeader from '../header-profile';
import Logo from '../static/assets/logo.jpg';
import { LOGIN_URL } from '../store/api';
import PrimaryBtn from '../app-components/primaryBtn';
import DefaultBtn from '../app-components/defaultBtn';

import './header.scss';

const UserBasicActions = ({ history, popUpTrigger }: { history: any, popUpTrigger: any }) => {
    const {signUpPopupVisible, setSignUpPopupVisible} = popUpTrigger;

    const goToHome = (url: any) => {
        window.location = url;
    };

    return (
        <div className="display-flex-row align-center">
            <DefaultBtn
                className="vikas-btn-radius wid150 custom-login-button" 
                content="Login"
                onClick={() => window.location.href = LOGIN_URL} 
                size="large"
            />
            <Popover
                content={<Register history={history} setSignUpPopupVisible={setSignUpPopupVisible} />}
                title={null}
                trigger="click"
                color='#F2F2F2'
                overlayClassName='register-popup-container'
                visible={signUpPopupVisible}
                onVisibleChange={() => setSignUpPopupVisible(!signUpPopupVisible)}
            >
                <PrimaryBtn
                    id="header-register-button"
                    className="margin-l-r-1em vikas-btn-radius wid150 custom-register-button"
                    type="primary"
                    size="large"
                    onClick={() => goToHome("#home")}
                    content="Register"
                />
            </Popover>
        </div>
    );
};

const HeaderActions = ({ history, isLoggedIn, popUpTrigger }: { history: any, isLoggedIn: boolean, popUpTrigger: any }) => {
    return isLoggedIn ? <UserHeader /> : <UserBasicActions history={history} popUpTrigger={popUpTrigger} />
};

const Header = (headerProps: any) => {
    const { history, showActions, isLoggedIn, popUpTrigger } = headerProps;
    return (
        <div className="landing-page-header-bar">
            <Image width={"6vw"} height={"11vh"} src={Logo} preview={false} />
            <Breadcrumb className="header-breadcrumb" separator=" ">
                <Breadcrumb.Item href="#home">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="#aim">Aim</Breadcrumb.Item>
                <Breadcrumb.Item href="#ecosystem">EcoSystem</Breadcrumb.Item>
                <Breadcrumb.Item href="#commodities">Commodities</Breadcrumb.Item>
                <Breadcrumb.Item href="#users">Users</Breadcrumb.Item>
                <Breadcrumb.Item href="#aboutUs">About Us</Breadcrumb.Item>
                <Breadcrumb.Item href="#legal">Legal</Breadcrumb.Item>
                <Breadcrumb.Item href="#contactUs">Contact Us</Breadcrumb.Item>
            </Breadcrumb>
            {showActions ? <HeaderActions isLoggedIn={isLoggedIn} history={history} popUpTrigger={popUpTrigger} /> : null}
        </div>
    );
};

export default Header;
