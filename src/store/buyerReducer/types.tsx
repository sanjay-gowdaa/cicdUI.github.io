import { CropCategoryModel, MatchRequirementModel, ReviewRating, TransactioModel } from "../../buyer-seller-commons/types";

export interface ProduceModel {
    crop_name: string;
    grade: string;
    category: string;
    sub_type: string;
    quantity: number;
    delivery_by: any;
    additionalInfo?: string | null;
    sk?: string;
    pk?: string;
    currently_fulfilled_qty?: number;
}

export interface CropModel {
    cropName: string;
    subCategory?: string;
    cropGrade?: string;
    quantity: number;
    pricePerQnt: number;
}

export interface flatMasterListType { 
    produce_id: string;
    produce_name: string;
    crop_id: string;
    crop_name: string;
    category_id: string;
    category_name: string;
    grade_id: string;
    grade_name: string;
}

export interface MasterListApiFormat {
    produce_name: string;
    crop_name: string;
    category_name: string;
    grade_name: string;
}

export interface BuyerStateModel {
    masterProduceList: Array<MasterListApiFormat>;
    produceList: Array<ProduceModel>;
    masterCropNames: Array<string>;
    cropsList: Array<string>;
    varietyList: Array<CropCategoryModel>;
    matchesList: Array<MatchRequirementModel>;
    transactionList: {
        Pending: Array<TransactioModel>,
        active: Array<TransactioModel>,
        complete: Array<TransactioModel>
    };
    reviewsList: Array<ReviewRating>;
    timeStamp: any;
    isMatchesFetching: boolean;
}