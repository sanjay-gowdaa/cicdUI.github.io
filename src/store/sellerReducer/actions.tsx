import { CropModel } from "./types";
import { getCategoryList, getSubCategoryList } from "../api";

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const UPDATE_SUB_CATEGORIES = 'UPDATE_SUB_CATEGORIES';
export const UPDATE_GRADES = 'UPDATE_GRADES';
export const UPDATE_FORM = 'UPDATE_FORM';
export const ADD_NEW_CROP = 'ADD_NEW_CROP';

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

export const addNewCrop = (cropData: CropModel) => {
    if (!cropData.apmcRateChange) {
        cropData = {
            ...cropData,
            apmcRateChange: {difference: 300, increase: true},
            termsAndConditions: 'http://google.com'
        }
    }

    return {
        type: ADD_NEW_CROP,
        payload: cropData,
    };
};


export const fetchAllCategories = () => {
    return async(dispatch: any, getState: any) => {
        const allCategoriesList = await getCategoryList();
        const {crops} = allCategoriesList || []
        console.log('registerUserResponse', crops);
        dispatch(updateAllCategories(crops))
    }
}

export const fetchAllSubCategories = (categoryId: string) => {
    return async(dispatch: any, getState: any) => {
        const allCategoriesList = await getSubCategoryList(categoryId);
        const {crops: {Items}} = allCategoriesList || {Items: []}
        // const {status = '', message, data} = result
        console.log('registerUserResponse', Items);
        dispatch(updateSubCategories(Items))
    }
}