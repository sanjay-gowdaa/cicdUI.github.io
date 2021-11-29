import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';

import { TransactionModel } from '../../buyer-seller-commons/types';
import { RootState } from '../../store/rootReducer';
import { transactionSellerColumns } from '../../seller-ui/transactions/transactionTable.modal';
import { transactionBuyerColumns } from '../../buyer-ui/transactions/transactionTable.modal';

const PendingTransactions = ({ transactionList }: { transactionList: Array<TransactionModel> }) => {
    const loginState = useSelector((state: RootState) => state.loginUser);

    return (
        <Table
            className='margin-t-1em'
            columns={loginState.is_buyer ? transactionBuyerColumns : transactionSellerColumns}
            dataSource={transactionList}
        />
    );
};

export default PendingTransactions;
