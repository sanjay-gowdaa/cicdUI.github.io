import React, { useState, useEffect } from 'react';
import Login from '../login-ui/login';
import Register from '../login-ui/register';
import UserHeader from '../header-profile';
import { Popover, Button, Image } from 'antd';
import { useDispatch } from 'react-redux';
import Logo from '../static/assets/logo.jpg';
import './header.scss';
import { getConfigurations } from '../store/registrationReducer/actions';

const UserBasicActions = ({ history}: { history: any }) => {
    const [loginPopupVisible, setLoginPopupVisible] = useState(false);
    const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getConfigurations())
    }, [])
    return (
        <div className="display-flex-row align-center">
            <Popover
                content={<Register history={history} setSignUpPopupVisible={setSignUpPopupVisible} />}
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
