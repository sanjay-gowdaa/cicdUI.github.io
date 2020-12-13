import { UserTypes } from "../genericTypes";

export interface UserDetailsModel {
    username: string;
    number: string;
    userId: string;
    userType: UserTypes;
    
}

export interface UserStateModel extends UserDetailsModel {
    accessToken: string;
    signInState: {hasError: boolean, isVerified: boolean, msg: string}
}