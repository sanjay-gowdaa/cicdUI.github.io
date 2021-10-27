import React from 'react';
import { Table } from 'antd';

import { transactionColumns } from './transactionTable.model';

import { TransactionModel } from '../../buyer-seller-commons/types';

const PendingTransactions = ({ transactionList }: { transactionList: Array<TransactionModel> }) => {
    return <Table className="margin-t-1em" columns={transactionColumns} dataSource={transactionList} />;
};

export default PendingTransactions;
