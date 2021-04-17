import React from 'react';
import { Table } from 'antd';
import { transactionColumns } from './transactionTable.model';
import { TransactioModel } from '../../buyer-seller-commons/types';

const CompletedTransactions = ({
    transactionList,
}: {
    transactionList: Array<TransactioModel>;
}) => {
    return <Table className="margin-t-1em" columns={transactionColumns} dataSource={transactionList} />;
};

export default CompletedTransactions;
