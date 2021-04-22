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
        dataIndex: 'matched_quantity',
        key: 'matched_quantity',
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
        dataIndex: 'seller_price',
        key: 'seller_price',
        render: (seller_price: number, record: TransactioModel) => {
            const {matched_quantity} = record;
            return (
                <p>{seller_price/matched_quantity}</p>
            )
        }
    },
    {
        title: 'Total',
        dataIndex: 'buyer_final_price',
        key: 'buyer_final_price',
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
