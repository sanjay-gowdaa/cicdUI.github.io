import { isEmpty, isNull } from 'lodash';

import { CropApiModel, SellerStateModel } from './types';

import {
    getSubCategoryList,
    createCrop,
    getAllCrops,
    getCropCategoryList,
    getCropList,
    getLiveApmcRateUpdated,
    deleteProduce,
    patchCrop,
    intentToSell,
    fetchSellerMatches,
    postSellerTransactionAction,
    fetchTransactionList,
    getCurrentStatusDetails
} from '../api';
import { ApmcApiResponseBase, UpdatedLiveApmcRatesQuery } from '../genericTypes';
import { UserStateModel } from '../loginReducer/types';
import { RootState } from '../rootReducer';

import { getTimeStamp } from '../../app-components/utils';
import { MatchRequirementModel, TransactionAction, TransactionStatus } from '../../buyer-seller-commons/types';
import { getUserAdditionalInfo, getUserHistory } from '../../buyer-seller-commons/actions';

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const UPDATE_MASTER_CROPS = 'UPDATE_MASTER_CROPS';
export const UPDATE_VARIETY = 'UPDATE_VARIETY';
export const ADD_NEW_CROP = 'ADD_NEW_CROP';
export const UPDATE_SELLER_CROPS_LIST = 'UPDATE_SELLER_CROPS_LIST';
export const UPDATE_APMC_RATE = 'UPDATE_APMC_RATE';
export const UPDATE_APMC_DATA_TO_CROPS = 'UPDATE_APMC_DATA_TO_CROPS';
export const UPDATE_TIME_STAMP = 'UPDATE_TIME_STAMP';
export const UPDATE_SELLER_MATCHES = 'UPDATE_SELLER_MATCHES';
export const UPDATE_SELLER_TRANSACTION_LIST = 'UPDATE_SELLER_TRANSACTION_LIST';
export const UPDATE_CURRENT_STATUS_DETAILS = 'UPDATE_CURRENT_STATUS_DETAILS';
export const OTP_ERROR_ON_ACCEPT = 'OTP_ERROR_ON_ACCEPT';
export const OTP_ERROR_MSG_ON_ACCEPT = 'OTP_ERROR_MSG_ON_ACCEPT';
export const OTP_VERIFIED_ON_ACCEPT = 'OTP_VERIFIED_ON_ACCEPT';
export const OTP_SELLER_ID = 'OTP_SELLER_ID';
export const OTP_BUYER_ID = 'OTP_BUYER_ID';
export const OTP_SELLER_CROP_ID = 'OTP_SELLER_CROP_ID';
export const OTP_BUYER_CROP_ID = 'OTP_BUYER_CROP_ID';
export const UPDATE_REJECT_COUNT = 'UPDATE_REJECT_COUNT';
export const UPDATE_EVENT_TEMPLATE = 'UPDATE_EVENT_TEMPLATE';
export const SET_STATUS_DETAILS = 'SET_STATUS_DETAILS';
export const SET_MATCHES_LOADER = 'SET_MATCHES_LOADER';
export const SET_APMC_ACTUAL = 'SET_APMC_ACTUAL';

export const setMatchesLoadingFlag = (loadingFlag: boolean) => {
    return {
        type: SET_MATCHES_LOADER,
        payload: loadingFlag
    };
};

export const setSellerStatusDetails = (status: any, key: any) => {
    return {
        type: SET_STATUS_DETAILS,
        payload: { details: status, key: key }
    };
};

export const updateSellerRejectCount = (rejectCount: any) => {
    return {
        type: UPDATE_REJECT_COUNT,
        payload: rejectCount,
    };
};

export const setSellerIdOnAccept = (sellerId: String) => {
    return {
        type: OTP_SELLER_ID,
        payload: sellerId
    };
};

export const setSellerCropIdOnAccept = (sellerCropId: String) => {
    return {
        type: OTP_SELLER_CROP_ID,
        payload: sellerCropId
    };
};

export const setBuyerIdOnAccept = (buyerId: String) => {
    return {
        type: OTP_BUYER_ID,
        payload: buyerId
    };
};

export const setBuyerCropIdOnAccept = (buyerCropId: String) => {
    return {
        type: OTP_BUYER_CROP_ID,
        payload: buyerCropId
    };
};

export const setSellerOtpErrorOnAccept = (errorFlag: Boolean) => {
    return {
        type: OTP_ERROR_ON_ACCEPT,
        payload: errorFlag
    };
};

export const setSellerOtpErrorMsgOnAccept = (errorMg: String) => {
    return {
        type: OTP_ERROR_MSG_ON_ACCEPT,
        payload: errorMg
    };
};

