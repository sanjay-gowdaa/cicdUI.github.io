import { UserTypes } from "../genericTypes";

export interface UserDetailsModel {
    userName: string;
    is_buyer?: boolean;
    is_seller?: boolean;
    name: string;
}

export interface UserStateModel extends UserDetailsModel {
    signInState: {hasError: boolean, isVerified: boolean, msg: string};
    district?: string;
}