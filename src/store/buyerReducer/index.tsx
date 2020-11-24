import { ADD_NEW_PRODUCE, UPDATE_MASTER_LIST, GET_MASTER_LIST } from './actions';
import {
    mockMatchedCropsList,
    mockProduceList,
    mockReviewsList,
    mockTransactionCropsList,
} from './mockData.temp';
import { BuyerStateModel } from './types';

const INITIAL_STATE: BuyerStateModel = {
    masterProduceList: [],
    produceList: mockProduceList,
    matchesList: mockMatchedCropsList,
    transactionList: mockTransactionCropsList,
    reviewsList: mockReviewsList,
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {

        case ADD_NEW_PRODUCE:
            const updatedCropList = [...state.produceList, action.payload]
            return { ...state, produceList: updatedCropList };
        
        case UPDATE_MASTER_LIST:
            const updatedMasterList = [...state.masterProduceList, ...action.payload]
            return {...state, masterProduceList: updatedMasterList }
        
        default:
            return state;
    }
};

export default reducer;
