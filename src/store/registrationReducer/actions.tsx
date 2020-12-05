import { sendOtp, getAllConfigs, verifyOtp, registerUser } from '../api';
import { RegitrationFullFormModel, RegsitrationFormModel } from './types';

export const UPDATE_FORM = 'UPDATE_FORM';
export const UPDATE_BASIC_REGISTER_FORM = 'UPDATE_BASIC_REGISTER_FORM';
export const UPDATE_ENTITY_TYPE = 'UPDATE_ENTITY_TYPE';
export const UPDATE_CONFIGURATIONS = 'UPDATE_CONFIGURATIONS';
export const SET_OTP_ERROR_MSG = 'SET_OTP_ERROR_MSG'
export const SET_OTP_ERROR_FLAG = 'SET_OTP_ERROR_FLAG'
export const SET_OTP_VERIFIED_FLAG = 'SET_OTP_VERIFIED_FLAG'

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

export const confirmOTP = (number: string, otp: string) => {
    return async (dispatch: any, getState: any) => {
        const verifyOtpResponse = await verifyOtp(`91${number}`, otp);
        const {OTP_response = {}} = verifyOtpResponse || {}
        const {type = '', message} = OTP_response
        if (type === 'error') {
            dispatch(setOtpErrorFlag(true))
            dispatch(setOtpErrorMsg(message))
        } else if (type === 'success') {
            dispatch(setOtpErrorFlag(false))
            dispatch(setOtpVerifiedFlag(true))
        }
    }
}

export const submitRegsiter = (userType: string, userFormData: any) => {
    return async(dispatch: any, getState: any) => {
        const registerUserResponse = await registerUser(userType, userFormData)
        console.log('registerUserResponse', registerUserResponse);
    }
}