import React, { useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import './customComponent.scss';

import { RootState } from '../store/rootReducer';
import { saveKyc } from '../store/loginReducer/actions';

const { Title } = Typography;

const WelcomeModal = () => {
    const loginState = useSelector((state: RootState) => state.loginUser);
    const { isLogin, name } = loginState;
    const [welcomeModal, setWelcomeModal] = useState(isLogin);
    const dispatch = useDispatch();

    const explore = () => {
        if (isLogin) {
            const data = {
                user_req: {
                    isLogin: false
                },
                files: []
            }
            dispatch(saveKyc(data, false));
        }
        setWelcomeModal(!welcomeModal);
    };

    return (
        <Modal
            visible={welcomeModal}
            className="welcome-modal"
            onCancel={explore}
            footer={null}
        >
            <Title level={4} className="dear-name-text">Dear {name},</Title>
            <Title level={3} className="welcome-text">Welcome to VikasBandhu!</Title>
            <Button type="primary" className="welcome-explore" onClick={explore}>Explore</Button>
        </Modal>
    );
};

export default WelcomeModal;
