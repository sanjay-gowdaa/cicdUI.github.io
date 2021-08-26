import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Typography, Collapse, Steps} from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import { RootState } from '../../store/rootReducer';
import { getStatus } from '../../store/buyerReducer/actions';

const { Title } = Typography;
const { Panel } = Collapse;
const { Step } = Steps;
var current = 0;
const TransactionDetailsModel = (propss: any) => { 
    const onChange = (current: any ) => {
        console.log('onChange:', current);
        //setState({ current });
        current = current+1;
      };
    return(
            <>
            <Collapse
                bordered={false} 
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
            >
            <Panel header="View Details" key="1" className="site-collapse-custom-panel">
            <Steps direction="vertical" current={1} onChange={onChange}>
                <Step title="Finished" description="This is a description." />
                <Step title="In Progress" description="This is a description." />
                <Step title="Waiting" description="This is a description." />
            </Steps>,

            </Panel>
    
            </Collapse> 
            
            
            </>

    );
}

export default TransactionDetailsModel;