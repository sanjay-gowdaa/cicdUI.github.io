import {
    ADD_NEW_CROP,
    UPDATE_APMC_RATE,
    UPDATE_CATEGORIES,
    UPDATE_MASTER_CROPS,
    UPDATE_SELLER_CROPS_LIST,
    UPDATE_SELLER_MATCHES,
    UPDATE_SELLER_TRANSACTION_LIST,
    UPDATE_VARIETY,
    UPDATE_STATUS_DETAILS,
    UPDATE_CURRENT_STATUS_DETAILS,
    OTP_ERROR_MSG_ON_ACCEPT,
    OTP_VERIFIED_ON_ACCEPT,
    PRODUCE_NAME_ON_ACCEPT,
    UPDATE_REJECT_COUNT
} from './actions';
import {
    mockReviewsList,
} from './mockData.temp';
import { SellerStateModel } from './types';

const INITIAL_STATE: SellerStateModel = {
    cropsList: [],
    masterCrops: [],
    variety: [],
    matchesList: [],
    transactionList: { Pending: [], active: [], complete: [] },
    reviewsList: mockReviewsList,
    categories: [],
    apmcCropPrice: '',
    timeStamp: {},
    statusDetails: [],
    currentStatusDetails: [],
    rejectCount: '',
    otpError: { showError: false, errorMg: '', verified: false, produce: '' }
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

        case UPDATE_STATUS_DETAILS:
            return { ...state, statusDetails: action.payload }

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

        case PRODUCE_NAME_ON_ACCEPT:
            const { otpError: errorProduceObj } = state;
            const updateProduceName = { ...errorProduceObj, produce: action.payload }
            return { ...state, otpError: updateProduceName };
        
        case UPDATE_REJECT_COUNT:
            return {...state, rejectCount: action.payload }

        default:
            return state;
    }
};

export default reducer;
