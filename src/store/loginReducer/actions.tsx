import CryptoJS from 'crypto-js';
import { Auth } from 'aws-amplify';

import { UserDetailsModel, UserStateModel } from './types';

import {
    fetchUserCompleteDetails,
    fetchUserDetails,
    fetchUserFiles,
    getAccessToken,
    getAllConfigs,
    kycUserDetails,
    getRedirectionToken
} from '../api';
import { handleResponse } from '../utils';

import { converBase64toBlob } from '../../app-components/utils';
import { RootState } from '../rootReducer';

const TOKEN_GRANT = process.env.REACT_APP_TOKEN_GRANT as string;

export const UPDATE_FORM = 'UPDATE_LOGIN_DETAILS';
export const UPDATE_USER = 'UPDATE_USER_DETAILS';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';

export const UPDATE_CONFIGURATIONS = 'UPDATE_CONFIGURATIONS';
export const SET_KYC_ERROR = 'SET_KYC_ERROR';
export const SET_IS_REDIRECTED = 'SET_IS_REDIRECTED';
export const SET_ERROR_IN_LOGIN = 'SET_ERROR_IN_LOGIN';
export const SET_SUCCESS_IN_LOGIN = 'SET_SUCCESS_IN_LOGIN';
export const SET_PASSWORD_CHANGE_SUCCESS = 'SET_PASSWORD_CHANGE_SUCCESS';
export const SET_CONFIRMATION_CODE_ERROR = 'SET_CONFIRMATION_CODE_ERROR';
export const SET_PASSWORD_CHANGE_ERROR = 'SET_PASSWORD_CHANGE_ERROR';
export const SET_NEW_PASSWORD = 'SET_NEW_PASSWORD';
export const SET_USER = 'SET_USER';
export const SET_AMPLIFY_RESPONSE = 'SET_AMPLIFY_RESPONSE';

/** Store if there is a response from amplify or not
 * 
 * @param { boolean } isSet - True if there is a response from amplify
 */
export const setAmplifyResponse = (isSet: boolean) => {
    return {
        type: SET_AMPLIFY_RESPONSE,
        payload: isSet
    };
};

/** Store user information
 * 
 * @param { any } user - User Information on login
 */
export const setUser = (user: any) => {
    return {
        type: SET_USER,
        payload: user
    };
};

/** Set true if the new password is required to be set
 * 
 * @param { boolean } setPassword - True if the user is login in for the first time
 */
export const setNewPassword = (setPassword: boolean) => {
    return {
        type: SET_NEW_PASSWORD,
        payload: setPassword
    };
};

/** Store error in confirmation code message
 * 
 * @param { string } error - Error message
 */
export const setConfirmationCodeError = (error: string) => {
    return {
        type: SET_CONFIRMATION_CODE_ERROR,
        payload: error
    };
};

/** Store error in password change message
 * 
 * @param { string } error - Error message
 */
export const setPasswordChangeError = (error: string) => {
    return {
        type: SET_PASSWORD_CHANGE_ERROR,
        payload: error
    };
};

/** Store error in login message
 * 
 * @param { string } error - Error message
 */
export const setErrorInLogin = (error: string) => {
    return {
        type: SET_ERROR_IN_LOGIN,
        payload: error
    };
};

// Store login success as true
export const setSuccessInLogin = () => {
    return {
        type: SET_SUCCESS_IN_LOGIN,
        payload: true
    };
};

// Store password change success as true
export const setPasswordChangeStatus = () => {
    return {
        type: SET_PASSWORD_CHANGE_SUCCESS,
        payload: true
    };
};

/** Store if the user is redirected or not
 * 
 * @param { boolean } isRedirected - True if redirected
 */
export const updateIsRedirected = (isRedirected: boolean) => {
    return {
        type: SET_IS_REDIRECTED,
        payload: isRedirected
    };
};

/** Store user details
 * 
 * @param { Partial<UserDetailsModel>} userDetails - User Details
 */
export const updateUserDetails = (userDetails: Partial<UserDetailsModel>) => {
    return {
        type: UPDATE_USER,
        payload: userDetails,
    };
};

/** Store error in login message
 * 
 * @param { string } errorMsg - Error message
 */
export const setLoginError = (errorMsg: string) => {
    return {
        type: SET_LOGIN_ERROR,
        payload: errorMsg
    };
};

// Store login success state as true
export const setLoginSuccess = () => {
    return {
        type: SET_LOGIN_SUCCESS,
        payload: true
    };
};

/** Store error in KYC message
 * 
 * @param { string } errorMsg - Error message
 */
export const setKycUpdateMsg = (errorMsg: string) => {
    return {
        type: SET_KYC_ERROR,
        payload: errorMsg
    };
};

// Get user complete details and store it in the login reducer
export const getUserCompleteDetails = () => {
    return async (dispatch: any) => {
        const userCompleteDetails = await fetchUserCompleteDetails();
        const { result } = userCompleteDetails;
        dispatch(updateUserDetails(result));
    };
};

// Get configurations and store it in the login reducer
export const getConfigurations = () => {
    return async (dispatch: any) => {
        const allConfigs = await getAllConfigs();
        dispatch({
            type: UPDATE_CONFIGURATIONS,
            payload: allConfigs.results,
        });
    };
};

