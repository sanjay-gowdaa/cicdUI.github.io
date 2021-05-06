import React from 'react';
import { Button, Image, Modal, Typography, Progress } from 'antd';
import { isEmpty } from 'lodash';

import { ProduceModel } from '../../store/buyerReducer/types';
import RagiImg from '../../static/assets/ragi.png';

const { Title } = Typography;

const openAdditionalInfo = (content: any) => {
    Modal.info({
        title: 'Additional Info',
        content: `${content}`,
        okText: 'Ok',
        icon: null
    });
};

type produceColumnCallbacks = {
    deleteProduce: any;
    prepareForEditProduce: any;
}

export const produceColumns = ({deleteProduce, prepareForEditProduce}: produceColumnCallbacks) => [
    {
        title: 'Produce',
        dataIndex: 'crop_name',
        key: 'crop_name',
        render: (cropName: string, record: ProduceModel) => {
            const {category, sub_type: subType} = record;

            return (
                <div className='display-flex-row align-center'>
                    <Image
                        src={RagiImg}
                    />
                    <div className='margin-l-r-1em'>
                        <Title level={5}>{category}</Title>
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
        render: (quantity: string, record: ProduceModel) => {
            const {currently_fulfilled_qty = 0} = record;
            const quantityNum = parseInt(quantity, 10);
            const percentageQty = (currently_fulfilled_qty/quantityNum)*100;
            const currentReqQty = quantityNum - currently_fulfilled_qty;
            return (
                <>
                    <p>{currentReqQty} qtl</p>
                    <Progress
                        strokeColor='#12805C'
                        percent={percentageQty}
                        status="active"
                        format={() => `${quantity} qtl`}
                    />
                </>
            )

        }
    },
    {
        title: 'Delivery By',
        dataIndex: 'delivery_by',
        key: 'delivery_by',
        render: (delivery_by: string) => {
            const dateObj = new Date(delivery_by);
            return dateObj.toLocaleDateString();
        }
    },
    {
        title: 'Additional',
        key: 'additional_info',
        dataIndex: 'additional_info',
        render: (additionalInfo: string) => {
            return (
                <Button
                    type="link"
                    disabled={isEmpty(additionalInfo)}
                    onClick={() => openAdditionalInfo(additionalInfo)}
                >
                    Additional Info
                </Button>
            );
        },
    },
    {
        title: '',
        key: 'action',
        render: (text: string, record: ProduceModel) => {
            return (
                <>
                    <Button 
                        type="link"
                        onClick={() => {
                                prepareForEditProduce(record)
                            }
                        }
                    >
                        Edit
                    </Button>
                    <Button
                        type="link" 
                        danger
                        onClick={
                            () => deleteProduce(record.sk)
                        }
                    >
                        Delete
                    </Button>
                </>
            );
        },
    },
];
