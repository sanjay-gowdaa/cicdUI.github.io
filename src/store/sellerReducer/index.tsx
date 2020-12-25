import { ADD_NEW_CROP, UPDATE_CATEGORIES, UPDATE_MASTER_CROPS, UPDATE_SELLER_CROPS_LIST, UPDATE_VARIETY } from './actions';
import {
    mockMatchedCropsList,
    mockReviewsList,
    mockTransactionCropsList,
} from './mockData.temp';
import { SellerStateModel } from './types';

const INITIAL_STATE: SellerStateModel = {
    cropsList: [],
    masterCrops: [],
    variety: [],
    matchesList: mockMatchedCropsList,
    transactionList: mockTransactionCropsList,
    reviewsList: mockReviewsList,
    categories: []
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
            return {...state, variety: action.payload };
        
        case UPDATE_SELLER_CROPS_LIST:
            return { ...state, cropsList: action.payload}

        default:
            return state;
    }
};

export default reducer;
