const BASE_URL = 'https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com'
const STAGE = 'dev'
const version_1 = 'v1'

export const REDIRECT_URL =  `https://${window.location.host}/login-user`
export const LOGIN_URL = `https://vbui.auth.ap-south-1.amazoncognito.com/login?client_id=7sckhhjs2aq1noqd1fvjdeo69j&response_type=code&redirect_uri=${REDIRECT_URL}`

const OTP_SEND_API = 'otp/send'
const OTP_VERIFY_API = 'otp/send'
const LOCATION_API = 'location'
const CONFIG_API = 'config'
const REGISTER_API = 'register'
const TOKEN_API = 'token'
const USER_PROFILE_API = 'getuserprofile'
const CROP_TYPES_API = 'getcrops'
const CROP_SUB_TYPES_DETAILS_API = 'getcropdetails'


/* OTP Interface */
export const sendOtp = (number: string) => {
    const sendOtpApi = `${BASE_URL}/${STAGE}/${OTP_SEND_API}`
    const bodyParam = JSON.stringify({number});
    return fetch(sendOtpApi, {
        method: 'post',
        body: bodyParam
    })
}

export const verifyOtp = (number: string, otp: string) => {
    const sendOtpApi = `${BASE_URL}/${STAGE}/${OTP_VERIFY_API}`
    const bodyParam = JSON.stringify({number, otp});
    return fetch(sendOtpApi, {
        method: 'post',
        body: bodyParam
    }).then((response: any) => response.json()) 
}
/* OTP Interface End */

/* Location interface */
export const getLocationByPin = (pincode: string) => {
    const locationByPinApi = `${BASE_URL}/${STAGE}/${LOCATION_API}?pincode=${pincode}`
    return fetch(locationByPinApi)
}
/* Location interface End */

/* Configurations */
export const getAllConfigs = () => {
    const configurationApi = `${BASE_URL}/${STAGE}/${CONFIG_API}?config=user_type`
    return fetch(configurationApi).then((response: any) => response.json())
}
/* Configurations End */

/* Registration And Login Interface */
export const registerUser = (userType: string, userFormData: any) => {
    const registrationApi = `${BASE_URL}/${STAGE}/${REGISTER_API}`
    return fetch(registrationApi,
        {
            method: 'POST',
            body: userFormData
        }).then((response: any) => response.json())
}

export const getAccessToken = (userCode: string) => {
    const accessTokenApi = `${BASE_URL}/${STAGE}/${TOKEN_API}`
    const accessTokenParam = JSON.stringify({
        'code': userCode,
        'redirectURL': REDIRECT_URL
        // 'redirectURL': `${BASE_URL}/login-user`
    })
    return fetch(accessTokenApi, {
        method: 'POST',
        body: accessTokenParam
    }).then((response: any) => response.json())
}

export const fetchUserDetails = (userAccessToken: string) => {
    const userProfileApi = `${BASE_URL}/${STAGE}/${USER_PROFILE_API}`
    return fetch(userProfileApi, {
        headers: {
            'Authorization': `Bearer ${userAccessToken}`
        }
    }).then((response: any) => response.json())
}

/* Registration And Login Interface End*/

/* Seller Apis */
export const getCategoryList = () => {
    const categoryListApi = `${BASE_URL}/${STAGE}/${CROP_TYPES_API}`
    return fetch(categoryListApi).then((response: any) => response.json())
}

export const getSubCategoryList = (categoryId: string) => {
    const subcategoryListApi = `${BASE_URL}/${STAGE}/${CROP_SUB_TYPES_DETAILS_API}?crop=${categoryId}`
    return fetch(subcategoryListApi).then((response: any) => response.json())
}

export const createCrop = (cropData: any, sellerId: string) => {
    const addCropApi = `${BASE_URL}/${STAGE}/${version_1}/seller/${sellerId}/crop`;
    return fetch(addCropApi, {
        method: 'POST',
        body: JSON.stringify({cropData})
    }).then((response: any) => response.json())
}

/* Seller Apis End */