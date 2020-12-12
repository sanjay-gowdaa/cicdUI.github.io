import { UserTypes } from '../../login-ui/constants';
import { UPDATE_USER, UPDATE_PARTIAL_USER } from './actions';
import { UserDetailsModel } from './types';

const INITIAL_STATE: UserDetailsModel = {
    username: '',
    number: '',
    userId: '',
    userType: UserTypes.BUYER,
    accessToken: ''
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case UPDATE_USER:
            const {username, userId, phone, type} = action.payload
            return { ...state, username, userId, phone, userType: type };

        case UPDATE_PARTIAL_USER:
            const data = action.payload
            return { ...state, ...data };
    
        default:
            return state;
    }
};

export default reducer;