export const setSellerVerifiedOnAccept = (isVerified: Boolean) => {
    return {
        type: OTP_VERIFIED_ON_ACCEPT,
        payload: isVerified
    };
};

export const updateCurrentStatusDetails = (status: string) => {
    return {
        type: UPDATE_CURRENT_STATUS_DETAILS,
        payload: status,
    };
};

export const updateAllCategories = (categories: Array<string>) => {
    return {
        type: UPDATE_CATEGORIES,
        payload: categories
    };
};

export const updateMasterCrops = (produce: Array<string>) => {
    return {
        type: UPDATE_MASTER_CROPS,
        payload: produce
    };
};

export const updateVariety = (variety: Array<any>) => {
    return {
        type: UPDATE_VARIETY,
        payload: variety
    };
};

export const updateSellerCropsList = (cropsList: Array<any>) => {
    return {
        type: UPDATE_SELLER_CROPS_LIST,
        payload: cropsList
    };
};

export const updateApmcCropRate = (modalPrice: string | number) => {
    return {
        type: UPDATE_APMC_RATE,
        payload: modalPrice
    };
};

export const setApmcisActual = (isActual: boolean) => {
    return {
        type: SET_APMC_ACTUAL,
        payload: isActual
    }
};

export const updateSellerTransactionList = (transactionType: TransactionStatus, transactionListData: Array<any>) => {
    return {
        type: UPDATE_SELLER_TRANSACTION_LIST,
        payload: { transactionType, transactionListData }
    };
};

export const updateTimeStamp = (timeStamp: any) => {
    return {
        type: UPDATE_TIME_STAMP,
        payload: timeStamp
    };
};

export const updateSellerMatches = (matchesList: Array<MatchRequirementModel>) => {
    return {
        type: UPDATE_SELLER_MATCHES,
        payload: matchesList
    };
};

export const updateSellerEventList = (eventTemplate: Array<any>) => {
    return {
        type: UPDATE_EVENT_TEMPLATE,
        payload: eventTemplate,
    };
};

export const updateApmcListData = (
    allCropsApmcData: Array<ApmcApiResponseBase>,
    cropsList: Array<CropApiModel>
) => {
    const allProduceApmcData = Array.isArray(allCropsApmcData) ? allCropsApmcData.map((apmcData: ApmcApiResponseBase) => {
        if (!isEmpty(apmcData)) {
            const { latest_apmc_price, previousLatestApmcPrice, is_actual } = apmcData;
            const difference = latest_apmc_price - previousLatestApmcPrice;
            return { apmc_price: latest_apmc_price, increase: difference, is_actual };
        } else {
            return { apmc_price: '', increase: null };
        }
    }) : [];

    const cropListUpdated = allProduceApmcData.length ? cropsList.map((cropProduce: CropApiModel, index: number) => {
        return { ...cropProduce, apmc_rate_data: allProduceApmcData[index] };
    }) : cropsList;

    return {
        type: UPDATE_SELLER_CROPS_LIST,
        payload: cropListUpdated
    };
};

export const updatedFetchLiveApmcRate = ({
    grade,
    itemName,
    variety,
    category
}: {
    grade: string,
    itemName: string,
    variety: string,
    category: string,
}) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser } = getState() as RootState;
        const { district } = loginUser;
        const apmcPriceResponse: Array<ApmcApiResponseBase> = await getLiveApmcRateUpdated([{ grade, district, variety, category, produce: itemName }]);
        const apmcPriceDetails = (!isEmpty(apmcPriceResponse) && !isNull(apmcPriceResponse)) ? apmcPriceResponse : [];
        if (apmcPriceDetails.length) {
            const { latest_apmc_price, is_actual } = apmcPriceDetails[0] || {};
            if (latest_apmc_price !== undefined) {
                dispatch(updateApmcCropRate(latest_apmc_price));
                dispatch(setApmcisActual(is_actual));
            } else {
                dispatch(updateApmcCropRate('No records found'));
            }
        }
    };
};

export const fetchAllCategories = () => {
    return async (dispatch: any) => {
        const allCategoriesList = await getCropCategoryList();
        const { categories } = allCategoriesList || [];
        dispatch(updateAllCategories(categories));
    };
};

export const fetchAllMasterCrops = (category: string) => {
    return async (dispatch: any) => {
        const allCropList = await getCropList(category);
        const { crops } = allCropList || [];
        dispatch(updateMasterCrops(crops));
    };
};

export const fetchAllVariety = (cropName: string) => {
    return async (dispatch: any) => {
        const allVarietyList = await getSubCategoryList(cropName);
        const { crops: { Items: variety } } = allVarietyList || { variety: [] };
        dispatch(updateVariety(variety));
    };
};

