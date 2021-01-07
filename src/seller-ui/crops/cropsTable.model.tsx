import React from 'react';
import { Button, Image, Progress, Statistic, Typography } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

import { CropApiModel } from '../../store/sellerReducer/types';
import RagiImg from '../../static/assets/ragi.png';
import ViewCropImages from './viewCropImages';

const { Title, Text } = Typography;

export const cropColumns = [
    {
        title: 'Produce*',
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
            //Temporarily
            const fullQuantity = quantity;
            const element = document.getElementsByClassName("seller-quantity-remaining");
            var move = 0;
            
            const demo = () => {
                move = move + 1;
                for(let i=0; i<element.length; i++) {
                    console.log(element[i].parentElement?.classList);
                    element[i].parentElement?.classList.add("custom-table-cell");
                    console.log(element[i].parentElement?.classList);
                }
            }

            return (
                <>
                    <p className="seller-quantity-remaining" style={{margin: "0"}} onMouseMove={() => {if(move === 0)demo()}} >{quantity} qtl</p>
                    <Progress className="custom-progress-bar" percent={100} showInfo={false} strokeColor="#12805C" />
                    <Text style={{color: "#999999", fontSize: "smaller"}}>{fullQuantity} qtl</Text>
                </>
            );
        },
    },
    {
        title: 'Price per qtl',
        dataIndex: 'price_per_qnt',
        key: 'price_per_qnt',
    },
    {
        title: 'Live APMC Rates per qtl',
        dataIndex: 'modal_price',
        key: 'modal_price',
        render: (modal_price: number, record: CropApiModel) => {
            const { price_per_qnt, intent_to_sell: intentToSell } = record;
            if (intentToSell === 'Yes') {
                return (<p>-</p>)
            } else {
            const differencePrice = modal_price - price_per_qnt
            const color = differencePrice > 0 ? '#12805C' : '#E90000';

            if (isNaN(differencePrice)) {
                return ( <p>Data not available</p> )
            } else {
                return (
                    <>
                        <p>{modal_price}</p>
                        <Statistic
                            value={differencePrice}
                            valueStyle={{ color, fontSize: '12px' }}
                            prefix={differencePrice > 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        />
                    </>
                );
            }
        }
        },
    },
    {
        title: 'Intent To Sell',
        dataIndex: 'intent_to_sell',
        key: 'intent_to_sell'
    },
    {
        title: 'Additional',
        key: 'terms_and_conditions',
        dataIndex: 'terms_and_conditions',
        render: (termsAndConditions: string, record: CropApiModel) => {
            return (
                <>
                    <div>
                        <a href={termsAndConditions} target="_blank">
                            Terms & Conditions
                        </a>
                    </div>
                    <div>
                        <ViewCropImages list={record} />
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
