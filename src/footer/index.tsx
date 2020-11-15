import React from 'react';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import footerImg from '../static/assets/footer.png';
import './footer.scss';

const Footer = () => {
    return (
        <div className="app-footer-container display-flex-row justify-content-space-bet align-center">
            <div className="height-full">
                <p>
                    <MailOutlined /> support@vikasbandhu.com
                </p>
                <p>
                    <PhoneOutlined /> +91-9000090000
                </p>
            </div>
            <div>
                <p>
                    {' '}
                    <span>&#169;</span> (Pending) Vikasbandhu 2020{' '}
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
