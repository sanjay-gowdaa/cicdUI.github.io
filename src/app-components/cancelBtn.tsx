import React from 'react';
import { Button } from 'antd';
import './customComponent.scss';

const CancelBtn = (props: any) => {
    const { className } = props;
    const customClassName = `${className} custom-cancel-button`;

    return (
        <Button 
            {...props}
            {...{className: customClassName}} 
            type="text" 
            htmlType="button"
        >
            Cancel
        </Button>
    );
};
export default CancelBtn;
