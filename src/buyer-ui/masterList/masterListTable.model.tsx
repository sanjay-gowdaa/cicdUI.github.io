import React from 'react';
import { Button } from 'antd';

import { MasterListApiFormat } from '../../store/buyerReducer/types';

export interface componentCallBacksModel {
    removeProduceEntry: Function;
};

export const masterListColumns = (componentCallBacks: componentCallBacksModel) => [
    {
        title: 'Produce Category',
        dataIndex: 'category_name',
        key: 'category_name',
    },
    {
        title: 'Produce',
        dataIndex: 'produce_name',
        key: 'produce_name',
    },
    {
        title: 'Variety',
        dataIndex: 'variety_name',
        key: 'variety_name',
    },
    {
        title: 'Grade',
        dataIndex: 'grade_name',
        key: 'grade_name',
    },
    {
        title: '',
        key: 'action',
        render: (text: any, record: MasterListApiFormat, index: number) => {
            return (
                <div className="display-flex-row">
                    <Button
                        className="vikas-btn-radius remove-button"
                        type="link"
                        danger
                        onClick={() => {
                            componentCallBacks?.removeProduceEntry(record, index);
                        }}
                    >
                        Remove
                    </Button>
                </div>
            );
        },
    },
];
