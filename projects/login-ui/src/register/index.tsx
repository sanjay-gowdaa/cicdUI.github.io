import React, {useState} from 'react';
import { Form, Input, Button, Checkbox, Menu } from 'antd';
import {routesMap} from '../constants'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { updateBasicRegistrationData, updateEntityType } from '../store/registrationReducer/actions';

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
    const dispatch = useDispatch();
    // const registrationState = useSelector((state: RootState) => state.registration);
    
    const onFinish = (values: any) => {
        console.log('Success:', values);
        const {username, phone} = values
        dispatch(updateEntityType(currentType))
        dispatch(updateBasicRegistrationData({username, phone}))
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