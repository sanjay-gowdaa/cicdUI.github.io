import React from 'react';
import { Button, Col, Input, Row, Space, Typography } from 'antd';
import { HomeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { contactUs } from '../constants';

const { Text, Title } = Typography;
const { TextArea } = Input;

const ContactUs = () => {
    const { t } = useTranslation('common');

    return (
        <div id='contactUs'>
            <Title className='col-green contact-us-title' level={2}>
                {t('contact_us_page.title')}
            </Title>
            <Row>
                <Col span={12} className='contact-us-info'>
                    <Space direction='vertical'>
                        <div>
                            <PhoneOutlined className='contact-us-icon' />
                            <Text className='contact-details'>{contactUs.phoneNumber}</Text>
                        </div>
                        <div>
                            <MailOutlined className='contact-us-icon' />
                            <Text className='contact-details'>{contactUs.emailId}</Text>
                        </div>
                        <div>
                            <HomeOutlined className='contact-us-icon' />
                            <address className='contact-details contact-address'>
                                {t('contact_us_page.address1')}
                                <br />{t('contact_us_page.address2')}
                            </address>
                        </div>
                    </Space>
                </Col>
                <Col span={12} className='write-feedback'>
                    <div className='feedback-form'>
                        <Title className='write-feedback-title' level={4}>
                            {t('contact_us_page.contact_form.title')}
                        </Title>
                        <Text>{t('contact_us_page.contact_form.full_name')}</Text>
                        <br /><Input
                            className='custom-input'
                            placeholder='Enter your Full Name'
                            required={true}
                        /><br />
                        <Text>{t('contact_us_page.contact_form.email')}</Text>
                        <br /><Input
                            className='custom-input'
                            placeholder='Enter your email'
                            required={true}
                        /><br />
                        <Text>{t('contact_us_page.contact_form.phone')}</Text>
                        <br /><Input className='custom-input' placeholder='Enter phone number' /><br />
                        <Text>{t('contact_us_page.contact_form.message')}</Text>
                        <br /><TextArea className='custom-input' /><br /><br />
                        <Button className='vikas-btn-radius primary-button' type='primary'>
                            {t('landing_page.actions.submit')}
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ContactUs;
