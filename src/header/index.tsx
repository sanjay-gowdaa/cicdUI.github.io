import React, { useState } from 'react';
import Register from '../login-ui/register';
import UserHeader from '../header-profile';
import { Popover, Button, Image } from 'antd';
import Logo from '../static/assets/logo.jpg';
import './header.scss';

const UserBasicActions = ({ history}: { history: any }) => {
    const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);

    return (
        <div className="display-flex-row align-center">
            <Button 
                onClick={() => window.location.href = 'https://vbui.auth.ap-south-1.amazoncognito.com/login?client_id=7sckhhjs2aq1noqd1fvjdeo69j&response_type=code&redirect_uri=https://localhost:3000/'} 
                className="vikas-btn-radius wid150" 
                size="large"
            >
                Login
            </Button>
            <Popover
                content={<Register history={history} setSignUpPopupVisible={setSignUpPopupVisible} />}
                title={null}
                trigger="click"
                color='#F2F2F2'
                overlayClassName='register-popup-container'
                visible={signUpPopupVisible}
                onVisibleChange={() => setSignUpPopupVisible(!signUpPopupVisible)}
            >
                <Button
                    className="margin-l-r-1em vikas-btn-radius wid150 col-backgroud-green"
                    type="primary"
                    size="large"
                >
                    Register
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
