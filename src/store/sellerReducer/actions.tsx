import { CropModel } from "./types";
import { getCategoryList, getSubCategoryList, createCrop, getAllCrops } from "../api";
import { RootState } from "../rootReducer";

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const UPDATE_SUB_CATEGORIES = 'UPDATE_SUB_CATEGORIES';
export const UPDATE_GRADES = 'UPDATE_GRADES';
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

export const updateSubCategories = (subCategories: Array<any>) => {
    return {
        type: UPDATE_SUB_CATEGORIES,
        payload: subCategories
    }
}

export const updateSellerCropsList = (cropsList: Array<any>) => {
    return {
        type: UPDATE_SELLER_CROPS_LIST,
        payload: cropsList
    }
}

export const fetchAllCategories = () => {
    return async(dispatch: any, getState: any) => {
        const allCategoriesList = await getCategoryList();
        const {crops} = allCategoriesList || []
        dispatch(updateAllCategories(crops))
    }
}

export const fetchAllSubCategories = (categoryId: string) => {
    return async(dispatch: any, getState: any) => {
        const allCategoriesList = await getSubCategoryList(categoryId);
        const {crops: {Items}} = allCategoriesList || {Items: []}
        // const {status = '', message, data} = result
        dispatch(updateSubCategories(Items))
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