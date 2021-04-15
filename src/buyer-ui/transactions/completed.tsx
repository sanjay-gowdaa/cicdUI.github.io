import React from 'react';
import { Table } from 'antd';

import { TransactioModel } from '../../store/buyerReducer/types';
import { transactionColumns } from './transactionTable.model';

const CompletedTransactions = ({
    transactionList,
}: {
    transactionList: Array<TransactioModel>;
}) => {
    return <Table className="margin-t-1em" columns={transactionColumns} dataSource={transactionList} />;
};

export default CompletedTransactions;
