const BASE_URL = 'https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com'
const STAGE = 'dev'
const version_1 = 'v1'
export const REDIRECT_URL =  `https://${window.location.host}/login-user`
export const LOGIN_URL = `https://vbui.auth.ap-south-1.amazoncognito.com/login?client_id=7sckhhjs2aq1noqd1fvjdeo69j&response_type=code&redirect_uri=${REDIRECT_URL}`


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
        'redirectURL': REDIRECT_URL
        // 'redirectURL': `${BASE_URL}/login-user`
    })
    return fetch(accessTokenApi, {
        method: 'POST',
        body: accessTokenParam
    }).then((response: any) => response.json())
}

export const fetchUserDetails = (userAccessToken: string) => {
    const userProfileApi = `${BASE_URL}/${STAGE}/getuserprofile`
    return fetch(userProfileApi, {
        headers: {
            'Authorization': `Bearer ${userAccessToken}`
        }
    }).then((response: any) => response.json())
}

/* Registration And Login Interface End*/

/* Seller Apis */
export const getCategoryList = () => {
    const categoryListApi = `${BASE_URL}/${STAGE}/getcrops`
    return fetch(categoryListApi).then((response: any) => response.json())
}

export const getSubCategoryList = (categoryId: string) => {
    const subcategoryListApi = `${BASE_URL}/${STAGE}/getcropdetails?crop=${categoryId}`
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