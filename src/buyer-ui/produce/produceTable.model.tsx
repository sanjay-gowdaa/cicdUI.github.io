import React from 'react';
import { Button, Image, Modal, Typography } from 'antd';
import { isEmpty } from 'lodash';

import { ProduceModel } from '../../store/buyerReducer/types';
import RagiImg from '../../static/assets/ragi.png';

const { Title } = Typography;

export const producColumns = [
    {
        title: 'Produce',
        dataIndex: 'cropName',
        key: 'cropName',
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
        key: 'quantity'
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
            const openAdditionalInfo = () => {
                {
                    !isEmpty(additionalInfo) &&
                    Modal.info({
                        title: 'Additional Info',
                        content: `${additionalInfo}`,
                        okText: 'Ok',
                        icon: null
                    });
                }
            };

            return (
                <Button
                    type="link"
                    disabled={isEmpty(additionalInfo)}
                    onClick={openAdditionalInfo}
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
                    <Button type="link">
                        Edit
                    </Button>
                    <Button type="link" danger>
                        Delete
                    </Button>
                </>
            );
        },
    },
];
