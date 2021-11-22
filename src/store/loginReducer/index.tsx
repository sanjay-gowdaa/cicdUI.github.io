
import {
    SET_ACCESS_TOKEN, SET_KYC_ERROR, SET_LOGIN_ERROR, SET_LOGIN_SUCCESS,
    UPDATE_CONFIGURATIONS, UPDATE_USER, SET_IS_REDIRECTED,
    SET_ERROR_IN_LOGIN, SET_SUCCESS_IN_LOGIN, SET_PASSWORD_CHANGE_SUCCESS,
    SET_CONFIRMATION_CODE_ERROR, SET_PASSWORD_CHANGE_ERROR, SET_NEW_PASSWORD,
    SET_USER
} from './actions';
import { UserStateModel } from './types';

const INITIAL_STATE: UserStateModel = {
    username: '',
    name: '',
    configs: [],
    signInState: { hasError: false, isVerified: false, msg: '' },
    kycErrorMsg: '',
    isRedirected: false,
    errorInLogin: { hasError: false, msg: '', redirect: false },
    passwordChangeSuccess: false,
    passwordChangeError: '',
    confirmationCodeError: '',
    isNewUser: false,
    user: {}
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, ...action.payload };

        case SET_ACCESS_TOKEN:
            return { ...state, accessToken: action.payload };

        case SET_LOGIN_ERROR:
            return { ...state, signInState: { hasError: true, msg: action.payload, isVerified: false } };

        case SET_LOGIN_SUCCESS:
            return { ...state, signInState: { hasError: false, msg: '', isVerified: true } };

        case UPDATE_CONFIGURATIONS:
            return { ...state, configs: action.payload };

        case SET_KYC_ERROR:
            return { ...state, kycErrorMsg: action.payload };

        case SET_IS_REDIRECTED:
            return { ...state, isRedirected: action.payload };

        case SET_ERROR_IN_LOGIN:
            return { ...state, errorInLogin: { hasError: true, msg: action.payload, redirect: false } }

        case SET_SUCCESS_IN_LOGIN:
            return { ...state, errorInLogin: { hasError: false, msg: "", redirect: action.payload } }

        case SET_PASSWORD_CHANGE_SUCCESS:
            return { ...state, passwordChangeSuccess: action.payload }

        case SET_CONFIRMATION_CODE_ERROR:
            return { ...state, confirmationCodeError: action.payload }

        case SET_PASSWORD_CHANGE_ERROR:
            return { ...state, passwordChangeError: action.payload }

        case SET_NEW_PASSWORD:
            return { ...state, isNewUser: action.payload };

        case SET_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export default reducer;
