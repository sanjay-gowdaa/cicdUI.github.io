import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Typography } from 'antd';
import { RootState } from '../../store/rootReducer';
import { TransactionStatus } from '../../buyer-seller-commons/types';
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
    const dispatch = useDispatch();
    const {transactionList} = sellerState;

    return (
        <div id="seller-ui-transactions">
            <Title level={2}>My Transactions</Title>
            <Tabs defaultActiveKey="1" size="large" onChange={callback}>
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
