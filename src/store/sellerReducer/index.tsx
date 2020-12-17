import { UPDATE_FORM, ADD_NEW_CROP, UPDATE_CATEGORIES, UPDATE_SUB_CATEGORIES } from './actions';
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
    categories: [],
    subCategories: []
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {

        case ADD_NEW_CROP:
            const updatedCropList = [...state.cropsList, action.payload]
            return { ...state, cropsList: updatedCropList };
        
        case UPDATE_CATEGORIES:
            return { ...state, categories: action.payload };

        case UPDATE_SUB_CATEGORIES:
            return { ...state, subCategories: action.payload };    
            
        default:
            return state;
    }
};

export default reducer;
