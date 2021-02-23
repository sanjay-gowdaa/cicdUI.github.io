export interface ApmcRateChangeModel {
    difference: number;
    increase: boolean;
}

export interface ProduceModel {
    produceName: string;
    grade: string;
    category: string;
    sub_type: string;
    quantity: number;
    delivery_by: any;
    additionalInfo?: string | null;
    sk?: string;
}

export interface CropModel {
    cropName: string;
    subCategory?: string;
    cropGrade?: string;
    quantity: number;
    pricePerQnt: number;
    apmcRate: number;
    intentToSell: boolean;
    termsAndConditions?: string;
    apmcRateChange: ApmcRateChangeModel | null;
}

export interface MatchRequirementModel extends CropModel {
    sellerId: string;
    quantityRequired: number;
    location: string;
}

export enum TransactionStatus {
    pending = 'PENDING',
    on_going = 'ON_GOING',
    completed = 'COMPLETED',
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

export interface TransactioModel extends MatchRequirementModel {
    transactionId: string;
    transactionStatus: TransactionStatus;
    transactionTotalAmount: number;
    transactionStatusText: string;
}

export interface BuyerStateModel {
    masterProduceList: Array<MasterListApiFormat>;
    produceList: Array<string>;
    masterCropNames: Array<string>;
    cropsList: Array<string>;
    varietyList: Array<any>;
    matchesList: Array<MatchRequirementModel>;
    transactionList: Array<TransactioModel>;
    reviewsList: Array<ReviewRating>;
    timeStamp: any;
}

export interface ReviewRating {
    rating: number;
    sellerId: string;
    buyerLocation: string;
    date: string;
    reviewtext: string;
}

export interface CropCategoryModel {
    config_id: string;
    config_name: string;
    variety: string;
    grade: string;
    name: string;
}