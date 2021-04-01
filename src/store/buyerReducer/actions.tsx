import { getTimeStamp } from "../../app-components/utils";
import { addProduce, getAllProduce, getCropCategoryList, getCropList, getSubCategoryList, getMasterList,
    updateMasterList, deleteProduce, patchProduce, getBuyerMatchesList, rejectMatch } from "../api";
import { UserStateModel } from "../loginReducer/types";
import { RootState } from "../rootReducer";
import { BuyerStateModel, MasterListApiFormat, ProduceModel } from "./types";

export const UPDATE_MASTER_LIST = 'UPDATE_MASTER_LIST';
export const GET_MASTER_LIST = 'GET_MASTER_LIST';
export const UPDATE_PRODUCE_LIST = 'UPDATE_PRODUCE_LIST';
export const UPDATE_MASTER_CROP_NAMES_LIST = 'UPDATE_MASTER_CROP_NAMES_LIST';
export const UPDATE_CROPS_LIST = 'UPDATE_CROPS_LIST';
export const UPDATE_VARIETY_LIST = 'UPDATE_VARIETY_LIST';
export const UPDATE_TIME_STAMP = 'UPDATE_TIME_STAMP';
export const UPDATE_MATCHES_LIST = 'UPDATE_MATCHES_LIST';
export const UPDATE_MATCHES_LIST_FOR_BUYER_CROP = 'UPDATE_MATCHES_LIST_FOR_BUYER_CROP';
export const SET_MATCHES_LOADER = 'SET_MATCHES_LOADER';

