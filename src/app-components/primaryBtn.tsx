import React from 'react';
import { Button } from 'antd';

import './customComponent.scss';

const PrimaryBtn = (props: any) => {
    const { content, className } = props;
    const customClassName = `${className} custom-primary-button`;

    return (
        <Button {...props} {...{ className: customClassName }} type="primary">
            {content}
        </Button>
    );
};

export default PrimaryBtn;
