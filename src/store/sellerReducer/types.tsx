export interface CropApiModel {
    crop_name: string;
    sub_category?: string;
    crop_grade?: string;
    quantity: number;
    price_per_qnt: number;
    apmc_rate: number;
    intent_to_sell: string;
    terms_and_conditions?: string;
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
    apmcRateChange: any;
}

export interface MatchRequirementModel extends CropModel {
    buyerId: string;
    quantityRequired: number;
    location: string;
}

export enum TransactionStatus {
    pending = 'PENDING',
    on_going = 'ON_GOING',
    completed = 'COMPLETED',
}

export interface TransactioModel extends MatchRequirementModel {
    transactionId: string;
    transactionStatus: TransactionStatus;
    transactionTotalAmount: number;
    transactionStatusText: string;
}

export interface SellerStateModel {
    categories: Array<string>;
    masterCrops: Array<string>;
    variety: Array<CropCategoryModel>;
    cropsList: Array<CropModel>;
    matchesList: Array<MatchRequirementModel>;
    transactionList: Array<TransactioModel>;
    reviewsList: Array<ReviewRating>;
    apmcCropPrice: string;
}

export interface ReviewRating {
    rating: number;
    buyerId: string;
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