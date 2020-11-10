import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';
import sellerReducer from './sellerReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
    registration: registrationReducer,
    loginUser: loginReducer,
    seller: sellerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
