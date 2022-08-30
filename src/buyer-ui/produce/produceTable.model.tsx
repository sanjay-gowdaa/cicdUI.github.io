import React from 'react';
import { Button, Image, Progress, Typography } from 'antd';
import { isEmpty } from 'lodash';

import { ProduceModel } from '../../store/buyerReducer/types';
import { showCropImage } from '../../buyer-seller-commons/constants';
import { parseIDfromHash } from '../../app-components/utils';
import confirmationPopup from '../../buyer-seller-commons/confirmationPopup';
import { openAdditionalInfo } from '../../buyer-seller-commons/openAdditionalInfo';
import { EditAdditionalInfo } from '../../buyer-seller-commons/editAdditionalInfo';

const { Title } = Typography;

const getCropId = (cropID: string) => {
    return parseIDfromHash(cropID);
};

type produceColumnCallbacks = {
    deleteProduce: any;
    prepareForEditProduce: any;
    updateCropDetails: any;
    setIsEdit: any;
    isEdit: boolean;
    currentCropId: string;
    updateAdditionalDetails: any;
};

export const produceColumns = ({
    deleteProduce,
    prepareForEditProduce,
    updateAdditionalDetails,
    updateCropDetails,
    setIsEdit,
    isEdit,
    currentCropId,
}: produceColumnCallbacks) =>
    [
        {
            title: 'Produce',
            dataIndex: 'produce',
            key: 'produce',
            render: (produce: string, record: ProduceModel) => {
                const { category, variety: subType} = record;
                console.log("record", record)
                const imageSrc = showCropImage(category);

                return (
                    <div className='display-flex-row align-center'>
                        <Image src={imageSrc} className="table-crop-image" />
                        <div className='margin-l-r-1em'>
                            <Title level={5}>{record.produce}</Title>
                            <p>{subType}</p>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade'
        },
        {
            title: 'Quantity Required',
            dataIndex: 'quantity',
            key: 'quantity',
            onCell: (record: ProduceModel) => ({
                record,
                editable: currentCropId === getCropId(record.sk || ''),
                dataIndex: 'quantity',
                isEdit,
                handleSave: (record: ProduceModel) => updateCropDetails(record),
            }),
            render: (quantity: string, record: ProduceModel) => {
                const { currently_fulfilled_qty = 0 } = record;
                const quantityNum = parseInt(quantity, 10);
                const percentageQty = (currently_fulfilled_qty / quantityNum) * 100;
                const currentReqQty = quantityNum - currently_fulfilled_qty;
                return (
                    <React.Fragment>
                        <p>{currentReqQty} qtl</p>
                        <Progress
                            strokeColor='#12805C'
                            percent={100 - percentageQty}
                            status="active"
                            format={() => `${quantity} qtl`}
                        />
                    </React.Fragment>
                );
            }
        },
        // {
        //     title: 'Request Delivery By',
        //     dataIndex: 'delivery_by',
        //     key: 'delivery_by',
        //     onCell: (record: ProduceModel) => ({
        //         record,
        //         editable: currentCropId === getCropId(record.sk || ''),
        //         dataIndex: 'delivery_by',
        //         isEdit,
        //         handleSave: (record: ProduceModel) => updateCropDetails(record),
        //     }),
        //     render: (delivery_by: string) => {
        //         const dateObj = new Date(delivery_by);
        //         return dateObj.toLocaleDateString();
        //     }
        // },
        {
            title: 'Additional',
            key: 'additional_info',
            dataIndex: 'additional_info',
            render: (additionalInfo: any, record: ProduceModel) => {
                return (
                    <div>
                        <Button
                            type="link"
                            disabled={isEmpty(additionalInfo)}
                            onClick={() => { openAdditionalInfo(additionalInfo); }}
                        >
                            Additional Info
                        </Button>
                        <Button
                            disabled={!isEmpty(additionalInfo)}
                            type='link'
                            onClick={() => { EditAdditionalInfo(record, updateAdditionalDetails) }}
                        >
                            Edit
                        </Button>
                    </div>
                );
            },
        },
        {
            title: '',
            key: 'action',
            onCell: (record: ProduceModel) => ({
                record,
                editable: currentCropId === getCropId(record.sk || ''),
                dataIndex: 'action',
                isEdit,
                setIsEdit,
                handleSave: (record: ProduceModel) => updateCropDetails(record),
            }),
            render: (record: ProduceModel) => {
                return (
                    <React.Fragment>
                        <Button
                            type="link"
                            className="button"
                            disabled={!record.isEditable}
                            onClick={() => {
                                prepareForEditProduce(record);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            type="link"
                            danger
                            onClick={() => confirmationPopup('delete', deleteProduce, record.sk)}
                        >
                            Delete
                        </Button>
                    </React.Fragment>
                );
            },
        },
    ];


