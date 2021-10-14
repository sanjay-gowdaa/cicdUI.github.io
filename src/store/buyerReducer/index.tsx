import {
    UPDATE_MASTER_LIST,
    UPDATE_PRODUCE_LIST,
    UPDATE_CROPS_LIST,
    UPDATE_VARIETY_LIST,
    UPDATE_MASTER_CROP_NAMES_LIST,
    UPDATE_TIME_STAMP,
    UPDATE_MATCHES_LIST,
    UPDATE_MATCHES_LIST_FOR_BUYER_CROP,
    SET_MATCHES_LOADER,
    UPDATE_TRANSACTION_LIST,
    UPDATE_PAYMENT_DETAILS,
    UPDATE_PAYMENT_REDIRECTION_DETAILS,
    UPDATE_CURRENT_STATUS_DETAILS,
    UPDATE_EVENT_TEMPLATE,
    UPDATE_PAYMENT_AMOUNT,
    OTP_ERROR_ON_CONNECT,
    OTP_ERROR_MSG_ON_CONNECT,
    OTP_VERIFIED_ON_CONNECT,
    PRODUCE_NAME_ON_CONNECT,
    UPDATE_REJECT_COUNT,
    SET_STATUS_DETAILS
} from './actions';
import { mockReviewsList } from './mockData.temp';
import { BuyerStateModel } from './types';

const INITIAL_STATE: BuyerStateModel = {
    cropsList: [],
    varietyList: [],
    masterProduceList: [],
    produceList: [],
    masterCropNames: [],
    matchesList: [],
    transactionList: { Pending: [], active: [], complete: [] },
    reviewsList: mockReviewsList,
    timeStamp: {},
    isMatchesFetching: false,
    paymentDetails: [],
    paymentRedirectionDetails: {},
    currentStatusDetails: [],
    eventTemplate: [],
    paymentAmount: '',
    rejectCount: '',
    otpError: { showError: false, errorMg: '', verified: false, produce: '' },
    status: [{ details: [], key: "" }]
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {

        case UPDATE_MASTER_LIST:
            return { ...state, masterProduceList: action.payload }

        case UPDATE_PRODUCE_LIST:
            return { ...state, produceList: action.payload }

        case UPDATE_MATCHES_LIST:
            return { ...state, matchesList: action.payload }

        case SET_MATCHES_LOADER:
            return { ...state, isMatchesFetching: action.payload }

        /* Currently not in use */
        case UPDATE_MATCHES_LIST_FOR_BUYER_CROP:
            // const {matchesList} = state;
            // const {buyerCropId, newMatchesList} = action.payload;
            return { ...state, matchesList: action.payload }
        /* Currently not in use */

        case UPDATE_CROPS_LIST:
            return { ...state, cropsList: action.payload }

        case UPDATE_VARIETY_LIST:
            return { ...state, varietyList: action.payload }

        case UPDATE_MASTER_CROP_NAMES_LIST:
            return { ...state, masterCropNames: action.payload }

        case UPDATE_TRANSACTION_LIST:
            const { transactionType, transactionListData } = action.payload;
            const { transactionList } = state;
            const updatedTransactionList = { ...transactionList, [transactionType]: transactionListData };
            return { ...state, transactionList: updatedTransactionList }

        case UPDATE_TIME_STAMP:
            return { ...state, timeStamp: action.payload }

        case UPDATE_PAYMENT_REDIRECTION_DETAILS:
            return { ...state, paymentRedirectionDetails: action.payload }

        case UPDATE_PAYMENT_DETAILS:
            return { ...state, paymentDetails: action.payload }

        case UPDATE_CURRENT_STATUS_DETAILS:
            return { ...state, currentStatusDetails: [...state.currentStatusDetails, action.payload] }

        case UPDATE_EVENT_TEMPLATE:
            return { ...state, eventTemplate: action.payload }

        case OTP_ERROR_ON_CONNECT:
            const { otpError: errorObjMsg } = state;
            const updatedErrorFlag = { ...errorObjMsg, showError: action.payload }
            return { ...state, otpError: updatedErrorFlag };

        case OTP_ERROR_MSG_ON_CONNECT:
            const { otpError: errorObj } = state;
            const updatedErrorMsg = { ...errorObj, errorMg: action.payload }
            return { ...state, otpError: updatedErrorMsg };

        case OTP_VERIFIED_ON_CONNECT:
            const { otpError: errorDupObj } = state;
            const updatedSuccessFlag = { ...errorDupObj, verified: action.payload }
            return { ...state, otpError: updatedSuccessFlag };

        case PRODUCE_NAME_ON_CONNECT:
            const { otpError: errorProduceObj } = state;
            const updateProduceName = { ...errorProduceObj, produce: action.payload }
            return { ...state, otpError: updateProduceName };

        case UPDATE_PAYMENT_AMOUNT:
            return { ...state, paymentAmount: action.payload }

        case UPDATE_REJECT_COUNT:
            return { ...state, rejectCount: action.payload }

        case SET_STATUS_DETAILS:
            return { ...state, status: [...state.status, action.payload] }

        default:
            return state;
    }
};

export default reducer;
