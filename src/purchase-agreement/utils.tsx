import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export const columns = [
    {
        title: 'Seller',
        dataIndex: 'seller',
        key: 'seller',
        render: (text: string) => <Text>{text}</Text>
    },
    {
        title: 'Buyer',
        dataIndex: 'buyer',
        key: 'buyer',
        render: (text: string) => <Text>{text}</Text>
    }
];

export const data = [
    {
        key: '1',
        seller: '',
        buyer: ''
    },
    {
        key: '2',
        seller: '',
        buyer: ''
    }
];
