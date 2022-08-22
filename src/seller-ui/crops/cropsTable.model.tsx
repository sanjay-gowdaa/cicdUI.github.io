import React from 'react';
import { Button, Image, Progress, Statistic, Typography } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { isEmpty, isUndefined } from 'lodash';

import { CropApiModel } from '../../store/sellerReducer/types';
import { parseIDfromHash } from '../../app-components/utils';
import { showCropImage } from '../../buyer-seller-commons/constants';
import confirmationPopup from '../../buyer-seller-commons/confirmationPopup';
import { openAdditionalInfo } from '../../buyer-seller-commons/openAdditionalInfo';
import ViewCropImages from '../../buyer-seller-commons/viewCropImages';
import { EditAdditionalInfo } from '../../buyer-seller-commons/editAdditionalInfo';

const { Text, Title } = Typography;

const getCropId = (cropID: string) => {
    return parseIDfromHash(cropID);
};

type cropColumnsCallback = {
    deleteCrop: any;
    prepareForEditCrop: any;
    setIsEdit: any;
    isEdit: boolean;
    currentCropId: string;
    updateCropDetails: any;
};

export const cropColumns = ({
    deleteCrop,
    prepareForEditCrop,
    updateCropDetails,
    setIsEdit,
    isEdit,
    currentCropId
}: cropColumnsCallback) =>
    [
        {
            title: 'Produce',
            dataIndex: 'crop_name',
            key: 'crop_name',
            render: (cropName: string, record: CropApiModel) => {
                const { category_name } = record;
                const imageSrc = showCropImage(category_name);

                return (
                    <div className='display-flex-row align-center'>
                        <Image className='table-crop-image' src={imageSrc} />
                        <div className='margin-l-r-1em'>
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
            onCell: (record: CropApiModel) => ({
                record,
                editable: currentCropId === getCropId(record.sk || ''),
                dataIndex: 'quantity',
                isEdit,
                handleSave: (record: CropApiModel) => updateCropDetails(record),
            }),
            render: (quantity: string, record: CropApiModel) => {
                const { currently_fulfilled_qty = 0 } = record;
                const quantityNum = parseInt(quantity, 10);
                const percentageQty = (currently_fulfilled_qty / quantityNum) * 100;
                const currentReqQty = quantityNum - currently_fulfilled_qty;
                return (
                    <React.Fragment>
                        <p>{currentReqQty} qtl</p>
                        <Progress
                            strokeColor='#12805C'
                            percent={100 - percentageQty}
                            status='active'
                            format={() => `${quantity} qtl`}
                        />
                    </React.Fragment>
                );
            }
        },
        {
            title: 'Price per qtl',
            dataIndex: 'price_per_qnt',
            key: 'price_per_qnt',
            render: (price_per_qnt: string) => <> {price_per_qnt ? price_per_qnt.replace(/^0+/, '') : ''}</>,
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
            render: (apmc_rate_data: { apmc_price: string, increase: string, is_actual: boolean }, record: CropApiModel) => {
                const { intent_to_sell: intentToSell } = record;
                const { apmc_price, increase, is_actual } = apmc_rate_data || { apmc_price: null, increase: null, is_actual: false };
                if (intentToSell.toLowerCase() === 'yes') {
                    return (<>-</>)
                } else {
                    const isIncrease = parseInt(increase) > 0;
                    const color = isIncrease ? '#12805C' : '#E90000';

                    if (!apmc_price) {
                        return (<>Data not available</>)
                    } else {
                        return (
                            <React.Fragment>
                                <Text>
                                    {apmc_price}{!is_actual &&
                                        <Text style={{ color: 'red' }}>&nbsp;*</Text>
                                    }
                                </Text>
                                {!isNaN(parseInt(increase)) ?
                                    <Statistic
                                        value={parseInt(increase)}
                                        valueStyle={{ color, fontSize: '12px' }}
                                        prefix={isIncrease ? <CaretUpOutlined /> : <CaretDownOutlined />}
                                    /> : null
                                }

                            </React.Fragment>
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
            render: (additional_info: any, record: CropApiModel) => {
                const { intent_to_sell } = record;
                const cropImageList = {
                    crop_image_1: isUndefined(record?.crop_image_1) ? undefined : record?.crop_image_1,
                    crop_image_2: isUndefined(record?.crop_image_2) ? undefined : record?.crop_image_2,
                    crop_image_3: isUndefined(record?.crop_image_3) ? undefined : record?.crop_image_3,
                    crop_image_4: isUndefined(record?.crop_image_4) ? undefined : record?.crop_image_4,
                    crop_image_5: isUndefined(record?.crop_image_5) ? undefined : record?.crop_image_5
                };

                return (
                    <React.Fragment>
                        <Button
                            type='link'
                            disabled={/* intent_to_sell.toLowerCase() === 'yes' &&  */isEmpty(additional_info)}
                            onClick={() => {openAdditionalInfo(additional_info);
                            console.log(additional_info)}}
                        >
                            Additional Info
                        </Button>
                        <Button
                            type='link'
                            disabled={intent_to_sell.toLowerCase() === 'yes' && isEmpty(additional_info)}
                            onClick={() => EditAdditionalInfo(record,updateCropDetails) }
                        >
                            Edit Additional Info
                        </Button>
                        <ViewCropImages list={cropImageList} disablePhotos={intent_to_sell.toLowerCase() !== 'yes'} />
                    </React.Fragment>
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
                    <React.Fragment>
                        <Button
                            type='link'
                            block
                            onClick={() => prepareForEditCrop(record)}
                        >
                            Edit
                        </Button>
                        <Button
                            type='link'
                            danger
                            block
                            onClick={() => confirmationPopup('delete', deleteCrop, record.sk)}
                        >
                            Delete
                        </Button>
                    </React.Fragment>
                );
            },
        },
    ];
