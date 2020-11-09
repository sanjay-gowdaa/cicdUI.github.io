import React from 'react'
import { Table } from 'antd';
import { TransactioModel, TransactionStatus } from '../../store/sellerReducer/types';
import { transactionColumns } from './transactionTable.model';

const PendingTransactions = ({transactionList}: {transactionList: Array<TransactioModel>}) => {
        /* Temproary change */
        const pendingList = transactionList.filter((transaction:TransactioModel) => 
        transaction.transactionStatus === TransactionStatus.pending)
        
    return (
        <Table className='margin-t-1em' columns={transactionColumns} dataSource={pendingList} />
    )
}

export default PendingTransactions;