import { addProduce, getAllProduce, getCropCategoryList, getCropList, getSubCategoryList, getMasterList, updateMasterList } from "../api";
import { RootState } from "../rootReducer";
import { MasterListApiFormat, ProduceModel } from "./types";

export const UPDATE_MASTER_LIST = 'UPDATE_MASTER_LIST';
export const GET_MASTER_LIST = 'GET_MASTER_LIST';
export const UPDATE_PRODUCE_LIST = 'UPDATE_PRODUCE_LIST';
export const UPDATE_MASTER_CROP_NAMES_LIST = 'UPDATE_MASTER_CROP_NAMES_LIST';
export const UPDATE_CROPS_LIST = 'UPDATE_CROPS_LIST';
export const UPDATE_VARIETY_LIST = 'UPDATE_VARIETY_LIST';

export const updateMasterlist = (masterlist: Array<any>) => {
    return {
        type: UPDATE_MASTER_LIST,
        payload: masterlist,
    };
};

export const updateProduceList = (produceList: Array<ProduceModel>) => {
    return {
        type: UPDATE_PRODUCE_LIST,
        payload: produceList
    }
}

export const updateMasterCropNamesList = (masterCropNames: Array<string>) => {
    return {
        type: UPDATE_MASTER_CROP_NAMES_LIST,
        payload: masterCropNames
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

export const getMasterProduceList = () => {
    return async(dispatch: any, getState: any) => {
        const {loginUser} = getState() as RootState; 
        const {userName} = loginUser;
        const masterProduceList = await getMasterList(userName);
        // testing
        // const masterProduceList = await getMasterList('7892329983');
        const masterList = masterProduceList || [];
        dispatch(updateMasterlist(masterList));
    }
}

export const updateMasterListData = (masterlist: Array<MasterListApiFormat>) => {
    return async(dispatch: any, getState: any) => {
        const {loginUser} = getState() as RootState; 
        const {userName} = loginUser;
        const updateMasterListResponse = await updateMasterList(masterlist, userName);
        // testing
        // const updateMasterListResponse = await updateMasterList(masterlist, '7892329983');
        dispatch(getMasterProduceList());
    }
}

export const addNewProduce = (/*produceFormData: ProduceModel*/ produceFormData: any) => {
    return async(dispatch: any, getState: any) => {
        const {loginUser} = getState() as RootState; 
        // for testing, use USER-ID 
        // const userName = '7892329983'
        const {userName} = loginUser
        const addProduceResponse = await addProduce(produceFormData, userName);
        // console.log('addProduceResponse', addProduceResponse);
        dispatch(getProduceList())
    }
}

export const getProduceList = () => {
    return async(dispatch: any, getState: any) => {
        const {loginUser} = getState() as RootState; 
        // for tesing, use USER-ID 
        // const {userName} = {userName: '7892329983'}; 
        
        const {userName} = loginUser
        const getProduceListResponse = await getAllProduce(userName);
        const {Items, Count} = getProduceListResponse || {Items: []}
        // console.log('getProduceList', Items);
        dispatch(updateProduceList(Items as Array<ProduceModel>))
    }
}

export const fetchAllProduce = () => {
    return async(dispatch: any, getState: any) => {
        const allProduceList = await getCropCategoryList();
        const {categories} = allProduceList || []
        // console.log('registerUserResponse', categories);
        dispatch(updateMasterCropNamesList(categories))
    }
}

export const fetchAllCrops = (category: string) => {
    return async(dispatch: any, getState: any) => {
        const allCropsList = await getCropList(category);
        const {crops} = allCropsList || []
        // console.log('Crops List', crops);
        dispatch(updateCropsList(crops));
    }
}

export const fetchAllVariety = (crop: string) => {
    return async(dispatch: any, getState: any) => {
        const allVarietyList = await getSubCategoryList(crop);
        const { crops: {Items: variety}} = allVarietyList || {variety: []}
        // console.log('Variety list', variety);
        dispatch(updateVarietyList(variety));    
    }
}