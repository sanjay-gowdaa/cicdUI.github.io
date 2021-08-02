import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Avatar,
    Badge,
    Breadcrumb,
    Button,
    Card,
    Dropdown,
    Menu,
    notification,
    Popconfirm,
    Space,
    Tooltip,
    Typography
} from 'antd';
import { BellFilled, ContactsFilled, LogoutOutlined } from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';
import { isEmpty } from 'lodash';

import '../header/header.scss';
import { LOGOUT_URL } from '../store/api';
import { RootState } from '../store/rootReducer';
import DefaultBtn from '../app-components/defaultBtn';
import { contactUs, headerBreadcrumb, routesMap } from '../constants';
import { getConfigurations, getUserCompleteDetails, getUserFiles } from '../store/loginReducer/actions';

const { Text, Title } = Typography;
const { profile, terms } = routesMap;

const UserHeader = (props: any) => {
    const { history } = props;
    const loginState = useSelector((state: RootState) => state.loginUser);
    const dispatch = useDispatch();
    // const fieldOfficer = "Mahesh Kumar";
    // const fieldOfficerNumber = "9876543210";
    // const [notificationNumber, setNotificationNumber] = useState(2);
    const [userType, setUserType] = useState('');
    const [showProfile, setProfile] = useState(false);
    const [imageSrc, setImageSrc] = useState();
    const [isPDF, setPDF] = useState(false);
    const [breadCrumbs, setBreadCrumbs] = useState({produce: '', matches: '', transaction: '', feedback: '', crops: ''});

    useEffect(() => {
        loginState.is_buyer ? setUserType("#buyer") : setUserType("#seller");
        headerCrumbNames();
    }, [userType]);

    useEffect(() => {
        dispatch(getConfigurations());
    }, []);

    useEffect(() => {
        dispatch(getUserCompleteDetails());
    }, [loginState.kyc_flag]);

    useEffect(() => {

        if(!isEmpty(loginState.profile_picture))
            dispatch(getUserFiles(loginState?.profile_picture?.doc_key, setImageSrc, setPDF));
    },[loginState]);

    const headerCrumbNames = () => {
        const produceName = userType + headerBreadcrumb.produce;
        const matchesName = userType + headerBreadcrumb.matches;
        const transactionName = userType + headerBreadcrumb.transaction;
        const feedbackName = userType + headerBreadcrumb.feedback;
        const cropsName = userType + headerBreadcrumb.crops;
        setBreadCrumbs({produce: produceName, matches: matchesName,transaction: transactionName, feedback: feedbackName, crops: cropsName});
        console.log(isPDF);
    };

    // clear=true Means Clear one notification. clear=false Means Add one notification

    // const clearNotification = (clear: boolean) => {
    //     if(clear){
    //         setNotificationNumber((prevCount) => prevCount - 1);
    //     } else {
    //         setNotificationNumber((prevCount) => prevCount + 1);
    //     }
    // };

    const openNotification = () => {
        notification['success']({
            message: 'Welcome',
            description: 'Thanks for registering with us.',
            duration: 0,
            style:{position: "relative", top: "5em"}
        })
        // notification['info']({
        //     message: 'Field Officer Assigned',
        //     description: `You have been assigned a filed officer. The name of your field officer is ${fieldOfficer}`,
        //     duration: 0,
        //     onClose: () => clearNotification(true)
        // });
        // notification['success']({
        //     message: 'Verification Successful',
        //     description: 'Your profile has been verified successfully.',
        //     duration: 0, // Don't close automatically
        //     onClose: () => clearNotification(true)
        // });
    };

    const showContactInfo = () => {
        return (
            <Menu>
                <MenuItem key="fieldOfficerInfo" >
                    <Card>
                        <Title level={4}>Field Officer Info:</Title>
                        <Space direction="vertical">
                            {/* <Text>Name: {fieldOfficer}</Text>
                            <Text>Phone No: {fieldOfficerNumber}</Text> */}
                            <Text>Field Officer will be assigned shortly.</Text>
                        </Space>
                    </Card>
                </MenuItem>
                <MenuItem key="contactUs">
                    <Card>
                        <Title level={4}>Contact Us:</Title>
                        <Text>{contactUs.emailId}</Text>
                    </Card>
                </MenuItem>
            </Menu>
        );
    };

    return (
      <div className="display-flex-row align-center">
        <Breadcrumb separator=" " className="custom-breadcrumb">
            <Breadcrumb.Item href={breadCrumbs.crops} >Produce</Breadcrumb.Item>
            <Breadcrumb.Item href={breadCrumbs.matches} >Matches</Breadcrumb.Item>
            <Breadcrumb.Item href={breadCrumbs.transaction} >Transaction</Breadcrumb.Item>
            <Breadcrumb.Item href={breadCrumbs.feedback} >Feedback</Breadcrumb.Item>
            <Breadcrumb.Item href={terms}>Terms & Conditions</Breadcrumb.Item>
        </Breadcrumb>
        <Badge
            // count={notificationNumber}
            className="custom-badge"
        >
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
        {/* <p className='margin-unset'>Seller Id: {loginState.userId}</p> */}
        <Popconfirm
            title="Are you sure you want to logout?"
            okText="Yes"
            onConfirm={() => window.location.href = LOGOUT_URL}
            cancelText="No"
        >
            <Tooltip title="Logout">
                <DefaultBtn
                    icon={<LogoutOutlined style={{ fontSize: "large", paddingLeft: "0.3em"}}/>}
                    size="large"
                    shape="circle"
                    style={{ marginLeft: "0.5em"}}
                />
            </Tooltip>
        </Popconfirm>
        <Title level={4} className='margin-unset' style={{padding: "0.5em"}}>{loginState.name}</Title>
        <Tooltip title="Profile">
            <Button shape="circle" size="large" onClick={() => setProfile(true)}
                icon={
                    isEmpty(imageSrc) ?
                    <Avatar size="large" className="profile-avatar">
                        {loginState.name.charAt(0)}
                    </Avatar> :
                    <Avatar size="large" className="profile-avatar" src={imageSrc} />
                }>
            </Button>
        </Tooltip>
        { (showProfile && history.location.pathname !== profile) ? history.push(profile) : null}
      </div>
    );
};

export default UserHeader;
