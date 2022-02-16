import React from 'react';
import { Button, Image, Typography, Tooltip } from 'antd';
import { isEmpty } from 'lodash';

import { TransactionModel } from '../../buyer-seller-commons/types';
import { parseIDfromHash } from '../../app-components/utils';
import { showCropImage } from '../../buyer-seller-commons/constants';
import GetCurrentStatusDetails from '../../buyer-seller-commons/transactions/getCurrentStatusDetails';
import { openAdditionalInfo } from '../../buyer-seller-commons/openAdditionalInfo';
import ViewCropImages from '../../buyer-seller-commons/viewCropImages';

const { Text } = Typography;

export const transactionSellerColumns = [
    {
        title: 'Id',
        dataIndex: 'pk',
        key: 'pk',
        ellipsis: {
            showTitle: false,
        },
        render: (transactionID: string) => {
            const transactionActId = parseIDfromHash(transactionID);
            return (
                <Tooltip placement='topLeft' title={transactionActId}>
                    <Text underline>{transactionActId}</Text>
                </Tooltip>
            );
        },
    },
    {
        title: 'Produce',
        dataIndex: 'produce',
        key: 'produce',
        width: 300,
        render: (produce: string, record: TransactionModel) => {
            const [masterCategory = ''] = produce.split('-');
            const imageSrc = showCropImage(masterCategory);
            return (
                <div className='display-flex-row align-center'>
                    <Image src={imageSrc} className='table-crop-image' />
                    <div className='margin-l-r-1em'>
                        <p>{produce}</p>
                        {!isEmpty(record.additional_info) &&
                            <Button
                                type="link"
                                disabled={isEmpty(record.additional_info)}
                                onClick={() => openAdditionalInfo(record.additional_info)}
                            >
                                Additional Info
                            </Button>
                        }
                        {!isEmpty(record.cropImageList) &&
                            <ViewCropImages list={record.cropImageList} disablePhotos={false} />
                        }
                    </div>
                </div>
            );
        },
    },
    {
        title: 'Quantity',
        dataIndex: 'matched_quantity',
        key: 'matched_quantity',
        render: (quantity: number) => {
            return (
                <p>{quantity} qtl</p>
            );
        }
    },
    {
        title: 'Price per qtl',
        dataIndex: 'seller_price_per_quintal',
        key: 'seller_price_per_quintal',
        render: (seller_price_per_quintal: number) => {
            return (
                <p>{seller_price_per_quintal}</p>
            );
        }
    },
    {
        title: 'Total',
        dataIndex: 'seller_final_price',
        key: 'seller_final_price',
    },
    {
        title: 'Buyer',
        dataIndex: 'destinyId',
        key: 'destinyId',
        ellipsis: {
            showTitle: false,
        },
        render: (destinyId: string) => {
            return (
                <Text underline>{destinyId}</Text>
            );
        },
    },
    {
        title: 'Location',
        dataIndex: 'buyer_location',
        key: 'buyer_location',
    },
    {
        title: 'Status',
        key: 'action',
        render: (record: any) => {
            const transactionId = record.pk;
            return (
                <GetCurrentStatusDetails data={transactionId} />
            );
        },
    }
];
