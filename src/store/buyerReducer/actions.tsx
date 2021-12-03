import { isEmpty } from 'lodash';

import { BuyerRejectMatch, MasterListApiFormat, ProduceModel } from './types';

import {
    addProduce,
    getAllProduce,
    getCropCategoryList,
    getCropList,
    getSubCategoryList,
    getMasterList,
    updateMasterList,
    deleteProduce,
    patchProduce,
    getBuyerMatchesList,
    rejectMatch,
    createTransaction,
    fetchTransactionList,
    sellerConnectStatus,
    getPaymentList,
    getCurrentStatusDetails,
    getPaymentAmount,
    LAST_AUTH_USER
} from '../api';
import { UserStateModel } from '../loginReducer/types';
import { BuyerStateModel } from '../buyerReducer/types';
import { RootState } from '../rootReducer';

import { getTimeStamp } from '../../app-components/utils';
import { TransactionStatus } from '../../buyer-seller-commons/types';
import { getUserCompleteDetails } from '../loginReducer/actions';
import { getUserHistory } from '../../buyer-seller-commons/actions';

export const UPDATE_MASTER_LIST = 'UPDATE_MASTER_LIST';
export const GET_MASTER_LIST = 'GET_MASTER_LIST';
export const UPDATE_PRODUCE_LIST = 'UPDATE_PRODUCE_LIST';
export const UPDATE_MASTER_CROP_NAMES_LIST = 'UPDATE_MASTER_CROP_NAMES_LIST';
export const UPDATE_CROPS_LIST = 'UPDATE_CROPS_LIST';
export const UPDATE_VARIETY_LIST = 'UPDATE_VARIETY_LIST';
export const UPDATE_TIME_STAMP = 'UPDATE_TIME_STAMP';
export const UPDATE_MATCHES_LIST = 'UPDATE_MATCHES_LIST';
export const UPDATE_TRANSACTION_LIST = 'UPDATE_TRANSACTION_LIST';
export const SET_MATCHES_LOADER = 'SET_MATCHES_LOADER';
export const UPDATE_PAYMENT_REDIRECTION_DETAILS = 'UPDATE_PAYMENT_REDIRECTION_DETAILS';
export const UPDATE_PAYMENT_DETAILS = 'UPDATE_PAYMENT_DETAILS';
export const UPDATE_CURRENT_STATUS_DETAILS = 'UPDATE_CURRENT_STATUS_DETAILS';
export const UPDATE_EVENT_TEMPLATE = 'UPDATE_EVENT_TEMPLATE';
export const UPDATE_PAYMENT_AMOUNT = 'UPDATE_PAYMENT_AMOUNT';
export const OTP_ERROR_ON_CONNECT = 'OTP_ERROR_ON_CONNECT';
export const OTP_ERROR_MSG_ON_CONNECT = 'OTP_ERROR_MSG_ON_CONNECT';
export const OTP_VERIFIED_ON_CONNECT = 'OTP_VERIFIED_ON_CONNECT';
export const OTP_SELLER_ID = 'OTP_SELLER_ID';
export const OTP_BUYER_ID = 'OTP_BUYER_ID';
export const OTP_SELLER_CROP_ID = 'OTP_SELLER_CROP_ID';
export const OTP_BUYER_CROP_ID = 'OTP_BUYER_CROP_ID';
export const UPDATE_REJECT_COUNT = 'UPDATE_REJECT_COUNT';
export const SET_STATUS_DETAILS = 'SET_STATUS_DETAILS';

export const setBuyerStatusDetails = (status: any, key: any) => {
    return {
        type: SET_STATUS_DETAILS,
        payload: { details: status, key: key }
    };
};

export const setBuyerOtpErrorOnConnect = (errorFlag: Boolean) => {
    return {
        type: OTP_ERROR_ON_CONNECT,
        payload: errorFlag
    };
};

export const setBuyerOtpErrorMsgOnConnect = (errorMg: String) => {
    return {
        type: OTP_ERROR_MSG_ON_CONNECT,
        payload: errorMg
    };
};

export const setBuyerVerifiedOnConnect = (isVerified: Boolean) => {
    return {
        type: OTP_VERIFIED_ON_CONNECT,
        payload: isVerified
    };
};

export const setSellerIdOnConnect = (sellerId: String) => {
    return {
        type: OTP_SELLER_ID,
        payload: sellerId
    };
};

export const setSellerCropIdOnConnect = (sellerCropId: String) => {
    return {
        type: OTP_SELLER_CROP_ID,
        payload: sellerCropId
    };
};

export const setBuyerIdOnConnect = (buyerId: String) => {
    return {
        type: OTP_BUYER_ID,
        payload: buyerId
    };
};

