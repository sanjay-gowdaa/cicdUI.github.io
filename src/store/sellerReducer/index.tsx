import { ADD_NEW_CROP, UPDATE_APMC_RATE, UPDATE_CATEGORIES, UPDATE_MASTER_CROPS, UPDATE_SELLER_CROPS_LIST, UPDATE_SELLER_MATCHES, UPDATE_VARIETY } from './actions';
import {
    mockReviewsList,
} from './mockData.temp';
import { SellerStateModel } from './types';

const INITIAL_STATE: SellerStateModel = {
    cropsList: [],
    masterCrops: [],
    variety: [],
    matchesList:  [],
    transactionList: {Pending: [], active: [], complete: []},
    reviewsList: mockReviewsList,
    categories: [],
    apmcCropPrice: '',
    timeStamp: {}
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
            return { ...state, cropsList: action.payload };

        case UPDATE_APMC_RATE:
            return { ...state, apmcCropPrice: action.payload };
        
        case UPDATE_SELLER_MATCHES:
            return { ...state, matchesList: action.payload };

        default:
            return state;
    }
};

export default reducer;
