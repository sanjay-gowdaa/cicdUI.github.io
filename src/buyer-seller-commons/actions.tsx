import { isEmpty } from 'lodash';

import { TransactionStatus } from './types';

import {
    fetchTransactionList,
    fetchUserHistory,
    getEventTemplate,
    getRejectCount,
    getStatusDetails,
    verifyOtp
} from '../store/api';
import {
    currentBuyerStatusDetails,
    getProduceList,
    setBuyerCropIdOnConnect,
    setBuyerIdOnConnect,
    setBuyerOtpErrorMsgOnConnect,
    setBuyerOtpErrorOnConnect,
    setBuyerStatusDetails,
    setBuyerVerifiedOnConnect,
    setSellerCropIdOnConnect,
    setSellerIdOnConnect,
    updateBuyerEventList,
    updateBuyerRejectCount,
    updateBuyerTransactionList
} from '../store/buyerReducer/actions';
import { ResponseStatus, UserTypes } from '../store/genericTypes';
import { UserStateModel } from '../store/loginReducer/types';
import { RootState } from '../store/rootReducer';
import {
    currentSellerStatusDetails,
    setBuyerCropIdOnAccept,
    setBuyerIdOnAccept,
    setSellerCropIdOnAccept,
    setSellerIdOnAccept,
    setSellerOtpErrorMsgOnAccept,
    setSellerOtpErrorOnAccept,
    setSellerStatusDetails,
    setSellerVerifiedOnAccept,
    updateSellerEventList,
    updateSellerRejectCount,
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

export const rejectMatchesCount = (rejectData: any) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { is_buyer } = loginUser;
        const count = await getRejectCount(rejectData);
        is_buyer ?
            dispatch(updateBuyerRejectCount(count)) :
            dispatch(updateSellerRejectCount(count));
    };
};

export const confirmOTP = (number: string, otp: string) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { is_buyer } = loginUser;
        const verifyOtpResponse = await verifyOtp(`91${number}`, otp);
        const { OTPResp = {} } = verifyOtpResponse || {};
        const { type = '', message } = OTPResp;
        if (type === ResponseStatus.ERROR) {
            if (is_buyer) {
                dispatch(setBuyerOtpErrorOnConnect(true));
                dispatch(setBuyerOtpErrorMsgOnConnect(message));
            } else {
                dispatch(setSellerOtpErrorOnAccept(true));
                dispatch(setSellerOtpErrorMsgOnAccept(message));
            }
        } else if (type === ResponseStatus.SUCCESS) {
            if (is_buyer) {
                dispatch(setBuyerOtpErrorOnConnect(false));
                dispatch(setBuyerVerifiedOnConnect(true));
            } else {
                dispatch(setSellerOtpErrorOnAccept(false));
                dispatch(setSellerVerifiedOnAccept(true));
            }
        }
    };
};

export const byPassOTP = (otp: string) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { is_buyer } = loginUser;
        const verified = otp === '1234';
        if (!verified) {
            if (is_buyer) {
                dispatch(setBuyerOtpErrorOnConnect(true));
                dispatch(setBuyerOtpErrorMsgOnConnect('OTP Mismatched!'));
            } else {
                dispatch(setSellerOtpErrorOnAccept(true));
                dispatch(setSellerOtpErrorMsgOnAccept('OTP Mismatched!'));
            }
        } else {
            if (is_buyer) {
                dispatch(setBuyerOtpErrorOnConnect(false));
                dispatch(setBuyerVerifiedOnConnect(true));
            } else {
                dispatch(setSellerOtpErrorOnAccept(false));
                dispatch(setSellerVerifiedOnAccept(true));
            }
        }
    };
};

export const resetOTPFields = () => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { is_buyer } = loginUser;

        if (is_buyer) {
            dispatch(setBuyerOtpErrorOnConnect(false));
            dispatch(setBuyerOtpErrorMsgOnConnect(''));
            dispatch(setBuyerVerifiedOnConnect(false));
            dispatch(setSellerIdOnConnect(''));
            dispatch(setBuyerIdOnConnect(''));
            dispatch(setSellerCropIdOnConnect(''));
            dispatch(setBuyerCropIdOnConnect(''));
        } else {
            dispatch(setSellerOtpErrorOnAccept(false));
            dispatch(setSellerOtpErrorMsgOnAccept(''));
            dispatch(setSellerVerifiedOnAccept(false));
            dispatch(setSellerIdOnAccept(''));
            dispatch(setBuyerIdOnAccept(''));
            dispatch(setSellerCropIdOnAccept(''));
            dispatch(setBuyerCropIdOnAccept(''));
        }
    };
};

export const getUserHistory = async (buyerId: string, produce: string, sellerId: string) => {
    const historyResponse = await fetchUserHistory({ buyerId, produce, sellerId });
    return historyResponse;
};
