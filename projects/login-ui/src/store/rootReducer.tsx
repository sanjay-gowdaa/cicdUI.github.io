import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';

const rootReducer = combineReducers({
    registration: registrationReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;