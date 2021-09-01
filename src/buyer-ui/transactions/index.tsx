import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import OnGoingTransactions from './onGoing';
import CompletedTransactions from './completed';
import PendingTransactions from './pending';

import { TransactionStatus } from '../../buyer-seller-commons/types';
import {
    getTransactionList,
    getTransactionListOnReload
} from '../../store/buyerReducer/actions';
import { RootState } from '../../store/rootReducer';

const { Title } = Typography;
const { TabPane } = Tabs;

const TransactionSection = () => {
    const buyerState = useSelector((state: RootState) => state.buyer);
    const dispatch = useDispatch();
    const [reloadClicked, setReloadClicked] = useState(0);
    const [transactionKey, setTransactionKey] = useState(TransactionStatus.on_going);
    const { transactionList } = buyerState;

    const onSwitchTab = (key: string) => {
        const transactionTypeKey = key as TransactionStatus;
        setTransactionKey(transactionTypeKey);
        if (transactionList[transactionTypeKey].length === 0) {
            dispatch(getTransactionList(transactionTypeKey))
        }
    };

    useEffect(() => {
        dispatch(getTransactionList(TransactionStatus.on_going));
    }, []);

    useEffect(() => {
        dispatch(getTransactionListOnReload(transactionKey));
    }, [reloadClicked]);

    return (
        <div id="buyer-ui-transactions">
            <Title level={2}>My Transactions</Title>
            <ReloadOutlined
                className={reloadClicked === 5 ? `display-none` : `on-reload-matches`}
                onClick={() => setReloadClicked(reloadClicked + 1)}
            />
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
