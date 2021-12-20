import {
    CropCategoryModel,
    EventTemplate,
    MatchRequirementModel,
    OtpErrorInMatch,
    ReviewRating,
    Status,
    TransactionModel
} from "../../buyer-seller-commons/types";

export interface CropApiModel {
    category_name: string;
    crop_name: string;
    sub_category: string;
    grade: string;
    quantity: string;
    price_per_qnt: string;
    apmc_rate: number;
    intent_to_sell: string;
    additional_info: string;
    district: string;
    apmc_rate_data?: { apmc_price: string, increase: string, is_actual: boolean };
    sk?: string;
    pk?: string;
    currently_fulfilled_qty?: number;
};

export interface CropModel {
    cropName: string;
    subCategory?: string;
    cropGrade?: string;
    quantity: number;
    pricePerQnt: number;
    apmcRate: number;
    intentToSell: boolean;
    termsAndConditions?: string;
    apmcRateChange: any;
};

export interface StatusDetails {
    event_description: string;
    event_timestamp: string;
};

export interface CurrentStatusDetails {
    pk: string;
    sk: string;
    event_description: string;
    event_timestamp: string;
};

export interface SellerStateModel {
    categories: Array<string>;
    masterCrops: Array<string>;
    variety: Array<CropCategoryModel>;
    cropsList: Array<CropApiModel>;
    matchesList: Array<MatchRequirementModel>;
    transactionList: {
        Pending: Array<TransactionModel>,
        active: Array<TransactionModel>,
        complete: Array<TransactionModel>
    };
    reviewsList: Array<ReviewRating>;
    apmcCropPrice: string | number;
    isActualApmcPrice: boolean;
    apmcNearestDistrict: string;
    timeStamp: any;
    currentStatusDetails: Array<CurrentStatusDetails>;
    eventTemplate: Array<EventTemplate>;
    rejectCount: any;
    otpError: OtpErrorInMatch;
    status: Array<Status>;
    produceList?: any;
    isMatchesFetching?: boolean;
};
