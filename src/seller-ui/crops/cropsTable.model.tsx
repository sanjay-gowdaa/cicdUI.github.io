import React from 'react';
import { Button, Image, Modal, Progress, Statistic, Typography } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

import { CropApiModel } from '../../store/sellerReducer/types';
import RagiImg from '../../static/assets/ragi.png';
import ViewCropImages from './viewCropImages';

const { Title, Text } = Typography;

export const cropColumns = [
    {
        title: 'Produce',
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
        dataIndex: 'grade',
        key: 'grade'
    },
    {
        title: 'Qunatity Remaining',
        dataIndex: 'quantity',
        key: 'quantity',
        className: 'seller-quantity-remaining',
        render: (quantity: number) => {
            //Temporarily
            const fullQuantity = quantity;
            
            return (
                <>
                    <p style={{margin: "0"}} >{quantity} qtl</p>
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
        dataIndex: 'apmc_rate_data',
        key: 'apmc_rate_data',
        render: (apmc_rate_data: {apmc_price: string, increase: string}, record: CropApiModel) => {
            const { intent_to_sell: intentToSell } = record;
            const { apmc_price, increase } = apmc_rate_data || {apmc_price: null, increase: null};
            if (intentToSell === 'Yes') {
                return (<p>-</p>)
            } else {
                const isIncrease = parseInt(increase) > 0;
                const color = isIncrease ? '#12805C' : '#E90000';

            if (!apmc_price) {
                return ( <p>Data not available</p> )
            } else {
                return (
                    <>
                        <p>{apmc_price}</p>
                        {
                            !isNaN(parseInt(increase)) ? (<Statistic
                                value={parseInt(increase)}
                                valueStyle={{ color, fontSize: '12px' }}
                                prefix={isIncrease ? <CaretUpOutlined /> : <CaretDownOutlined />}
                            />) : null
                        }

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
        key: 'additional_info',
        dataIndex: 'additional_info',
        render: (additional_info: string, record: CropApiModel) => {
            const openAdditionalInfo = () => {
                {
                    additional_info !== "" &&
                    Modal.info({
                        title: 'Additional Info',
                        content: `${additional_info}`,
                        okText: 'Ok',
                        icon: null
                    });
                }
            };
            
            return (
                <>
                    <Button
                        type="link"
                        disabled={additional_info === ""}
                        onClick={openAdditionalInfo}
                    >
                        Additional Info
                    </Button>
                    <ViewCropImages list={record} />
                </>
            );
        },
    },
    {
        title: '',
        key: 'action',
        render: (record: CropApiModel) => {
            const { intent_to_sell } = record;
            return intent_to_sell === 'Yes' ? null : (
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