export const addNewCropData = (cropData: FormData) => {
    return async (dispatch: any) => {
        await createCrop(cropData);
        dispatch(getAllCropsList());
    };
};

export const updateCropData = (cropData: any) => {
    return async (dispatch: any) => {
        await patchCrop(cropData);
        dispatch(getAllCropsList());
    };
};

export const sellerIntentToSell = (cropData: any, cropID: string, isPriceUpdated?: boolean) => {
    return async (dispatch: any) => {
        if (isPriceUpdated) {
            await patchCrop({ ...cropData, is_delete: 'no' });
        }
        await intentToSell(cropID);
        dispatch(getAllCropsList());
    };
};

export const deleteSelectedCrop = (cropID: string) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { is_seller } = loginUser;
        await deleteProduce(cropID, !is_seller);
        dispatch(getAllCropsList());
    };
};

export const fetchAllCropsApmcData = (Items: Array<CropApiModel>) => {
    return async (dispatch: any, getState: any) => {
        const { seller } = getState() as RootState;
        const { cropsList }: SellerStateModel = seller;
        const apmcFetchDataCrops: Array<UpdatedLiveApmcRatesQuery> = Items.map((item: CropApiModel) => {
            const { category_name, crop_name, sub_category, district, grade } = item;
            return { category: category_name, produce: crop_name, variety: sub_category, grade, district }
        })
        const allCropsPriceModel = await getLiveApmcRateUpdated(apmcFetchDataCrops);
        const allCropsPriceModelDetails = (!isEmpty(allCropsPriceModel) && !isNull(allCropsPriceModel)) ? allCropsPriceModel : [];
        dispatch(updateApmcListData(allCropsPriceModelDetails, cropsList));
    };
};

export const getAllCropsList = () => {
    return async (dispatch: any) => {
        const cropsList = await getAllCrops();
        const { Items } = cropsList || { Items: [] };
        dispatch(updateSellerCropsList(Items));
        if (Items.length) {
            dispatch(fetchAllCropsApmcData(Items));
        }
    };
};

export const getAllSellerMatches = () => {
    return async (dispatch: any) => {
        dispatch(setMatchesLoadingFlag(true));
        const sellerMatches = await fetchSellerMatches();
        let matchList: any = [];
        for (let i = 0; i < sellerMatches.length; i++) {
            const additionalInfo =
                await getUserAdditionalInfo(
                    sellerMatches[i].buyer_id,
                    sellerMatches[i].buyer_crop_id
                );
            const historyResponse =
                await getUserHistory(
                    sellerMatches[i].buyer_id,
                    sellerMatches[i].produce,
                    sellerMatches[i].gsi
                );
            const { count, history } = historyResponse;
            matchList[i] = { ...sellerMatches[i], count, history, ...additionalInfo };
        }
        dispatch(updateSellerMatches(matchList));
        dispatch(setMatchesLoadingFlag(false));
    };
};

export const transactionAction = (
    tarnsactionID: string,
    action: TransactionAction,
    cropDetails: MatchRequirementModel
) => {
    return async (dispatch: any) => {
        await postSellerTransactionAction(tarnsactionID, action, cropDetails);
        dispatch(getAllCropsList());
        dispatch(getAllSellerMatches());
        if (action === TransactionAction.accept) {
            dispatch(getSellerTransactionList(TransactionStatus.pending));
        } else if (action === TransactionAction.reject) {
            dispatch(getSellerTransactionList(TransactionStatus.completed));
        }
    };
};

export const getSellerTransactionList = (transactionStatus: TransactionStatus) => {
    return async (dispatch: any) => {
        const transactionListResponse = await fetchTransactionList(transactionStatus);
        let transactionFinalResponse: any = [];
        for (let i = 0; i < transactionListResponse.length; i++) {
            const additionalInfo =
                await getUserAdditionalInfo(
                    transactionListResponse[i].buyer_id,
                    transactionListResponse[i].buyer_crop_id
                );
            let list = { ...transactionListResponse[i], ...additionalInfo };
            list.key = transactionListResponse[i].pk;
            transactionFinalResponse.push(list);
        }
        dispatch(updateSellerTransactionList(transactionStatus, transactionFinalResponse));
    };
};

export const saveTimeStamp = (dispatch: any) => {
    const timeStamp = getTimeStamp();
    dispatch(updateTimeStamp(timeStamp));
};

export const currentSellerStatusDetails = (userData: any) => {
    return async (dispatch: any) => {
        const currentStatusResponse = await getCurrentStatusDetails(userData);
        if (!isEmpty(currentStatusResponse)) {
            const status = currentStatusResponse;
            dispatch(updateCurrentStatusDetails(status[0]));
        }
    };
};
