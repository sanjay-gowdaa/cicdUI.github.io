import { sortBy, isEmpty, isNull } from "lodash";
import { getTimeStamp } from "../../app-components/utils";
import { getSubCategoryList, createCrop, getAllCrops, getCropCategoryList, getCropList, getLiveApmcRate, getLiveApmcRateUpdated, deleteProduce } from "../api";
import { ApmcApiResponseBase, LiveApmcRates, UpdatedLiveApmcRatesQuery } from "../genericTypes";
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

export const updateApmcCropRate = (modalPrice: string | number) => {
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

export const updateApmcListData = (
        allCropsApmcData: Array<ApmcApiResponseBase>,
        cropsList: Array<CropApiModel>
    ) => {
    const allProduceApmcData = Array.isArray(allCropsApmcData) ? allCropsApmcData.map((apmcData: ApmcApiResponseBase) => {
        if(!isEmpty(apmcData)) {
            const {latest_apmc_price, previousLatestApmcPrice} = apmcData;
            const difference = latest_apmc_price - previousLatestApmcPrice;
            return {apmc_price: latest_apmc_price, increase: difference};
        } else {
            return {apmc_price: '', increase: null};
        }
    }) : [];

    const cropListUpdated = allProduceApmcData.length ? cropsList.map((cropProduce: CropApiModel, index: number) => {
        return {...cropProduce, apmc_rate_data: allProduceApmcData[index]}
    }) : cropsList;

    return {
        type: UPDATE_SELLER_CROPS_LIST,
        payload: cropListUpdated
    }
}

// export const updateApmcCropRateData = (allProduceliveRates: Array<{
//     region: string;
//     commodity: string;
//     variety: string;
//     liveRates: any;
// }>, cropsList: Array<CropApiModel>) => {
//     const allProduceApmcData = allProduceliveRates.map((produceLiveRate) => {
//         const {liveRates: curProduceLiveRate} = produceLiveRate;
//         if(curProduceLiveRate?.length) {
//             const [lastestEntry, prevEntry] = sortBy(curProduceLiveRate, ['timestamp']);
//             const difference = lastestEntry.modal_price - prevEntry.modal_price;
//             return {apmc_price: lastestEntry.modal_price, increase: difference};
//         } else {
//             return {apmc_price: '', increase: null};
//         }
//     });

//     const cropListUpdated = cropsList.map((cropProduce: CropApiModel, index: number) => {
//         return {...cropProduce, apmc_rate_data: allProduceApmcData[index]}
//     })

//     return {
//         type: UPDATE_SELLER_CROPS_LIST,
//         payload: cropListUpdated
//     }
// }

// export const fetchLiveApmcRate = ({commodity, variety}: {commodity: string, variety: string}) => {
//     return async(dispatch: any, getState: any) => {
//         const { loginUser } = getState() as RootState;
//         const { district } = loginUser;
        
//         // for testing
//         // const district = 'hassan';
//         // const commodity = 'Rice';
//         // const variety = 'Sona';
//         // for testing end

//         const priceModel = await getLiveApmcRate([{region: district, commodity, variety}])
//         const {liveRates} = priceModel || {liveRates: []};
//         if(liveRates.length) {
//             const {liveRates: liveRatesData} = liveRates[0];
//             if (Object.keys(liveRatesData).length) {
//                 const sortedData = sortBy(liveRatesData, ['timestamp']);
//                 const apmcePrice = sortedData[1].modal_price;
//                 dispatch(updateApmcCropRate(apmcePrice));
//             } else {
//                 dispatch(updateApmcCropRate('No records found'));    
//             }
//         } else {
//             dispatch(updateApmcCropRate('No records found'));
//         }
//     }
// }

export const updatedFetchLiveApmcRate = ({
    grade,
    itemName,
    variety,
    category
}: {
    grade: string,
    itemName: string,
    variety: string,
    category: string,
}) => {
    return async(dispatch: any, getState: any) => {
        const { loginUser } = getState() as RootState;
        const { district } = loginUser;
        const apmcPriceResponse: Array<ApmcApiResponseBase> = await getLiveApmcRateUpdated([{grade, district, variety, category, item_name: itemName}])
        const apmcPriceDetails = (!isEmpty(apmcPriceResponse) && !isNull(apmcPriceResponse)) ? apmcPriceResponse : [];
        if(apmcPriceDetails.length) {
            const {latest_apmc_price} = apmcPriceDetails[0] || {}
            dispatch(updateApmcCropRate(latest_apmc_price));
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

export const deleteSelectedCrop = (cropID: string) => {
    return async(dispatch: any, getState: any) => {
        const {loginUser}: {loginUser: UserStateModel} = getState() as RootState;
        const {username, district, is_seller} = loginUser;
        const deletedResponse = await deleteProduce(username, cropID, !is_seller);
        dispatch(getAllCropsList());
    }
}

export const fetchAllCropsApmcData = (Items: Array<CropApiModel>) => {
    return async(dispatch: any, getState: any) => {
        const {seller} = getState() as RootState;
        const {cropsList}: SellerStateModel = seller;
        const apmcFetchDataCrops: Array<UpdatedLiveApmcRatesQuery> = Items.map((item: CropApiModel) => {
            const {category_name, crop_name, sub_category, district, grade} = item;
            return {category: category_name, item_name: crop_name, variety: sub_category, grade, district}
        })
        const allCropsPriceModel = await getLiveApmcRateUpdated(apmcFetchDataCrops)
        const allCropsPriceModelDetails = ( !isEmpty(allCropsPriceModel) && !isNull(allCropsPriceModel) ) ? allCropsPriceModel : [];
        dispatch(updateApmcListData(allCropsPriceModelDetails, cropsList))
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
        if (Items.length) {
            dispatch(fetchAllCropsApmcData(Items));
        }
    }   
}

export const saveTimeStamp = (dispatch: any) => {
    const timeStamp = getTimeStamp();
    dispatch(updateTimeStamp(timeStamp));
}