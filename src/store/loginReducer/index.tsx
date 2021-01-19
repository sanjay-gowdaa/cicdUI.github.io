
import { SET_ACCESS_TOKEN, SET_LOGIN_ERROR, SET_LOGIN_SUCCESS, UPDATE_USER } from './actions';
import { UserStateModel } from './types';

const INITIAL_STATE: UserStateModel = {
    username: '',
    name: '',
    signInState: {hasError: false, isVerified: false, msg: ''}
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

        default:
            return state;
    }
};

export default reducer;
