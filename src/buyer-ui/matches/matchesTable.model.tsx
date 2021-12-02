import React from 'react';
import { Button, Image, Modal, Typography } from 'antd';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

import { FullfillmentFlags, MatchRequirementModel } from '../../buyer-seller-commons/types';
import { parseIDfromHash, maskData } from '../../app-components/utils';
import { showCropImage } from '../../buyer-seller-commons/constants';
import confirmationPopup from '../../buyer-seller-commons/confirmationPopup';
import { componentCallBacksModel } from '../../buyer-seller-commons/matches';
import ConnectMatches from '../../buyer-seller-commons/matches/connectMatches';

const { Title, Text } = Typography;

export const getTransactionDataStructure = (cropDetails: MatchRequirementModel) => {
    const {
        fulfillment_flag, produce, matched_quantity, seller_crop_id, seller_id, seller_quantity,
        seller_final_price, seller_price, location, seller_facilitation_cost, seller_transportation_cost,
        seller_price_per_quintal, buyer_id, buyer_crop_id, buyer_location, buyer_facilitation_cost,
        buyer_transportation_cost, buyer_final_price, buyer_actual_quantity, buyer_price_per_quintal
    } = cropDetails;

    const transactionEntry = {
        transaction_type: fulfillment_flag,
        matched_quantity,
        produce,
        grade: '111',
        buyer: [{
            buyer_id,
            buyer_location,
            buyer_quantity: buyer_actual_quantity,
            buyer_price: 0,
            buyer_final_price,
            buyer_transportation_cost,
            buyer_facilitation_cost,
            buyer_crop_id,
            buyer_price_per_quintal
        }],
        seller: [{
            seller_id,
            seller_location: location,
            seller_quantity,
            seller_price,
            seller_transportation_cost,
            seller_facilitation_cost,
            seller_final_price,
            seller_crop_id,
            seller_price_per_quintal
        }]
    };

    return transactionEntry;
};

export const displayMatchSuccessModal = () => {
    return Modal.success({
        className: 'match-success-modal',
        icon: '',
        centered: true,
        title: <CheckCircleFilled className='match-success-icon' />,
        content: (
            <>
                <Title className='text-align-center' level={5}>
                    Request has been sent to seller
                </Title>
                <Title className='text-align-center' level={5}>
                    You will be notified from Vikasbandhu once the seller accepts/ rejects
                </Title>
            </>),
        okText: 'Done',
        okButtonProps: { type: 'default' }
    });
};

export const displayConcurrentMatchError = () => {
    return Modal.error({
        className: 'match-success-modal',
        icon: '',
        centered: true,
        title: <ExclamationCircleFilled className='match-error-icon' />,
        content: (
            <>
                <p className='modal-info-text'>
                    This request has timed out and is no longer valid.
                </p>
                <p className='modal-info-text' >
                    Vikasbandhu will search for a new seller
                </p>
            </>),
        okText: 'Ok',
        okButtonProps: { type: 'text' }
    });
};

export const matchesBuyerColumns = (componentCallBacks: componentCallBacksModel) => [
    {
        title: 'Seller Id',
        dataIndex: 'seller_id',
        key: 'seller_id',
        render: (seller_id: string) => {
            return (
                <Text underline>{maskData(parseIDfromHash(seller_id))}</Text>
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
                <div className='display-flex-row align-center'>
                    {!record?.isChild && <Image src={imageSrc} className='table-crop-image' />}
                    <div className='margin-l-r-1em'>
                        <Title className='more-matches-text' level={5}>
                            {produceCateogry.trim()} - {cropType.trim()}
                        </Title>
                        <Text className='more-matches-text'>{grade.trim()}</Text>
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
            // const fullFillment = record.fulfillment_flag === FullfillmentFlags.single_fulfillment;
            const FulfilmentComp = () => (!record.hasMultipleFullfillMent ? <Text className='full-match'>FULL</Text> :
                <Text className='partial-match'>PARTIAL</Text>
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
                <div className='display-flex-row'>
                    <Button
                        className='view-details-button'
                        type='link'
                        onClick={() => {
                            populateCropDetails(record);
                            showCropDetailsModal(true);
                        }}
                    >
                        View Details
                    </Button>
                    <ConnectMatches cropDetails={record} />
                    {!record?.isChild &&
                        <Button
                            className='reject-button'
                            type='link'
                            danger
                            onClick={() => confirmationPopup('reject', rejectMatch, record)}
                        >
                            Reject
                        </Button>
                    }
                </div>
            );
        },
    },
];
