import React from 'react';
import { Button, Image, Typography } from 'antd';

import { TransactioModel } from '../../store/buyerReducer/types';
import RagiImg from '../../static/assets/ragi.png';
import ViewTerms from '../../terms-and-conditions/viewTerms';

const { Text, Title } = Typography;

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
                <div className='display-flex-row align-center'>
                <Image
                    src={RagiImg}
                />
                <div className='margin-l-r-1em'>
                    <Title level={5}>{cropName} - {record?.subCategory}</Title>
                    <p>{record?.cropGrade}</p>
                </div>
            </div>
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
        title: 'Seller',
        dataIndex: 'sellerId',
        key: 'sellerId',
        render: (sellerId: string) => {
            return (
                <>
                    <Text underline>{sellerId}</Text>
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
        render: () => {
            return (
                <>
                    <Button type="link">Additional Info</Button>
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
