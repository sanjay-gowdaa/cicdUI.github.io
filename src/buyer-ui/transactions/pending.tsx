import React from 'react';
import { Table } from 'antd';
import { TransactioModel } from '../../buyer-seller-commons/types';
import { transactionColumns } from './transactionTable.model';

const PendingTransactions = ({ transactionList }: { transactionList: Array<TransactioModel> }) => {
    return <Table className="margin-t-1em" columns={transactionColumns} dataSource={transactionList} />;
};

export default PendingTransactions;
