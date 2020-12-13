import { fetchUserDetails, getAccessToken } from '../api';
import { handleResponse } from '../utils';
import { UserDetailsModel } from './types';

export const UPDATE_FORM = 'UPDATE_LOGIN_DETAILS';
export const UPDATE_USER = 'UPDATE_USER_DETAILS';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';

export const updateUserDetails = (userDetails: Partial<UserDetailsModel>) => {
    return {
        type: UPDATE_USER,
        payload: userDetails,
    };
};

export const setUserAccessToken = (token: string) => {
    return {
        type: SET_ACCESS_TOKEN,
        payload: token
    }
}

export const setLoginError = (errorMsg: string) => {
    return {
        type: SET_LOGIN_ERROR,
        payload: errorMsg
    }
}

export const setLoginSuccess = () => {
    return {
        type: SET_LOGIN_SUCCESS,
        payload: true
    }
}

export const getUserDetails = (accessToken: string) => {
    return async (dispatch: any, getState: any) => {
        const userDetailsData = await fetchUserDetails(accessToken);
        console.log('response response', userDetailsData);
        const {response} = userDetailsData || {response: {}}
        const {status, data} = response || {status: '', data: ''}
        if (handleResponse(status)) {
            dispatch(updateUserDetails(data))
        } else {

        }
    }
}

export const getAccessTokenAndFetchUserDetails = (userCode: string) => {
    return async (dispatch: any, getState: any) => {
        const accessTokenDetails = await getAccessToken(userCode)
        console.log('response response', accessTokenDetails)
        const {result} = accessTokenDetails || {result: {}}
        const {status, data} = result || {status: '', data: ''}

        if (handleResponse(status)) {
            dispatch(setUserAccessToken(data))
            dispatch(setLoginSuccess())
            // dispatch(getUserDetails(data))
        } else {
            const {statusText, err: {error = ''}} = result || {statusText: '', err: {}}
            dispatch(setLoginError(`${statusText}: ${error}`))
        }
    }
};