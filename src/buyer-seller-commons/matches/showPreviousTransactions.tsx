import React, { useState } from 'react';
import { Button, Divider, Modal, Table, Tooltip, Typography } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { History } from '../types';

import { UserStateModel } from '../../store/loginReducer/types';
import { RootState } from '../../store/rootReducer';
import { maskData, parseIDfromHash } from '../../app-components/utils';

const { Text } = Typography;

const columns = [
    {
        title: 'Transaction ID',
        dataIndex: 'pk',
        key: 'pk',
        ellipsis: {
            showTitle: false,
        },
        render: (pk: string) => {
            const actualID = parseIDfromHash(pk);
            return (
                <Tooltip placement='topLeft' title={actualID}>
                    <Text underline>{actualID}</Text>
                </Tooltip>
            );
        },
    },
    {
        title: 'Transaction Date',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (created_id: string) => <Text>{created_id}</Text>
    },
    {
        title: 'Produce',
        dataIndex: 'produce',
        key: 'produce',
        render: (produce: string) => <Text>{produce}</Text>
    },
    {
        title: 'Quantity',
        dataIndex: 'matched_quantity',
        key: 'matched_quantity',
        render: (matched_quantity: string) => <Text>{matched_quantity}&nbsp; Qtl</Text>
    }
];

const ShowPreviousTransactions = (props: { count: number, history: Array<History>, userId: string }) => {
    const { count, history, userId } = props;
    const [showModal, setModal] = useState(false);
    const loginState: UserStateModel = useSelector((state: RootState) => state.loginUser);
    const { is_buyer } = loginState;

    return (
        <React.Fragment>
            <Tooltip title='View Previous Transactions'>
                <Button
                    type='link'
                    onClick={() => setModal(true)}
                >
                    PREV TRANS({count})
                </Button>
            </Tooltip>
            <Modal
                footer={null}
                width={'50%'}
                visible={showModal}
                onCancel={() => setModal(!showModal)}
            >
                <div style={{ marginTop: '2%' }}>
                    <Text>Previous Transactions</Text>
                    {is_buyer ?
                        <Text style={{ float: 'right' }}>
                            Seller Id : {userId}
                        </Text> :
                        <Text style={{ float: 'right' }}>
                            Buyer Id : {userId}
                        </Text>
                    }
                </div>
                <Divider />
                <Table
                    columns={columns}
                    dataSource={history}
                    pagination={false}
                />
            </Modal>
        </React.Fragment>
    );
};

export default ShowPreviousTransactions;
