import CryptoJS from 'crypto-js';
const BASE_URL = process.env.REACT_APP_BASE_URL; //'https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com'
const STAGE = process.env.REACT_APP_ENV;
const TOKEN_GRANT = process.env.REACT_APP_TOKEN_GRANT as string;

export const REDIRECT_URL =  `https://${window.location.host}/login-user`
export const LOGOUT_REDIRECT = `https://${window.location.host}/`;
export const LOGIN_URL = `${process.env.REACT_APP_LOGIN_URL_BASE_URL}/login?client_id=7sckhhjs2aq1noqd1fvjdeo69j&response_type=code&redirect_uri=${REDIRECT_URL}`;
export const LOGOUT_URL = `${process.env.REACT_APP_LOGOUT_BASE_URL}/logout?client_id=7sckhhjs2aq1noqd1fvjdeo69j&logout_uri=${LOGOUT_REDIRECT}`;

const OTP_SEND_API = 'otp/send';
const OTP_RESEND_API = 'otp/retry'
const OTP_VERIFY_API = 'otp/send';
const LOCATION_API = 'location';
const CONFIG_API = 'config';
const REGISTER_API = 'register';
const TOKEN_API = 'token';
const USER_PROFILE_API = 'getuserprofile';
const CROP_TYPES_API = 'getcrops';
const CROP_SUB_TYPES_DETAILS_API = 'getcropdetails';
const CROP_CATEGORY_DETAILS_API = 'getcropcategories';
const APMC_MODAL_PRICE = 'getmodalprice';

const getAuthHeader = () =>  {
    const userToken = (window as any).userToken ? (window as any).userToken : '';
    const decryptedToken = userToken ? CryptoJS.AES.decrypt(userToken, TOKEN_GRANT) : '';
    const userAccessToken = decryptedToken ? JSON.parse(decryptedToken.toString(CryptoJS.enc.Utf8)) : ''
    return ({'Authorization': `Bearer ${userAccessToken}`});

    // For testing: Bypass auth from UI
    //return ({'Authorization': `Bearer ${''}`});
}

/* OTP Interface */
export const sendOtp = (number: string) => {
    const sendOtpApi = `${BASE_URL}/${STAGE}/${OTP_SEND_API}`;
    const bodyParam = JSON.stringify({number});
    return fetch(sendOtpApi, {
        method: 'post',
        body: bodyParam
    });
};

export const resendOtp = (number: string) => {
    const resendOtpApi = `${BASE_URL}/${STAGE}/${OTP_RESEND_API}`;
    const bodyParam = JSON.stringify({number});
    return fetch(resendOtpApi, {
        method: 'post',
        body: bodyParam
    });
};

export const verifyOtp = (number: string, otp: string) => {
    const sendOtpApi = `${BASE_URL}/${STAGE}/${OTP_VERIFY_API}`;
    const bodyParam = JSON.stringify({number, otp});
    return fetch(sendOtpApi, {
        method: 'post',
        body: bodyParam
    }).then((response: any) => response.json());
};
/* OTP Interface End */

/* Location interface */
export const getLocationByPin = (pincode: string) => {
    const locationByPinApi = `${BASE_URL}/${STAGE}/${LOCATION_API}?pincode=${pincode}`;
    return fetch(locationByPinApi);
};
/* Location interface End */

/* Configurations */
export const getAllConfigs = () => {
    const configurationApi = `${BASE_URL}/${STAGE}/${CONFIG_API}?config=user_type`;
    return fetch(configurationApi).then((response: any) => response.json());
};
/* Configurations End */

/* Registration And Login Interface */
export const registerUser = (userType: string, userFormData: any) => {
    const registrationApi = `${BASE_URL}/${STAGE}/${REGISTER_API}`;
    return fetch(registrationApi,
        {
            method: 'POST',
            body: JSON.stringify(userFormData)
        }).then((response: any) => response.json());
};

export const getAccessToken = (userCode: string) => {
    const accessTokenApi = `${BASE_URL}/${STAGE}/${TOKEN_API}`;
    const accessTokenParam = JSON.stringify({
        'code': userCode,
        'redirectURL': REDIRECT_URL
    });
    return fetch(accessTokenApi, {
        method: 'POST',
        body: accessTokenParam
    }).then((response: any) => response.json());
};

export const fetchUserDetails = (userAccessToken: string) => {
    const userProfileApi = `${BASE_URL}/${STAGE}/${USER_PROFILE_API}`;
    return fetch(userProfileApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json());
};

/* Registration And Login Interface End*/

/* Seller Apis */

// getCropdetails Api
export const getSubCategoryList = (categoryId: string) => {
    const subcategoryListApi = `${BASE_URL}/${STAGE}/${CROP_SUB_TYPES_DETAILS_API}?crop=${categoryId}`;
    return fetch(subcategoryListApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json());
};

export const createCrop = (cropData: any, sellerId: string) => {
    const addCropApi = `${BASE_URL}/${STAGE}/seller/${sellerId}/crop`;
    return fetch(addCropApi, {
        method: 'POST',
        body: JSON.stringify(cropData),
        headers: getAuthHeader()
    }).then((response: any) => response.json());
};


export const getAllCrops = (sellerId: string) => {
    const fetcCropsApi = `${BASE_URL}/${STAGE}/seller/${sellerId}/crop`;
    return fetch(fetcCropsApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json());
};

export const getApmcModalPrice = ({region, commodity, variety}: {region: string, commodity: string, variety: string}) => {
    const getApmcPriceApi = `${BASE_URL}/${STAGE}/${APMC_MODAL_PRICE}?region=${region}&commodity=${commodity}&variety=${variety}`;
    return fetch(getApmcPriceApi).then((response: any) => response.json());
}

/* Seller Apis End */

/* Buyer Apis */
export const addProduce = (produceData: any, buyerId: string) => {
    const addProduceApi = `${BASE_URL}/${STAGE}/buyer/${buyerId}/crop`;
    const bodyParamData = JSON.stringify(produceData);
    return fetch(addProduceApi, {
        method: 'POST',
        body: bodyParamData,
        headers: getAuthHeader()
    }).then((response: any) => response.json());
};

export const getAllProduce = (buyerId: string) => {
    const getAllProduceApi = `${BASE_URL}/${STAGE}/buyer/${buyerId}/crop`;
    return fetch(getAllProduceApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json());
};

// getCrops Api
export const getCropList = (filteredCrop: string) => {
    const categoryListApi = `${BASE_URL}/${STAGE}/${CROP_TYPES_API}?category=${filteredCrop}`;
    return fetch(categoryListApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json());
};

// getCropCategories Api
export const getCropCategoryList = () => {
    const cropCategoryApi = `${BASE_URL}/${STAGE}/${CROP_CATEGORY_DETAILS_API}`;
    return fetch(cropCategoryApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json());
};


export const updateMasterList = (updateMasterList: any, buyerId: string) => {
    const masterListApi = `${BASE_URL}/${STAGE}/buyer/${buyerId}/master_list`;
    const bodyParamData = JSON.stringify(updateMasterList);
    return fetch(masterListApi, {
        method: 'POST',
        body: bodyParamData,
        headers: getAuthHeader()
    }).then((response: any) => response.json())
}

export const getMasterList = (buyerId: string) => {
    const masterListApi = `${BASE_URL}/${STAGE}/buyer/${buyerId}/master_list`;
    return fetch(masterListApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json())
}
/* Buyer Apis End */