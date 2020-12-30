import React from 'react';
import { Button, Image, Modal, Progress, Skeleton, Space, Statistic, Typography } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

import { CropApiModel } from '../../store/sellerReducer/types';
import RagiImg from '../../static/assets/ragi.png';
import ConfirmOTPModal from '../../login-ui/register/confirmOTPModal';

const { Title } = Typography;

const viewCropPhotos = (cropList: any) => {
    Modal.info({
        title: 'Crop Photos',
        className: "custom-view-crop-photos-modal",
        content: displayImage(cropList)
    });
};

const displayImage = (cropList: any) => {
    const {crop_image_1} = cropList || [];
    const {crop_image_2} = cropList || [];
    const {crop_image_3} = cropList || [];
    const {crop_image_4} = cropList || [];
    const {crop_image_5} = cropList || [];

    return (
        <Space direction="vertical">
            <Image.PreviewGroup>
            {(crop_image_1 === undefined) ? <Skeleton.Image /> : <Image width={200} height={200} src={crop_image_1} /> }
            {(crop_image_2 === undefined) ? <Skeleton.Image /> : <Image width={200} height={200} src={crop_image_2} /> }
            {(crop_image_3 === undefined) ? <Skeleton.Image /> : <Image width={200} height={200} src={crop_image_3} /> }
            {(crop_image_4 === undefined) ? <Skeleton.Image /> : <Image width={200} height={200} src={crop_image_4} /> }
            {(crop_image_5 === undefined) ? <Skeleton.Image /> : <Image width={200} height={200} src={crop_image_5} /> }
            </Image.PreviewGroup>
        </Space>)
}

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
            const {crop_name} = record;
            return (
                <>
                    <div>
                        <a href={termsAndConditions} target="_blank">
                            Terms & Conditions
                        </a>
                    </div>
                    <div>
                        {/* <a href={termsAndConditions} target="_blank">
                            Crop Photos
                        </a> */}
                        <Button type="link" onClick={() => viewCropPhotos(record)} >
                            Crop Photos
                        </Button>
                        {console.log(record)}
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
