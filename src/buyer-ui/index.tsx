import React from 'react';
import { Divider, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { History } from 'history';

import './buyer.scss';
import ProduceSection from './produce';
import AddProduceModal from './masterList';
import PaymentResponseModel from './transactions/paymentResponsemodel';

import Header from '../header';
import Footer from '../footer';

import { RootState } from '../store/rootReducer';
import Banner from '../static/assets/buyerBanner.jpg';
import WelcomeModal from '../app-components/welcomeModal';
import ReviewsSection from '../buyer-seller-commons/reviews';
import Transaction from '../buyer-seller-commons/transactions';
import Matches from '../buyer-seller-commons/matches';

const { Title } = Typography;

const BuyerUI = (props: { history: History }) => {
    const { history } = props;
    const loginState = useSelector((state: RootState) => state.loginUser);
    const { isRedirected } = loginState;

    return (
        <div className='buyer-ui-app' id='buyer-ui-app'>
            <Header
                history={history}
                showActions={true}
                isLoggedIn={true}
                popUpTrigger={undefined}
            />
            <div className='buyer-ui-dashboard'>
                <Title level={2}>My Dashboard</Title>
                <img className='buyer-banner' src={Banner} alt='buyer-banner' />
                <Divider />
                {isRedirected && <PaymentResponseModel />}
                <WelcomeModal />
                <AddProduceModal history={history} />
                <Divider />
                <ProduceSection history={history} />
                <Divider />
                <Matches />
                <Divider />
                <Transaction />
                <Divider />
                <ReviewsSection />
            </div>
            <Footer />
        </div>
    );
};

export default BuyerUI;
