import React from 'react';
import { Button, Image, Typography } from 'antd';
import { ProduceModel } from '../../store/buyerReducer/types';
import RagiImg from '../../static/assets/ragi.png'
import ViewTerms from '../../terms-and-conditions/viewTerms';

const { Title } = Typography;

export const producColumns = [
    {
        title: 'Produce',
        dataIndex: 'cropName',
        key: 'cropName',
        render: (cropName: string, record: ProduceModel) => {
            const {category, sub_type: subType} = record;
            return (
                <div className='display-flex-row align-center'>
                    <Image
                        src={RagiImg}
                    />
                    <div className='margin-l-r-1em'>
                        <Title level={5}>{category}</Title>
                        <p>{subType}</p>
                    </div>
                </div>
            );
        },
    },
    {
        title: 'Grade',
        dataIndex: 'grade',
        key: 'grade'
    },
    {
        title: 'Quantity Required',
        dataIndex: 'quantity',
        key: 'quantity'
    },
    {
        title: 'Delivery By',
        dataIndex: 'delivery_by',
        key: 'delivery_by',
        render: (delivery_by: string) => {
            const dateObj = new Date(delivery_by)
            return dateObj.toLocaleDateString();
        }
    },
    {
        title: 'Additional',
        key: 'termsAndConditions',
        dataIndex: 'termsAndConditions',
        render: (termsAndConditions: string) => {
            return (
                <>
                    <ViewTerms displayType="buyer" content="Terms & Conditions" />                
                </>
            );
        },
    },
    {
        title: '',
        key: 'action',
        render: (text: string, record: ProduceModel) => {
            return (
                <>
                    <Button type="link">
                        Edit
                    </Button>
                    <Button type="link" danger>
                        Delete
                    </Button>
                </>
            );
        },
    },
];
