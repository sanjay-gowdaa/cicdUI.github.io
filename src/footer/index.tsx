import React from 'react';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

import './footer.scss';

import footerImg from '../static/assets/footer.png';
import { contactUs } from '../constants';

const Footer = () => {
    return (
        <div className="app-footer-container">
            <div className="height-full">
                <p>
                    <MailOutlined /> {contactUs.emailId}
                </p>
                <p className="phone">
                    <PhoneOutlined /> {contactUs.phoneNumber}
                </p>
            </div>
            <div className="applied-for">
                <p>
                    {' '}
                    <span>&#169;</span> Vikasbandhu (TM) 2020{' '}
                </p>
            </div>
            <div>
                <p className='powered-by-text'>Powered by</p>
                <img className="image" src={footerImg} alt="footer" />
            </div>
        </div>
    );
};

export default Footer;
