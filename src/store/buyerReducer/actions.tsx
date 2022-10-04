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
    LAST_AUTH_USER,
    getSellerCropImages,
    fetchAdditionalInfo,
    fetchUserHistory,
    fetchDestinyId,
    submitCheckDraftDetails,
    submitRejectFormPayload,
    submitDeliveryDetail
} from '../api';
import { UserStateModel } from '../loginReducer/types';
import { BuyerStateModel } from '../buyerReducer/types';
import { RootState } from '../rootReducer';

import { MatchRequirementModel, TransactionStatus } from '../../buyer-seller-commons/types';
import { getUserCompleteDetails } from '../loginReducer/actions';
import { parseIDfromHash } from '../../app-components/utils';

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

/** Store buyer status details
 * 
 * @param { any } status - Buyer status details
 * @param  { any } key - Key
 */
export const setBuyerStatusDetails = (status: any, key: any) => {
    return {
        type: SET_STATUS_DETAILS,
        payload: { details: status, key: key }
    };
};

/** Store true if there is an error on otp connection in buyer
 * 
 * @param { boolean } errorFlag - True if there is an error in otp on connect
 */
export const setBuyerOtpErrorOnConnect = (errorFlag: Boolean) => {
    return {
        type: OTP_ERROR_ON_CONNECT,
        payload: errorFlag
    };
};

/** Store otp error message on buyer connect
 * 
 * @param { string } errorMg - Error message
 */
export const setBuyerOtpErrorMsgOnConnect = (errorMg: string) => {
    return {
        type: OTP_ERROR_MSG_ON_CONNECT,
        payload: errorMg
    };
};

/** Store otp verification status of buyer connect
 * 
 * @param { boolean } isVerified - True if otp is verified
 */
export const setBuyerVerifiedOnConnect = (isVerified: boolean) => {
    return {
        type: OTP_VERIFIED_ON_CONNECT,
        payload: isVerified
    };
};

/** Store seller id on connect
 * 
 * @param { string } sellerId - Seller id
 */
export const setSellerIdOnConnect = (sellerId: string) => {
    return {
        type: OTP_SELLER_ID,
        payload: sellerId
    };
};

/** Store seller crop id on connect
 * 
 * @param { string } sellerCropId - Seller crop Id
 */
export const setSellerCropIdOnConnect = (sellerCropId: string) => {
    return {
        type: OTP_SELLER_CROP_ID,
        payload: sellerCropId
    };
};

/** Store buyer id on connect
 * 
 * @param { string } buyerId - Buyer Id
 */
export const setBuyerIdOnConnect = (buyerId: string) => {
    return {
        type: OTP_BUYER_ID,
        payload: buyerId
    };
};

/** Store buyer crop id on connect
 * 
 * @param { string } buyerCropId - Buyer crop Id
 */
export const setBuyerCropIdOnConnect = (buyerCropId: string) => {
    return {
        type: OTP_BUYER_CROP_ID,
        payload: buyerCropId
    };
};

/** Store masterlist
 * 
 * @param { Array<any> } masterlist - Masterlist
 */
export const updateStoreMasterList = (masterlist: Array<any>) => {
    return {
        type: UPDATE_MASTER_LIST,
        payload: masterlist,
    };
};

/** Store payment redirection details
 * 
 * @param { any } paymentRedirectionDetails - Payment redirection details
 */
export const updatePaymentRedirectionDetails = (paymentRedirectionDetails: any) => {
    return {
        type: UPDATE_PAYMENT_REDIRECTION_DETAILS,
        payload: paymentRedirectionDetails,
    };
};

/** Store payment amount
 * 
 * @param { any } paymentAmount - Payment Amount
 */
export const updatePaymentAmount = (paymentAmount: any) => {
    return {
        type: UPDATE_PAYMENT_AMOUNT,
        payload: paymentAmount,
    };
};

/** Store payment details
 * 
 * @param { Array<any> } paymentDetails - Payment details
 */
export const updatePaymentDetails = (paymentDetails: Array<any>) => {
    return {
        type: UPDATE_PAYMENT_DETAILS,
        payload: paymentDetails,
    };
};

/** Store all buyer event list
 * 
 * @param { Array<any> } eventTemplate - Event Template
 */
export const updateBuyerEventList = (eventTemplate: Array<any>) => {
    return {
        type: UPDATE_EVENT_TEMPLATE,
        payload: eventTemplate,
    };
};

/** Store buyer current status details
 * 
 * @param { string } status - Current status details
 */
export const updateCurrentStatusDetails = (status: string) => {
    return {
        type: UPDATE_CURRENT_STATUS_DETAILS,
        payload: status,
    };
};

/** Store produce list
 * 
 * @param produceList - Produce list
 */
export const updateProduceList = (produceList: Array<ProduceModel>) => {
    return {
        type: UPDATE_PRODUCE_LIST,
        payload: produceList
    };
};

/** Store master produce name list
 * 
 * @param { Array<string> } masterCropNames - master produce names
 */
export const updateMasterCropNamesList = (masterCropNames: Array<string>) => {
    return {
        type: UPDATE_MASTER_CROP_NAMES_LIST,
        payload: masterCropNames
    };
};

