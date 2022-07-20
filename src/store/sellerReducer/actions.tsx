import { isEmpty, isNull, isUndefined } from 'lodash';

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
    getCurrentStatusDetails,
    fetchAdditionalInfo,
    fetchUserHistory,
    fetchDestinyId
} from '../api';
import { ApmcApiResponseBase, UpdatedLiveApmcRatesQuery } from '../genericTypes';
import { UserStateModel } from '../loginReducer/types';
import { RootState } from '../rootReducer';

import { MatchRequirementModel, TransactionAction, TransactionStatus } from '../../buyer-seller-commons/types';
import { parseIDfromHash } from '../../app-components/utils';

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
export const SET_APMC_NEAREST_DISTRICT = 'SET_APMC_NEAREST_DISTRICT';

/** Store seller match loading flag
 * 
 * @param { boolean } loadingFlag - True if match is loacding
 */
export const setMatchesLoadingFlag = (loadingFlag: boolean) => {
    return {
        type: SET_MATCHES_LOADER,
        payload: loadingFlag
    };
};

/** Store seller status details
 * 
 * @param { any } status - Status details
 * @param { any } key - Key
 */
export const setSellerStatusDetails = (status: any, key: any) => {
    return {
        type: SET_STATUS_DETAILS,
        payload: { details: status, key: key }
    };
};

/** Store seller reject count
 * 
 * @param { any } rejectCount - Seller reject count
 */
export const updateSellerRejectCount = (rejectCount: any) => {
    return {
        type: UPDATE_REJECT_COUNT,
        payload: rejectCount,
    };
};

/** Store seller id on accept
 * 
 * @param { string } sellerId - Seller id
 */
export const setSellerIdOnAccept = (sellerId: string) => {
    return {
        type: OTP_SELLER_ID,
        payload: sellerId
    };
};

/** Store seller crop id on accept
 * 
 * @param { string } sellerCropId - Seller crop id
 */
export const setSellerCropIdOnAccept = (sellerCropId: string) => {
    return {
        type: OTP_SELLER_CROP_ID,
        payload: sellerCropId
    };
};

/** Store buyer id on accept
 * 
 * @param { string } buyerId - Buyer Id
 */
export const setBuyerIdOnAccept = (buyerId: string) => {
    return {
        type: OTP_BUYER_ID,
        payload: buyerId
    };
};

/** Store buyer crop id on accept
 * 
 * @param { string } buyerCropId - Buyer crop id
 */
export const setBuyerCropIdOnAccept = (buyerCropId: string) => {
    return {
        type: OTP_BUYER_CROP_ID,
        payload: buyerCropId
    };
};

/** Store otp error flag on seller accept
 * 
 * @param { boolean } errorFlag - True if otp error is present on accept
 */
export const setSellerOtpErrorOnAccept = (errorFlag: boolean) => {
    return {
        type: OTP_ERROR_ON_ACCEPT,
        payload: errorFlag
    };
};

/** Store otp error message on seller accept
 * 
 * @param { string } errorMg - Error message
 */
export const setSellerOtpErrorMsgOnAccept = (errorMg: string) => {
    return {
        type: OTP_ERROR_MSG_ON_ACCEPT,
        payload: errorMg
    };
};

/** Store true if seller otp is verified on accept
 * 
 * @param { boolean } isVerified - True if seller otp is verified on accept
 */
export const setSellerVerifiedOnAccept = (isVerified: boolean) => {
    return {
        type: OTP_VERIFIED_ON_ACCEPT,
        payload: isVerified
    };
};

/** Store current status details
 * 
 * @param { string } status - Status
 */
export const updateCurrentStatusDetails = (status: string) => {
    return {
        type: UPDATE_CURRENT_STATUS_DETAILS,
        payload: status,
    };
};

/** Store all categories
 * 
 * @param { Array<string> } categories - Category
 */
export const updateAllCategories = (categories: Array<string>) => {
    return {
        type: UPDATE_CATEGORIES,
        payload: categories
    };
};

/** Store master crops
 * 
 * @param { Array<string> } produce - Master crops
 */
export const updateMasterCrops = (produce: Array<string>) => {
    return {
        type: UPDATE_MASTER_CROPS,
        payload: produce
    };
};

/** Store variety
 * 
 * @param { Array<any> } variety - Variety
 */
export const updateVariety = (variety: Array<any>) => {
    return {
        type: UPDATE_VARIETY,
        payload: variety
    };
};

