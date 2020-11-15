import { UserDetailsModel } from './types';

export const UPDATE_FORM = 'UPDATE_LOGIN_DETAILS';
export const UPDATE_USER = 'UPDATE_USER_DETAILS';
export const UPDATE_PARTIAL_USER = 'UPDATE_PARTIAL_USER_DETAILS';

export const updateUserDetails = (userDetails: UserDetailsModel) => {
    return {
        type: UPDATE_USER,
        payload: userDetails,
    };
};


export const updatePartialUserDetails = (userDetails: any) => {
    return {
        type: UPDATE_PARTIAL_USER,
        payload: userDetails,
    };
};
