import React, {useEffect} from 'react';
import { Divider, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import Header from '../header';
import Footer from '../footer';
import './buyer.scss';
import MatchedSection from './matches';
import ReviewsSection from './reviews';
import TransactionSection from './transactions';
import ProduceSection from './produce';
import AddProduceModal from './masterList';

import Banner from '../static/assets/buyerBanner.jpg';

const {Title} = Typography;

const BuyerUI = (props: any) => {
    const { history } = props;
    return (
        <div className="buyer-ui-app" id="buyer-ui-app">
            <Header history={history} showActions isLoggedIn />
            <div className="buyer-ui-dashboard">
                <Title level={2}>My Dashboard</Title>
                <img className="buyer-banner" src={Banner} alt="buyer-banner" />
                <Divider />
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
