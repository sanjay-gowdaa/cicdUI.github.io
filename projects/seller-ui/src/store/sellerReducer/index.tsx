import { UPDATE_FORM } from './actions';
import { mockCropsList, mockMatchedCropsList, mockTransactionCropsList } from './mockData.temp';
import { SellerStateModel } from './types';

const INITIAL_STATE: SellerStateModel = {
    cropsList: mockCropsList,
    matchesList: mockMatchedCropsList,
    transactionList: mockTransactionCropsList
};

const reducer = (state = INITIAL_STATE, action: any) => {

    switch (action.type) {
        case UPDATE_FORM:
            return { ...state, formData: action.payload };
        
        default: return state;
    }

};

export default reducer;