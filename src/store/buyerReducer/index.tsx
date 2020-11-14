import { ADD_NEW_PRODUCE } from './actions';
import {
    mockMatchedCropsList,
    mockProduceList,
    mockReviewsList,
    mockTransactionCropsList,
} from './mockData.temp';
import { BuyerStateModel } from './types';

const INITIAL_STATE: BuyerStateModel = {
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
            
        default:
            return state;
    }
};

export default reducer;
