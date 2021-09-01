import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Typography, Collapse, Steps, Row, Col} from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import { RootState } from '../../store/rootReducer';
import { getStatus } from '../../store/buyerReducer/actions';

const { Step } = Steps;


const TransactionDetailsModel = (pk: any) => { 
    var completedEvents = [""];
    const dispatch = useDispatch();
    const buyerState = useSelector((state: RootState) => state.buyer);
    const { statusDetails, eventTemplate } = buyerState;
    var id = pk.data;
    id= id.substring(12);

    const data ={
        "transactionId": id,
        "user": "buyer"
    };
    useEffect(() =>{
        console.log("pk", pk);
        dispatch(getStatus(data))
    }, []);

    for(let i = 0; i < statusDetails.length; i++){
        console.log("inside for:", i);
        completedEvents.push(statusDetails[i].event_description);
    }
    eventTemplate.splice(0, completedEvents.length, ...completedEvents)
    console.log("eventTemplate", eventTemplate)
    //Array.prototype.splice.apply(eventTemplate, [0, length].concat(completedEvents));
    const getEvent = (event: string) => {
        console.log("++++++++++++++++++++++++++");
        console.log("getEvents called:", event);
        for(let i = 0; i < completedEvents.length; i++){
            if( completedEvents[i]=== event){
               console.log("inside if: true");
                return true;
           }
        }
        return false;
    };

  
    return(
            <>
                <Steps direction="vertical" current={1} responsive={true} labelPlacement="vertical">
                    {  
                   
                   //statusDetails.map((list: any) => {
                        eventTemplate.map((ele: any) => {
                            const isComplete = getEvent(ele);
                            console.log(":isComplete:", isComplete);
                            return (
                                
                                <Step
                                    className= {isComplete? "ant-steps-item-finish" : "ant-steps-item-wait"}
                                    title={ele}
                                    subTitle={isComplete? "Complete " : null} 
                                    status={isComplete? "finish": "wait"}
                                    // description="This is a description."
                                />
                               
                            )
                        })
                    //})
                    
                    } 
                     </Steps>
            </>

    );
}

export default TransactionDetailsModel;