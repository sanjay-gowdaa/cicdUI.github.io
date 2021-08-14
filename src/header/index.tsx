import React from 'react';
import { Breadcrumb, Image, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import './header.scss';
import MobileDrawer from './mobileDrawer';

import Register from '../login-ui/register';
import UserHeader from '../header-profile';
import Logo from '../static/assets/vbLogo.png';
import KannadaLogo from '../static/assets/kannadaLogo.png';
import { LOGIN_URL } from '../store/api';
import PrimaryBtn from '../app-components/primaryBtn';
import DefaultBtn from '../app-components/defaultBtn';
import { isEnglish } from '../static/translations/constants';

const UserBasicActions = ({ history, popUpTrigger }: { history: any, popUpTrigger: any }) => {
    const {signUpPopupVisible, setSignUpPopupVisible} = popUpTrigger;
    const { t } = useTranslation('common');

    return (
        <div className="display-flex-row align-center action-buttons">
            <DefaultBtn
                className="vikas-btn-radius wid150 custom-login-button" 
                content={t('landing_page.actions.login')}
                onClick={() => window.location.href = LOGIN_URL} 
                size="large"
            />
            <PrimaryBtn
                id="header-register-button"
                className="margin-l-r-1em vikas-btn-radius wid150 custom-register-button"
                type="primary"
                size="large"
                onClick={() => setSignUpPopupVisible(!signUpPopupVisible)}
                content={t('landing_page.actions.register')}
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
        </div>
    );
};

const HeaderActions = ({ history, isLoggedIn, popUpTrigger }: { history: any, isLoggedIn: boolean, popUpTrigger: any }) => {
    return isLoggedIn ? <UserHeader history={history} /> : <UserBasicActions history={history} popUpTrigger={popUpTrigger} />
};

const Header = (headerProps: any) => {
    const { t } = useTranslation('common');
    const { history, showActions, isLoggedIn, popUpTrigger } = headerProps;
    const logo = isEnglish(t("language")) ? Logo : KannadaLogo;

    return (
        <div className="landing-page-header-bar">
            <Image className="logo" src={logo} preview={false} />
            <Breadcrumb className="header-breadcrumb" separator=" ">
                <Breadcrumb.Item href="#home">{t('landing_page.header.breadcrumb.home')}</Breadcrumb.Item>
                <Breadcrumb.Item href="#aim">{t('landing_page.header.breadcrumb.aim')}</Breadcrumb.Item>
                <Breadcrumb.Item href="#ecosystem">{t('landing_page.header.breadcrumb.ecosystem')}</Breadcrumb.Item>
                <Breadcrumb.Item href="#commodities">{t('landing_page.header.breadcrumb.commodities')}</Breadcrumb.Item>
                <Breadcrumb.Item href="#users">{t('landing_page.header.breadcrumb.users')}</Breadcrumb.Item>
                <Breadcrumb.Item href="#aboutUs">{t('landing_page.header.breadcrumb.about_us')}</Breadcrumb.Item>
                <Breadcrumb.Item href="#team">{t('landing_page.header.breadcrumb.team')}</Breadcrumb.Item>
                <Breadcrumb.Item href="#legal">{t('landing_page.header.breadcrumb.legal')}</Breadcrumb.Item>
                <Breadcrumb.Item href="#contactUs">{t('landing_page.header.breadcrumb.contact_us')}</Breadcrumb.Item>
            </Breadcrumb>
            <MobileDrawer />
            {showActions ? <HeaderActions isLoggedIn={isLoggedIn} history={history} popUpTrigger={popUpTrigger} /> : null}
        </div>
    );
};

export default Header;
