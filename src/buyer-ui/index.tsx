import React, { useState } from 'react';
import { Button, Divider, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import './buyer.scss';
import MatchedSection from './matches';
import ReviewsSection from './reviews';
import TransactionSection from './transactions';
import ProduceSection from './produce';
import AddProduceModal from './masterList';
import PaymentResponseModel from './transactions/paymentResponsemodel';

import Header from '../header';
import Footer from '../footer';

import { RootState } from '../store/rootReducer';
import Banner from '../static/assets/buyerBanner.jpg';
import { saveKyc } from '../store/loginReducer/actions';

const { Title } = Typography;

const BuyerUI = (props: any) => {
    const { history } = props;
    const loginState = useSelector((state: RootState) => state.loginUser);
    const { isRedirected, isLogin, name } = loginState;
    const [welcomeModal, setWelcomeModal] = useState(isLogin);
    const dispatch = useDispatch();

    const explore = () => {
        if (isLogin) {
            dispatch(saveKyc({ isLogin: false }));
        }
        setWelcomeModal(!welcomeModal);
    };

    return (
        <div className="buyer-ui-app" id="buyer-ui-app">
            <Header history={history} showActions isLoggedIn />
            <div className="buyer-ui-dashboard">
                <Title level={2}>My Dashboard</Title>
                <img className="buyer-banner" src={Banner} alt="buyer-banner" />
                <Divider />
                {isRedirected && <PaymentResponseModel />}
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
                <AddProduceModal />
                <Divider />
                <ProduceSection />
                <Divider />
                <MatchedSection />
                <Divider />
                <TransactionSection />
                <Divider />
                <ReviewsSection />
            </div>
            <Footer />
        </div>
    );
};

export default BuyerUI;
