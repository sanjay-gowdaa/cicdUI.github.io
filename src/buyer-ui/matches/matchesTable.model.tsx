import React from 'react';
import { Button, Image, Typography } from 'antd';
import RagiImg from '../../static/assets/ragi.png';
import ConnectMatch from './connectMatch';
import { FullfillmentFlags, MatchRequirementModel } from '../../buyer-seller-commons/types';
import { parseIDfromHash, maskData } from '../../app-components/utils';

const { Title, Text } = Typography;

// const calculateQty = (record: MatchRequirementModel) => {
//     const {buyer_actual_quantity, seller_quantity, fulfillment_flag} = record;
//     switch(fulfillment_flag) {
//         case FullfillmentFlags.single_fulfillment:
//             return buyer_actual_quantity
        
//         default:
//             return seller_quantity;
//     }
// }

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
        dataIndex: 'seller_final_price',
        key: 'seller_final_price'
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
