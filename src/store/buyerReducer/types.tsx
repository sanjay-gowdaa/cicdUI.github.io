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
}

export interface CropModel {
    cropName: string;
    subCategory?: string;
    cropGrade?: string;
    quantity: number;
    pricePerQnt: number;
}

export interface MatchRequirementModel {
    fulfillment_flag: FullfillmentFlags;
    produce: string;
    seller_id: string;
    quantity: number;
    location: string;
    buyer_id: string;
    buyer_crop_id: string;
    seller_quantity: number;
    seller_remaining_quant: number;
    buyer_remaining_quant?: number;
    seller_final_price: number;
    price: number;
    buyer_actual_quantity: number;
}

export enum FullfillmentFlags {
    single_fulfillment = 'single_fulfillment',
    single_partial_fulfillment = 'single_partial_fulfillment',
    multiple_fulfillment = 'multiple_fulfillment',
    multiple_partial_fulfillment = 'multiple_partial_fulfillment',

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
    produceList: Array<ProduceModel>;
    masterCropNames: Array<string>;
    cropsList: Array<string>;
    varietyList: Array<any>;
    matchesList: Array<MatchRequirementModel>;
    transactionList: Array<TransactioModel>;
    reviewsList: Array<ReviewRating>;
    timeStamp: any;
    isMatchesFetching: boolean;
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