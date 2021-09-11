import React from 'react';
import { Table, Tooltip } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

import { transactionColumns } from './transactionTable.model';
import TransactionDetailsModel from './viewTransactionDetails';

import { TransactioModel } from '../../buyer-seller-commons/types';

const OnGoingTransactions = ({ transactionList }: { transactionList: Array<TransactioModel> }) => {
    return <Table className="margin-t-1em" columns={transactionColumns}
        dataSource={transactionList}
        expandable={{
            expandedRowRender: record => <TransactionDetailsModel data={record.pk} />,
            rowExpandable: record => true,
            expandIconColumnIndex: 0,
            expandIcon: ({ expanded, onExpand, record }) =>
                <Tooltip title="Click to view transaction details" placement="bottomLeft">
                    {expanded ?
                        <CaretUpOutlined onClick={(e) => onExpand(record, e)} /> :
                        <CaretDownOutlined onClick={(e) => onExpand(record, e)} />
                    }
                </Tooltip>
        }}
    />;
};

export default OnGoingTransactions;
