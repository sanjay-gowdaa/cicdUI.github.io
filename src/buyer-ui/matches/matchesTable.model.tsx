import React from 'react';
import { Button, Image, Typography } from 'antd';

import { FullfillmentFlags, MatchRequirementModel } from '../../store/buyerReducer/types';
import RagiImg from '../../static/assets/ragi.png';
import ConnectMatch from './connectMatch';

const { Title, Text } = Typography;

export interface componentCallBacksModel {
    showCropDetailsModal: any;
    populateCropDetails: any;
    rejectMatch: any;
};

export const matchesColumns = (componentCallBacks: componentCallBacksModel) => [
    {
        title: 'Seller Id',
        dataIndex: 'seller_id',
        key: 'seller_id',
        render: (seller_id: string) => {
            return (
                <>
                    <Text underline>{seller_id}</Text>
                </>
            );
        },
    },
    {
        title: 'Produce',
        dataIndex: 'produce',
        key: 'produce',
        render: (produce: string, record: MatchRequirementModel) => {
            const [masterCategory = '', produceCateogry = '', cropType = '', grade = ''] = produce.split('-')
            return (
                <div className="display-flex-row align-center">
                    <Image src={RagiImg} />
                    <div className="margin-l-r-1em">
                        <Title level={5}>{produceCateogry.trim()} - {cropType.trim()}</Title>
                        <p>{grade.trim()}</p>
                    </div>
                </div>
            );
        },
    },
    {
        title: 'Quantity Available',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity: number, record: MatchRequirementModel) => {
            const fullFillment = record.fulfillment_flag === FullfillmentFlags.single_fulfillment;
            const FulfilmentComp = () => (fullFillment ? <Text className="full-match">FULL</Text> :
                <Text className="partial-match">PARTIAL</Text>
            )
            const quantityDisp = (fullFillment ? record.buyer_actual_quantity : record.buyer_actual_quantity - (record.seller_quantity || 0))
            return (
                <>
                    <div>{`${quantityDisp} Qtl`}</div>
                    <FulfilmentComp /> 
                </>
            );
        },
    },
    {
        title: 'Total price',
        dataIndex: 'seller_final_price',
        key: 'seller_final_price',
        render: (seller_final_price: number) => {
            return (
                <>
                    {seller_final_price}
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
        title: '',
        key: 'action',
        render: (text: any, record: MatchRequirementModel) => {
            const {populateCropDetails, showCropDetailsModal, rejectMatch} = componentCallBacks;
            return (
                <div className="display-flex-row">
                    <Button
                        type="link"
                        onClick={() => {
                            populateCropDetails(record);
                            showCropDetailsModal(true);
                        }}
                    >
                        View Details
                    </Button>
                    <ConnectMatch cropDetails={record} />
                    <Button
                        type="link"
                        danger
                        onClick={() => rejectMatch(record)}
                    >
                        Reject
                    </Button>
                </div>
            );
        },
    },
];
