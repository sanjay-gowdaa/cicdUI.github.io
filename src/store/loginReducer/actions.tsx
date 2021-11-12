import CryptoJS from 'crypto-js';

import { UserDetailsModel } from './types';

import {
    fetchUserCompleteDetails,
    fetchUserDetails,
    fetchUserFiles,
    getAccessToken,
    getAllConfigs,
    kycUserDetails,
    postAddBeneficiarydata,
    postBuyerDetails,
    postSellerDetails,
    getRedirectionToken,
    fetchRedirectedUserDetails
} from '../api';
import { handleResponse } from '../utils';

import { converBase64toBlob } from '../../app-components/utils';

const TOKEN_GRANT = process.env.REACT_APP_TOKEN_GRANT as string;

export const UPDATE_FORM = 'UPDATE_LOGIN_DETAILS';
export const UPDATE_USER = 'UPDATE_USER_DETAILS';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';

export const UPDATE_CONFIGURATIONS = 'UPDATE_CONFIGURATIONS';
export const SET_KYC_ERROR = 'SET_KYC_ERROR';
export const SET_IS_REDIRECTED = 'SET_IS_REDIRECTED';

export const updateIsRedirected = (isRedirected: boolean) => {
    return {
        type: SET_IS_REDIRECTED,
        payload: isRedirected
    }
};

export const updateUserDetails = (userDetails: Partial<UserDetailsModel>) => {
    return {
        type: UPDATE_USER,
        payload: userDetails,
    };
};

export const setLoginError = (errorMsg: string) => {
    return {
        type: SET_LOGIN_ERROR,
        payload: errorMsg
    }
};

export const setLoginSuccess = () => {
    return {
        type: SET_LOGIN_SUCCESS,
        payload: true
    }
};

export const setKycUpdateMsg = (errorMsg: string) => {
    return {
        type: SET_KYC_ERROR,
        payload: errorMsg
    };
};

export const getUserCompleteDetails = () => {
    return async (dispatch: any, getState: any) => {
        const userCompleteDetails = await fetchUserCompleteDetails();
        const { result } = userCompleteDetails;
        dispatch(updateUserDetails(result));
    }
};

export const getConfigurations = () => {
    return async (dispatch: any, getState: any) => {
        const allConfigs = await getAllConfigs()
        dispatch({
            type: UPDATE_CONFIGURATIONS,
            payload: allConfigs.results,
        })
    }
};

export const getUserFiles = (fileName: string, setImageSrc: Function, setPDF: Function) => {
    return async (displatch: any, getState: any) => {
        const fileData = await fetchUserFiles(fileName);
        const extension = fileName.substring(fileName.lastIndexOf('.')).substring(1);
        const { file } = fileData;
        const blob = converBase64toBlob(file, `application/${extension}`);
        const blobURL = URL.createObjectURL(blob);
        (extension === "pdf") ? setPDF(true) : setPDF(false);
        setImageSrc(blobURL);
    }
};

export const saveKyc = (userFormData: any, setMessage: boolean) => {
    return async (dispatch: any, getState: any) => {
        const saveUserDetailsResponse = await kycUserDetails(userFormData);
        const { updateResult } = saveUserDetailsResponse;
        const { status = '', message } = updateResult;
        if (setMessage) {
            dispatch(setKycUpdateMsg(message));
        }
        // Store the error message so that it can be displayed, if error is encountered
        console.log("status", status);
        console.log("message", message);
    }
};

export const getUserDetails = (accessToken: any) => {
    return async (dispatch: any, getState: any) => {
        const userDetailsData = await fetchUserDetails(accessToken);
        const { result } = userDetailsData || { result: {} }
        dispatch(updateUserDetails(result))
        dispatch(setLoginSuccess())
    }
};

export const getRedirectedUserDetails = (accessToken: string) => {
    return async (dispatch: any, getState: any) => {
        const userDetailsData = await fetchRedirectedUserDetails(accessToken);
        const { result } = userDetailsData || { result: {} }
        dispatch(updateUserDetails(result))
        dispatch(setLoginSuccess())
    }
};

