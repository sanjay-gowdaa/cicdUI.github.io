import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Typography } from 'antd';

import OnGoingTransactions from './onGoing';
import CompletedTransactions from './completed';
import PendingTransactions from './pending';

import { RootState } from '../../store/rootReducer';
import { TransactionStatus } from '../../buyer-seller-commons/types';
import { getSellerTransactionList } from '../../store/sellerReducer/actions';

const { Title } = Typography;
const { TabPane } = Tabs;

const TransactionSection = () => {
    const sellerState = useSelector((state: RootState) => state.seller);
    const dispatch = useDispatch();
    const {transactionList} = sellerState;

    const onSwitchTab = (key: string) => {
        const transactionTypeKey = key as TransactionStatus;
        if (transactionList[transactionTypeKey].length === 0 ) {
            dispatch(getSellerTransactionList(transactionTypeKey))
        }
    }

    useEffect(() => {
        dispatch(getSellerTransactionList(TransactionStatus.on_going))
    }, [])

    return (
        <div id="seller-ui-transactions">
            <Title level={2}>My Transactions</Title>
            <Tabs defaultActiveKey="1" size="large" onChange={onSwitchTab}>
                <TabPane tab="On Going" key={TransactionStatus.on_going}>
                    <OnGoingTransactions transactionList={transactionList[TransactionStatus.on_going]} />
                </TabPane>
                <TabPane tab="Pending" key={TransactionStatus.pending}>
                    <PendingTransactions transactionList={transactionList[TransactionStatus.pending]} />
                </TabPane>
                <TabPane tab="Completed" key={TransactionStatus.completed}>
                    <CompletedTransactions transactionList={transactionList[TransactionStatus.completed]} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default TransactionSection;
