import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';
import sellerReducer from './sellerReducer';

const rootReducer = combineReducers({
    registration: registrationReducer,
    seller: sellerReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;