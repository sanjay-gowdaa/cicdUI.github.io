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

export interface TransactioModel extends MatchRequirementModel {
    transactionId: string;
    transactionStatus: TransactionStatus;
    transactionTotalAmount: number;
    transactionStatusText: string;
}

export interface BuyerStateModel {
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
