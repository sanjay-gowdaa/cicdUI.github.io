import React from 'react';
import { Button, Col, Input, Row, Space, Typography, Form } from 'antd';
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

import { contactUs } from '../constants';
import { LandingDivider } from '../app-components/landingDivider';

const { Text, Title } = Typography;
const { TextArea } = Input;

const ContactUs = () => {
    const { t } = useTranslation('common');

    const validatePhone = (_rule: any, value: any) => {
        const regExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

        if (!value) {
            return Promise.reject(`please enter your Phone number!`);
        } else if (!regExp.test(value)) {
            return Promise.reject(`please enter a valid number`);
        } else {
            return Promise.resolve();
        }
    };
    const [form] = Form.useForm();

    function onFinish(values: any) {
        emailjs.sendForm('service_l82pyum', 'template_us5cewg', '#miform', 'user_YM5RXaCp7C9RE9C5Dki87')
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        form.resetFields();
    };

    return (
        <div id='contactUs'>
            <Title className='contact-us-title'>
                {t('contact_us_page.title')}
            </Title>
            <div className='contactWrapper'>
                <Row>
                    <Col span={12} xs={24} md={12} className='contact-us-info'>
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
                                <EnvironmentOutlined className='contact-us-icon' />
                                <address className='contact-details contact-address'>
                                    {t('contact_us_page.address1')}
                                    <br />{t('contact_us_page.address2')}
                                </address>
                            </div>
                            <div className="mapouter">
                                <div className="gmap_canvas">
                                    <iframe className="gmap_iframe" width="100%" frameBorder="0" scrolling="no" src="https://maps.google.com/maps?width=387&amp;height=179&amp;hl=en&amp;q=617, samparkbindhu pvt.ltd bangalore&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                                    </iframe>
                                    <a href="https://kokagames.com/">FNF</a>
                                </div>
                            </div>
                        </Space>
                    </Col>
                    <Col span={10} xs={24} md={10} className='write-feedback'>
                        <div className='feedback-form'>
                            <Title className='write-feedback-title' level={4}>
                                {t('contact_us_page.contact_form.title')}
                            </Title>
                            <Form labelCol={{ span: 24 }} form={form} id="miform" onFinish={onFinish}>
                                <Form.Item name='fullName'
                                    label={<Text>{t('contact_us_page.contact_form.full_name')}</Text>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter a valid name',
                                        }, {
                                            min: 3,
                                        },
                                    ]}>
                                    <Input name='fullName'
                                        placeholder='Enter your Full Name' />
                                </Form.Item>
                                <Form.Item
                                    name='email'
                                    label={<Text>{t('contact_us_page.contact_form.email')}</Text>}
                                    rules={[
                                        { required: true },
                                        { type: 'email'},
                                    ]}
                                >
                                    <Input name='email'placeholder="Enter your email" />
                                </Form.Item>
                                <Form.Item
                                    name='phone'
                                    label={<Text>{t('contact_us_page.contact_form.phone')}</Text>}
                                    rules={[{
                                        required: true,
                                        validator: (_rule, value) => validatePhone(_rule, value)
                                    }, { min: 10 }]}
                                >
                                    <Input name='phone' placeholder='Enter phone number' />
                                </Form.Item>
                                <Form.Item name='message' label={<Text>{t('contact_us_page.contact_form.message')}</Text>}>
                                    <TextArea name='message' />
                                </Form.Item>
                                <Form.Item>
                                    <Button block htmlType="submit">
                                        {t('landing_page.actions.submit')}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
            <LandingDivider className='pageDivider' />
        </div>
    );
};

export default ContactUs;
