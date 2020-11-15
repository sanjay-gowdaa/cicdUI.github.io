import React, { useState } from 'react';
import Login from '../login-ui/login';
import Register from '../login-ui/register';
import UserHeader from '../header-profile';
import { Popover, Button, Image } from 'antd';
import Logo from '../static/assets/logo.jpg';
import './header.scss';

const UserBasicActions = ({ history}: { history: any }) => {
    const [loginPopupVisible, setLoginPopupVisible] = useState(false);
    const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);
    return (
        <div className="display-flex-row align-center">
            <Popover
                content={<Register history={history} />}
                title={<h2>Register</h2>}
                trigger="click"
                visible={signUpPopupVisible}
                onVisibleChange={() => setSignUpPopupVisible(!signUpPopupVisible)}
            >
                <Button
                    className="margin-l-r-1em vikas-btn-radius wid150"
                    type="primary"
                    size="large"
                >
                    Register
                </Button>
            </Popover>
            <Popover
                content={<Login history={history} />}
                title={<h2>Login</h2>}
                trigger="click"
                visible={loginPopupVisible}
                onVisibleChange={() => setLoginPopupVisible(!loginPopupVisible)}
            >
                <Button className="vikas-btn-radius wid150" size="large">
                    Login
                </Button>
            </Popover>
        </div>
    );
}
const HeaderActions = ({ history, isLoggedIn }: { history: any, isLoggedIn: boolean }) => {
    return isLoggedIn ? <UserHeader /> : <UserBasicActions history={history} />
};

const Header = (headerProps: any) => {
    const { history, showActions, isLoggedIn } = headerProps;
    return (
        <div className="landing-page-header-bar">
            <Image width={100} height={60} src={Logo} preview={false} />
            {showActions ? <HeaderActions isLoggedIn={isLoggedIn} history={history} /> : null}
        </div>
    );
};

export default Header;
