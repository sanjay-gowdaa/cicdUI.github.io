import React from 'react';
import { Button, Image, Typography } from 'antd';

import ConnectMatch from './connectMatch';

import { FullfillmentFlags, MatchRequirementModel } from '../../buyer-seller-commons/types';
import { parseIDfromHash, maskData } from '../../app-components/utils';
import { showCropImage } from '../../buyer-seller-commons/constants';

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
                    <Text underline>{maskData(parseIDfromHash(seller_id))}</Text>
                </>
            );
        },
    },
    {
        title: 'Produce',
        dataIndex: 'produce',
        key: 'produce',
        render: (produce: string, record: MatchRequirementModel) => {
            const [masterCategory = '', produceCateogry = '', cropType = '', grade = ''] = produce.split('-');
            const imageSrc = showCropImage(masterCategory);

            return (
                <div className="display-flex-row align-center">
                    <Image src={imageSrc} className="table-crop-image" />
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
        dataIndex: 'matched_quantity',
        key: 'matched_quantity',
        render: (matched_quantity: number, record: MatchRequirementModel) => {
            const fullFillment = record.fulfillment_flag === FullfillmentFlags.single_fulfillment;
            const FulfilmentComp = () => (fullFillment ? <Text className="full-match">FULL</Text> :
                <Text className="partial-match">PARTIAL</Text>
            )
            // const quantityDisp = calculateQty(record);
            return (
                <>
                    <div>{`${matched_quantity} Qtl`}</div>
                    <FulfilmentComp />
                </>
            );
        },
    },
    {
        title: 'Total price',
        dataIndex: 'buyer_final_price',
        key: 'buyer_final_price'
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
            const { populateCropDetails, showCropDetailsModal, rejectMatch } = componentCallBacks;

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
