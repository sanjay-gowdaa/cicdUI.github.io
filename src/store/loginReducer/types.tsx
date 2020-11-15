export enum UserType {
    BUYER = 'Buyer',
    SELLER = 'Seller'
}

export interface UserDetailsModel {
    username: string;
    phone: string;
    userId: string;
    userType: UserType
}

