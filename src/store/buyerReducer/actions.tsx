import { flatMasterListType, MasterListProduce, ProduceModel } from "./types";

export const UPDATE_FORM = 'UPDATE_FORM';
export const ADD_NEW_PRODUCE = 'ADD_NEW_PRODUCE';
export const UPDATE_MASTER_LIST = 'UPDATE_MASTER_LIST';
export const GET_MASTER_LIST = 'GET_MASTER_LIST';

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

export const updateMasterlist = (masterlist: Array<MasterListProduce>) => {
    return {
        type: UPDATE_MASTER_LIST,
        payload: masterlist,
    };
};
