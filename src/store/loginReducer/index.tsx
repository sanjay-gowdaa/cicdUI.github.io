import { UPDATE_USER } from './actions';
import { UserDetailsModel } from './types';

const INITIAL_STATE: UserDetailsModel = {
    username: '',
    phone: '',
    userId: ''
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case UPDATE_USER:
            const {username, userId, phone} = action.payload
            return { ...state, username, userId, phone };

        default:
            return state;
    }
};

export default reducer;
