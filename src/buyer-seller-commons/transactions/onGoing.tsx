import React from 'react';
import { Table, Tooltip } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

import TransactionDetailsModal from './viewTransactionDetails';

import { TransactionModel, TransactionStatus } from '../../buyer-seller-commons/types';
import { RootState } from '../../store/rootReducer';
import { transactionBuyerColumns } from '../../buyer-ui/transactions/transactionTable.modal';
import { transactionSellerColumns } from '../../seller-ui/transactions/transactionTable.modal';

const OnGoingTransactions = ({ transactionList }: { transactionList: Array<TransactionModel> }) => {
    const loginState = useSelector((state: RootState) => state.loginUser);

    return (
        <Table
            className='margin-t-1em'
            columns={loginState.is_buyer ? transactionBuyerColumns : transactionSellerColumns}
            dataSource={transactionList}
            expandable={{
                expandedRowRender: record => <TransactionDetailsModal pk={record.pk} tab={TransactionStatus.on_going} />,
                rowExpandable: record => true,
                expandIconColumnIndex: 8,
                expandIcon: ({ expanded, onExpand, record }) =>
                    <Tooltip title='Click to view transaction details' placement='bottomLeft'>
                        {expanded ?
                            <CaretUpOutlined onClick={(e) => onExpand(record, e)} /> :
                            <CaretDownOutlined onClick={(e) => onExpand(record, e)} />
                        }
                    </Tooltip>
            }}
        />
    );
};

export default OnGoingTransactions;
