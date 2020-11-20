import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';

import { updatePartialUserDetails } from '../store/loginReducer/actions';
import { UserType } from '../store/loginReducer/types';

// import DashboardSection from './dashboard';
import Header from '../header';
import { Divider } from 'antd';
import Footer from '../footer';
import './buyer.scss';
import MatchedSection from './matches';
import ReviewsSection from './reviews';
import TransactionSection from './transactions';
import ProduceSection from './produce';
import AddProduceModal from './masterList';

const BuyerUI = (props: any) => {
    const { history } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updatePartialUserDetails({ username: 'Ramesh Guru', userId: '376337', userType: UserType.BUYER}));
      }, []);

    return (
        <div className="buyer-ui-app">
            <Header history={history} showActions isLoggedIn />
            <div className="buyer-ui-dashboard">
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
