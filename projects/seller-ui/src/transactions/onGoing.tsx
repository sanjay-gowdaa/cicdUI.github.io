import React from 'react'
import { Table } from 'antd';
import { TransactioModel, TransactionStatus } from '../store/sellerReducer/types';
import { transactionColumns } from './transactionTable.model';

const OnGoingTransactions = ({transactionList}: {transactionList: Array<TransactioModel>}) => {
    /* Temproary change */
    const onGoingList = transactionList.filter((transaction:TransactioModel) => 
    transaction.transactionStatus === TransactionStatus.on_going)
    
    return (
        <Table className='margin-t-1em' columns={transactionColumns} dataSource={onGoingList} />
    )
}

export default OnGoingTransactions;