/** Store seller crops list
 * 
 * @param { Array<any> } cropsList - Crop list
 */
export const updateSellerCropsList = (cropsList: Array<any>) => {
    return {
        type: UPDATE_SELLER_CROPS_LIST,
        payload: cropsList
    };
};

/** Store apmc crop rate
 * 
 * @param { string | number } modalPrice - Modal Price
 */
export const updateApmcCropRate = (modalPrice: string | number) => {
    return {
        type: UPDATE_APMC_RATE,
        payload: modalPrice
    };
};

/** Store true if the apmc data is of the actual district
 * 
 * @param { boolean } isActual - True if the apmc data is of the actual district
 */
export const setApmcisActual = (isActual: boolean) => {
    return {
        type: SET_APMC_ACTUAL,
        payload: isActual
    }
};

/** Apmc Nearest District
 * 
 * @param { string } district - District
 */
export const setApmcNearestDistrict = (district: string) => {
    return {
        type: SET_APMC_NEAREST_DISTRICT,
        payload: isUndefined(district) ? '' : district
    };
};

/** Store seller transaction list
 * 
 * @param { TransactionStatus } transactionType - Transaction status type
 * @param { Array<any> } transactionListData - Transaction list data
 */
export const updateSellerTransactionList = (transactionType: TransactionStatus, transactionListData: Array<any>) => {
    return {
        type: UPDATE_SELLER_TRANSACTION_LIST,
        payload: { transactionType, transactionListData }
    };
};

/** Store seller matches
 * 
 * @param { Array<MatchRequirementModel> } matchesList - Matcheslist
 */
export const updateSellerMatches = (matchesList: Array<MatchRequirementModel>) => {
    return {
        type: UPDATE_SELLER_MATCHES,
        payload: matchesList
    };
};

/** Store all seller event template list
 * 
 * @param { Array<any> } eventTemplate - Event template
 */
export const updateSellerEventList = (eventTemplate: Array<any>) => {
    return {
        type: UPDATE_EVENT_TEMPLATE,
        payload: eventTemplate,
    };
};

/** Update apmc list details
 * 
 * @param { Array<ApmcApiResponseBase> } allCropsApmcData - All produce apmc details
 * @param { Array<CropApiModel> } cropsList - Produce list
 */
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

/** Fetch all live apmc data for the produce
 * 
 * @param { string } grade - Grade
 * @param { string } itemName - Produce
 * @param { string } variety - Variety
 * @param { string } category - Category
 */
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
            const { latest_apmc_price, is_actual, nearest_district } = apmcPriceDetails[0] || {};
            if (latest_apmc_price !== 0) {
                dispatch(updateApmcCropRate(latest_apmc_price));
                dispatch(setApmcisActual(is_actual));
                dispatch(setApmcNearestDistrict(nearest_district));
            } else {
                dispatch(updateApmcCropRate('No records found'));
            }
        }
    };
};

// Fetch all categories
export const fetchAllCategories = () => {
    return async (dispatch: any) => {
        const allCategoriesList = await getCropCategoryList();
        const { categories } = allCategoriesList || [];
        dispatch(updateAllCategories(categories));
    };
};

/** Fetch all produce for the selected category
 * 
 * @param { string } category - Category name
 */
export const fetchAllMasterCrops = (category: string) => {
    return async (dispatch: any) => {
        const allCropList = await getCropList(category);
        const { crops } = allCropList || [];
        dispatch(updateMasterCrops(crops));
    };
};

/** Fetch all variety for the selected produce
 * 
 * @param { string } cropName - Produce name
 */
export const fetchAllVariety = (cropName: string) => {
    return async (dispatch: any) => {
        const allVarietyList = await getSubCategoryList(cropName);
        const { crops: { Items: variety } } = allVarietyList || { variety: [] };
        dispatch(updateVariety(variety));
    };
};

/** Add new crop data
 * 
 * @param { FormData } cropData - Crop data
 */
export const addNewCropData = (cropData: FormData) => {
    return async (dispatch: any) => {
        await createCrop(cropData);
        dispatch(getAllCropsList());
    };
};

/** Store crop data
 * 
 * @param { any } cropData - Crop Data
 */
export const updateCropData = (cropData: any) => {
    return async (dispatch: any) => {
        await patchCrop(cropData);
        dispatch(getAllCropsList());
    };
};

