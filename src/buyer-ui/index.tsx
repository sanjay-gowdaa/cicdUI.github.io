import React, {useEffect} from 'react';
import { Divider, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { updatePartialUserDetails } from '../store/loginReducer/actions';
import { UserType } from '../store/loginReducer/types';

import Header from '../header';
import Footer from '../footer';
import './buyer.scss';
import MatchedSection from './matches';
import ReviewsSection from './reviews';
import TransactionSection from './transactions';
import ProduceSection from './produce';
import AddProduceModal from './masterList';

const {Title} = Typography;

const BuyerUI = (props: any) => {
    const { history } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(updatePartialUserDetails({ username: 'Ramesh Guru', userId: '376337', userType: UserType.BUYER}));
      }, []);

    return (
        <div className="buyer-ui-app">
            <Header history={history} showActions isLoggedIn />
            <div className="buyer-ui-dashboard">
                <Title level={2}>My Dashboard</Title>
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