/** Fetch the user files using fileName
 * 
 * @param { string } fileName - File name which is eing fetched
 * @param { Function } setImageSrc - Store the image source using the function
 * @param { Function } setPDF - Store true if the the file is a pdf 
 */
export const getUserFiles = (fileName: string, setImageSrc: Function, setPDF: Function) => {
    return async () => {
        const fileData = await fetchUserFiles(fileName);
        const extension = fileName.substring(fileName.lastIndexOf('.')).substring(1);
        const { file } = fileData;
        const blob = converBase64toBlob(file, `application/${extension}`);
        const blobURL = URL.createObjectURL(blob);
        (extension === 'pdf') ? setPDF(true) : setPDF(false);
        setImageSrc(blobURL);
    };
};

/** Save KYC data and send it to dynamo db
 * 
 * @param { any } userFormData - Kyc form data to be sent to db
 * @param { boolean } setMessage - Show response message if set to true
 */
export const saveKyc = (userFormData: any, setMessage: boolean) => {
    return async (dispatch: any) => {
        const saveUserDetailsResponse = await kycUserDetails(userFormData);
        const { updateResult } = saveUserDetailsResponse;
        const { message } = updateResult;
        if (setMessage) {
            dispatch(setKycUpdateMsg(message));
        }
    };
};

// Fetch user details and store in login reducer
export const getUserDetails = () => {
    return async (dispatch: any) => {
        const userDetailsData = await fetchUserDetails();
        const { result } = userDetailsData || { result: {} };
        dispatch(updateUserDetails(result));
        dispatch(setLoginSuccess());
    };
};

/**
 * 
 * @param { string } userCode -
 */
export const getAccessTokenAndFetchUserDetails = (userCode: string) => {
    return async (dispatch: any) => {
        const accessTokenDetails = await getAccessToken(userCode);
        const { result } = accessTokenDetails || { result: {} };
        const { status, data } = result || { status: '', data: '' };

        if (handleResponse(status)) {
            const sholudEncrypt = process.env.REACT_APP_ENV === 'prod';
            (window as any).userToken = sholudEncrypt ? CryptoJS.AES.encrypt(JSON.stringify(data), TOKEN_GRANT).toString() : data;
            dispatch(getUserDetails());
        } else {
            const { statusText, err: { error = '' } } = result || { statusText: '', err: {} };
            dispatch(setLoginError(`${statusText}: ${error}`));
        }
    };
};

/** 
 * 
 * @param { string } userKey - 
 */
export const getRedirectionTokenAndFetchUserDetails = (userKey: string) => {
    return async (dispatch: any) => {
        const accessTokenDetails = await getRedirectionToken(userKey);
        const accessToken = accessTokenDetails.token;
        if (accessToken) {
            const sholudEncrypt = process.env.REACT_APP_ENV === 'prod';
            (window as any).userToken = sholudEncrypt ? CryptoJS.AES.encrypt(JSON.stringify(accessToken), TOKEN_GRANT).toString() : accessToken;
            dispatch(getUserDetails());
        }
        else {
            dispatch(setLoginError('invalid token'));
        }
    };
};

/** Takes phone number and password and returns user token which can be used to login
 * 
 * @param { string } userName - User ten digit phone number
 * @param { string } password - User password
 */
export const signIn = (userName: string, password: string) => {
    return async (dispatch: any) => {
        dispatch(setAmplifyResponse(false));
        Auth.signIn(userName, password)
            .then(user => {
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    dispatch(setNewPassword(true));
                    dispatch(setUser(user));
                } else {
                    const { signInUserSession } = user;
                    const { accessToken } = signInUserSession;
                    dispatch(setSuccessInLogin());
                    (window as any).userToken = accessToken.jwtToken;
                    (window as any).userName = user.username;
                    dispatch(setAmplifyResponse(true));
                }
            }).catch(error => {
                dispatch(setErrorInLogin(error.message))
            });
    };
};

/** Used to set the user password on click of forgot password
  * 
  * @param { string } password - User Password
  */
export const setUserPassword = (password: string) => {
    return async (dispatch: any, getState: any) => {
        const { loginUser }: { loginUser: UserStateModel } = getState() as RootState;
        Auth.completeNewPassword(loginUser.user, password)
            .then(user => {
                dispatch(setSuccessInLogin());
                (window as any).userToken = user.signInUserSession.accessToken.jwtToken;
                dispatch(setAmplifyResponse(true));
            })
            .catch(e => console.log('error', e));
    };
};

/** Sends six digit confirmation code to the phone number, which can be used to reset password
  * 
  * @param { string } userName - User ten digit phone number
  */
export const sendConfirmationCode = (userName: string) => {
    return async (dispatch: any) => {
        Auth.forgotPassword(userName)
            .then(() => {
                dispatch(setConfirmationCodeError(''));
            })
            .catch(error => {
                dispatch(setConfirmationCodeError(error.message));
            })
    };
};

/** Sets the new password by taking phone number, code and new password
 * 
 * @param { string } userName - User ten digit phone number
 * @param { string } code - Six digit code recieved by the user
 * @param { string } password - Password to set
 */
export const submitForgotPassword = (userName: string, code: string, password: string) => {
    return async (dispatch: any) => {
        Auth.forgotPasswordSubmit(userName, code, password)
            .then(dispatch(setPasswordChangeStatus()))
            .catch(error => {
                dispatch(setPasswordChangeError(error.message));
            })
    };
};
