import React from 'react';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

import footerImg from '../static/assets/footer.png';
import './footer.scss';
import { contactUs } from '../constants';
import { useTranslation } from 'react-i18next';


const Footer = () => {
    const [t, i18n] = useTranslation('common');
    return (
        <div className="app-footer-container display-flex-row justify-content-space-bet align-center">
            <div className="height-full">
                <p>
                    <MailOutlined /> {contactUs.emailId}
                </p>
                <p>
                    <PhoneOutlined /> {contactUs.phoneNumber}
                    
                </p>
            </div>
            <div>
                <p>
                    {' '}
                    <span>&#169;</span> (Applied For) Vikasbandhu 2020{' '}
                </p>
            </div>
            <div>
                <p className='powered-by-text margin-unset'>Powered by</p>
                <img src={footerImg} width="100%" height="90%" />
            </div>
        </div>
    );
};

export default Footer;
