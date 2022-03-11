import React from 'react';
import { Divider } from 'antd';

import './customComponent.scss';

export const LandingDivider = (props: any) => {
  const { className } = props;
  const customClassName = `custom-divider ${className}`;

  return (
      <Divider plain {...props} {...{ className: customClassName }}>
        <div className='wimage'></div>
      </Divider>
  );
};
