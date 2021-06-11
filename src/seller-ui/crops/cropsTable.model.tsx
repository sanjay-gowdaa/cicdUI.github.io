import React from 'react';
import { Button, Image, Modal, Progress, Statistic, Typography } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

import { CropApiModel } from '../../store/sellerReducer/types';
import RagiImg from '../../static/assets/ragi.png';
import ViewCropImages from './viewCropImages';
import { isEmpty } from 'lodash';
import { parseIDfromHash } from '../../app-components/utils';

const { Title, Text } = Typography;

const getCropId = (cropID: string) => {
    return parseIDfromHash(cropID);
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
        title: 'Quantity Remaining',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity: string, record: CropApiModel) => {
            const {currently_fulfilled_qty = 0} = record;
            const quantityNum = parseInt(quantity, 10);
            const percentageQty = (currently_fulfilled_qty/quantityNum)*100;
            const currentReqQty = quantityNum - currently_fulfilled_qty;
            return (
                <>
                    <p>{currentReqQty} qtl</p>
                    <Progress
                        strokeColor='#12805C'
                        percent={percentageQty}
                        status="active"
                        format={() => `${quantity} qtl`}
                    />
                </>
            )
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
