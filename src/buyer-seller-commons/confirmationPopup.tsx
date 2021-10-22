import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const confirmationPopup = (actionName: string, onConfirm: Function, params: any) => {
    Modal.confirm({
        title: `Are you sure you want to ${actionName}?`,
        icon: <ExclamationCircleOutlined />,
        onOk() { onConfirm(params) },
        onCancel() { }
    });
};

export default confirmationPopup;