export const setBuyerCropIdOnConnect = (buyerCropId: String) => {
    return {
        type: OTP_BUYER_CROP_ID,
        payload: buyerCropId
    };
};

export const updateStoreMasterList = (masterlist: Array<any>) => {
    return {
        type: UPDATE_MASTER_LIST,
        payload: masterlist,
    };
};

export const updatePaymentRedirectionDetails = (paymentRedirectionDetails: any) => {
    return {
        type: UPDATE_PAYMENT_REDIRECTION_DETAILS,
        payload: paymentRedirectionDetails,
    };
};

export const updatePaymentAmount = (paymentAmount: any) => {
    return {
        type: UPDATE_PAYMENT_AMOUNT,
        payload: paymentAmount,
    };
};

export const updatePaymentDetails = (paymentDetails: Array<any>) => {
    return {
        type: UPDATE_PAYMENT_DETAILS,
        payload: paymentDetails,
    };
};

export const updateBuyerEventList = (eventTemplate: Array<any>) => {
    return {
        type: UPDATE_EVENT_TEMPLATE,
        payload: eventTemplate,
    };
};

export const updateCurrentStatusDetails = (status: string) => {
    return {
        type: UPDATE_CURRENT_STATUS_DETAILS,
        payload: status,
    };
};

export const updateProduceList = (produceList: Array<ProduceModel>) => {
    return {
        type: UPDATE_PRODUCE_LIST,
        payload: produceList
    };
};

export const updateMasterCropNamesList = (masterCropNames: Array<string>) => {
    return {
        type: UPDATE_MASTER_CROP_NAMES_LIST,
        payload: masterCropNames
    };
};

export const updateCropsList = (cropsList: Array<string>) => {
    return {
        type: UPDATE_CROPS_LIST,
        payload: cropsList
    };
};

export const updateVarietyList = (varietyList: Array<string>) => {
    return {
        type: UPDATE_VARIETY_LIST,
        payload: varietyList
    };
};

export const updateTimeStamp = (timeStamp: any) => {
    return {
        type: UPDATE_TIME_STAMP,
        payload: timeStamp
    };
};

export const updateMatchesList = (matchesList: Array<any>) => {
    return {
        type: UPDATE_MATCHES_LIST,
        payload: matchesList
    };
};

export const setMatchesLoadingFlag = (loadingFlag: boolean) => {
    return {
        type: SET_MATCHES_LOADER,
        payload: loadingFlag
    };
};

export const updateBuyerRejectCount = (rejectCount: any) => {
    return {
        type: UPDATE_REJECT_COUNT,
        payload: rejectCount,
    };
};

export const updateBuyerTransactionList = (transactionType: TransactionStatus, transactionListData: Array<any>) => {
    return {
        type: UPDATE_TRANSACTION_LIST,
        payload: { transactionType, transactionListData }
    };
};

export const getMasterProduceList = () => {
    return async (dispatch: any) => {
        const masterProduceList = await getMasterList();
        const masterList = masterProduceList || [];
        dispatch(updateStoreMasterList(masterList));
    };
};

export const updateMasterListData = (masterlist: Array<MasterListApiFormat>) => {
    return async (dispatch: any) => {
        await updateMasterList(masterlist);
        dispatch(getMasterProduceList());
    };
};

export const addNewProduce = (/*produceFormData: ProduceModel*/ produceFormData: any) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { district, zip } = loginUser;
        await addProduce({ ...produceFormData, district, zip });
        dispatch(getProduceList());
    };
};

export const editProduce = (/*produceFormData: ProduceModel*/ produceFormData: any) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { district, zip } = loginUser;
        await patchProduce({ ...produceFormData, district, zip });
        dispatch(getProduceList());
    };
};

export const deleteSelectedProduce = (produceID: string) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { is_buyer } = loginUser;
        await deleteProduce(produceID, is_buyer);
        dispatch(getProduceList());
    };
};

export const getProduceList = () => {
    return async (dispatch: any) => {
        const getProduceListResponse = await getAllProduce();
        const { Items } = getProduceListResponse || { Items: [] };
        dispatch(updateProduceList(Items as Array<ProduceModel>))
        if (Items.length) {
            dispatch(getMatchesForBuyerCrops(Items as Array<ProduceModel>));
        }
    };
};

export const fetchAllProduce = () => {
    return async (dispatch: any) => {
        const allProduceList = await getCropCategoryList();
        const { categories } = allProduceList || [];
        dispatch(updateMasterCropNamesList(categories));
    };
};

export const fetchAllCrops = (category: string) => {
    return async (dispatch: any) => {
        const allCropsList = await getCropList(category);
        const { crops } = allCropsList || [];
        dispatch(updateCropsList(crops));
    };
};

