import { CropModel } from "./types";

export const UPDATE_FORM = 'UPDATE_FORM';
export const ADD_NEW_CROP = 'ADD_NEW_CROP';

export const updateForm = (formData: any) => {
    return {
        type: UPDATE_FORM,
        payload: formData,
    };
};


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
