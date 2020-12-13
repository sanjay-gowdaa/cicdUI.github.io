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
        const {result} = userDetailsData || {result: {}}
        // const {status, data} = response || {status: '', data: ''}
        // if (handleResponse(status)) {
        //     dispatch(updateUserDetails(data))
        // } else {
        // }
        dispatch(updateUserDetails(result))
        dispatch(setLoginSuccess())
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
            dispatch(getUserDetails(data))
        } else {
            const {statusText, err: {error = ''}} = result || {statusText: '', err: {}}
            dispatch(setLoginError(`${statusText}: ${error}`))
        }
        // testing purp
        // const accessToken = 'eyJraWQiOiJqRVZBdDZNRDhtYXZJRmJXMk83N3BBd3Q5ZDkyczBNVXdKU2JjRk4wNkJBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwMTY3ODZmMC01YzA4LTQ5MmMtYTg0Yi02Mzk0OTE4NjdlNDEiLCJldmVudF9pZCI6ImRiM2NiOWYwLTA3YzEtNGJiNC1hYWIwLTlkM2ZlMDE5YmQyMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIGVtYWlsIiwiYXV0aF90aW1lIjoxNjA3ODYyNzkwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX2RUQ2hwaEx0NCIsImV4cCI6MTYwNzk0OTE5MCwiaWF0IjoxNjA3ODYyNzkwLCJ2ZXJzaW9uIjoyLCJqdGkiOiI3MWMxYmQzNy0xOTU4LTQwNDktYjY2Ni05NmM4M2NmMmYwZjUiLCJjbGllbnRfaWQiOiI3c2NraGhqczJhcTFub3FkMWZ2amRlbzY5aiIsInVzZXJuYW1lIjoiOTAzNjU2NTIwMiJ9.g2VqL1GGxyfzCi7FJXOqVi4hCSHm7hyqRuLp9R49Rr3BiBft202NTGGyT9Vc-xMBgvyRi0OpigY3dNk8AP3vHEgGUVl5JsXUGQ9yq4rLFlvQY-VdK8OR5P6Cg6oAc_ZN0ISK03biK81EOFS7AnoBj9ZXhCiQvp54THULATLwgHDWhpPYF_UkfszF14VGaUQr_ooVw1LPbxFygZyksKoc1xOs8g9PTW_KBfainXgP999qe5t_0o0nJwLKXkY3c3gfYIKiUTRvJR9YU5A11MQZljmN5Y2YArG1MfSA16yeXCMairAlRhpmgVGdAmG7FVn0TkeYYJd0CW4rTKJoRkLiBg'
        // dispatch(getUserDetails(accessToken))
    }
};