export const updateStoreMasterList = (masterlist: Array<any>) => {
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

export const updateTimeStamp = (timeStamp: any) => {
    return {
        type: UPDATE_TIME_STAMP,
        payload: timeStamp
    }
}

export const updateMatchesList = (matchesList: Array<any>) => {
    return {
        type: UPDATE_MATCHES_LIST,
        payload: matchesList
    }
}

export const setMatchesLoadingFlag = (loadingFlag: boolean) => {
    return {
        type: SET_MATCHES_LOADER,
        payload: loadingFlag
    }
}
/* Not yet in use */
export const updateMatchesListForID = (buyerCropId: string, matchesList: Array<any>) => {
    return {
        type: UPDATE_MATCHES_LIST_FOR_BUYER_CROP,
        payload: {buyerCropId, newMatchesList: matchesList}
    }
}
/* Not yet in use end */

export const getMasterProduceList = () => {
    return async(dispatch: any, getState: any) => {
        const {loginUser}: {loginUser: UserStateModel} = getState() as RootState;
        const {username} = loginUser;
        const masterProduceList = await getMasterList(username);
        // testing
        // const masterProduceList = await getMasterList('7892329983');
        const masterList = masterProduceList || [];
        dispatch(updateStoreMasterList(masterList));
    }
}

export const updateMasterListData = (masterlist: Array<MasterListApiFormat>) => {
    return async(dispatch: any, getState: any) => {
        const {loginUser}: {loginUser: UserStateModel} = getState() as RootState;
        const {username} = loginUser;
        const updateMasterListResponse = await updateMasterList(masterlist, username);
        // testing
        // const updateMasterListResponse = await updateMasterList(masterlist, '7892329983');
        dispatch(getMasterProduceList());
    }
}

export const addNewProduce = (/*produceFormData: ProduceModel*/ produceFormData: any) => {
    return async(dispatch: any, getState: any) => {
        const {loginUser, buyer: buyserState}: {loginUser: UserStateModel, buyer: BuyerStateModel} = getState() as RootState;
        // for testing, use USER-ID 
        // const username = '7892329983'
        const {username, district, zip} = loginUser
        const {produceList} = buyserState;
        const addProduceResponse = await addProduce({...produceFormData, district, zip}, username);
        // console.log('addProduceResponse', addProduceResponse);
        dispatch(getProduceList())
        dispatch(getMatchesForBuyerCrops(produceList));
    }
}

export const editProduce = (/*produceFormData: ProduceModel*/ produceFormData: any) => {
    return async(dispatch: any, getState: any) => {
        const {loginUser}: {loginUser: UserStateModel} = getState() as RootState;
        // for testing, use USER-ID 
        // const username = '7892329983'
        const {username, district, zip} = loginUser
        const addProduceResponse = await patchProduce({...produceFormData, district, zip}, username);
        // console.log('addProduceResponse', addProduceResponse);
        dispatch(getProduceList())
    }
}

export const deleteSelectedProduce = (produceID: string) => {
    return async(dispatch: any, getState: any) => {
        const {loginUser}: {loginUser: UserStateModel} = getState() as RootState;
        const {username, district, is_buyer} = loginUser;
        const deletedResponse = await deleteProduce(username, produceID, is_buyer);
        dispatch(getProduceList());
    }
}

export const getProduceList = () => {
    return async(dispatch: any, getState: any) => {
        const {loginUser}: {loginUser: UserStateModel} = getState() as RootState;
        // for tesing, use USER-ID 
        // const {username} = {username: '7892329983'}; 
        
        const {username} = loginUser
        const getProduceListResponse = await getAllProduce(username);
        const {Items, Count} = getProduceListResponse || {Items: []}
        // console.log('getProduceList', Items);
        dispatch(updateProduceList(Items as Array<ProduceModel>))
        dispatch(getMatchesForBuyerCrops(Items as Array<ProduceModel>));
    }
}

export const fetchAllProduce = () => {
    return async(dispatch: any, getState: any) => {
        const allProduceList = await getCropCategoryList();
        const {categories} = allProduceList || []
        dispatch(updateMasterCropNamesList(categories))
    }
}

export const fetchAllCrops = (category: string) => {
    return async(dispatch: any, getState: any) => {
        const allCropsList = await getCropList(category);
        const {crops} = allCropsList || []
        dispatch(updateCropsList(crops));
    }
}

export const fetchAllVariety = (crop: string) => {
    return async(dispatch: any, getState: any) => {
        const allVarietyList = await getSubCategoryList(crop);
        const { crops: {Items: variety}} = allVarietyList || {variety: []}
        dispatch(updateVarietyList(variety));    
    }
}

export const getMatchesForBuyerCrops = (cropsList: Array<ProduceModel>) => {
    const allCropListIds: Array<string> = cropsList.map((curCrop: ProduceModel) => curCrop.sk || '');
    return async(dispatch: any, getState: any) => {
        const {loginUser}: {loginUser: UserStateModel} = getState() as RootState;
        const {username} = loginUser;

        const matchesBody = {
            buyer_id: `user#${username}`,
            buyer_crop_ids: allCropListIds
        }
        dispatch(setMatchesLoadingFlag(true));
        const matchesList = await getBuyerMatchesList(matchesBody.buyer_id, matchesBody.buyer_crop_ids);
        dispatch(updateMatchesList(matchesList));
        dispatch(setMatchesLoadingFlag(false));
    }
}

// export const getMatchesForBuyerCropsIDS = (buyerData: {buyer_id: string, buyer_crop_ids: Array<string>}) => {
//     return async(dispatch: any, getState: any) => {
//         const matchesList = await getBuyerMatchesList(buyerData.buyer_id, buyerData.buyer_crop_ids);
//         // dispatch(updateMatchesListForID())
//     }
// }

export const rejectMatches = (rejectData: {buyer_id: string, buyer_crop_id: Array<string>}) => {
    return async(dispatch: any, getState: any) => {
        const {buyer: buyerState}: {buyer: BuyerStateModel} = getState() as RootState;
        const {produceList} = buyerState;
        const matchesList = await rejectMatch(rejectData);
        /* Re-calculate matches for all crop */
        /* Logic can be changed to specific crop if required */
        dispatch(getMatchesForBuyerCrops(produceList));
    }
}

export const saveTimeStamp = (dispatch: any) => {
    const timeStamp = getTimeStamp();
    dispatch(updateTimeStamp(timeStamp));
}