/** Store crop list
 * 
 * @param { Array<string> } cropsList - crop list
 */
export const updateCropsList = (cropsList: Array<string>) => {
    return {
        type: UPDATE_CROPS_LIST,
        payload: cropsList
    };
};

/** Store variety list
 * 
 * @param { Array<string> } varietyList - Variety list
 */
export const updateVarietyList = (varietyList: Array<string>) => {
    return {
        type: UPDATE_VARIETY_LIST,
        payload: varietyList
    };
};

/** Store masterlist
 * 
 * @param { Array<MatchRequirementModel> } matchesList - Masterlist
 */
export const updateMatchesList = (matchesList: Array<MatchRequirementModel>) => {
    return {
        type: UPDATE_MATCHES_LIST,
        payload: matchesList
    };
};

/** Store match loading flag
 * 
 * @param { boolean } loadingFlag - True if loading
 */
export const setMatchesLoadingFlag = (loadingFlag: boolean) => {
    return {
        type: SET_MATCHES_LOADER,
        payload: loadingFlag
    };
};

/** Update buyer reject count
 * 
 * @param { any } rejectCount - The numnber of times buyer has rejected the match
 */
export const updateBuyerRejectCount = (rejectCount: any) => {
    return {
        type: UPDATE_REJECT_COUNT,
        payload: rejectCount,
    };
};

/** Update buyer transaction list
 * 
 * @param { TransactionStatus } transactionType - Transaction status type
 * @param { Array<any> } transactionListData - Transaction list data
 */
export const updateBuyerTransactionList = (transactionType: TransactionStatus, transactionListData: Array<any>) => {
    return {
        type: UPDATE_TRANSACTION_LIST,
        payload: { transactionType, transactionListData }
    };
};

/** Fetch masterlist data
 * 
 */
export const getMasterProduceList = () => {
    return async (dispatch: any) => {
        const masterProduceList = await getMasterList();
        const masterList = masterProduceList || [];
        dispatch(updateStoreMasterList(masterList));
    };
};

/** Update masterlist data
 * 
 * @param { Array<MasterListApiFormat> } masterlist - Masterlist
 */
export const updateMasterListData = (masterlist: Array<MasterListApiFormat>) => {
    return async (dispatch: any) => {
        await updateMasterList(masterlist);
        dispatch(getMasterProduceList());
    };
};

/** Add new produce
 * 
 * @param { any } produceFormData - Produce data
 */
export const addNewProduce = (/*produceFormData: ProduceModel*/ produceFormData: any) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { district, zip } = loginUser;
        await addProduce({ ...produceFormData, district, zip });
        dispatch(getProduceList());
    };
};

/** Edit produce data
 * 
 * @param { any } produceFormData - Produce data
 */
export const editProduce = (/*produceFormData: ProduceModel*/ produceFormData: any) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { district, zip } = loginUser;
        await patchProduce({ ...produceFormData, district, zip });
        dispatch(getProduceList());
    };
};

/** Delete selected produce by using crop id
 * 
 * @param { string } produceID - Crop Id
 */
export const deleteSelectedProduce = (produceID: string) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { is_buyer } = loginUser;
        await deleteProduce(produceID, is_buyer);
        dispatch(getProduceList());
    };
};

/** Fetch all produce list
 * 
 */
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

/** Fetch all crop categories
 * 
 */
export const fetchAllProduce = () => {
    return async (dispatch: any) => {
        const allProduceList = await getCropCategoryList();
        const { categories } = allProduceList || [];
        dispatch(updateMasterCropNamesList(categories));
    };
};

/** Fetch all produce of the category
 * 
 * @param { string } category - Category
 */
export const fetchAllCrops = (category: string) => {
    return async (dispatch: any) => {
        const allCropsList = await getCropList(category);
        const { crops } = allCropsList || [];
        dispatch(updateCropsList(crops));
    };
};

/** Fetch all variety of the produce
 * 
 * @param { string } crop - Produce
 */
export const fetchAllVariety = (crop: string) => {
    return async (dispatch: any) => {
        const allVarietyList = await getSubCategoryList(crop);
        const { crops: { Items: variety } } = allVarietyList || { variety: [] };
        dispatch(updateVarietyList(variety));
    };
};