/** Seller intent to sell update
 * 
 * @param { any } cropData - Crop details
 * @param { string } cropID - Crop Id
 * @param { boolean } isPriceUpdated - True if price is updated
 */
export const sellerIntentToSell = (cropData: any, cropID: string, isPriceUpdated?: boolean) => {
    return async (dispatch: any) => {
        if (isPriceUpdated) {
            await patchCrop({ ...cropData, is_delete: 'no' });
        }
        await intentToSell(cropID);
        dispatch(getAllCropsList());
    };
};

/** Delete selected crop
 * 
 * @param { string } cropID - Crop Id
 */
export const deleteSelectedCrop = (cropID: string) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        const { is_seller } = loginUser;
        await deleteProduce(cropID, !is_seller);
        dispatch(getAllCropsList());
    };
};

/** Fetch all produce apmc data
 * 
 * @param { Array<CropApiModel> } Items - Crop details
 */
export const fetchAllCropsApmcData = (Items: Array<CropApiModel>) => {
    return async (dispatch: any, getState: any) => {
        const { seller } = getState() as RootState;
        const { cropsList }: SellerStateModel = seller;
        const apmcFetchDataCrops: Array<UpdatedLiveApmcRatesQuery> = Items.map((item: CropApiModel) => {
            const { category, produce, variety, district, grade } = item;
            return { category: category, produce: produce, variety: variety, grade, district }
        })
        const allCropsPriceModel = await getLiveApmcRateUpdated(apmcFetchDataCrops);
        const allCropsPriceModelDetails = (!isEmpty(allCropsPriceModel) && !isNull(allCropsPriceModel)) ? allCropsPriceModel : [];
        dispatch(updateApmcListData(allCropsPriceModelDetails, cropsList));
    };
};

// Get all crops list
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

// Get all seller matches
export const getAllSellerMatches = () => {
    return async (dispatch: any) => {
        dispatch(setMatchesLoadingFlag(true));
        const sellerMatches = await fetchSellerMatches();
        let matchList: any = [];
        for (let i = 0; i < sellerMatches.length; i++) {
            const additionalInfo =
                await fetchAdditionalInfo(
                    sellerMatches[i].buyer_id,
                    sellerMatches[i].buyer_crop_id
                );
            const historyResponse =
                await fetchUserHistory({
                    buyerId: sellerMatches[i].buyer_id,
                    produce: sellerMatches[i].produce,
                    sellerId: sellerMatches[i].gsi
                });
            const destinyResponse = await fetchDestinyId(parseIDfromHash(sellerMatches[i].buyer_id));
            const { count, history } = historyResponse;
            matchList[i] = { ...sellerMatches[i], count, history, ...additionalInfo, ...destinyResponse };
        }
        dispatch(updateSellerMatches(matchList));
        dispatch(setMatchesLoadingFlag(false));
    };
};

/** Fetch Transaction
 * 
 * @param { string } tarnsactionID - Transaction Id
 * @param { TransactionAction } action - Transaction action either accept or reject
 * @param { MatchRequirementModel } cropDetails - Crop details
 */
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

/** Get seller transaction list based on the transaction status
 * 
 * @param { TransactionStatus } transactionStatus - Transaction status
 */
export const getSellerTransactionList = (transactionStatus: TransactionStatus) => {
    return async (dispatch: any) => {
        const transactionListResponse = await fetchTransactionList(transactionStatus);
        let transactionFinalResponse: any = [];
        for (let i = 0; i < transactionListResponse.length; i++) {
            const additionalInfo =
                await fetchAdditionalInfo(
                    transactionListResponse[i].buyer_id,
                    transactionListResponse[i].buyer_crop_id
                );
            const destinyResponse = await fetchDestinyId(parseIDfromHash(transactionListResponse[i].buyer_id));
            let list = { ...transactionListResponse[i], ...additionalInfo, ...destinyResponse };
            list.key = transactionListResponse[i].pk;
            transactionFinalResponse.push(list);
        }
        dispatch(updateSellerTransactionList(transactionStatus, transactionFinalResponse));
    };
};

/** Get current seller status details
 * 
 * @param { any } userData - User data
 */
export const currentSellerStatusDetails = (userData: any) => {
    return async (dispatch: any) => {
        const currentStatusResponse = await getCurrentStatusDetails(userData);
        if (!isEmpty(currentStatusResponse)) {
            const status = currentStatusResponse;
            dispatch(updateCurrentStatusDetails(status[0]));
        }
    };
};
