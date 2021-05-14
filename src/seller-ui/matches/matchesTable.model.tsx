import React from 'react';
import { Button, Image, Typography, Modal } from 'antd';
import RagiImg from '../../static/assets/ragi.png';
import AcceptMatch from './acceptMatch';
import { MatchRequirementModel } from '../../buyer-seller-commons/types';
import { parseIDfromHash, maskData } from '../../app-components/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import RejectConfrimation from './rejectConfirmation';

const { Title, Text } = Typography;

export interface componentCallBacksModel {
    showCropDetailsModal: any;
    populateCropDetails: any;
    rejectMatch: any;
};

export const matchesColumns = (componentCallBacks: componentCallBacksModel) => [
    {
        title: 'Buyer Id',
        dataIndex: 'buyer_id',
        key: 'buyer_id',
        render: (buyer_id: string) => {
            return (
                <>
                    <Text underline>{maskData(parseIDfromHash(buyer_id))}</Text>
                </>
            );
        },
    },
    {
        title: 'Produce',
        dataIndex: 'produce',
        key: 'produce',
        render: (produce: string, record: MatchRequirementModel) => {
            return (
                <div className="display-flex-row align-center">
                    <Image src={RagiImg} />
                    <div className="margin-l-r-1em">
                        <p>{produce}</p>
                    </div>
                </div>
            );
        },
    },
    {
        title: 'Qunatity Required',
        dataIndex: 'matched_quantity',
        key: 'matched_quantity',
        render: (matched_quantity: number, record: MatchRequirementModel) => {
            const {seller_quantity} = record;
            const isPartial = matched_quantity < seller_quantity;
            
            return (
                <>
                    <p style={{margin:"0"}}>{matched_quantity} qtl</p>
                    {isPartial ? <Text className="partial-match">PARTIAL</Text> : <Text className="full-match">FULL</Text>}
                </>
            );
        },
    },
    {
        title: 'Location',
        dataIndex: 'buyer_location',
        key: 'buyer_location',
    },
    {
        title: 'Additional',
        key: 'additional_info',
        dataIndex: 'additional_info',
        render: () => {
            return (
                <>
                    <Button type="link">Package Details</Button>
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
                    <AcceptMatch cropDetails={record} />
                    <Button 
                        type="link"
                        danger
                        onClick={() => {
                            Modal.confirm({
                                title: '',
                                icon: <ExclamationCircleOutlined />,
                                content: <RejectConfrimation  matchRecord={record} />,
                                onOk() {
                                    componentCallBacks?.rejectMatch(record);
                                  },
                                  onCancel() {},
                            })
                        }}
                    >
                        {' '}
                        Reject{' '}
                    </Button>
                </div>
            );
        },
    },
];
