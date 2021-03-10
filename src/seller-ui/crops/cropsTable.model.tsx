import React from 'react';
import { Button, Image, Modal, Progress, Statistic, Typography } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

import { CropApiModel } from '../../store/sellerReducer/types';
import RagiImg from '../../static/assets/ragi.png';
import ViewCropImages from './viewCropImages';
import { isEmpty } from 'lodash';

const { Title, Text } = Typography;

const getCropId = (cropID: string) => {
    const indexOfHash = cropID.indexOf('#');
    const actualCropID = indexOfHash > 0 ? cropID.substr(indexOfHash+1) : '';
    return actualCropID;
}

const openAdditionalInfo = (content: any) => {
    Modal.info({
        title: 'Additional Info',
        content: `${content}`,
        okText: 'Ok',
        icon: null
    });
};

type cropColumnsCallback = {
    deleteCrop: any;
    prepareForEditCrop: any;
    setIsEdit: any;
    isEdit: boolean;
    currentCropId: string;
    updateCropDetails: any;
}

export const cropColumns = ({
        deleteCrop,
        prepareForEditCrop,
        updateCropDetails,
        setIsEdit,
        isEdit,
        currentCropId
    }: cropColumnsCallback) => [
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
        render: (quantity: string) => {
            //Temporarily
            const fullQuantity = quantity;
            
            return (
                <>
                    <p style={{margin: "0"}} >{quantity ? quantity.replace(/^0+/, '') : ''} qtl</p>
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
        render: (price_per_qnt: string) => <> { price_per_qnt ? price_per_qnt.replace(/^0+/, '') : '' }</>,
        onCell: (record: CropApiModel) => ({
            record,
            editable: currentCropId === getCropId(record.sk || ''),
            dataIndex: 'price_per_qnt',
            isEdit,
            handleSave: (record: CropApiModel) => updateCropDetails(record),
        }),
    },
    {
        title: 'Live APMC Rates per qtl',
        dataIndex: 'apmc_rate_data',
        key: 'apmc_rate_data',
        render: (apmc_rate_data: {apmc_price: string, increase: string}, record: CropApiModel) => {
            const { intent_to_sell: intentToSell } = record;
            const { apmc_price, increase } = apmc_rate_data || {apmc_price: null, increase: null};
            if (intentToSell.toLowerCase() === 'yes') {
                return (<>-</>)
            } else {
                const isIncrease = parseInt(increase) > 0;
                const color = isIncrease ? '#12805C' : '#E90000';

            if (!apmc_price) {
                return ( <>Data not available</> )
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
        key: 'intent_to_sell',
        render: (intentToSell: string) => intentToSell.toUpperCase(),
        onCell: (record: CropApiModel) => ({
            record,
            editable: currentCropId === getCropId(record.sk || ''),
            dataIndex: 'intent_to_sell',
            isEdit,
            handleSave: (record: CropApiModel) => updateCropDetails(record),
        }),
    },
    {
        title: 'Additional',
        key: 'additional_info',
        dataIndex: 'additional_info',
        width: '10%',
        render: (additional_info: string, record: CropApiModel) => {
            return (
                <>
                    <Button
                        type="link"
                        disabled={isEmpty(additional_info)}
                        onClick={() => openAdditionalInfo(additional_info)}
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
        width: '5%',
        onCell: (record: CropApiModel) => ({
            record,
            editable: currentCropId === getCropId(record.sk || ''),
            dataIndex: 'action',
            isEdit,
            setIsEdit,
            handleSave: (record: CropApiModel, isPriceUpdated: boolean) => updateCropDetails(record, isPriceUpdated),
        }),
        render: (text: string, record: CropApiModel) => {
            const { intent_to_sell } = record;
            return intent_to_sell.toLowerCase() === 'yes' ? null : (
                <>
                    <Button
                        type="link"
                        block
                        onClick={() => prepareForEditCrop(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link" 
                        danger
                        block
                        onClick={() => deleteCrop(record.sk)}
                    >
                        Delete
                    </Button>
                </>
            );
        },
    },
];
