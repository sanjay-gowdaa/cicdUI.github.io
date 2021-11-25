import { isEmpty } from 'lodash';

import { TransactionStatus } from './types';

import { fetchTransactionList, getEventTemplate, getStatusDetails } from '../store/api';
import {
    currentBuyerStatusDetails,
    getProduceList,
    setBuyerStatusDetails,
    updateBuyerEventList,
    updateBuyerTransactionList
} from '../store/buyerReducer/actions';
import { UserTypes } from '../store/genericTypes';
import { UserStateModel } from '../store/loginReducer/types';
import { RootState } from '../store/rootReducer';
import {
    currentSellerStatusDetails,
    setSellerStatusDetails,
    updateSellerEventList,
    updateSellerTransactionList
} from '../store/sellerReducer/actions';

export const fetchEventTemplate = (userType: any) => {
    return async (dispatch: any) => {
        const transportation = 'No';
        const template = await getEventTemplate(userType, transportation);
        if (!isEmpty(template)) {
            userType === UserTypes.BUYER ?
                dispatch(updateBuyerEventList(template)) :
                dispatch(updateSellerEventList(template));
        }
    };
};

export const getTransactionListOnReload = (transactionStatus: TransactionStatus) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { is_buyer } = loginUser;
        const transactionListResponse = await fetchTransactionList(transactionStatus);
        for (var i = 0; i < transactionListResponse.length; i++) {
            const data = {
                'transactionId': transactionListResponse[i].pk.substring(12),
                'user': is_buyer ? 'buyer' : 'seller'
            };
            is_buyer ?
                dispatch(currentBuyerStatusDetails(data)) :
                dispatch(currentSellerStatusDetails(data))
        }
        if (is_buyer) {
            dispatch(updateBuyerTransactionList(transactionStatus, transactionListResponse))
            dispatch(getProduceList())
        } else {
            dispatch(updateSellerTransactionList(transactionStatus, transactionListResponse))
        }
    };
};

export const getStatus = (userData: any) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { is_buyer } = loginUser;
        const statusResponse = await getStatusDetails(userData);
        is_buyer ?
            dispatch(setBuyerStatusDetails(statusResponse, userData.transactionId)) :
            dispatch(setSellerStatusDetails(statusResponse, userData.transactionId))
    };
};
