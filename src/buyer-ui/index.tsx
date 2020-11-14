import React from 'react';
// import DashboardSection from './dashboard';
import Header from '../header';
// import MatchedSection from './matches';
import { Divider } from 'antd';
import Footer from '../footer';
import './buyer.scss';
import MatchedSection from './matches';
import ReviewsSection from './reviews';
import TransactionSection from './transactions';
import ProduceSection from './produce';

const BuyerUI = (props: any) => {
    const { history } = props;
    return (
        <div className="buyer-ui-app">
            <Header history={history} showActions isLoggedIn />
            <div className="buyer-ui-dashboard">
                {/* <DashboardSection />
                <Divider />*/}
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
