const BASE_URL = 'https://l4dc780eyi.execute-api.ap-south-1.amazonaws.com/dev'

/* OTP Interface */
export const sendOtp = (number: string) => {
    const sendOtpApi = `${BASE_URL}/configurations/otp/send`
    const bodyParam = JSON.stringify({number});
    return fetch(sendOtpApi, {
        method: 'post',
        body: bodyParam
    })
}

export const verifyOtp = (number: string, otp: string) => {
    const sendOtpApi = `${BASE_URL}/configurations/otp/verify`
    const bodyParam = JSON.stringify({number, otp});
    return fetch(sendOtpApi, {
        method: 'post',
        body: bodyParam
    }).then((response: any) => response.json()) 
}
/* OTP Interface End */

/* Location interface */
export const getLocationByPin = (pincode: string) => {
    const locationByPinApi = `${BASE_URL}/location?pincode=${pincode}`
    return fetch(locationByPinApi)
}
/* Location interface End */

/* Configurations */
export const getAllConfigs = () => {
    const configurationApi = `${BASE_URL}/configurations?config=user_type`
    return fetch(configurationApi).then((response: any) => response.json())
}
/* Configurations End */

/* Registration And Login Interface */
export const registerUser = (userType: string, userFormData: any) => {
    const registrationApi = `${BASE_URL}/register?user_type=${userType}`
    return fetch(registrationApi).then((response: any) => response.json())
}

/* Registration And Login Interface End*/