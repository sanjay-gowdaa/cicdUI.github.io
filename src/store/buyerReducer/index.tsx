import { UPDATE_MASTER_LIST, GET_MASTER_LIST, UPDATE_PRODUCE_LIST, UPDATE_CROPS_LIST, UPDATE_VARIETY_LIST, UPDATE_MASTER_CROP_NAMES_LIST, UPDATE_TIME_STAMP } from './actions';
import {
    mockMatchedCropsList,
    mockReviewsList,
    mockTransactionCropsList,
} from './mockData.temp';
import { BuyerStateModel } from './types';

const INITIAL_STATE: BuyerStateModel = {
    cropsList: [],
    varietyList: [],
    masterProduceList: [],
    produceList: [],
    masterCropNames: [],
    matchesList: mockMatchedCropsList,
    transactionList: mockTransactionCropsList,
    reviewsList: mockReviewsList,
    timeStamp: {}
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        
        case UPDATE_MASTER_LIST:
            return {...state, masterProduceList: action.payload }
        
        case UPDATE_PRODUCE_LIST:
            return { ...state, produceList: action.payload }

        case UPDATE_CROPS_LIST:
            return {...state, cropsList: action.payload}

        case UPDATE_VARIETY_LIST:
            return {...state, varietyList: action.payload}
        
        case UPDATE_MASTER_CROP_NAMES_LIST:
            return {...state, masterCropNames: action.payload}

        case UPDATE_TIME_STAMP:
            return {...state, timeStamp: action.payload}

        default:
            return state;
    }
};

export default reducer;
