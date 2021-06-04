import React from 'react';
import { Button, Col, Input, Row, Space, Typography } from 'antd';
import { HomeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

import { contactUs } from '../constants';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;
const { TextArea } = Input;

const ContactUs = () => {
    const [t,i18n] = useTranslation('common')
    return (
        <div id="contactUs">
            <Title className="col-green contact-us-title" level={2}>{t('contact_us_page.title')}</Title>
            <Row>
                <Col span={9} className="contact-us-info">
                    <Space direction="vertical">
                        <Text><PhoneOutlined className="contact-us-icon" />{contactUs.phoneNumber}</Text>
                        <Text><MailOutlined className="contact-us-icon" />{contactUs.emailId}</Text>
                        <address><HomeOutlined className="contact-us-icon" />{t('contact_us_page.address1')} 
                        <br/>{t('contact_us_page.address2')}</address>
                    </Space>
                </Col>
                <Col span={9} className="write-feedback">
                    <Space direction="vertical">
                    <div className="feedback-form">
                        <Title className="write-feedback-title" level={4}>{t('contact_us_page.contact_form.title')}</Title>
                        <Text>{t('contact_us_page.contact_form.full_name')}</Text>
                        <Input
                            className="custom-input"
                            placeholder="Enter your Full Name"
                            required={true}
                        /><br/>
                        <Text>{t('contact_us_page.contact_form.email')}</Text>
                        <Input
                            className="custom-input"
                            placeholder="Enter your email"
                            required={true}
                        />
                        <Text>{t('contact_us_page.contact_form.phone')}</Text>
                        <Input className="custom-input" placeholder="Enter phone number" /><br/>
                        <Text>{t('contact_us_page.contact_form.message')}</Text>
                        <TextArea className="custom-input" /><br/><br/>
                        <Button className="vikas-btn-radius primary-button" type="primary">{t('landing_page.actions.submit')}</Button>
                    </div>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default ContactUs;
