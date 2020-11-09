import React from 'react';
import { Typography, Button } from 'antd';
import { MatchRequirementModel } from '../../store/sellerReducer/types';

const { Title, Text } = Typography;
export interface componentCallBacksModel {
    showCropDetailsModal: Function;
    populateCropDetails: Function;
}

export const matchesColumns = (componentCallBacks: componentCallBacksModel) => [
    {
        title: 'Buyer Id',
        dataIndex: 'buyerId',
        key: 'buyerId',
        render: (buyerId: string) => {
            return (
                <>
                    <Text underline>{buyerId}</Text>
                </>
            );
        },
    },
    {
        title: 'Crop',
        dataIndex: 'cropName',
        key: 'cropName',
        render: (cropName: string, record: MatchRequirementModel) => {
            return (
                <>
                    <Title level={5}>{cropName}</Title>
                    <p>{record?.subCategory}</p>
                </>
            );
        },
    },
    {
        title: 'Grade',
        dataIndex: 'cropGrade',
        key: 'cropGrade',
    },
    {
        title: 'Qunatity Required',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity: number) => {
            return (
                <>
                    <p>{quantity} qtl</p>
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
                    <div>
                        <a href={termsAndConditions} target="_blank">
                            View Terms
                        </a>
                    </div>
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
                    <Button className="vikas-btn-radius" type="primary">
                        Accept
                    </Button>
                    <Button type="link" danger>
                        {' '}
                        Delete{' '}
                    </Button>
                </div>
            );
        },
    },
];
