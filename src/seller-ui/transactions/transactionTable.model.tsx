import React from 'react';
import { Button, Typography } from 'antd';
import { TransactioModel } from '../../buyer-seller-commons/types';
const { Title, Text } = Typography;

export const transactionColumns = [
    {
        title: 'Id',
        dataIndex: 'transactionId',
        key: 'transactionId',
    },
    {
        title: 'Produce',
        dataIndex: 'produce',
        key: 'produce',
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
        dataIndex: 'buyerId',
        key: 'buyerId',
        render: (buyerId: string) => {
            return (
                <>
                    <Text underline>{buyerId}</Text>
                </>
            );
        },
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
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
