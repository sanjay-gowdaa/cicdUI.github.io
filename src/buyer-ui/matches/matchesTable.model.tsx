import React from 'react';
import { Button, Image, Typography } from 'antd';

import { MatchRequirementModel } from '../../store/buyerReducer/types';
import RagiImg from '../../static/assets/ragi.png'
import PrimaryBtn from '../../app-components/primaryBtn';
import ViewTerms from '../../terms-and-conditions/viewTerms';

const { Title, Text } = Typography;

export interface componentCallBacksModel {
    showCropDetailsModal: Function;
    populateCropDetails: Function;
};

export const matchesColumns = (componentCallBacks: componentCallBacksModel) => [
    {
        title: 'Seller Id',
        dataIndex: 'sellerId',
        key: 'sellerId',
        render: (sellerId: string) => {
            return (
                <>
                    <Text underline>{sellerId}</Text>
                </>
            );
        },
    },
    {
        title: 'Produce',
        dataIndex: 'cropName',
        key: 'cropName',
        render: (cropName: string, record: MatchRequirementModel) => {
            return (
                <div className="display-flex-row align-center">
                    <Image src={RagiImg} />
                    <div className="margin-l-r-1em">
                        <Title level={5}>{cropName} - {record?.subCategory}</Title>
                        <p>{record?.cropGrade}</p>
                    </div>
                </div>
            );
        },
    },
    {
        title: 'Quantity Available',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity: number) => {
            return (
                <>
                    <p>{'Full'} - {quantity} Qtl</p>
                </>
            );
        },
    },
    {
        title: 'Total price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (totalPrice: any, record: MatchRequirementModel) => {
            const {pricePerQnt, quantityRequired} = record
            return (
                <>
                    <p>{quantityRequired*pricePerQnt}</p>
                </>
            );
        },
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Additional',
        key: 'termsAndConditions',
        dataIndex: 'termsAndConditions',
        render: (termsAndConditions: string) => {
            return (
                <>
                    <ViewTerms displayType="buyer" content="View Terms" />
                </>
            );
        },
    },
    {
        title: '',
        key: 'action',
        render: (text: any, record: MatchRequirementModel) => {
            return (
                <div className="display-flex-row">
                    <Button
                        type="link"
                        onClick={() => {
                            componentCallBacks?.populateCropDetails(record);
                            componentCallBacks?.showCropDetailsModal(true);
                        }}
                    >
                        View Details
                    </Button>
                    <PrimaryBtn
                        className="vikas-btn-radius"
                        content="Connect"
                    />
                    <Button type="link" danger>
                        {' '}
                        Reject{' '}
                    </Button>
                </div>
            );
        },
    },
];
