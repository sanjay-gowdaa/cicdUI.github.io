import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';

import CropsSection from './crops';
import DashboardSection from './dashboard';
import Header from '../header';
import MatchedSection from './matches';
import ReviewsSection from './reviews';
import TransactionSection from './transactions';
import { Divider } from 'antd';
import Footer from '../footer';
import './seller.scss';
import { updatePartialUserDetails } from '../store/loginReducer/actions';

const SellerUi = (props: any) => {
    const { history } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(updatePartialUserDetails({ username: 'Naresh Gowda', userId: '276327', userType: UserType.SELLER}));
      }, []);

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
