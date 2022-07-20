import {
    CropCategoryModel,
    EventTemplate,
    MatchRequirementModel,
    OtpErrorInMatch,
    ReviewRating,
    Status,
    TransactionModel
} from '../../buyer-seller-commons/types';

export interface ProduceModel {
    produce: string;
    grade: string;
    category: string;
    variety: string;
    quantity: number;
    delivery_by: any;
    additionalInfo?: string | null;
    sk?: string;
    pk?: string;
    currently_fulfilled_qty?: number;
    isEditable?: boolean;
    initial?: number |undefined;
};

export interface CropModel {
    produce: string;
    variety?: string;
    cropGrade?: string;
    quantity: number;
    pricePerQnt: number;
};

export interface flatMasterListType {
    category_id: string;
    category_name: string;
    produce_id: string;
    produce_name: string;
    variety_id: string;
    variety_name: string;
    grade_id: string;
    grade_name: string;
};

export interface MasterListApiFormat {
    category_name: string;
    produce_name: string;
    variety_name: string;
    grade_name: string;
};

export interface PaymentDetails {
    orderID: string;
    orderAmount: string;
    paymentMode: string;
    referenceId: string;
    txMsg: string;
    txStatus: string;
    txTime: string;
};

export interface PaymentRedirectionDetails {
    transactionId: string;
    paymentNo: string;
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

export interface PaymentAmount {
    amount: string;
}

export interface BuyerStateModel {
    masterProduceList: Array<MasterListApiFormat>;
    produceList: Array<ProduceModel>;
    masterCropNames: Array<string>;
    cropsList: Array<string>;
    varietyList: Array<CropCategoryModel>;
    matchesList: Array<MatchRequirementModel>;
    transactionList: {
        Pending: Array<TransactionModel>,
        active: Array<TransactionModel>,
        complete: Array<TransactionModel>
    };
    reviewsList: Array<ReviewRating>;
    timeStamp: any;
    isMatchesFetching: boolean;
    paymentDetails: Array<PaymentDetails>;
    paymentRedirectionDetails: any;
    statusDetails: Array<StatusDetails>;
    currentStatusDetails: Array<CurrentStatusDetails>;
    eventTemplate: Array<EventTemplate>;
    paymentAmount: any;
    rejectCount: any;
    otpError: OtpErrorInMatch;
    status: Array<Status>;
    urd_status: boolean;
};

export interface BuyerRejectMatch {
    buyer_id: string;
    buyer_crop_id: string;
    seller_id: string;
    seller_crop_id: string;
    matched_quantity: number;
};
