import { UserTypes } from "../genericTypes";

export interface UserDetailsModel {
    username: string;
    is_buyer?: boolean;
    is_seller?: boolean;
    name: string;
    configs? : [];
    kycErrorMsg?: string;
    isRedirected?: boolean;
}

export interface UserStateModel extends UserDetailsModel {
    signInState: {hasError: boolean, isVerified: boolean, msg: string};
    district?: string;
    zip?: string;
}