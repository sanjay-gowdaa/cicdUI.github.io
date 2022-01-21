export enum ResponseStatus {
    'SUCCESS' = 'success',
    'ERROR' = 'error',
    'FAILED' = 'failed'
};

export enum ResponseCode {
    'SUCCESS' = 200,
    'ERROR' = 400,
};

export enum UserTypes {
    SELLER = 'Seller',
    BUYER = 'Buyer'
};

export type LiveApmcRates = {
    region: string;
    commodity: string;
    variety: string;
};

export type UpdatedLiveApmcRatesQuery = {
    grade: string;
    produce: string;
    variety: string;
    district: string;
    category: string;
};

export type ApmcApiResponseBase = {
    is_actual: boolean;
    latest_apmc_price: number;
    previousLatestApmcPrice: number;
    nearest_district: string;
};

export type UserHistoryQuery = {
    buyerId: string;
    produce: string;
    sellerId: string;
};

export type ModalType = {
    showModal: boolean;
    setModal: Function;
};
