import { sortBy, isEmpty } from "lodash";
import { getTimeStamp } from "../../app-components/utils";
import { getSubCategoryList, createCrop, getAllCrops, getCropCategoryList, getCropList, getLiveApmcRate } from "../api";
import { LiveApmcRates } from "../genericTypes";
import { UserStateModel } from "../loginReducer/types";
import { RootState } from "../rootReducer";
import { CropApiModel, SellerStateModel } from "./types";

export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const UPDATE_MASTER_CROPS = 'UPDATE_MASTER_CROPS';
export const UPDATE_VARIETY = 'UPDATE_VARIETY';
export const ADD_NEW_CROP = 'ADD_NEW_CROP';
export const UPDATE_SELLER_CROPS_LIST = 'UPDATE_SELLER_CROPS_LIST';
export const UPDATE_APMC_RATE = 'UPDATE_APMC_RATE';
export const UPDATE_APMC_DATA_TO_CROPS = 'UPDATE_APMC_DATA_TO_CROPS';
export const UPDATE_TIME_STAMP = 'UPDATE_TIME_STAMP';

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

export const updateApmcCropRate = (modalPrice: string) => {
    return {
        type: UPDATE_APMC_RATE,
        payload: modalPrice
    }
}

export const updateTimeStamp = (timeStamp: any) => {
    return {
        type: UPDATE_TIME_STAMP,
        payload: timeStamp
    }
}

export const updateApmcCropRateData = (allProduceliveRates: Array<{
    region: string;
    commodity: string;
    variety: string;
    liveRates: any;
}>, cropsList: Array<CropApiModel>) => {
    const allProduceApmcData = allProduceliveRates.map((produceLiveRate) => {
        const {liveRates: curProduceLiveRate} = produceLiveRate;
        if(curProduceLiveRate?.length) {
            const [lastestEntry, prevEntry] = sortBy(curProduceLiveRate, ['timestamp']);
            const difference = lastestEntry.modal_price - prevEntry.modal_price;
            return {apmc_price: lastestEntry.modal_price, increase: difference};
        } else {
            return {apmc_price: '', increase: null};
        }
    });

    const cropListUpdated = cropsList.map((cropProduce: CropApiModel, index: number) => {
        return {...cropProduce, apmc_rate_data: allProduceApmcData[index]}
    })

    return {
        type: UPDATE_SELLER_CROPS_LIST,
        payload: cropListUpdated
    }
}

/* Not in use currently */
// export const fetchCropApmcPrice = ({commodity, variety}: {commodity: string, variety: string}) => {
//     return async(dispatch: any, getState: any) => {
//         const { loginUser } = getState() as RootState;
//         const { district } = loginUser;
        
//         // for testing
//         // const district = 'Kolar';
//         // const commodity = 'Rice';
//         // const variety = 'Sona';
//         // for testing end

//         const priceModel = await getApmcModalPrice({region: district, commodity, variety})
//         const {recentPrice} = priceModel || {recentPrice: {}};
//         const {modal_price, message} = recentPrice || {modal_price: '', message: ''};
//         const apmcData = modal_price ? modal_price : message;
//         dispatch(updateApmcCropRate(apmcData));
//     }
// }

export const fetchLiveApmcRate = ({commodity, variety}: {commodity: string, variety: string}) => {
    return async(dispatch: any, getState: any) => {
        const { loginUser } = getState() as RootState;
        const { district } = loginUser;
        
        // for testing
        // const district = 'hassan';
        // const commodity = 'Rice';
        // const variety = 'Sona';
        // for testing end

        const priceModel = await getLiveApmcRate([{region: district, commodity, variety}])
        const {liveRates} = priceModel || {liveRates: []};
        if(!isEmpty(liveRates)) {
            const {liveRates: liveRatesData} = liveRates[0];
            const sortedData = sortBy(liveRatesData, ['timestamp']);
            const apmcePrice = sortedData[1].modal_price;
            dispatch(updateApmcCropRate(apmcePrice));
        } else {
            dispatch(updateApmcCropRate('No records found'));
        }
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
        const {loginUser}: {loginUser: UserStateModel} = getState() as RootState;
        // for tesing, use USER-ID 
        // const {username} = {username: '9036565202'};
        const {username} = loginUser
        const cropAdded = await createCrop(cropData, username)
        dispatch(getAllCropsList());
    }
}

export const fetchAllCropsApmcData = (Items: Array<CropApiModel>) => {
    return async(dispatch: any, getState: any) => {
        const {seller} = getState() as RootState;
        const {cropsList}: SellerStateModel = seller;
        const apmcFetchDataCrops: Array<LiveApmcRates> = Items.map((item: CropApiModel) => {
            const {crop_name, sub_category, district} = item;
            return {region: district, commodity: crop_name, variety: sub_category}
        })
        const priceModel = await getLiveApmcRate(apmcFetchDataCrops)
        const {liveRates = []} = priceModel || {liveRates: []};
        dispatch(updateApmcCropRateData(liveRates, cropsList));
    }
}

export const getAllCropsList = () => {
    return async(dispatch: any, getState: any) => {
        const {loginUser}: {loginUser: UserStateModel} = getState() as RootState;
        // for tesing, use USER-ID 
        // const {username} = {username: '9036565202'}; 
        const {username} = loginUser
        const cropsList = await getAllCrops(username)
        const {Items, Count} = cropsList || {Items: [], Count: 0}
        dispatch(updateSellerCropsList(Items));
        dispatch(fetchAllCropsApmcData(Items));
    }   
}

export const saveTimeStamp = (dispatch: any) => {
    const timeStamp = getTimeStamp();
    dispatch(updateTimeStamp(timeStamp));
}