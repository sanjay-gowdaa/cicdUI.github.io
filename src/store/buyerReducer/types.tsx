export interface ApmcRateChangeModel {
    difference: number;
    increase: boolean;
}

export interface ProduceModel {
    produceName: string;
    quantityReq: number;
    deliveryBy: any;
    termsAndConditions?: string | null;
    additionalInfo?: string | null;
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

export interface MasterListProduce { 
    produceId: string;
    produceName: string;
    cropId: string;
    cropName: string;
    categoryId: string;
    categoryName: string;
    gradeId: string;
    gradeName: string;
}

export interface TransactioModel extends MatchRequirementModel {
    transactionId: string;
    transactionStatus: TransactionStatus;
    transactionTotalAmount: number;
    transactionStatusText: string;
}

export interface BuyerStateModel {
    masterProduceList: Array<MasterListProduce>;
    produceList: Array<ProduceModel>;
    matchesList: Array<MatchRequirementModel>;
    transactionList: Array<TransactioModel>;
    reviewsList: Array<ReviewRating>;
}

export interface ReviewRating {
    rating: number;
    sellerId: string;
    buyerLocation: string;
    date: string;
    reviewtext: string;
}
