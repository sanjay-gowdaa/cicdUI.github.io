
import { SET_ACCESS_TOKEN, SET_KYC_ERROR, SET_LOGIN_ERROR, SET_LOGIN_SUCCESS, UPDATE_CONFIGURATIONS, UPDATE_USER, SET_IS_REDIRECTED, } from './actions';
import { UserStateModel } from './types';

const INITIAL_STATE: UserStateModel = {
    username: '',
    name: '',
    configs: [],
    signInState: {hasError: false, isVerified: false, msg: ''},
    kycErrorMsg: '',
    isRedirected: false,
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
            return { ...state, configs: action.payload};
        
        case SET_KYC_ERROR:
            return { ...state, kycErrorMsg: action.payload};

        case SET_IS_REDIRECTED:
            return { ... state, isRedirected: action.payload};

        default:
            return state;
    }
};

export default reducer;
