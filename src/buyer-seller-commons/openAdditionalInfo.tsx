import React from 'react';
import { Modal, Table, Typography } from 'antd';

const { Text } = Typography;

/** Show Additional Information
 * 
 * @param { any } content - Content
 */
export const openAdditionalInfo = (content: any) => {
    const showTable = typeof (content) !== 'string';
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
    ];

    Modal.info({
        title: 'Specification',
        content: (showTable ?
            <Table dataSource={data} columns={column} pagination={false} />
            : <Text>{content}</Text>
        ),
        okText: 'Ok',
        icon: null
    });
};
