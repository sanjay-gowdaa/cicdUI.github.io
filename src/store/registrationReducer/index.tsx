import { UPDATE_FORM, UPDATE_ENTITY_TYPE, UPDATE_BASIC_REGISTER_FORM, UPDATE_CONFIGURATIONS, SET_OTP_ERROR_MSG, SET_OTP_ERROR_FLAG, SET_OTP_VERIFIED_FLAG, SET_REGISTER_ERROR_MSG, SET_REGISTER_VERIFIED_FLAG, SET_TIME_STAMP } from './actions';

const INITIAL_STATE = {
    entityType: '',
    formData: {},
    configs: [],
    otpError: {showError: false, errorMg: '', verified: false},
    registerResponse: {errorMg: '', verified: false},
    timeStamp: {}
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case UPDATE_FORM:
            return { ...state, formData: action.payload };

        case UPDATE_ENTITY_TYPE:
            return { ...state, entityType: action.payload };

        case UPDATE_BASIC_REGISTER_FORM:
            return { ...state, formData: action.payload };

        case UPDATE_CONFIGURATIONS:
            return { ...state, configs: action.payload};
        
        case SET_OTP_ERROR_MSG:
            const {otpError: errorObj} = state
            const updatedErrorMsg = {...errorObj, errorMg: action.payload}
            return { ...state, otpError: updatedErrorMsg};

        case SET_OTP_ERROR_FLAG:
            const {otpError: errorObjMsg} = state
            const updatedErrorFlag = {...errorObjMsg, showError: action.payload}
            return { ...state, otpError: updatedErrorFlag };
        
        case SET_OTP_VERIFIED_FLAG:
            const {otpError: errorDupObj} = state
            const updatedSuccessFlag = {...errorDupObj, verified: action.payload}
            return { ...state, otpError: updatedSuccessFlag };
    
        case SET_REGISTER_ERROR_MSG:
            const {registerResponse: resgiterResponseObj} = state
            const updatedRegisterMsg = {...resgiterResponseObj, errorMg: action.payload}
            return { ...state, registerResponse: updatedRegisterMsg };
        
        case SET_REGISTER_VERIFIED_FLAG:
            const {registerResponse: resgiterResponseDet} = state
            const updatedRegisterFlag = {...resgiterResponseDet, verified: action.payload}
            return { ...state, registerResponse: updatedRegisterFlag };

        case SET_TIME_STAMP:
            return { ...state, timeStamp: action.payload };
        
        default:
            return state;
    }
};

export default reducer;
