import {
    ADD_NEW_CROP,
    UPDATE_APMC_RATE,
    UPDATE_CATEGORIES,
    UPDATE_MASTER_CROPS,
    UPDATE_SELLER_CROPS_LIST,
    UPDATE_SELLER_MATCHES,
    UPDATE_SELLER_TRANSACTION_LIST,
    UPDATE_VARIETY,
    UPDATE_CURRENT_STATUS_DETAILS,
    OTP_ERROR_MSG_ON_ACCEPT,
    OTP_VERIFIED_ON_ACCEPT,
    UPDATE_REJECT_COUNT,
    UPDATE_EVENT_TEMPLATE,
    SET_STATUS_DETAILS,
    OTP_SELLER_ID,
    OTP_SELLER_CROP_ID,
    OTP_BUYER_ID,
    OTP_BUYER_CROP_ID
} from './actions';
import { SellerStateModel } from './types';

const INITIAL_STATE: SellerStateModel = {
    cropsList: [],
    masterCrops: [],
    variety: [],
    matchesList: [],
    transactionList: { Pending: [], active: [], complete: [] },
    reviewsList: [],
    categories: [],
    apmcCropPrice: '',
    timeStamp: {},
    currentStatusDetails: [],
    eventTemplate: [],
    rejectCount: '',
    otpError: { showError: false, errorMg: '', verified: false, sellerId: '', buyerId: '', sellerCropId: '', buyerCropId: '' },
    status: [{ details: [], key: "" }]
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {

        case ADD_NEW_CROP:
            const updatedCropList = [...state.cropsList, action.payload]
            return { ...state, cropsList: updatedCropList };

        case UPDATE_CATEGORIES:
            return { ...state, categories: action.payload };

        case UPDATE_MASTER_CROPS:
            return { ...state, masterCrops: action.payload };

        case UPDATE_VARIETY:
            return { ...state, variety: action.payload };

        case UPDATE_SELLER_CROPS_LIST:
            return { ...state, cropsList: action.payload };

        case UPDATE_APMC_RATE:
            return { ...state, apmcCropPrice: action.payload };

        case UPDATE_SELLER_MATCHES:
            return { ...state, matchesList: action.payload };

        case UPDATE_SELLER_TRANSACTION_LIST:
            const { transactionType, transactionListData } = action.payload;
            const { transactionList } = state;
            const updatedTransactionList = { ...transactionList, [transactionType]: transactionListData };
            return { ...state, transactionList: updatedTransactionList }

        case UPDATE_CURRENT_STATUS_DETAILS:
            return { ...state, currentStatusDetails: [...state.currentStatusDetails, action.payload] }

        case OTP_ERROR_MSG_ON_ACCEPT:
            const { otpError: errorObj } = state
            const updatedErrorMsg = { ...errorObj, errorMg: action.payload }
            return { ...state, otpError: updatedErrorMsg };

        case OTP_VERIFIED_ON_ACCEPT:
            const { otpError: errorDupObj } = state
            const updatedSuccessFlag = { ...errorDupObj, verified: action.payload }
            return { ...state, otpError: updatedSuccessFlag };

        case OTP_SELLER_ID:
            const { otpError: sellerIdObj } = state;
            const updatedSellerId = { ...sellerIdObj, sellerId: action.payload }
            return { ...state, otpError: updatedSellerId };

        case OTP_SELLER_CROP_ID:
            const { otpError: sellerCropIdObj } = state;
            const updatedSellerCropId = { ...sellerCropIdObj, sellerCropId: action.payload }
            return { ...state, otpError: updatedSellerCropId };

        case OTP_BUYER_ID:
            const { otpError: buyerIdObj } = state;
            const updatedBuyerId = { ...buyerIdObj, buyerId: action.payload }
            return { ...state, otpError: updatedBuyerId };

        case OTP_BUYER_CROP_ID:
            const { otpError: buyerCropIdObj } = state;
            const updatedBuyerCropId = { ...buyerCropIdObj, buyerCropId: action.payload }
            return { ...state, otpError: updatedBuyerCropId };


        case UPDATE_REJECT_COUNT:
            return { ...state, rejectCount: action.payload };

        case UPDATE_EVENT_TEMPLATE:
            return { ...state, eventTemplate: action.payload }

        case SET_STATUS_DETAILS:
            return { ...state, status: [...state.status, action.payload] }

        default:
            return state;
    }
};

export default reducer;
