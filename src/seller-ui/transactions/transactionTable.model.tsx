import React, { useEffect, useState } from 'react';
import { Button, Typography, Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { TransactioModel } from '../../buyer-seller-commons/types';
import { parseIDfromHash, maskData } from '../../app-components/utils';
import StatusDetailsModel from './viewStatusDetails';
import { RootState } from '../../store/rootReducer';
import {CurrentStatusDetails} from '../../store/buyerReducer/actions';

const { Text } = Typography;

export const GetCurrentStatusDetails = (pk: any) =>{
    const buyerState = useSelector((state: RootState) => state.buyer);
    const status = buyerState.currentStatusDetails;
    const [userStatus, setUserStatus] = useState();
    const dispatch = useDispatch();
    var id = pk.data;
    id = id.substring(12);

    const data = {
        "transactionId" : id,
        "user": "seller"
    };
    
    useEffect(() => {
        dispatch(CurrentStatusDetails(data));
        if(!isEmpty(status)){
            for(const property in status) {
                if(status[property].pk === pk.data) {
                    setUserStatus(status[property].event_description);
                }
            }
           }
    }, [!isEmpty(status)]);

    return (
        <p>{userStatus}</p>
    );
};

export const transactionColumns = [
    {
        title: 'Id',
        dataIndex: 'pk',
        key: 'pk',
        ellipsis: {
            showTitle: false,
        },
        render: (transactionID: string) => {
            const transactionActId = parseIDfromHash(transactionID);
            return (
                <Tooltip placement="topLeft" title={transactionActId}>
                    <Text underline>{transactionActId}</Text>
                </Tooltip>
            );
        },
    },
    {
        title: 'Produce',
        dataIndex: 'produce',
        key: 'produce',
        width: 300,
        render: (produce: string) => {
            return (
                <p>{produce}</p>
            );
        },
    },
    {
        title: 'Quantity',
        dataIndex: 'matched_quantity',
        key: 'matched_quantity',
        render: (quantity: number) => {
            return (
                <p>{quantity} qtl</p>
            );
        }
    },
    {
        title: 'Price per qtl',
        dataIndex: 'seller_price',
        key: 'seller_price',
        render: (seller_price: number, record: TransactioModel) => {
            const {matched_quantity} = record;
            return (
                <p>{seller_price/matched_quantity}</p>
            );
        }
    },
    {
        title: 'Total',
        dataIndex: 'buyer_final_price',
        key: 'buyer_final_price',
    },
    {
        title: 'Buyer',
        dataIndex: 'buyer_id',
        key: 'buyer_id',
        ellipsis: {
            showTitle: false,
        },
        render: (buyerId: string) => {
            const actBuyerID = parseIDfromHash(buyerId)
            return (
                <Tooltip placement="topLeft" title={maskData(actBuyerID)}>
                    <Text underline>{maskData(actBuyerID)}</Text>
                </Tooltip>
            );
        },
    },
    {
        title: 'Location',
        dataIndex: 'buyer_location',
        key: 'buyer_location',
    },
    {
        title: 'Additional',
        key: 'additional_info',
        dataIndex: 'additional_info',
        render: () => {
            return (
                <Button type="link">Packaging Details</Button>
            );
        },
    },
    {
        title: 'Status',
        key: 'action',
        render: (record: any) => {
            const transactionId = record.pk;
            return (
                <GetCurrentStatusDetails data ={transactionId} />            
            );
        },
    },
    {
        title: '',
        key: 'action',
        render: (text: any, record: any) => {
            const transactionId = record.pk;
            return (
                <StatusDetailsModel data ={transactionId} />              
            );
        }
    },
];
