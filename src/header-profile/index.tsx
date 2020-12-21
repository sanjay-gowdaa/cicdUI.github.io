import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Card, Dropdown, Menu, Modal, notification, Popconfirm, Tooltip, Typography } from 'antd';
import { BellFilled, ContactsFilled, LogoutOutlined } from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';

import { RootState } from '../store/rootReducer';
import { UserStateModel } from '../store/loginReducer/types';
import DefaultBtn from '../app-components/defaultBtn';

import '../app-components/customComponent.scss';

const { Text, Title } = Typography;

const UserHeader = () => {
    const loginState: UserStateModel = useSelector((state: RootState) => state.loginUser);
    const fieldOfficer = "Mx. Field Officer";
    const fieldOfficerNumber = "9876543210";
    const [notificationNumber, setNotificationNumber] = useState(2);

    // clear=true Means Clear one notification. clear=false Means Add one notification
    const clearNotification = (clear: boolean) => {
        if(clear){
            setNotificationNumber((prevCount) => prevCount - 1);
        } else {
            setNotificationNumber((prevCount) => prevCount + 1);
        }
    };

    const openNotification = () => {
        notification['success']({
            message: 'Verification Successful',
            description: 'Your profile has been verified successfully.',
            duration: 0, // Don't close automatically
            onClose: () => clearNotification(true)
        });
        notification['info']({
            message: 'Field Officer Assigned',
            description: `You have been assigned a filed officer. The name of your field officer is ${fieldOfficer}`,
            duration: 0,
            onClose: () => clearNotification(true)
        });
    };

    const showContactInfo = () => {
        return (
            <Menu>
                <MenuItem key="fieldOfficerInfo" onClick={displayFieldOfficerInfo} >
                    Field Officer
                </MenuItem>
                <MenuItem key="contactUs">
                    <a href="mailto:support@vikasbandhu.com" >Contact Us</a>
                    {/* Alert */}
                </MenuItem>
            </Menu>
        );
    };

    const displayFieldOfficerInfo = () => {
        Modal.info({
            title: 'Your Filed Officer Details',
            content: (
                <Card>
                    <Title level={4}>Name: {fieldOfficer}</Title>
                    <Text>{fieldOfficerNumber}</Text>
                </Card>
            )
        });
    };

    const logout = () => {
        // Logout Functionality
    };

    return (
      <div className='display-flex-row align-center'>
            <Badge count={notificationNumber}>
                <Tooltip title="Notifications">
                    <DefaultBtn 
                        shape="circle"
                        size="large"
                        icon={<BellFilled style={{ fontSize: "large", paddingLeft: "0.3em"}} />}
                        onClick={openNotification}
                    />
                </Tooltip>
            </Badge>
            <Dropdown.Button 
                overlay={showContactInfo}
                icon={<ContactsFilled style={{ fontSize: "large" }} />}
                size="large"
                className="custom-dropdown-button"
            />
            <Title level={4} className='margin-unset'>{loginState.name}</Title>
            {/* <p className='margin-unset'>Seller Id: {loginState.userId}</p> */}
            <Popconfirm
                title="Are you sure you want to logout?"
                okText="Yes"
                onConfirm={logout}
                cancelText="No"
            >
                <Tooltip title="logout">
                    <DefaultBtn
                        icon={<LogoutOutlined style={{ fontSize: "large", paddingLeft: "0.3em"}}/>}
                        size="large"
                        shape="circle"
                    />
                </Tooltip>
            </Popconfirm>
      </div>
    );
};

export default UserHeader;