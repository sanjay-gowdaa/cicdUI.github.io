import React from 'react';
import CropsSection from './crops';
import DashboardSection from './dashboard';
import Header from '../header';
import MatchedSection from './matches';
import ReviewsSection from './reviews';
import TransactionSection from './transactions';
import { Divider } from 'antd';
import Footer from '../footer';
import './seller.scss';

const SellerUi = (props: any) => {
    const { history } = props;
    return (
        <div className="seller-ui-app">
            <Header history={history} showActions isLoggedIn />
            <div className="seller-ui-dashboard">
                <DashboardSection />
                <Divider />
                <CropsSection />
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

export default SellerUi;
