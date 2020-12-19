import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Typography } from 'antd';

import { RootState } from '../../store/rootReducer';
import OnGoingTransactions from './onGoing';
import CompletedTransactions from './completed';
import PendingTransactions from './pending';

const { Title } = Typography;
const { TabPane } = Tabs;

function callback(key: any) {
    console.log(key);
}

const TransactionSection = () => {
    const sellerState = useSelector((state: RootState) => state.seller);
    return (
        <>
            <Title level={2}>My Transactions</Title>
            <Tabs defaultActiveKey="1" size="large" onChange={callback}>
                <TabPane tab="On Going" key="1">
                    <OnGoingTransactions transactionList={sellerState.transactionList} />
                </TabPane>
                <TabPane tab="Pending" key="2">
                    <PendingTransactions transactionList={sellerState.transactionList} />
                </TabPane>
                <TabPane tab="Completed" key="3">
                    <CompletedTransactions transactionList={sellerState.transactionList} />
                </TabPane>
            </Tabs>
        </>
    );
};

export default TransactionSection;
