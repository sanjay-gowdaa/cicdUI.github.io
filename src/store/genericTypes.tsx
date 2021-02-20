export enum ResponseStatus {
    'SUCCESS' = 'success',
    'ERROR' = 'error',
    'FAILED' = 'failed'
}

export enum ResponseCode {
    'SUCCESS' = 200,
    'ERROR' = 400,
}
export enum UserTypes {
    SELLER = 'Seller',
    BUYER = 'Buyer'
}

export type LiveApmcRates = {
    region: string;
    commodity: string;
    variety: string;
}

export type UpdatedLiveApmcRatesQuery = {
    grade: string;
    item_name: string;
    variety: string;
    district: string;
    category: string;
}

export type ApmcApiResponseBase = {
    latest_apmc_price: number;
    previousLatestApmcPrice: number;
} 