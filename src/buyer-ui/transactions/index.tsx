import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tabs, Typography } from 'antd';

import OnGoingTransactions from './onGoing';
import CompletedTransactions from './completed';
import PendingTransactions from './pending';

import { TransactionStatus } from '../../buyer-seller-commons/types';
import {
    fetchEventTemplate,
    getTransactionList,
    getTransactionListOnReload
} from '../../store/buyerReducer/actions';
import { RootState } from '../../store/rootReducer';
import Refresh from '../../static/assets/refresh.png';

const { Text, Title } = Typography;
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
        dispatch(fetchEventTemplate());
    }, []);

    useEffect(() => {
        if (reloadClicked === 5) {
            setTimeout(() => {
                setReloadClicked(0);
            }, 500000);
        }
    }, [reloadClicked]);

    return (
        <div id="buyer-ui-transactions">
            <Title level={2}>My Transactions</Title>
            <Button
                type="link"
                disabled={reloadClicked === 5}
                style={{ float: 'right' }}
                onClick={() => {
                    setReloadClicked(reloadClicked + 1);
                    dispatch(getTransactionListOnReload(transactionKey));
                }}
            >
                <Text style={{ color: '#4285F4' }}>Refresh &nbsp;</Text>
                <img src={Refresh} alt="refresh" />
            </Button>
            <Tabs defaultActiveKey={TransactionStatus.on_going} size="large" style={{ width: "100%" }} onChange={onSwitchTab}>
                <TabPane tab="Pending" key={TransactionStatus.pending}>
                    <PendingTransactions transactionList={transactionList[TransactionStatus.pending]} />
                </TabPane>
                <TabPane tab="On Going" key={TransactionStatus.on_going}>
                    <OnGoingTransactions transactionList={transactionList[TransactionStatus.on_going]} />
                </TabPane>
                <TabPane tab="Completed" key={TransactionStatus.completed}>
                    <CompletedTransactions transactionList={transactionList[TransactionStatus.completed]} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default TransactionSection;
