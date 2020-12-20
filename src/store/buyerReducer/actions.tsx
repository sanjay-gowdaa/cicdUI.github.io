import { addProduce, getAllProduce } from "../api";
import { RootState } from "../rootReducer";
import { MasterListProduce, ProduceModel } from "./types";

export const UPDATE_MASTER_LIST = 'UPDATE_MASTER_LIST';
export const GET_MASTER_LIST = 'GET_MASTER_LIST';
export const UPDATE_PRODUCE_LIST = 'UPDATE_PRODUCE_LIST'

export const updateMasterlist = (masterlist: Array<MasterListProduce>) => {
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
        dispatch(updateProduceList(Items as Array<ProduceModel>))
    }
}