export const fetchAllVariety = (crop: string) => {
    return async (dispatch: any) => {
        const allVarietyList = await getSubCategoryList(crop);
        const { crops: { Items: variety } } = allVarietyList || { variety: [] };
        dispatch(updateVarietyList(variety));
    };
};

export const getMatchesForBuyerCrops = (cropsList: Array<ProduceModel>) => {
    const allCropListIds: Array<string> = cropsList.map((curCrop: ProduceModel) => curCrop.sk || '');
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { username } = loginUser;
        const userName = isEmpty(username) ? LAST_AUTH_USER : username;

        const matchesBody = {
            buyer_id: `user#${userName}`,
            buyer_crop_ids: allCropListIds
        };
        dispatch(setMatchesLoadingFlag(true));
        const matchesListResponse = await getBuyerMatchesList(matchesBody.buyer_id, matchesBody.buyer_crop_ids);
        const matchesList = matchesListResponse ? matchesListResponse : [];
        let listOfMatches: any = [];
        for (let i = 0; i < matchesList.length; i++) {
            const [currentBuyerMatchEntryPair]: Array<any> = Object.entries(matchesList[i]);
            const buyerMatchesData: Array<any> = currentBuyerMatchEntryPair[1];
            const matchesLength = buyerMatchesData.length;
            if (!isEmpty(buyerMatchesData[0])) {
                let output = { ...buyerMatchesData[0], key: buyerMatchesData[0].seller_crop_id };
                dispatch(getUserHistory(output.buyer_id, output.produce, output.seller_id));
                let children: any = [];
                for (let i = 1; i < (matchesLength - 1); i++) {
                    const childernContent = { ...buyerMatchesData[i], isChild: true, key: buyerMatchesData[i].seller_crop_id };
                    dispatch(getUserHistory(childernContent.buyer_id, childernContent.produce, childernContent.seller_id));
                    children = [...children, childernContent];
                }
                if (!isEmpty(children)) {
                    output = { ...output, children: children };
                }
                listOfMatches = [...listOfMatches, output];
            }
        }
        dispatch(updateMatchesList(listOfMatches));
        dispatch(setMatchesLoadingFlag(false));
    };
};

export const rejectMatches = (rejectData: BuyerRejectMatch) => {
    return async (dispatch: any) => {
        await rejectMatch(rejectData);
        /* Re-calculate matches for all crop */
        /* Logic can be changed to specific crop if required */
        dispatch(getProduceList());
        dispatch(getUserCompleteDetails());
    };
};

export const connectMatch = (transactionEntry: any) => {
    return async (dispatch: any) => {
        await createTransaction(transactionEntry);
        dispatch(getProduceList());
        dispatch(getTransactionList(TransactionStatus.pending));
        return Promise.resolve('Successs');
    };
};

export const checkSellerConnectedStatus = (sellerId: string, sellerCropId: string) => {
    return async () => {
        const connectedStatus = await sellerConnectStatus({
            sellerId,
            sellerCropId
        });
        return Promise.resolve(connectedStatus);
    };
};

export const getTransactionList = (transactionStatus: TransactionStatus) => {
    return async (dispatch: any) => {
        const transactionListResponse = await fetchTransactionList(transactionStatus);
        let transactionFinalResponse: any = [];
        for (let i = 0; i < transactionListResponse.length; i++) {
            let list = transactionListResponse[i];
            list.key = transactionListResponse[i].pk;
            transactionFinalResponse.push(list);
        }
        dispatch(updateBuyerTransactionList(transactionStatus, transactionFinalResponse));
        dispatch(getProduceList());
    };
};

export const saveTimeStamp = (dispatch: any) => {
    const timeStamp = getTimeStamp();
    dispatch(updateTimeStamp(timeStamp));
};

export const getPaymentDetails = () => {
    return async (dispatch: any, getState: any) => {
        const { buyer }: { buyer: BuyerStateModel } = getState() as RootState;
        const paymentRedirectionDetails = buyer.paymentRedirectionDetails;
        const paymentDetails = await getPaymentList(paymentRedirectionDetails);
        dispatch(updatePaymentDetails(paymentDetails));
    };
};

export const currentBuyerStatusDetails = (userData: any) => {
    return async (dispatch: any) => {
        const currentStatusResponse = await getCurrentStatusDetails(userData);
        if (!isEmpty(currentStatusResponse)) {
            const status = currentStatusResponse;
            dispatch(updateCurrentStatusDetails(status[0]));
        }
    };
};

export const getAmount = (userData: string) => {
    return async (dispatch: any) => {
        var id = userData;
        id = id.substring(12);
        const amount = await getPaymentAmount(id);
        dispatch(updatePaymentAmount(amount));
    };
};
