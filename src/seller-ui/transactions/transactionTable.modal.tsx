import React from 'react';
import { Button, Image, Typography, Tooltip } from 'antd';

import { TransactionModel } from '../../buyer-seller-commons/types';
import { parseIDfromHash, maskData } from '../../app-components/utils';
import { showCropImage } from '../../buyer-seller-commons/constants';
import GetCurrentStatusDetails from '../../buyer-seller-commons/transactions/getCurrentStatusDetails';

const { Text } = Typography;

export const transactionSellerColumns = [
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
                <Tooltip placement='topLeft' title={transactionActId}>
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
        render: (produce: string) => {
            const [masterCategory = '', produceCateogry = '', cropType = '', grade = ''] = produce.split('-');
            const imageSrc = showCropImage(masterCategory);
            return (
                <div className='display-flex-row align-center'>
                    <Image src={imageSrc} className='table-crop-image' />
                    <div className='margin-l-r-1em'>
                        <p>{produce}</p>
                    </div>
                </div>
            );
        },
    },
    {
        title: 'Quantity',
        dataIndex: 'matched_quantity',
        key: 'matched_quantity',
        render: (quantity: number) => {
            return (
                <p>{quantity} qtl</p>
            );
        }
    },
    {
        title: 'Price per qtl',
        dataIndex: 'seller_price',
        key: 'seller_price',
        render: (seller_price: number, record: TransactionModel) => {
            const { matched_quantity } = record;
            return (
                <p>{seller_price / matched_quantity}</p>
            );
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
                <Tooltip placement='topLeft' title={maskData(actBuyerID)}>
                    <Text underline>{maskData(actBuyerID)}</Text>
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
                <Button type='link'>Packaging Details</Button>
            );
        },
    },
    {
        title: 'Status',
        key: 'action',
        render: (record: any) => {
            const transactionId = record.pk;
            return (
                <GetCurrentStatusDetails data={transactionId} />
            );
        },
    }
];
