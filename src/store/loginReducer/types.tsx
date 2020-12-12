import { UserTypes } from "../../login-ui/constants";

export interface UserDetailsModel {
    username: string;
    number: string;
    userId: string;
    userType: UserTypes;
    accessToken: string;
}

