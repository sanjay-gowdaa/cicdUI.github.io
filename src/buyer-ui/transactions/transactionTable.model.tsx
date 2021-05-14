import React from 'react';
import { Image, Typography, Tooltip } from 'antd';
import RagiImg from '../../static/assets/ragi.png';
import { parseIDfromHash, maskData } from '../../app-components/utils';
const { Text } = Typography;

export const transactionColumns = [
    {
        title: 'Id',
        dataIndex: 'pk',
        key: 'pk',
        ellipsis: {
            showTitle: false,
        },
        render: (pk: string) => {
            const actualID = parseIDfromHash(pk);
            return (
                <Tooltip placement="topLeft" title={actualID}>
                    <Text underline>{actualID}</Text>
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
            return (
            <div className='display-flex-row align-center'>
                <Image
                    src={RagiImg}
                />
                <div className='margin-l-r-1em'>
                    {/* <Title level={5}>{cropName} - {record?.subCategory}</Title> */}
                    <p>{produce}</p>
                </div>
            </div>
            );
        },
    },
    {
        title: 'Qunatity',
        dataIndex: 'matched_quantity',
        key: 'matched_quantity',
        render: (quantity: number) => {
            return (
                <p>{quantity} qtl</p>
            );
        },
    },
    {
        title: 'Price per qtl',
        dataIndex: 'buyer_price_per_quintal',
        key: 'buyer_price_per_quintal',
    },
    {
        title: 'Total',
        dataIndex: 'seller_final_price',
        key: 'seller_final_price',
    },
    {
        title: 'Seller',
        dataIndex: 'seller_id',
        key: 'seller_id',
        ellipsis: {
            showTitle: false,
        },
        render: (seller_id: string) => {
            const actualID = parseIDfromHash(seller_id)
            return (
                <Tooltip placement="topLeft" title={maskData(actualID)}>
                    <Text underline>{maskData(actualID)}</Text>
                </Tooltip>
            );
        },
    },
    {
        title: 'Location',
        dataIndex: 'seller_location',
        key: 'seller_location',
    },
    // {
    //     title: 'Additional',
    //     key: 'termsAndConditions',
    //     dataIndex: 'termsAndConditions',
    //     render: () => {
    //         return (
    //             <>
    //                 <Button type="link">Additional Info</Button>
    //             </>
    //         );
    //     },
    // },
    {
        title: 'Status',
        key: 'transactionStatusText',
        dataIndex: 'transactionStatusText',
    },
];
