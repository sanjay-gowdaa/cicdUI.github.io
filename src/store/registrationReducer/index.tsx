import { UPDATE_FORM, UPDATE_ENTITY_TYPE, UPDATE_BASIC_REGISTER_FORM, UPDATE_CONFIGURATIONS, SET_OTP_ERROR_MSG, SET_OTP_ERROR_FLAG, SET_OTP_VERIFIED_FLAG, SET_REGISTER_ERROR_MSG, SET_REGISTER_VERIFIED_FLAG } from './actions';

/* To be removed */
const mockConfig = [
        {
            "category": "Individual",
            "config_id": "ut#buyer#individual#6",
            "sub_type": "Individual",
            "documents_list": [
                "PAN",
                "AADHAR"
            ],
            "config_name": "user_type",
            "type": "Buyer"
        },
        {
            "category": "individual",
            "config_id": "ut#seller#farmer#1",
            "sub_type": "farmer",
            "documents_list": [
                "Kisan card"
            ],
            "config_name": "user_type",
            "type": "Seller"
        },
        {
            "category": "Processors",
            "config_id": "ut#seller#institution#2",
            "sub_type": "Institution",
            "documents_list": [
                "PAN"
            ],
            "config_name": "user_type",
            "type": "Seller"
        },
        {
            "category": "Agents",
            "config_id": "ut#seller#institution#3",
            "sub_type": "Institution",
            "documents_list": [
                "PAN"
            ],
            "config_name": "user_type",
            "type": "Seller"
        },
        {
            "category": "FPOs",
            "config_id": "ut#seller#institution#4",
            "sub_type": "Institution",
            "documents_list": [
                "PAN"
            ],
            "config_name": "user_type",
            "type": "Seller"
        },
        {
            "category": "Cold storage",
            "config_id": "ut#seller#institution#5",
            "sub_type": "Institution",
            "documents_list": [
                "PAN"
            ],
            "config_name": "user_type",
            "type": "Seller"
        }
    ]

const INITIAL_STATE = {
    entityType: '',
    formData: {},
    configs: [],
    /* For testing uncomment below and comment above */
    //configs: mockConfig,
    otpError: {showError: false, errorMg: '', verified: false},
    registerResponse: {errorMg: '', verified: false}
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

        default:
            return state;
    }
};

export default reducer;
