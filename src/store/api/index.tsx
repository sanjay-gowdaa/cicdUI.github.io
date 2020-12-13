const BASE_URL = 'https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com'
const STAGE = 'dev'

/* OTP Interface */
export const sendOtp = (number: string) => {
    const sendOtpApi = `${BASE_URL}/${STAGE}/otp/send`
    const bodyParam = JSON.stringify({number});
    return fetch(sendOtpApi, {
        method: 'post',
        body: bodyParam
    })
}

export const verifyOtp = (number: string, otp: string) => {
    const sendOtpApi = `${BASE_URL}/${STAGE}/otp/verify`
    const bodyParam = JSON.stringify({number, otp});
    return fetch(sendOtpApi, {
        method: 'post',
        body: bodyParam
    }).then((response: any) => response.json()) 
}
/* OTP Interface End */

/* Location interface */
export const getLocationByPin = (pincode: string) => {
    const locationByPinApi = `${BASE_URL}/${STAGE}/location?pincode=${pincode}`
    return fetch(locationByPinApi)
}
/* Location interface End */

/* Configurations */
export const getAllConfigs = () => {
    const configurationApi = `${BASE_URL}/${STAGE}/config?config=user_type`
    return fetch(configurationApi).then((response: any) => response.json())
}
/* Configurations End */

/* Registration And Login Interface */
export const registerUser = (userType: string, userFormData: any) => {
    const registrationApi = `${BASE_URL}/${STAGE}/register`
    return fetch(registrationApi,
        {
            method: 'POST',
            body: userFormData
        }).then((response: any) => response.json())
}

export const getAccessToken = (userCode: string) => {
    const accessTokenApi = `${BASE_URL}/${STAGE}/token`
    const accessTokenParam = JSON.stringify({
        'code': userCode,
        'redirectURL': `https://localhost:3000/`
        // 'redirectURL': `${BASE_URL}/login-user`
    })
    return fetch(accessTokenApi, {
        method: 'POST',
        body: accessTokenParam
    }).then((response: any) => response.json())
}

export const fetchUserDetails = (userAccessToken: string) => {
    return fetch(`/user`, {
        body: userAccessToken
    }).then((response: any) => response.json())
}

/* Registration And Login Interface End*/