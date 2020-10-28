import React from 'react'
import { Row, Col, Form, Input, Button, Divider, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../header'
import './registration.scss'
import { RootState } from '../store/rootReducer';
import { updateForm } from '../store/registrationReducer/actions';

const singleLabelFieldLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 12 },
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  
const Buyer = (props: any) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const registrationState = useSelector((state: RootState) => state.registration);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        dispatch(updateForm(values));
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

      const onReset = () => {
        form.resetFields();
      };
      
    return (
        <React.Fragment>
        <Header />
        <div className='entity-details-container'>
            
            <h1>Profile Verification</h1>
            <Divider />
            <Form
                form={form}
                {...singleLabelFieldLayout}
                name="basic"
                initialValues={registrationState.formData}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            label="Name"
                            name="username"
                        >
                            <Input bordered={false} disabled={true} />
                        </Form.Item>
                        <Form.Item
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 12 }}
                            label="Phone Number"
                            name="phone"
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
                            name="id_card"
                            label="Upload ID Card"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: 'Upload ID!' }]}
                        >
                            <Upload name="logo" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
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
                            name="district">
                            <Select placeholder="District">
                                <Select.Option value="bellary">Bellary</Select.Option>
                            </Select>
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
                            name="taluk">
                            <Select placeholder="Taluk">
                                <Select.Option value="hospet">Hospet</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col span={12}>                
                        <Form.Item {...tailLayout}>
                        <Button className='margin-l-r-1em' htmlType="button" onClick={onReset}>
                            Cancel
                        </Button>
                        <Button className='' type="primary" htmlType="submit">
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