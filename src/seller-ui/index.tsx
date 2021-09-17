import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Divider, Typography } from 'antd';

import CropsSection from './crops';
import DashboardSection from './dashboard';
import Header from '../header';
import MatchedSection from './matches';
import ReviewsSection from './reviews';
import TransactionSection from './transactions';
import Footer from '../footer';

import SellerBanner from '../static/assets/sellerBanner.png';

import './seller.scss';

const { Title } = Typography;

const SellerUi = (props: any) => {
    const { history } = props;
    return (
        <div className="seller-ui-app">
            <Header history={history} showActions isLoggedIn />
            <div className="seller-ui-dashboard">
                {/* <DashboardSection /> */}
                <Title level={2}>My Dashboard</Title>
                <img className="seller-banner" src={SellerBanner} alt="seller-banner" />
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
