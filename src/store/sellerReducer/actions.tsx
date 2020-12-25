import { CropModel } from "./types";
import { getSubCategoryList, createCrop, getAllCrops, getCropCategoryList, getCropList } from "../api";
import { RootState } from "../rootReducer";

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const UPDATE_MASTER_CROPS = 'UPDATE_MASTER_CROPS';
export const UPDATE_VARIETY = 'UPDATE_VARIETY';

export const UPDATE_FORM = 'UPDATE_FORM';
export const ADD_NEW_CROP = 'ADD_NEW_CROP';
export const UPDATE_SELLER_CROPS_LIST = 'UPDATE_SELLER_CROPS_LIST';

export const updateForm = (formData: any) => {
    return {
        type: UPDATE_FORM,
        payload: formData,
    };
};

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
        const {loginUser} = getState() as RootState; 
        // for tesing, use USER-ID 
        // const {userName} = {userName: '7892329983'}; 
        const {userName} = loginUser
        const cropAdded = await createCrop(cropData, userName)
        dispatch(getAllCropsList());
    }
}

export const getAllCropsList = () => {
    return async(dispatch: any, getState: any) => {
        const {loginUser} = getState() as RootState; 
        // for tesing, use USER-ID 
        // const {userName} = {userName: '7892329983'}; 
        const {userName} = loginUser
        const cropsList = await getAllCrops(userName)
        const {Items, Count} = cropsList || {Items: [], Count: 0}
        dispatch(updateSellerCropsList(Items))
    }
    
}