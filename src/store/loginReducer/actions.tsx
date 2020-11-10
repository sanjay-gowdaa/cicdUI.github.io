import { UserDetailsModel } from './types';

export const UPDATE_FORM = 'UPDATE_LOGIN_DETAILS';
export const UPDATE_USER = 'UPDATE_USER_DETAILS';

export const updateUserDetails = (userDetails: UserDetailsModel) => {
    return {
        type: UPDATE_USER,
        payload: userDetails,
    };
};
