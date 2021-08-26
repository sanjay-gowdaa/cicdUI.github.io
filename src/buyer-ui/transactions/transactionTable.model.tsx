import React, { useEffect, useState } from 'react';
import { Image, Typography, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import PayButton from './payButton';
import RagiImg from '../../static/assets/ragi.png';
import { parseIDfromHash, maskData } from '../../app-components/utils';
import { TransactionStatus } from '../../buyer-seller-commons/types';
import StatusDetailsModel from './viewStatusDetails';
import TransactionDetailsModel from './viewTransactionDetails';
import { RootState } from '../../store/rootReducer';
import { currentStatusDetails } from '../../store/buyerReducer/actions';


const { Text } = Typography;

export const GetCurrentStatusDetails = (pk: any) =>{
    const buyerState = useSelector((state: RootState) => state.buyer);
    const status = buyerState.currentStatusDetails;
    const [userStatus, setUserStatus] = useState('');
    const dispatch = useDispatch();
    var id = pk.data;
    id = id.substring(12);

    const data = {
        "transactionId" : id,
        "user": "buyer"
    };

    useEffect(() => {
        dispatch(currentStatusDetails(data));
    }, []);

    useEffect(() => {
        if(!isEmpty(status)) {
            for(let i=0; i<status.length; i++) {
                if(status[i].pk === pk.data) {
                    setUserStatus(status[i].event_description);
                }
            }
        }
    }, [status]);

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
                    <p>{produce}</p>
                    <TransactionDetailsModel/>
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
            );
        },
    },
];


