import { UserTypes } from "../genericTypes";

export interface UserDetailsModel {
    userName: string;
    is_buyer?: boolean;
    is_seller?: boolean;
    name: string;
}

export interface UserStateModel extends UserDetailsModel {
    accessToken: string;
    signInState: {hasError: boolean, isVerified: boolean, msg: string}
}