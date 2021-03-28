import CryptoJS from 'crypto-js';
import { LiveApmcRates, UpdatedLiveApmcRatesQuery } from '../genericTypes';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const STAGE = process.env.REACT_APP_ENV;
const TOKEN_GRANT = process.env.REACT_APP_TOKEN_GRANT as string;

export const REDIRECT_URL =  `https://${window.location.host}/login-user`;
export const LOGOUT_REDIRECT = `https://${window.location.host}/`;
export const LOGIN_URL = `${process.env.REACT_APP_LOGIN_URL_BASE_URL}/login?client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}`;
export const LOGOUT_URL = `${process.env.REACT_APP_LOGOUT_BASE_URL}/logout?client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&logout_uri=${LOGOUT_REDIRECT}`;

const OTP_SEND_API = 'otp/send';
const OTP_RESEND_API = 'otp/retry'
const OTP_VERIFY_API = 'otp/verify';
const LOCATION_API = 'location';
const CONFIG_API = 'config';
const REGISTER_API = 'register';
const TOKEN_API = 'token';
const USER_PROFILE_API = 'getuserprofile';
const CROP_TYPES_API = 'getcrops';
const CROP_SUB_TYPES_DETAILS_API = 'getcropdetails';
const CROP_CATEGORY_DETAILS_API = 'getcropcategories';
const APMC_LIVE_RATES = 'getliverates';
const UPDATED_APMC_API = 'https://yldnzvpt6c.execute-api.ap-south-1.amazonaws.com/localApmcDb/getapmcprice';
const INTENT_TO_SELL = 'sell';
const USER_MANAGER_API = 'user';
const MATCHES_API = `https://a73j5pnsxl.execute-api.ap-south-1.amazonaws.com/${STAGE}/matches`;
const MATCHES_REJECT_API = `https://a73j5pnsxl.execute-api.ap-south-1.amazonaws.com/${STAGE}/reject`;

const parseToken = (userToken: string) => {
    const sholudDecrypt = process.env.REACT_APP_ENV === 'prod';
    const decryptedToken = sholudDecrypt ? CryptoJS.AES.decrypt(userToken, TOKEN_GRANT) : userToken;
    const userAccessToken = sholudDecrypt ? JSON.parse(decryptedToken.toString(CryptoJS.enc.Utf8)) : decryptedToken;
    return userAccessToken;
}

const getAuthHeader = () =>  {
    const userToken = (window as any).userToken ? (window as any).userToken : '';
    if (userToken) {
        const userAccessToken = parseToken(userToken);
        return ({'Authorization': `Bearer ${userAccessToken}`});
    } else {
        return ({'Authorization': `Bearer `});
    }
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

/* User Manager API*/
export const getUserManager = (phoneNumber: string) => {
    const userManagerApi = `${BASE_URL}/${STAGE}/${USER_MANAGER_API}/${phoneNumber}`;
    return fetch(userManagerApi)
    .then((response: any) => response.json());
};
/* USer Manager API End */

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

export const patchCrop = (cropData: any, sellerId: string) => {
    const addProduceApi = `${BASE_URL}/${STAGE}/seller/${sellerId}/crop`;
    const bodyParamData = JSON.stringify(cropData);
    return fetch(addProduceApi, {
        method: 'PATCH',
        body: bodyParamData,
        headers: getAuthHeader()
    }).then((response: any) => response.json());
}


export const getAllCrops = (sellerId: string) => {
    const fetcCropsApi = `${BASE_URL}/${STAGE}/seller/${sellerId}/crop`;
    return fetch(fetcCropsApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json());
};

export const getLiveApmcRateUpdated = (cropDetails: Array<UpdatedLiveApmcRatesQuery>) => {
    return fetch(UPDATED_APMC_API, {
        method: 'POST',
        // headers: getAuthHeader(),
        body: JSON.stringify(cropDetails)
    }).then((response: any) => response.json());
}

export const getLiveApmcRate = (cropDetails: Array<LiveApmcRates>) => {
    const apmcLiveRateBody = {crops: cropDetails}
    const getApmcPriceApi = `${BASE_URL}/${STAGE}/${APMC_LIVE_RATES}`;
    return fetch(getApmcPriceApi, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({crops: cropDetails})
    }).then((response: any) => response.json());
}

export const intentToSell = (userID: string, produceId: string) => {
    const intentToSellForSeller = `${BASE_URL}/${STAGE}/seller/${userID}/crop/${produceId}/${INTENT_TO_SELL}`
    return fetch(intentToSellForSeller, {
        method: 'POST',
        headers: getAuthHeader()
    }).then((response: any) => response.json());
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

export const patchProduce = (produceData: any, buyerId: string) => {
    const addProduceApi = `${BASE_URL}/${STAGE}/buyer/${buyerId}/crop`;
    const bodyParamData = JSON.stringify(produceData);
    return fetch(addProduceApi, {
        method: 'PATCH',
        body: bodyParamData,
        headers: getAuthHeader()
    }).then((response: any) => response.json());
}

export const deleteProduce = (userID: string, produceId: string, is_buyer?: boolean) => {
    const userType = is_buyer ? 'buyer' : 'seller';
    const produceApi = `${BASE_URL}/${STAGE}/${userType}/${userID}/crop/${produceId}`;
    return fetch(produceApi, {
        method: 'DELETE',
        headers: getAuthHeader()
    }).then((response: any) => response);
}

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

/* Matches And Transactions */

export const getBuyerMatchesList = (buyerId: string, cropIds: Array<string>) => {
    const matchesApi = MATCHES_API;
    const matchesBody = {buyer_id: buyerId, buyer_crop_id: cropIds}
    return fetch(matchesApi, {
        // headers: getAuthHeader(),
        method: 'POST',
        body: JSON.stringify(matchesBody)
    }).then((response: any) => response.json())
}

export const rejectMatch = (rejectData: {buyer_id: string, buyer_crop_id: Array<string>}) => {
    const matchesRejectApi = MATCHES_REJECT_API;
    return fetch(matchesRejectApi, {
        // headers: getAuthHeader(),
        method: 'POST',
        body: JSON.stringify(rejectData)
    }).then((response: any) => response.json())
}

/* Matches And Transactions End */