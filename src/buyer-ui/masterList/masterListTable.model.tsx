import React from 'react';
import { Typography, Button, Image } from 'antd';
import { MatchRequirementModel } from '../../store/buyerReducer/types';
import RagiImg from '../../static/assets/ragi.png'

const { Title, Text } = Typography;
export interface componentCallBacksModel {
    removeProduceEntry: Function;}

export const masterListColumns = (componentCallBacks: componentCallBacksModel) => [
    {
        title: 'Produce Type',
        dataIndex: 'produceName',
        key: 'produceName',
    },
    {
        title: 'Produce',
        dataIndex: 'cropName',
        key: 'cropName',
    },
    {
        title: 'Category',
        dataIndex: 'categoryName',
        key: 'categoryName',
    },
    {
        title: 'Grade',
        dataIndex: 'gradeName',
        key: 'gradeName',
    },
    {
        title: '',
        key: 'action',
        render: (text: any, record: any) => {
            return (
                <div className="display-flex-row">
                    <Button 
                        className="vikas-btn-radius" 
                        type="primary"
                        danger
                        onClick={() => {
                            componentCallBacks?.removeProduceEntry(record);
                        }}
                    >
                        Remove
                    </Button>
                </div>
            );
        },
    },
];
