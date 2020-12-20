import { UPDATE_MASTER_LIST, GET_MASTER_LIST, UPDATE_PRODUCE_LIST } from './actions';
import {
    mockMasterListData,
    mockMatchedCropsList,
    //mockProduceList,
    mockReviewsList,
    mockTransactionCropsList,
} from './mockData.temp';
import { BuyerStateModel } from './types';

const INITIAL_STATE: BuyerStateModel = {
    masterProduceList: mockMasterListData,
    produceList: [],
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

        default:
            return state;
    }
};

export default reducer;
