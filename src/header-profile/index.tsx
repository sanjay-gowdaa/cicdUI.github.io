import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
    // Badge,
    // Breadcrumb,
    // Card,
    // Dropdown,
    // Menu,
    // notification,
    // Popconfirm,
    // Space,
    // Tooltip,
    Typography
} from 'antd';
// import { BellFilled, ContactsFilled, LogoutOutlined } from '@ant-design/icons';
// import MenuItem from 'antd/lib/menu/MenuItem';
// import { Redirect } from 'react-router-dom';

import { RootState } from '../store/rootReducer';
import { UserStateModel } from '../store/loginReducer/types';
// import DefaultBtn from '../app-components/defaultBtn';

// import '../app-components/customComponent.scss';

const { Text, Title } = Typography;

const UserHeader = () => {
    const loginState: UserStateModel = useSelector((state: RootState) => state.loginUser);
    // const fieldOfficer = "Mahesh Kumar";
    // const fieldOfficerNumber = "9876543210";
    // const [notificationNumber, setNotificationNumber] = useState(2);
    // const [isLogout, setLogout] = useState(false); 
    // var produce, matches, transaction, feedback;

    // if (loginState.is_buyer) {
    //     produce = "#" + "buyer-ui-app";
    //     matches = "#" + "buyer-ui-matches";
    //     transaction = "#" + "buyer-ui-transactions";
    //     feedback = "#" + "buyer-ui-feedback";
    // } else {
    //     produce = "#" + "seller-ui-app";
    //     matches = "#" + "seller-ui-matches";
    //     transaction = "#" + "seller-ui-transactions";
    //     feedback = "#" + "seller-ui-feedback";
    // }

    // clear=true Means Clear one notification. clear=false Means Add one notification
    // const clearNotification = (clear: boolean) => {
    //     if(clear){
    //         setNotificationNumber((prevCount) => prevCount - 1);
    //     } else {
    //         setNotificationNumber((prevCount) => prevCount + 1);
    //     }
    // };

    // const openNotification = () => {
    //     notification['success']({
    //         message: 'Verification Successful',
    //         description: 'Your profile has been verified successfully.',
    //         duration: 0, // Don't close automatically
    //         onClose: () => clearNotification(true)
    //     });
    //     notification['info']({
    //         message: 'Field Officer Assigned',
    //         description: `You have been assigned a filed officer. The name of your field officer is ${fieldOfficer}`,
    //         duration: 0,
    //         onClose: () => clearNotification(true)
    //     });
    // };

    // const showContactInfo = () => {
    //     return (
    //         <Menu>
    //             <MenuItem key="fieldOfficerInfo" >
    //                 <Card>
    //                     <Title level={4}>Field Officer Info:</Title>
    //                     <Space direction="vertical">
    //                         <Text>Name: {fieldOfficer}</Text>
    //                         <Text>Phone No: {fieldOfficerNumber}</Text>
    //                     </Space>
    //                 </Card>
    //             </MenuItem>
    //             <MenuItem key="contactUs">
    //                 <Card>
    //                     <Title level={4}>Contact Us:</Title>
    //                     <Text>contactus@vikasbandhu.in</Text>
    //                 </Card>
    //             </MenuItem>
    //         </Menu>
    //     );
    // };

    // const logout = () => {
    //     // Logout Functionality
    //     setLogout(true);
    // };

    return (
      <div className="display-flex-row align-center">
        {/* <Breadcrumb separator=" " className="custom-breadcrumb">
            <Breadcrumb.Item href={produce} >Produce</Breadcrumb.Item>
            <Breadcrumb.Item href={matches} >Matches</Breadcrumb.Item>
            <Breadcrumb.Item href={transaction} >Transaction</Breadcrumb.Item>
            <Breadcrumb.Item href={feedback} >Feedback</Breadcrumb.Item>
        </Breadcrumb>
        <Badge count={notificationNumber} className="custom-badge">
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
        /> */}
        <Title level={4} className='margin-unset' style={{padding: "0.5em"}}>{loginState.name}</Title>
        {/* <p className='margin-unset'>Seller Id: {loginState.userId}</p> */}
        {/* <Popconfirm
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
        {isLogout && <Redirect to="/" />} */}
      </div>
    );
};

export default UserHeader;