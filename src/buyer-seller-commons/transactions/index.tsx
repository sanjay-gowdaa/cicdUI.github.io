import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tabs, Typography } from 'antd';

import PendingTransactions from './pending';
import OnGoingTransactions from './onGoing';
import CompletedTransactions from './complete';

import { TransactionStatus } from '../types';
import { fetchEventTemplate, getTransactionListOnReload } from '../actions';

import { RootState } from '../../store/rootReducer';
import { getTransactionList } from '../../store/buyerReducer/actions';
import { getSellerTransactionList } from '../../store/sellerReducer/actions';
import { UserTypes } from '../../store/genericTypes';
import Refresh from '../../static/assets/refresh.png';

const { Text, Title } = Typography;
const { TabPane } = Tabs;

const Transaction = () => {
    const loginState = useSelector((state: RootState) => state.loginUser);
    const userState = useSelector((state: RootState) => loginState.is_buyer ? state.buyer : state.seller);
    const dispatch = useDispatch();
    const userType = loginState.is_buyer ? UserTypes.BUYER : UserTypes.SELLER;
    const [reloadClicked, setReloadClicked] = useState(0);
    const [transactionKey, setTransactionKey] = useState(TransactionStatus.on_going);
    const { transactionList } = userState;
    const idName= loginState.is_buyer ? 'buyer-ui-transactions':'seller-ui-transactions';

    const onSwitchTab = (key: string) => {
        const transactionTypeKey = key as TransactionStatus;
        setTransactionKey(transactionTypeKey);
        if (transactionList[transactionTypeKey].length === 0) {
            loginState.is_buyer ?
                dispatch(getTransactionList(transactionTypeKey)) :
                dispatch(getSellerTransactionList(transactionTypeKey));
        }
    };

    useEffect(() => {
        loginState.is_buyer ?
            dispatch(getTransactionList(TransactionStatus.on_going)) :
            dispatch(getSellerTransactionList(TransactionStatus.on_going));
        dispatch(fetchEventTemplate(userType));
    }, []);

    useEffect(() => {
        if (reloadClicked === 5) {
            setTimeout(() => {
                setReloadClicked(0);
            }, 500000);
        }
    }, [reloadClicked]);

    return (
        <div id={idName}>
            <Title level={2}>My Transactions</Title>
            <Button
                type='link'
                className='refresh-button'
                disabled={reloadClicked === 5}
                style={{ float: 'right' }}
                onClick={() => {
                    setReloadClicked(reloadClicked + 1);
                    dispatch(getTransactionListOnReload(transactionKey));
                }}
            >
                <Text style={{ color: '#4285F4' }}>Refresh &nbsp;</Text>
                <img src={Refresh} alt='refresh' />
            </Button>
            <Tabs
                defaultActiveKey={TransactionStatus.on_going}
                size='large'
                style={{ width: '100%' }}
                onChange={onSwitchTab}
            >
                <TabPane tab='Pending' key={TransactionStatus.pending}>
                    <PendingTransactions transactionList={transactionList[TransactionStatus.pending]} />
                </TabPane>
                <TabPane tab='On Going' key={TransactionStatus.on_going}>
                    <OnGoingTransactions transactionList={transactionList[TransactionStatus.on_going]} />
                </TabPane>
                <TabPane tab='Completed' key={TransactionStatus.completed}>
                    <CompletedTransactions transactionList={transactionList[TransactionStatus.completed]} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Transaction;