export const getAccessTokenAndFetchUserDetails = (userCode: string) => {
    return async (dispatch: any, getState: any) => {
        const accessTokenDetails = await getAccessToken(userCode)
        const { result } = accessTokenDetails || { result: {} }
        const { status, data } = result || { status: '', data: '' }

        if (handleResponse(status)) {
            const sholudEncrypt = process.env.REACT_APP_ENV === 'prod';
            (window as any).userToken = sholudEncrypt ? CryptoJS.AES.encrypt(JSON.stringify(data), TOKEN_GRANT).toString() : data;
            dispatch(getUserDetails(data))
        } else {
            const { statusText, err: { error = '' } } = result || { statusText: '', err: {} }
            dispatch(setLoginError(`${statusText}: ${error}`))
        }
        // testing purp
        // const accessToken = 'eyJraWQiOiJqRVZBdDZNRDhtYXZJRmJXMk83N3BBd3Q5ZDkyczBNVXdKU2JjRk4wNkJBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwMTY3ODZmMC01YzA4LTQ5MmMtYTg0Yi02Mzk0OTE4NjdlNDEiLCJldmVudF9pZCI6ImRiM2NiOWYwLTA3YzEtNGJiNC1hYWIwLTlkM2ZlMDE5YmQyMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIGVtYWlsIiwiYXV0aF90aW1lIjoxNjA3ODYyNzkwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX2RUQ2hwaEx0NCIsImV4cCI6MTYwNzk0OTE5MCwiaWF0IjoxNjA3ODYyNzkwLCJ2ZXJzaW9uIjoyLCJqdGkiOiI3MWMxYmQzNy0xOTU4LTQwNDktYjY2Ni05NmM4M2NmMmYwZjUiLCJjbGllbnRfaWQiOiI3c2NraGhqczJhcTFub3FkMWZ2amRlbzY5aiIsInVzZXJuYW1lIjoiOTAzNjU2NTIwMiJ9.g2VqL1GGxyfzCi7FJXOqVi4hCSHm7hyqRuLp9R49Rr3BiBft202NTGGyT9Vc-xMBgvyRi0OpigY3dNk8AP3vHEgGUVl5JsXUGQ9yq4rLFlvQY-VdK8OR5P6Cg6oAc_ZN0ISK03biK81EOFS7AnoBj9ZXhCiQvp54THULATLwgHDWhpPYF_UkfszF14VGaUQr_ooVw1LPbxFygZyksKoc1xOs8g9PTW_KBfainXgP999qe5t_0o0nJwLKXkY3c3gfYIKiUTRvJR9YU5A11MQZljmN5Y2YArG1MfSA16yeXCMairAlRhpmgVGdAmG7FVn0TkeYYJd0CW4rTKJoRkLiBg'
        // dispatch(getUserDetails(accessToken))
    }
};

export const getRedirectionTokenAndFetchUserDetails = (userKey: string) => {
    return async (dispatch: any, getState: any) => {
        const accessTokenDetails = await getRedirectionToken(userKey)
        const accessToken = accessTokenDetails.token;
        if (accessToken) {
            const sholudEncrypt = process.env.REACT_APP_ENV === 'prod';
            (window as any).userToken = sholudEncrypt ? CryptoJS.AES.encrypt(JSON.stringify(accessToken), TOKEN_GRANT).toString() : accessToken;
            dispatch(getRedirectedUserDetails(accessToken));
        }
        else {
            dispatch(setLoginError("invalid token"));
        }
    }
};

export const addBeneficiary = async (userData: any) => {
    const beneficiaryResponse = await postAddBeneficiarydata(userData);
    const { response } = beneficiaryResponse;
    console.log("response", response);
};

export const registerBuyerAtDestiny = async (userData: any) => {
    const regBuyerResponse = await postBuyerDetails(userData);
    const { response } = regBuyerResponse;
    console.log("response", response);
};

export const registerSellerAtDestiny = async (userData: any) => {
    const regSellerResponse = await postSellerDetails(userData);
    const { response } = regSellerResponse;
    console.log("response", response);
};
