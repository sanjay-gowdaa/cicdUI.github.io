import React from 'react'
import { Row, Col, Form, Input, Button, Divider } from 'antd';
import Header from '../header'
import './registration.scss'

const singleLabelFieldLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { span: 12 },
  };

const Buyer = (props: any) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

      
    return (
        <React.Fragment>
        <Header />
        <div className='entity-details-container'>
            
            <h1>Profile Verification</h1>
            <Divider />
            <Form
                {...singleLabelFieldLayout}
                name="basic"
                initialValues={{name: 'Naresh Gowda', number: '9876543210'}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            label="Name"
                            name="name"
                        >
                            <Input bordered={false} disabled={true} />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            label="Phone Number"
                            name="number"
                        >
                            <Input bordered={false} disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} justify="space-around">
                    <Col span={10}>
                        <Form.Item
                            label="OTP"
                            name="otp"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            label="Upload ID Card"
                            name="id_card"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirm_password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <h2>Location Information</h2>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            label="Address"
                            name="address_1"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="District"
                            name="district"
                            rules={[{ message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            label="Pin Code"
                            name="pin_code"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Taluk"
                            name="taluk"
                            rules={[{ message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col span={12}>                
                        <Form.Item {...tailLayout}>
                        <Button className='width-full' type="primary" htmlType="submit">
                        Submit
                        </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
      </div>
      </React.Fragment>
    )
}

export default Buyer;