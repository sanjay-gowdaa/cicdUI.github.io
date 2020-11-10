import { UPDATE_FORM, ADD_NEW_CROP } from './actions';
import {
    mockCropsList,
    mockMatchedCropsList,
    mockReviewsList,
    mockTransactionCropsList,
} from './mockData.temp';
import { SellerStateModel } from './types';

const INITIAL_STATE: SellerStateModel = {
    cropsList: mockCropsList,
    matchesList: mockMatchedCropsList,
    transactionList: mockTransactionCropsList,
    reviewsList: mockReviewsList,
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {

        case ADD_NEW_CROP:
            const updatedCropList = [...state.cropsList, action.payload]
            return { ...state, cropsList: updatedCropList };
            
        default:
            return state;
    }
};

export default reducer;
