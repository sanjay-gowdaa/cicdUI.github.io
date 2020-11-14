import { ProduceModel } from "./types";

export const UPDATE_FORM = 'UPDATE_FORM';
export const ADD_NEW_PRODUCE = 'ADD_NEW_PRODUCE';

export const updateForm = (formData: any) => {
    return {
        type: UPDATE_FORM,
        payload: formData,
    };
};


export const addNewProduce = (produceFormData: ProduceModel) => {
        // const produceData = {
        //     ...produceFormData,
        //     termsAndConditions: 'http://google.com'
        // }

    return {
        type: ADD_NEW_PRODUCE,
        payload: produceFormData,
    };
};
