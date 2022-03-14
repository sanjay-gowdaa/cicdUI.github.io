import React from 'react';
import { Button } from 'antd';

import './customComponent.scss';

const DefaultBtn = (props: any) => {
    const { content, className } = props;
    const customClassName = `${className} custom-default-button`;

    return (
        <Button {...props} {...{ className: customClassName }}> {content} </Button>
    );
};

export default DefaultBtn;
