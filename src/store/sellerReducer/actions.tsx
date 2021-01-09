import { getSubCategoryList, createCrop, getAllCrops, getCropCategoryList, getCropList, getApmcModalPrice } from "../api";
import { UserStateModel } from "../loginReducer/types";
import { RootState } from "../rootReducer";

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const UPDATE_MASTER_CROPS = 'UPDATE_MASTER_CROPS';
export const UPDATE_VARIETY = 'UPDATE_VARIETY';
export const ADD_NEW_CROP = 'ADD_NEW_CROP';
export const UPDATE_SELLER_CROPS_LIST = 'UPDATE_SELLER_CROPS_LIST';
export const UPDATE_APMC_RATE = 'UPDATE_APMC_RATE';

export const updateAllCategories = (categories: Array<string>) => {
    return {
        type: UPDATE_CATEGORIES,
        payload: categories
    }
}

export const updateMasterCrops = (produce: Array<string>) => {
    return {
        type: UPDATE_MASTER_CROPS,
        payload: produce
    }
}

export const updateVariety = (variety: Array<any>) => {
    return {
        type: UPDATE_VARIETY,
        payload: variety
    }
};

export const updateSellerCropsList = (cropsList: Array<any>) => {
    return {
        type: UPDATE_SELLER_CROPS_LIST,
        payload: cropsList
    }
}

export const updateApmcCropRate = (modalPrice: string) => {
    return {
        type: UPDATE_APMC_RATE,
        payload: modalPrice
    }
}

export const fetchCropApmcPrice = ({commodity, variety}: {commodity: string, variety: string}) => {
    return async(dispatch: any, getState: any) => {
        const { loginUser } = getState() as RootState;
        const { district } = loginUser;
        
        // for testing
        // const district = 'Kolar';
        // const commodity = 'Rice';
        // const variety = 'Sona';
        // for testing end

        const priceModel = await getApmcModalPrice({region: district, commodity, variety})
        const {recentPrice} = priceModel || {recentPrice: {}};
        const {modal_price, message} = recentPrice || {modal_price: '', message: ''};
        const apmcData = modal_price ? modal_price : message;
        dispatch(updateApmcCropRate(apmcData));
    }
}

export const fetchAllCategories = () => {
    return async(dispatch: any, getState: any) => {
        const allCategoriesList = await getCropCategoryList();
        const {categories} = allCategoriesList || []
        dispatch(updateAllCategories(categories))
    }
}

export const fetchAllMasterCrops = (category: string) => {
    return async(dispatch: any, getState: any) => {
        const allCropList = await getCropList(category);
        const {crops} = allCropList || []
        dispatch(updateMasterCrops(crops))
    }
}

export const fetchAllVariety = (cropName: string) => {
    return async(dispatch: any, getState: any) => {
        const allVarietyList = await getSubCategoryList(cropName);
        const {crops: {Items: variety}} = allVarietyList || { variety: []}
        dispatch(updateVariety(variety))
    }
}

export const addNewCropData = (cropData: FormData) => {
    return async(dispatch: any, getState: any) => {
        const {loginUser}: {loginUser: UserStateModel} = getState() as RootState;
        // for tesing, use USER-ID 
        // const {userName} = {userName: '9036565202'};
        const {userName} = loginUser
        const cropAdded = await createCrop(cropData, userName)
        dispatch(getAllCropsList());
    }
}

export const getAllCropsList = () => {
    return async(dispatch: any, getState: any) => {
        const {loginUser}: {loginUser: UserStateModel} = getState() as RootState;
        // for tesing, use USER-ID 
        // const {userName} = {userName: '9036565202'}; 
        const {userName} = loginUser
        const cropsList = await getAllCrops(userName)
        const {Items, Count} = cropsList || {Items: [], Count: 0}
        dispatch(updateSellerCropsList(Items))
    }
    
}