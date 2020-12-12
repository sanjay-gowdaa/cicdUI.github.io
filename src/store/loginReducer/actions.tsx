import { getAccessToken } from '../api';
import { UserDetailsModel } from './types';

export const UPDATE_FORM = 'UPDATE_LOGIN_DETAILS';
export const UPDATE_USER = 'UPDATE_USER_DETAILS';
export const UPDATE_PARTIAL_USER = 'UPDATE_PARTIAL_USER_DETAILS';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

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

export const setUserAccessToken = (token: string) => {
    return {
        type: SET_ACCESS_TOKEN,
        payload: token
    }
}

export const fetchUserDetails = (accessToken: string) => {
    return async (dispatch: any, getState: any) => {
    }
}

export const getAccessTokenAndFetchUserDetails = (userCode: string) => {
    return async (dispatch: any, getState: any) => {
        const accessTokenDetails = await getAccessToken(userCode)
        console.log('response response', accessTokenDetails)
        const {response} = accessTokenDetails || {response: {}}
        const {status, data} = response || {status: '', data: ''}

        if ( status === 'success') {
            dispatch(setUserAccessToken(data.token))
            dispatch(fetchUserDetails(data.token))
        } else {

        }
    }
};