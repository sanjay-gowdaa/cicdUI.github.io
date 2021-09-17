import React from 'react';
import { Divider, Typography } from 'antd';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

import CropsSection from './crops';
// import DashboardSection from './dashboard';
import Header from '../header';
import MatchedSection from './matches';
import ReviewsSection from './reviews';
import TransactionSection from './transactions';
import './seller.scss';

import Footer from '../footer';
import { RootState } from '../store/rootReducer';

import SellerBanner from '../static/assets/sellerBanner.png';
import WelcomeModal from '../app-components/welcomeModal';

const { Title } = Typography;

const SellerUi = (props: any) => {
    const { history } = props;
    const loginState = useSelector((state: RootState) => state.loginUser);
    const { username } = loginState;
    !isEmpty(username) && localStorage.setItem("userName", username);

    return (
        <div className="seller-ui-app">
            <Header history={history} showActions isLoggedIn />
            <div className="seller-ui-dashboard">
                {/* <DashboardSection /> */}
                <WelcomeModal />
                <Title level={2}>My Dashboard</Title>
                <img className="seller-banner" src={SellerBanner} alt="seller-banner" />
                <Divider />
                <CropsSection history={history} />
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
