import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { RootState } from '../../store/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserDetails } from '../../store/loginReducer/actions';
import { UserTypes } from '../../store/genericTypes';

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { span: 24 },
};

const Login = (props: any) => {
    const { history } = props;
    const registrationState = useSelector((state: RootState) => state.registration);

    const dispatch = useDispatch();

    const onFinish = (values: any) => {
        const {phoneNum}: {phoneNum: string} = values;


        /* To be removed later start*/
        const {formData} = registrationState;
        const {username} = formData;
        /* To be removed later end*/
        //dispatch(updateUserDetails({phone: phoneNum, username, userId: '276327', userType: UserType.BUYER}));

        if (phoneNum === '12345') {
            dispatch(updateUserDetails({number: '12345', username: 'Naresh Gowda', userId: '276327', userType: UserTypes.SELLER}));
            history.push('/seller');
        } else if (phoneNum === '67890') {
            dispatch(updateUserDetails({number: '67890', username: 'Ramesh Guru', userId: '376337', userType: UserTypes.BUYER}));
            history.push('/buyer');
        } else {
            
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Phone Number/Email Id"
                name="phoneNum"
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

            <Form.Item {...tailLayout}>
                <Button className="width-full" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
