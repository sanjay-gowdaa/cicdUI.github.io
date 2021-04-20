import React from 'react';
import { Button, Typography, Tooltip } from 'antd';
import { TransactioModel } from '../../buyer-seller-commons/types';
import { parseIDfromHash } from '../../app-components/utils';
const { Title, Text } = Typography;

export const transactionColumns = [
    {
        title: 'Id',
        dataIndex: 'pk',
        key: 'pk',
        ellipsis: {
            showTitle: false,
        },
        render: (transactionID: string) => {
            const transactionActId = parseIDfromHash(transactionID);
            return (
                <Tooltip placement="topLeft" title={transactionActId}>
                    <Text underline>{transactionActId}</Text>
                </Tooltip>
            );
        },
    },
    {
        title: 'Produce',
        dataIndex: 'produce',
        key: 'produce',
        width: 300,
        render: (produce: string, record: TransactioModel) => {
            return (
                <>
                    <p>{produce}</p>
                </>
            );
        },
    },
    {
        title: 'Qunatity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity: number) => {
            return (
                <>
                    <p>{quantity} qtl</p>
                </>
            );
        },
    },
    {
        title: 'Price per qtl',
        dataIndex: 'pricePerQnt',
        key: 'pricePerQnt',
    },
    {
        title: 'Total',
        dataIndex: 'transactionTotalAmount',
        key: 'transactionTotalAmount',
    },
    {
        title: 'Buyer',
        dataIndex: 'buyer_id',
        key: 'buyer_id',
        ellipsis: {
            showTitle: false,
        },
        render: (buyerId: string) => {
            const actBuyerID = parseIDfromHash(buyerId)
            return (
                <Tooltip placement="topLeft" title={actBuyerID}>
                    <Text underline>{actBuyerID}</Text>
                </Tooltip>
            );
        },
    },
    {
        title: 'Location',
        dataIndex: 'buyer_location',
        key: 'buyer_location',
    },
    {
        title: 'Additional',
        key: 'additional_info',
        dataIndex: 'additional_info',
        render: () => {
            return (
                <>
                    <Button type="link">Packaging Details</Button>
                </>
            );
        },
    },
    {
        title: 'Status',
        key: 'transactionStatusText',
        dataIndex: 'transactionStatusText',
    },
];
