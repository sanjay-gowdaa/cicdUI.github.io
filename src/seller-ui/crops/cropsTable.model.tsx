import React from 'react';
import { Button, Image, Progress,  Statistic, Typography } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

import { ApmcRateChangeModel, CropApiModel } from '../../store/sellerReducer/types';
import RagiImg from '../../static/assets/ragi.png';

const { Title } = Typography;

export const cropColumns = [
    {
        title: 'Crop',
        dataIndex: 'crop_name',
        key: 'crop_name',
        render: (cropName: string, record: CropApiModel) => {
            return (
                <div className="display-flex-row align-center">
                    <Image src={RagiImg} />
                    <div className="margin-l-r-1em">
                        <Title level={5}>{cropName}</Title>
                        <p>{record?.sub_category}</p>
                    </div>
                </div>
            );
        },
    },
    {
        title: 'Grade',
        dataIndex: 'crop_grade',
        key: 'crop_grade',
    },
    {
        title: 'Qunatity Remaining',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity: number) => {
            return (
                <>
                    <p>{quantity} qtl</p>
                    <Progress percent={100} showInfo={false} />
                </>
            );
        },
    },
    {
        title: 'Price per qtl',
        dataIndex: 'price_per_qnt',
        key: 'price_per_qnt',
    },
    // {
    //     title: 'Live APMC Rates per qtl',
    //     dataIndex: 'apmcRate',
    //     key: 'apmcRate',
    //     render: (apmcRate: number, record: CropModel) => {
    //         const { apmcRateChange } = record;
    //         const { difference, increase } = apmcRateChange as ApmcRateChangeModel;
    //         const color = increase ? '#12805C' : '#E90000';
    //         return (
    //             <>
    //                 <p>{apmcRate}</p>
    //                 <Statistic
    //                     value={difference}
    //                     valueStyle={{ color, fontSize: '12px' }}
    //                     prefix={increase ? <CaretUpOutlined /> : <CaretDownOutlined />}
    //                 />
    //             </>
    //         );
    //     },
    // },
    {
        title: 'Intent To Sell',
        dataIndex: 'intent_to_sell',
        key: 'intent_to_sell',
        render: (intentToSell: boolean) => <p>{intentToSell ? 'Yes' : 'No'}</p>,
    },
    {
        title: 'Additional',
        key: 'terms_and_conditions',
        dataIndex: 'terms_and_conditions',
        render: (termsAndConditions: string, record: CropApiModel) => {
            // const {} = record;
            return (
                <>
                    <div>
                        <a href={termsAndConditions} target="_blank">
                            Terms & Conditions
                        </a>
                    </div>
                    <div>
                        <a href={termsAndConditions} target="_blank">
                            Crop Photos
                        </a>
                    </div>
                </>
            );
        },
    },
    {
        title: '',
        key: 'action',
        render: (text: string, record: CropApiModel) => {
            const { intent_to_sell } = record;
            return intent_to_sell ? null : (
                <>
                    <Button type="link" block>
                        Edit
                    </Button>
                    <Button type="link" danger block>
                        Delete
                    </Button>
                </>
            );
        },
    },
];
