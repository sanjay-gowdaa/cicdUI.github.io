import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Tabs, Typography } from 'antd';

import OnGoingTransactions from './onGoing';
import CompletedTransactions from './completed';
import PendingTransactions from './pending';

const { Title } = Typography;
const { TabPane } = Tabs;

function callback(key: any) {
    console.log(key);
}

const TransactionSection = () => {
    const buyerState = useSelector((state: RootState) => state.buyer);
    return (
        <>
            <Title level={2}>My Transactions</Title>
            <Tabs defaultActiveKey="1" size="large" onChange={callback}>
                <TabPane tab="On Going" key="1">
                    <OnGoingTransactions transactionList={buyerState.transactionList} />
                </TabPane>
                <TabPane tab="Pending" key="2">
                    <PendingTransactions transactionList={buyerState.transactionList} />
                </TabPane>
                <TabPane tab="Completed" key="3">
                    <CompletedTransactions transactionList={buyerState.transactionList} />
                </TabPane>
            </Tabs>
        </>
    );
};

export default TransactionSection;
