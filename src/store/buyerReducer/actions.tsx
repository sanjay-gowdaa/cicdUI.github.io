import { addProduce, getAllProduce, getCropCategoryList, getCropList, getSubCategoryList } from "../api";
import { RootState } from "../rootReducer";
import { MasterListProduce } from "./types";

export const UPDATE_MASTER_LIST = 'UPDATE_MASTER_LIST';
export const GET_MASTER_LIST = 'GET_MASTER_LIST';
export const UPDATE_PRODUCE_LIST = 'UPDATE_PRODUCE_LIST'
export const UPDATE_CROPS_LIST = 'UPDATE_CROPS_LIST';
export const UPDATE_VARIETY_LIST = 'UPDATE_VARIETY_LIST';

export const updateMasterlist = (masterlist: Array<MasterListProduce>) => {
    return {
        type: UPDATE_MASTER_LIST,
        payload: masterlist,
    };
};

export const updateProduceList = (produceList: Array<string>) => {
    return {
        type: UPDATE_PRODUCE_LIST,
        payload: produceList
    }
}

export const updateCropsList = (cropsList: Array<string>) => {
    return {
        type: UPDATE_CROPS_LIST,
        payload: cropsList
    }
}

export const updateVarietyList = (varietyList: Array<string>) => {
    return {
        type: UPDATE_VARIETY_LIST,
        payload: varietyList
    }
}

export const addNewProduce = (/*produceFormData: ProduceModel*/ produceFormData: any) => {
    return async(dispatch: any, getState: any) => {
        const {loginUser} = getState() as RootState; 
        // for testing, use USER-ID 
        // const {userName = '7892329983'} = loginUser
        const {userName} = loginUser
        const addProduceResponse = await addProduce(produceFormData, userName);
        console.log('addProduceResponse', addProduceResponse);
        dispatch(getProduceList())
    }
}

export const getProduceList = () => {
    return async(dispatch: any, getState: any) => {
        const {loginUser} = getState() as RootState; 
        // for tesing, use USER-ID 
        // const {userName = '7892329983'} = loginUser
        const {userName} = loginUser
        const getProduceListResponse = await getAllProduce(userName);
        const {Items, Count} = getProduceListResponse || {Items: []}
        console.log('getProduceList', Items);
        // dispatch(updateProduceList(Items as Array<ProduceModel>))
    }
}

export const fetchAllProduce = () => {
    return async(dispatch: any, getState: any) => {
        const allProduceList = await getCropCategoryList();
        const {categories} = allProduceList || []
        console.log('registerUserResponse', categories);
        dispatch(updateProduceList(categories))
    }
}

export const fetchAllCrops = (category: string) => {
    return async(dispatch: any, getState: any) => {
        const allCropsList = await getCropList(category);
        const {crops} = allCropsList || []
        console.log('Crops List', crops);
        dispatch(updateCropsList(crops));
    }
}

export const fetchAllVariety = (crop: string) => {
    return async(dispatch: any, getState: any) => {
        const allVarietyList = await getSubCategoryList(crop);
        const { crops: {Items: variety}} = allVarietyList || {variety: []}
        console.log('Variety list', variety);
        dispatch(updateVarietyList(variety));    
    }
}