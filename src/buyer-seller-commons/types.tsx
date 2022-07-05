export interface MatchRequirementModel {
    fulfillment_flag: FullfillmentFlags;
    produce: string;
    seller_id: string;
    quantity: number;
    seller_location: string;
    buyer_id: string;
    buyer_crop_id: string;
    seller_quantity: number;
    seller_remaining_quantity: number;
    buyer_remaining_quantity?: number;
    seller_final_price: number;
    seller_price: number;
    buyer_actual_quantity: number;
    matched_quantity: number;
    buyer_location: string;
    seller_crop_id: string;
    buyer_final_price?: number;
    buyer_transportation_cost?: number;
    buyer_facilitation_cost: number;
    seller_facilitation_cost: number;
    seller_transportation_cost?: number;
    buyer_price_per_quintal?: number;
    pk?: string;
    sk?: string;
    hasMultipleFullfillMent: boolean;
    children?: Array<MatchRequirementModel>;
    isChild?: boolean;
    count: number;
    history: Array<History>;
    additional_info: Array<AdditionalInfo>;
    cropImageList: CropListType;
    destinyId: string;
    gst_amount: number;
    buyer_total_price: number;
    seller_total_price: number;
    seller_facilitation_gst: number;
    buyer_facilitation_gst: number;
    seller_final_price_per_quintal: number;
    seller_initial_produce_cost: number;
    seller_quoted_price_per_quintal: number;
    Installment_count: number;
};

export interface CropListType {
    crop_image_1: string | undefined;
    crop_image_2: string | undefined;
    crop_image_3: string | undefined;
    crop_image_4: string | undefined;
    crop_image_5: string | undefined;
};

export interface AdditionalInfo {
    packing_size: string;
    moisture: string;
    other_info: string;
    fungus: string;
    packing_type: string;
};

export interface History {
    pk: string;
    produce: string;
    created_at: string;
    matched_quantity: number;
};

export enum FullfillmentFlags {
    single_fulfillment = 'single_fulfillment',
    single_partial_fulfillment = 'single_partial_fulfillment',
    multiple_fulfillment = 'multiple_fulfillment',
    multiple_partial_fulfillment = 'multiple_partial_fulfillment',
};

export enum TransactionStatus {
    pending = 'Pending',
    on_going = 'active',
    completed = 'complete',
};

export enum TransactionAction {
    reject = 'reject',
    accept = 'accept'
};

export interface TransactionModel extends MatchRequirementModel {
    transactionId: string;
    transactionStatus: TransactionStatus;
    transactionTotalAmount: number;
    transactionStatusText: string;
    key: string;
};

export interface ReviewRating {
    rating: number;
    userId: string;
    location: string;
    date: string;
    reviewtext: string;
};

export interface CropCategoryModel {
    config_id: string;
    config_name: string;
    variety: string;
    grade: string;
    name: string;
};

export interface EventTemplate {
    event_list: any
};

export interface RejectCount {
    reject_count: string
};

export interface Status {
    details: [],
    key: String
};

export interface OtpErrorInMatch {
    showError: Boolean,
    errorMg: String,
    verified: Boolean,
    sellerId: String,
    buyerId: String,
    sellerCropId: String,
    buyerCropId: String
};
