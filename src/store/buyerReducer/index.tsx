import { UPDATE_MASTER_LIST, GET_MASTER_LIST, UPDATE_PRODUCE_LIST, UPDATE_CROPS_LIST, UPDATE_VARIETY_LIST, UPDATE_MASTER_CROP_NAMES_LIST } from './actions';
import {
    mockMasterListData,
    mockMatchedCropsList,
    //mockProduceList,
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
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        
        case UPDATE_MASTER_LIST:
            const updatedMasterList = [...state.masterProduceList, ...action.payload]
            return {...state, masterProduceList: updatedMasterList }
        
        case UPDATE_PRODUCE_LIST:
            return { ...state, produceList: action.payload }

        case UPDATE_CROPS_LIST:
            return {...state, cropsList: action.payload}

        case UPDATE_VARIETY_LIST:
            return {...state, varietyList: action.payload}
        
        case UPDATE_MASTER_CROP_NAMES_LIST:
            return {...state, masterCropNames: action.payload}

        default:
            return state;
    }
};

export default reducer;
