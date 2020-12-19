import React from 'react';
import { Button, Image, Typography } from 'antd';

import { ProduceModel } from '../../store/buyerReducer/types';
import RagiImg from '../../static/assets/ragi.png'

const { Title } = Typography;

const CROP_INDEX = 1
const CROP_SUBTYPE_INDEX = 2
const GRADE_INDEX = 3

export const producColumns = [
    {
        title: 'Crop',
        dataIndex: 'cropName',
        key: 'cropName',
        render: (cropName: string, record: ProduceModel) => {
            const produceDetails = record.produceName.split('-');
            return (
                <div className='display-flex-row align-center'>
                    <Image
                        src={RagiImg}
                    />
                    <div className='margin-l-r-1em'>
                        <Title level={5}>{produceDetails[CROP_INDEX]}</Title>
                        <p>{produceDetails[CROP_SUBTYPE_INDEX]}</p>
                    </div>
                </div>
            );
        },
    },
    {
        title: 'Grade',
        dataIndex: 'gradeName',
        key: 'gradeName',
        render: (gradeName: string, record: ProduceModel) => {
            const produceDetails = record.produceName.split('-');
            return (
                <p>{produceDetails[GRADE_INDEX]}</p>
            );
        },
    },
    {
        title: 'Quantity Required',
        dataIndex: 'quantityReq',
        key: 'quantityReq'
    },
    {
        title: 'Delivery By',
        dataIndex: 'deliveryBy',
        key: 'deliveryBy',
        render: (deliveryBy: string) => {
            const dateObj = new Date(deliveryBy)
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
                    <a href={termsAndConditions} target="_blank">
                        Terms & Conditions
                    </a>                
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
