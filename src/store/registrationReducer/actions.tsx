import { RegitrationFullFormModel, RegsitrationFormModel } from './types';

import { sendOtp, getAllConfigs, verifyOtp, registerUser, resendOtp } from '../api';
import { ResponseStatus } from '../genericTypes';
import { RootState } from '../rootReducer';

export const UPDATE_FORM = 'UPDATE_FORM';
export const UPDATE_BASIC_REGISTER_FORM = 'UPDATE_BASIC_REGISTER_FORM';
export const UPDATE_ENTITY_TYPE = 'UPDATE_ENTITY_TYPE';
export const UPDATE_CONFIGURATIONS = 'UPDATE_CONFIGURATIONS';
export const SET_OTP_ERROR_MSG = 'SET_OTP_ERROR_MSG';
export const SET_OTP_ERROR_FLAG = 'SET_OTP_ERROR_FLAG';
export const SET_OTP_VERIFIED_FLAG = 'SET_OTP_VERIFIED_FLAG';
export const SET_REGISTER_ERROR_MSG = 'SET_REGISTER_ERROR_MSG';
export const SET_REGISTER_VERIFIED_FLAG = 'SET_REGISTER_VERIFIED_FLAG';
export const SET_TIME_STAMP = 'SET_TIME_STAMP';
export const SET_LOADING_FLAG = 'SET_LOADING_FLAG';

/** Store register form
 * 
 * @param { RegitrationFullFormModel } formData - Register form data
 */
export const updateForm = (formData: RegitrationFullFormModel) => {
    return {
        type: UPDATE_FORM,
        payload: formData,
    };
};

/** Store user type
 * 
 * @param { string } entityType - User type, either buyer or seller
 */
export const updateEntityType = (entityType: string) => {
    return {
        type: UPDATE_ENTITY_TYPE,
        payload: entityType,
    };
};

/** Store basic registration data
 * 
 * @param { RegitrationFullFormModel } formData - Register form data
 */
export const updateBasicRegistrationData = (formData: RegsitrationFormModel) => {
    return {
        type: UPDATE_BASIC_REGISTER_FORM,
        payload: formData,
    };
};

/** Store true if otp error message is present
 * 
 * @param { boolean } errorFlag - True if otp error message is present
 */
export const setOtpErrorFlag = (errorFlag: boolean) => {
    return {
        type: SET_OTP_ERROR_FLAG,
        payload: errorFlag
    };
};

/** Store error in otp message
 * 
 * @param { string } errorMsg - Error message
 */
export const setOtpErrorMsg = (errorMsg: string) => {
    return {
        type: SET_OTP_ERROR_MSG,
        payload: errorMsg
    };
};

/** Store true if the otp is verified
 * 
 * @param { boolean } verifiedFlag - True if otp is verified
 */
export const setOtpVerifiedFlag = (verifiedFlag: boolean) => {
    return {
        type: SET_OTP_VERIFIED_FLAG,
        payload: verifiedFlag
    };
};

/** Store error in registration message
 * 
 * @param { string } errorMsg - Error message
 */
export const setRegisterMsg = (errorMsg: string) => {
    return {
        type: SET_REGISTER_ERROR_MSG,
        payload: errorMsg
    };
};

/** Store true if the registration was verified
 * 
 * @param { boolean } verifiedFlag - True if registration is verified
 */
export const setResgiterVerifiedFlag = (verifiedFlag: boolean) => {
    return {
        type: SET_REGISTER_VERIFIED_FLAG,
        payload: verifiedFlag
    };
};

/** Store processing flag
 * 
 * @param { boolean } isProcessing - True if the processing
 */
export const setProcessingFlag = (isProcessing: boolean) => {
    return {
        type: SET_LOADING_FLAG,
        payload: isProcessing
    };
};

// Store configuration information
export const getConfigurations = () => {
    return async (dispatch: any) => {
        const allConfigs = await getAllConfigs();
        dispatch({
            type: UPDATE_CONFIGURATIONS,
            payload: allConfigs.results,
        })
    };
};

/** Send otp to the phone number
 * 
 * @param { string } otpNumber - Ten digit phone number
 */
export const sendOTP = (otpNumber: string) => {
    return async () => {
        sendOtp(otpNumber);
    };
};

// Resend otp
export const resendOTP = () => {
    return async (getState: any) => {
        const { registration } = getState() as RootState;
        const { formData = {} } = registration || {};
        const { number } = formData;
        resendOtp(`91${number}`);
    };
};

// Reset all otp states
export const resetOtpState = () => {
    return (dispatch: any) => {
        dispatch(setOtpErrorMsg(''));
        dispatch(setOtpErrorFlag(false));
        dispatch(setOtpVerifiedFlag(false));
    };
};

/** Check if the OTP is correct for the phone number
 * 
 * @param { string } number - Ten digit phone number
 * @param { string } otp - Four digit otp
 */
export const confirmOTP = (number: string, otp: string) => {
    return async (dispatch: any) => {
        dispatch(setProcessingFlag(true));
        const verifyOtpResponse = await verifyOtp(`91${number}`, otp);
        const { OTPResp = {} } = verifyOtpResponse || {};
        const { type = '', message } = OTPResp;
        if (type === ResponseStatus.ERROR) {
            dispatch(setOtpErrorFlag(true));
            dispatch(setOtpErrorMsg(message));
        } else if (type === ResponseStatus.SUCCESS) {
            dispatch(setOtpErrorFlag(false));
            dispatch(setOtpVerifiedFlag(true));
        }
        dispatch(setProcessingFlag(false));
    };
};

/** Bypass Otp for testing purpose not being used in demo environment
 * 
 * @param { string } otp - Should be '1234'
 */
export const byPassOTP = (otp: string) => {
    return async (dispatch: any, getState: any) => {
        dispatch(setProcessingFlag(true));
        const verified = otp === '1234';
        if (!verified) {
            dispatch(setOtpErrorFlag(true));
            dispatch(setOtpErrorMsg('otp not matching'));
        } else {
            dispatch(setOtpErrorFlag(false));
            dispatch(setOtpVerifiedFlag(true));
        }
        dispatch(setProcessingFlag(false));
    };
};

/** Send user data to dynamo db on registration
 * 
 * @param { any } userFormData - User data for registration
 */
export const submitRegister = (userFormData: any) => {
    return async (dispatch: any) => {
        dispatch(setProcessingFlag(true));
        const registerUserResponse = await registerUser(userFormData);
        const { result } = registerUserResponse || {};
        const { status = '', message } = result;
        dispatch(setRegisterMsg(message))
        if (status === ResponseStatus.SUCCESS) {
            dispatch(setResgiterVerifiedFlag(true));
        } else {
            dispatch(setResgiterVerifiedFlag(false));
        }
        dispatch(setProcessingFlag(false));
    };
};
