import React, { useEffect, useState } from 'react';
import { Button, Image, Typography, Tooltip } from 'antd';
import RagiImg from '../../static/assets/ragi.png';
import { parseIDfromHash, maskData } from '../../app-components/utils';
import { TransactionStatus } from '../../buyer-seller-commons/types';
import PayButton from './payButton';
import StatusDetailsModel from './viewStatusDetails';
import { RootState } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {CurrentStatusDetails} from '../../store/buyerReducer/actions';
import { isEmpty } from 'lodash';


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
        "user": "buyer"
    }
    
    useEffect(() => {
        dispatch(CurrentStatusDetails(data));
        if(!isEmpty(status)){
            for(const property in status) {
                console.log("pk:", status[property].pk === pk.data);
                if(status[property].pk === pk.data) {
                    setUserStatus(status[property].event_description);
                    console.log("status", userStatus);
                }
            }
           }
    }, [!isEmpty(status)]);
   
    return (
        <p>{userStatus}</p>
    );
}

export const transactionColumns = [
    {
        title: 'Id',
        dataIndex: 'pk',
        key: 'pk',
        ellipsis: {
            showTitle: false,
        },
        render: (pk: string) => {
            const actualID = parseIDfromHash(pk);
            return (
                <Tooltip placement="topLeft" title={actualID}>
                    <Text underline>{actualID}</Text>
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
            <div className='display-flex-row align-center'>
                <Image
                    src={RagiImg}
                />
                <div className='margin-l-r-1em'>
                    {/* <Title level={5}>{cropName} - {record?.subCategory}</Title> */}
                    <p>{produce}</p>
                </div>
            </div>
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
        },
    },
    {
        title: 'Price per qtl',
        dataIndex: 'buyer_price_per_quintal',
        key: 'buyer_price_per_quintal',
    },
    {
        title: 'Total',
        dataIndex: 'buyer_final_price',
        key: 'buyer_final_price',
    },
    {
        title: 'Seller',
        dataIndex: 'seller_id',
        key: 'seller_id',
        ellipsis: {
            showTitle: false,
        },
        render: (seller_id: string) => {
            const actualID = parseIDfromHash(seller_id)
            return (
                <Tooltip placement="topLeft" title={maskData(actualID)}>
                    <Text underline>{maskData(actualID)}</Text>
                </Tooltip>
            );
        },
    },
    {
        title: 'Location',
        dataIndex: 'seller_location',
        key: 'seller_location'
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

    {
        title: '',
        key: 'action',
        render: (record: any) => {
        return(
            record?.gsi_status !== TransactionStatus.completed  && 
            <PayButton record={record} />
         )


        },
    },
];
