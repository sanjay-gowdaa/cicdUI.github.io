export interface UserDetailsModel {
    username: string;
    is_buyer?: boolean;
    is_seller?: boolean;
    name: string;
    configs?: [];
    kycErrorMsg?: string;
    isRedirected?: boolean;
    errorInLogin: { hasError: boolean, msg: string, redirect: boolean };
    passwordChangeSuccess?: boolean;
    passwordChangeError?: string;
    confirmationCodeError?: string;
    isNewUser?: boolean;
    user?: any;
    amplifyResponse: boolean;
};

export interface UserStateModel extends UserDetailsModel {
    urd_status: boolean;
    signInState: { hasError: boolean, isVerified: boolean, msg: string };
    district?: string;
    zip?: string;
};
