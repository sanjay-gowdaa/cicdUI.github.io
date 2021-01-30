import React from 'react';
import { Button, Col, Input, Row, Space, Typography } from 'antd';
import { HomeOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;
const { TextArea } = Input;

const ContactUs = () => {
    return (
        <div id="contactUs">
            <Title className="col-green contact-us-title" level={2}>Contact Us</Title>
            <Row>
                <Col span={8} className="contact-us-info">
                    <Space direction="vertical">
                        <Text><PhoneOutlined className="contact-us-icon" />Phone Number</Text>
                        <Text><MailOutlined className="contact-us-icon" />contactus@samparkbindhu.in</Text>
                        <address><HomeOutlined className="contact-us-icon" />617, "Shivam", Royal Park Residency, 
                        <br/>J P Nagar 9th Phase, Bengaluru-560062</address>
                    </Space>
                </Col>
                <Col span={8} className="write-feedback">
                    <Space direction="vertical">
                    <div className="feedback-form">
                        <Title className="write-feedback-title" level={4}>We would like to hear from you!</Title>
                        <Text>Full Name</Text>
                        <Input
                            placeholder="Enter your Full Name"
                            required={true}
                        /><br/>
                        <Text>Email</Text>
                        <Input
                            placeholder="Enter your email"
                            required={true}
                        />
                        <Text>Phone</Text>
                        <Input placeholder="Enter phone number" /><br/>
                        <Text>Message</Text>
                        <TextArea /><br/><br/>
                        <Button className="vikas-btn-radius primary-button" type="primary">Submit</Button>
                    </div>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default ContactUs;
