import React from 'react';
import { Button, Image, Modal, Typography, Progress, Table } from 'antd';
import { isEmpty } from 'lodash';

import { ProduceModel } from '../../store/buyerReducer/types';
import RagiImg from '../../static/assets/ragi.png';

const { Text, Title } = Typography;

const openAdditionalInfo = (content: any) => {
    const data = [
        {
            key: 1,
            label: "Moisture",
            value: content.moisture === undefined ? '' : `${content.moisture} %`
        },
        {
            key: 2,
            label: "Fungus",
            value: content.fungus === undefined ? '' : `${content.fungus} %`
        },
        {
            key: 3,
            label: "Packing Type",
            value: content.packing_type
        },
        {
            key: 4,
            label: "Package Size",
            value: content.packing_size === undefined ? '' : `${content.packing_size} kg`
        },
        {
            key: 5,
            label: "Other Information",
            value: content.other_info
        }
    ];

    const column = [
        {
            title: 'Specifications',
            dataItem: 'label',
            key: 'label',
            render: (list: any) => <Text>{list.label}</Text>
        },
        {
            title: 'Value',
            dataItem: 'value',
            key: 'value',
            render: (list: any) => <Text>{list.value}</Text>
        }
    ]
    Modal.info({
        title: 'Specification',
        content: (
            <Table dataSource={data} columns={column} pagination={false} />
        ),
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
        title: 'Request Delivery By',
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
