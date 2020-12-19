import React from 'react';
import { Image, Popover } from 'antd';

import Register from '../login-ui/register';
import UserHeader from '../header-profile';
import Logo from '../static/assets/logo.jpg';
import { LOGIN_URL } from '../store/api';
import PrimaryBtn from '../app-components/primaryBtn';
import DefaultBtn from '../app-components/defaultBtn';

import './header.scss';

const UserBasicActions = ({ history, popUpTrigger }: { history: any, popUpTrigger: any }) => {
    const {signUpPopupVisible, setSignUpPopupVisible} = popUpTrigger;

    return (
        <div className="display-flex-row align-center">
            <DefaultBtn
                className="vikas-btn-radius wid150" 
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
                    className="margin-l-r-1em vikas-btn-radius wid150"
                    type="primary"
                    size="large"
                    content="Register"
                />
            </Popover>
        </div>
    );
}
const HeaderActions = ({ history, isLoggedIn, popUpTrigger }: { history: any, isLoggedIn: boolean, popUpTrigger: any }) => {
    return isLoggedIn ? <UserHeader /> : <UserBasicActions history={history} popUpTrigger={popUpTrigger} />
};

const Header = (headerProps: any) => {
    const { history, showActions, isLoggedIn, popUpTrigger } = headerProps;
    return (
        <div className="landing-page-header-bar">
            <Image width={100} height={60} src={Logo} preview={false} />
            {showActions ? <HeaderActions isLoggedIn={isLoggedIn} history={history} popUpTrigger={popUpTrigger} /> : null}
        </div>
    );
};

export default Header;
