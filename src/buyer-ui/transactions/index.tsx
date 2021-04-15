import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Tabs, Typography } from 'antd';

import OnGoingTransactions from './onGoing';
import CompletedTransactions from './completed';
import PendingTransactions from './pending';
import { TransactionStatus } from '../../store/buyerReducer/types';
import { getTransactionList } from '../../store/buyerReducer/actions';

const { Title } = Typography;
const { TabPane } = Tabs;

const TransactionSection = () => {
    const buyerState = useSelector((state: RootState) => state.buyer);
    const dispatch = useDispatch();
    const {transactionList} = buyerState;

    const onSwitchTab = (key: string) => {
        const transactionTypeKey = key as TransactionStatus;
        if (transactionList[transactionTypeKey].length === 0 ) {
            dispatch(getTransactionList(transactionTypeKey))
        }
    }

    useEffect(() => {
        dispatch(getTransactionList(TransactionStatus.on_going))
    }, [])

    return (
        <div id="buyer-ui-transactions">
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
