import { getTimeStamp } from '../../app-components/utils';
import { sendOtp, getAllConfigs, verifyOtp, registerUser, resendOtp } from '../api';
import { ResponseStatus } from '../genericTypes';
import { RootState } from '../rootReducer';
import { RegitrationFullFormModel, RegsitrationFormModel } from './types';

export const UPDATE_FORM = 'UPDATE_FORM';
export const UPDATE_BASIC_REGISTER_FORM = 'UPDATE_BASIC_REGISTER_FORM';
export const UPDATE_ENTITY_TYPE = 'UPDATE_ENTITY_TYPE';
export const UPDATE_CONFIGURATIONS = 'UPDATE_CONFIGURATIONS';
export const SET_OTP_ERROR_MSG = 'SET_OTP_ERROR_MSG'
export const SET_OTP_ERROR_FLAG = 'SET_OTP_ERROR_FLAG'
export const SET_OTP_VERIFIED_FLAG = 'SET_OTP_VERIFIED_FLAG'
export const SET_REGISTER_ERROR_MSG = 'SET_REGISTER_ERROR_MSG'
export const SET_REGISTER_VERIFIED_FLAG = 'SET_REGISTER_VERIFIED_FLAG'
export const SET_TIME_STAMP = 'SET_TIME_STAMP';
export const SET_LOADING_FLAG = 'SET_LOADING_FLAG';

export const updateForm = (formData: RegitrationFullFormModel) => {
    return {
        type: UPDATE_FORM,
        payload: formData,
    };
};

export const updateEntityType = (entityType: string) => {
    return {
        type: UPDATE_ENTITY_TYPE,
        payload: entityType,
    };
};

export const updateBasicRegistrationData = (formData: RegsitrationFormModel) => {
    return {
        type: UPDATE_BASIC_REGISTER_FORM,
        payload: formData,
    };
};

export const setOtpErrorFlag = (errorFlag: boolean) => {
    return {
        type: SET_OTP_ERROR_FLAG,
        payload: errorFlag
    }
}

export const setOtpErrorMsg = (errorMsg: string) => {
    return {
        type: SET_OTP_ERROR_MSG,
        payload: errorMsg
    }
}

export const setOtpVerifiedFlag = (verifiedFlag: boolean) => {
    return {
        type: SET_OTP_VERIFIED_FLAG,
        payload: verifiedFlag
    }
}

export const setRegisterMsg = (errorMsg: string) => {
    return {
        type: SET_REGISTER_ERROR_MSG,
        payload: errorMsg
    }
}

export const setResgiterVerifiedFlag = (verifiedFlag: boolean) => {
    return {
        type: SET_REGISTER_VERIFIED_FLAG,
        payload: verifiedFlag
    }
}

export const setProcessingFlag = (isProcessing: boolean) => {
    return {
        type: SET_LOADING_FLAG,
        payload: isProcessing
    }
}

export const setTimeStamp = (timeStamp: any) => {
    return {
        type: SET_TIME_STAMP,
        payload: timeStamp
    }
}

export const  getConfigurations = () => {
    return async (dispatch: any, getState: any) => {
        const allConfigs = await getAllConfigs()
        dispatch({
            type: UPDATE_CONFIGURATIONS,
            payload: allConfigs.results,
        })
    }
};

export const sendOTP = (otpNumber: string) => {
    return async (dispatch: any, getState: any) => {
        sendOtp(otpNumber);
    }
}

export const resendOTP = () => {
    return async (dispatch: any, getState: any) => {
        const {registration} = getState() as RootState; 
        const {formData = {}} = registration || {};
        const {number} = formData
        resendOtp(`91${number}`);
    }
}

export const resetOtpState = () => {
    return (dispatch: any) => {
        dispatch(setOtpErrorMsg(''))
        dispatch(setOtpErrorFlag(false))
        dispatch(setOtpVerifiedFlag(false))
    }
}

export const confirmOTP = (number: string, otp: string) => {
    return async (dispatch: any, getState: any) => {
        dispatch(setProcessingFlag(true));
        const verifyOtpResponse = await verifyOtp(`91${number}`, otp);
        const {OTPResp = {}} = verifyOtpResponse || {}
        const {type = '', message} = OTPResp
        if (type === ResponseStatus.ERROR) {
            dispatch(setOtpErrorFlag(true))
            dispatch(setOtpErrorMsg(message))
        } else if (type === ResponseStatus.SUCCESS) {
            dispatch(setOtpErrorFlag(false))
            dispatch(setOtpVerifiedFlag(true))
        }
        dispatch(setProcessingFlag(false));
    }
}

export const submitRegister = (userType: string, userFormData: any) => {
    return async(dispatch: any, getState: any) => {
        dispatch(setProcessingFlag(true));
        const registerUserResponse = await registerUser(userType, userFormData);
        const {result} = registerUserResponse || {}
        const {status = '', message} = result
        dispatch(setRegisterMsg(message))
        if (status === ResponseStatus.SUCCESS) {
            dispatch(setResgiterVerifiedFlag(true))
        } else {
            dispatch(setResgiterVerifiedFlag(false))
        }
        dispatch(setProcessingFlag(false));
    }
}

export const saveTimeStamp = (dispatch: any) => {
    const timeStamp = getTimeStamp();
    dispatch(setTimeStamp(timeStamp));
}