/** Get matches for buyer crops
 * 
 * @param { Array<ProduceModel>} cropsList - Crop list
 */
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
            const genericData = buyerMatchesData[matchesLength - 1];
            if (!isEmpty(buyerMatchesData[0])) {
                const additionalInfo =
                    await fetchAdditionalInfo(
                        buyerMatchesData[0].seller_id,
                        buyerMatchesData[0].seller_crop_id
                    );

                let output = {
                    ...buyerMatchesData[0],
                    key: buyerMatchesData[0].seller_crop_id,
                    ...genericData,
                    ...additionalInfo
                };
                const historyResponse = await fetchUserHistory({ buyerId: output.buyer_id, produce: output.produce, sellerId: output.seller_id });
                const destinyResponse = await fetchDestinyId(parseIDfromHash(output.seller_id));
                const { count, history } = historyResponse;
                const cropImageList = await getSellerCropImages(output.seller_id, output.seller_crop_id);
                output = { ...output, count, history, cropImageList, ...destinyResponse };
                let children: any = [];
                for (let i = 1; i < (matchesLength - 1); i++) {
                    const additionalInfo =
                        await fetchAdditionalInfo(
                            output.seller_id,
                            output.seller_crop_id
                        );
                    let childernContent = {
                        ...buyerMatchesData[i],
                        isChild: true,
                        key: buyerMatchesData[i].seller_crop_id,
                        ...genericData,
                        ...additionalInfo
                    };
                    const historyResponse = await fetchUserHistory({ buyerId: childernContent.buyer_id, produce: childernContent.produce, sellerId: childernContent.seller_id });
                    const destinyResponse = await fetchDestinyId(parseIDfromHash(childernContent.seller_id));
                    const { count, history } = historyResponse;
                    const cropImageList = await getSellerCropImages(childernContent.seller_id, childernContent.seller_crop_id);
                    childernContent = { ...childernContent, count, history, cropImageList, ...destinyResponse };
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

/** Reject the match
 * 
 * @param { BuyerRejectMatch } rejectData - Buyer data
 */
export const rejectMatches = (rejectData: BuyerRejectMatch) => {
    return async (dispatch: any) => {
        await rejectMatch(rejectData);
        /* Re-calculate matches for all crop */
        /* Logic can be changed to specific crop if required */
        dispatch(getProduceList());
        dispatch(getUserCompleteDetails());
    };
};

/** Connect the match with the seller
 * 
 * @param { any } transactionEntry - Transaction entry
 */
export const connectMatch = (transactionEntry: any) => {
    return async (dispatch: any) => {
        await createTransaction(transactionEntry);
        dispatch(getProduceList());
        dispatch(getTransactionList(TransactionStatus.pending));
        return Promise.resolve('Successs');
    };
};

/** Check the connection status of the seller
 * 
 * @param { string } sellerId - Seller id
 * @param { string } sellerCropId - Seller crop id
 */
export const checkSellerConnectedStatus = (sellerId: string, sellerCropId: string) => {
    return async () => {
        const connectedStatus = await sellerConnectStatus({
            sellerId,
            sellerCropId
        });
        return Promise.resolve(connectedStatus);
    };
};

/** Fetch Transaction list according to the transactionStatus
 * 
 * @param { TransactionStatus } transactionStatus - Transaction status
 */
export const getTransactionList = (transactionStatus: TransactionStatus) => {
    return async (dispatch: any) => {
        const transactionListResponse = await fetchTransactionList(transactionStatus);
        let transactionFinalResponse: any = [];
        for (let i = 0; i < transactionListResponse.length; i++) {
            const additionalInfo =
                await fetchAdditionalInfo(
                    transactionListResponse[i].seller_id,
                    transactionListResponse[i].seller_crop_id
                );
            const cropImageList = await getSellerCropImages(transactionListResponse[i].seller_id, transactionListResponse[i].seller_crop_id);
            const destinyResponse = await fetchDestinyId(parseIDfromHash(transactionListResponse[i].seller_id));
            let list = { ...transactionListResponse[i], ...additionalInfo, cropImageList, ...destinyResponse };
            list.key = transactionListResponse[i].pk;
            transactionFinalResponse.push(list);
        }
        dispatch(updateBuyerTransactionList(transactionStatus, transactionFinalResponse));
        dispatch(getProduceList());
    };
};

/** Fetch payment details
 * 
 */
export const getPaymentDetails = () => {
    return async (dispatch: any, getState: any) => {
        const { buyer }: { buyer: BuyerStateModel } = getState() as RootState;
        const paymentRedirectionDetails = buyer.paymentRedirectionDetails;
        const paymentDetails = await getPaymentList(paymentRedirectionDetails);
        dispatch(updatePaymentDetails(paymentDetails));
    };
};

/** Fetch buyer status details
 * 
 * @param { any } userData -
 */
export const currentBuyerStatusDetails = (userData: any) => {
    return async (dispatch: any) => {
        const currentStatusResponse = await getCurrentStatusDetails(userData);
        if (!isEmpty(currentStatusResponse)) {
            const status = currentStatusResponse;
            dispatch(updateCurrentStatusDetails(status[0]));
        }
    };
};

/** Fetch Amount for payment
 * 
 * @param { string } userData - User Data
 */
export const getAmount = (userData: string) => {
    return async (dispatch: any) => {
        var id = userData;
        id = id.substring(12);
        const amount = await getPaymentAmount(id);
        dispatch(updatePaymentAmount(amount));
    };
};

export const cashAndCheckPayment=(values:any)=>{
    return async () => {
        const result = await submitCheckDraftDetails(values);
    }
};

export const rejectFormPayload =(values:any)=>{
    return async () => {
        const result = await submitRejectFormPayload(values);
    }
};

export const isDeliveryRecievedPayload =(values:any)=>{
    return async ()=>{
        const result = await submitDeliveryDetail(values)
    }
}