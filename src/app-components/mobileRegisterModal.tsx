import React from 'react';
import { Card, Image, Modal, Typography } from 'antd';

import PrimaryBtn from './primaryBtn';
import './customComponent.scss';

import Logo from '../static/assets/vbLogo.png';

const { Text, Title } = Typography;

const MobileRegisterModal = (props: any) => {
    const { visible, setVisible } = props;

    return (
        <Modal
            title={null}
            visible={visible}
            footer={null}
            className="mobile-register-modal"
            onCancel={() => setVisible(!visible)}
            width={"70vw"}
            bodyStyle={{ justifyContent: "center" }}
        >
            <Image src={Logo} className="logo" preview={false} />
            <Card className="info-card">
                <Text>
                    A friendly E-Market place for Buyers and Sellers to connect,
                    engage and transact seamlessly for win-win relationships
                </Text>
            </Card>
            <Title level={5} className="mobile-title">
                For a better experience on phone, download
                <Text className="col-green"> VikasBandhu </Text>app
            </Title>
            <PrimaryBtn className="download-btn" content="Download" />
            <Text className="mobile-sub-text">Or visit the website on desktop</Text>
        </Modal>
    );
};

export default MobileRegisterModal;
