import React from 'react';
import { Table } from 'antd';
import { TransactioModel } from '../../buyer-seller-commons/types';
import { transactionColumns } from './transactionTable.model';
import TransactionDetailsModel from './viewTransactionDetails';
import {CaretUpOutlined,CaretDownOutlined } from "@ant-design/icons";

const OnGoingTransactions = ({ transactionList }: { transactionList: Array<TransactioModel> }) => {
    return <Table className="margin-t-1em" columns={transactionColumns} 
    dataSource={transactionList} 
        expandable={{
        expandedRowRender: record => <TransactionDetailsModel data = {record.pk}/>,
        rowExpandable: record => true,
        expandIconColumnIndex: 0,
        expandIcon: ({ expanded, onExpand, record }) =>
        expanded ? ( 
           <CaretUpOutlined   onClick={e => onExpand(record, e)} />
         ) : (
           <CaretDownOutlined onClick={e => onExpand(record, e)} />
           )
    }}
        
        />;
};

export default OnGoingTransactions;
