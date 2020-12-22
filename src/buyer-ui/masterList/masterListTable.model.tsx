import React from 'react';
import { Button } from 'antd';

export interface componentCallBacksModel {
    removeProduceEntry: Function;}

export const masterListColumns = (componentCallBacks: componentCallBacksModel) => [
    {
        title: 'Produce Category',
        dataIndex: 'produce_name',
        key: 'produce_name',
    },
    {
        title: 'Produce',
        dataIndex: 'crop_name',
        key: 'crop_name',
    },
    {
        title: 'Variety',
        dataIndex: 'category_name',
        key: 'category_name',
    },
    {
        title: 'Grade',
        dataIndex: 'grade_name',
        key: 'grade_name',
    },
    {
        title: '',
        key: 'action',
        render: (text: any, record: any) => {
            return (
                <div className="display-flex-row">
                    <Button 
                        className="vikas-btn-radius" 
                        type="link"
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
