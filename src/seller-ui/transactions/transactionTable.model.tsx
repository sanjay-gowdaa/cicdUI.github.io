import React from 'react';
import { Typography } from 'antd';

import { TransactioModel } from '../../store/sellerReducer/types';

const { Title, Text } = Typography;
export const transactionColumns = [
    {
        title: 'Id',
        dataIndex: 'transactionId',
        key: 'transactionId',
    },
    {
        title: 'Produce',
        dataIndex: 'cropName',
        key: 'cropName',
        render: (cropName: string, record: TransactioModel) => {
            return (
                <>
                    <Title level={5}>
                        {cropName} - {record?.subCategory}
                    </Title>
                    <p>{record?.cropGrade}</p>
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
        key: 'termsAndConditions',
        dataIndex: 'termsAndConditions',
        render: (termsAndConditions: string) => {
            return (
                <>
                    <div>
                        <a href={termsAndConditions} target="_blank">
                            View Terms
                        </a>
                    </div>
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
