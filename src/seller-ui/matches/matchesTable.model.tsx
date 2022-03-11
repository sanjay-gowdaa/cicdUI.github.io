import React from 'react';
import { Button, Image, Typography, Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';

import RejectConfrimation from './rejectConfirmation';

import { MatchRequirementModel } from '../../buyer-seller-commons/types';
import { showCropImage } from '../../buyer-seller-commons/constants';
import { componentCallBacksModel } from '../../buyer-seller-commons/matches';
import ConnectMatches from '../../buyer-seller-commons/matches/connectMatches';
import ShowPreviousTransactions from '../../buyer-seller-commons/matches/showPreviousTransactions';
import { openAdditionalInfo } from '../../buyer-seller-commons/openAdditionalInfo';

const { Text } = Typography;

export const matchesSellerColumns = (componentCallBacks: componentCallBacksModel) => [
    {
        title: 'Buyer Id',
        dataIndex: 'destinyId',
        key: 'destinyId',
        render: (destinyId: string, record: MatchRequirementModel) => {
            return (
                <Space direction='vertical'>
                    <Text underline>{destinyId}</Text>
                    {record.count !== 0 &&
                        <ShowPreviousTransactions
                            count={record.count}
                            history={record.history}
                            userId={destinyId}
                        />
                    }
                </Space>
            );
        },
    },
    {
        title: 'Produce',
        dataIndex: 'produce',
        key: 'produce',
        render: (produce: string, record: MatchRequirementModel) => {
            const [masterCategory = ''] = produce.split('-');
            const imageSrc = showCropImage(masterCategory);

            return (
                <React.Fragment>
                    <div className='display-flex-row align-center'>
                        <Image className='table-crop-image' src={imageSrc} />
                        <div className='margin-l-r-1em'>
                            <p>{produce}</p>
                        </div>
                    </div>
                    {!isEmpty(record.additional_info) &&
                        <Button
                            type='link'
                            disabled={isEmpty(record.additional_info)}
                            onClick={() => openAdditionalInfo(record.additional_info)}
                        >
                            Additional Info
                        </Button>
                    }
                </React.Fragment>
            );
        },
    },
    {
        title: 'Quantity Required',
        dataIndex: 'matched_quantity',
        key: 'matched_quantity',
        render: (matched_quantity: number, record: MatchRequirementModel) => {
            const { seller_quantity } = record;
            const isPartial = matched_quantity < seller_quantity;

            return (
                <React.Fragment>
                    <p style={{ margin: '0' }}>{matched_quantity} qtl</p>
                    {isPartial ? <Text className='partial-match'>PARTIAL</Text> : <Text className='full-match'>FULL</Text>}
                </React.Fragment>
            );
        },
    },
    {
        title: 'Location',
        dataIndex: 'buyer_location',
        key: 'buyer_location',
    },
    {
        title: '',
        key: 'action',
        render: (record: MatchRequirementModel) => {
            return (
                <div className='display-flex-row'>
                    <Button
                        type='link'
                        className='view-details-button'
                        onClick={() => {
                            componentCallBacks?.populateCropDetails(record);
                            componentCallBacks?.showCropDetailsModal(true);
                        }}
                    >
                        View Details
                    </Button>
                    <ConnectMatches cropDetails={record} />
                    <Button
                        type='link'
                        danger
                        className='reject-button'
                        onClick={() => {
                            Modal.confirm({
                                title: '',
                                icon: <ExclamationCircleOutlined />,
                                content: <RejectConfrimation matchRecord={record} />,
                                onOk() {
                                    componentCallBacks?.rejectMatch(record);
                                },
                                onCancel() { },
                            })
                        }}
                    >
                        {' '}Reject{' '}
                    </Button>
                </div>
            );
        },
    },
];
