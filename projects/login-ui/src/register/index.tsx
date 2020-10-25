import React, {useState} from 'react';
import { Form, Input, Button, Checkbox, Menu } from 'antd';
import {routesMap} from '../constants'

const {register_buyer, register_seller, register_entity} = routesMap;
const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { span: 24 },
  };


const Register = ({history}: {history: any}) => {
    const [currentType, setCurrentType] = useState('buyer')
  
    const onFinish = (values: any) => {
    console.log('Success:', values);
    history.push(`register/${currentType}`)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  const handleClick = (e: any) => {
      setCurrentType(e.key)
      };

  return (
    <React.Fragment>
        <Menu onClick={handleClick} selectedKeys={[currentType]} mode="horizontal">
            <Menu.Item key="buyer"> Buyer </Menu.Item>
            <Menu.Item key="seller"> Seller </Menu.Item>
        </Menu>
        <Form
            {...layout}
            name="basic"
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="Name"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: 'Please input your Phone number!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>
                    I have read and accept to 
                    <a className='terms-and-conditions' href='https://www.google.com/' target='_blank'>
                        terms and conditions
                    </a>
                </Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button className='width-full' type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
    </React.Fragment>
  );
};


export default Register;