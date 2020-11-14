import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';
import sellerReducer from './sellerReducer';
import buyerReducer from './buyerReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
    registration: registrationReducer,
    loginUser: loginReducer,
    seller: sellerReducer,
    buyer: buyerReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
