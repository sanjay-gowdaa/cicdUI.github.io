import { combineReducers } from 'redux';
import sellerReducer from './sellerReducer';

const rootReducer = combineReducers({
    seller: sellerReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;