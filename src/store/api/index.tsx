import CryptoJS from 'crypto-js';
import { identity } from 'lodash';
import { MatchRequirementModel, TransactionAction, TransactionStatus } from '../../buyer-seller-commons/types';
import { BuyerRejectMatch } from '../buyerReducer/types';
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
const UPDATED_APMC_API = 'apmc/price/';
const INTENT_TO_SELL = 'sell';
const USER_MANAGER_API = 'user';
const MATCHES_API = 'getMatch';
const TRANSACTION_API = 'transaction';
const MATCHES_REJECT_API = `${TRANSACTION_API}/reject`;
const TRANSACTION_CREATE_API = `${TRANSACTION_API}/create`;
const TRANSACTION_LIST_API = `${TRANSACTION_API}/user`;
const CONNECT_STATUS = 'sellerstatus/status';
const USER_COMPLETE_DETAILS = 'getusercompletedetails';
const USER_FILE_API = 'getuserfile';
const UPDATE_USER_DETAILS = 'updateuserdetails';
const ADD_BENEFICIARY_API = 'benemaintain';
const ADD_BUYER_AT_DESTINY = 'buyerReg';
const ADD_SELLER_AT_DESTINY = 'sellerReg';
const GET_REDIRECTION_TOKEN = 'getredirectiontoken';
const GET_PAYMENT_DETAILS = 'getpaymentdetails';


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

export const fetchRedirectedUserDetails = (userAccessToken: string) => {
    //console.log("inside fun3", userAccessToken)
    const userProfileApi = `${BASE_URL}/${STAGE}/${USER_PROFILE_API}`;
    return fetch(userProfileApi, {
        headers: {'Authorization': `Bearer ${userAccessToken}`}
    }).then((response: any) => response.json());
};

export const kycUserDetails = (userFormData: any) => {	
    const userUpdateApi = `${BASE_URL}/${STAGE}/${UPDATE_USER_DETAILS}`;	
    return fetch(userUpdateApi,	
        {	
            method: 'POST',	
            headers: getAuthHeader(),	
            body: JSON.stringify(userFormData)	
        }).then((response: any) => response.json());	
};
		
export const fetchUserCompleteDetails = () => {	
    const userDetailsAPI = `${BASE_URL}/${STAGE}/${USER_COMPLETE_DETAILS}`;	
    return fetch(userDetailsAPI, {	
        headers: getAuthHeader()	
    }). then((response: any) => response.json());	
};

export const fetchUserFiles = (fileName: string) => {	
    const getUserFileAPI = `${BASE_URL}/${STAGE}/${USER_FILE_API}/?filename=${fileName}`;	
    return fetch(getUserFileAPI)	
    .then((response: any) => response.json());	
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
    const fetchApmcRatesApi = `${BASE_URL}/${STAGE}/${UPDATED_APMC_API}`
    return fetch(fetchApmcRatesApi, {
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
    const matchesApi = `${BASE_URL}/${STAGE}/${MATCHES_API}`;
    const matchesBody = {buyer_id: buyerId, buyer_crop_id: cropIds}
    return fetch(matchesApi, {
        // headers: getAuthHeader(),
        method: 'POST',
        body: JSON.stringify(matchesBody)
    }).then((response: any) => response.json())
}

export const rejectMatch = (rejectData: BuyerRejectMatch) => {
    const matchesRejectApi = `${BASE_URL}/${STAGE}/${MATCHES_REJECT_API}`;
    return fetch(matchesRejectApi, {
        headers: getAuthHeader(),
        method: 'POST',
        body: JSON.stringify(rejectData)
    }).then((response: any) => response.json())
}

export const createTransaction = (transactionEntry: any) => {
    const transactionApi = `${BASE_URL}/${STAGE}/${TRANSACTION_CREATE_API}`;
    return fetch(transactionApi, {
        // headers: getAuthHeader(),
        method: 'POST',
        body: JSON.stringify(transactionEntry)
    }).then((response: any) => response.json())
}

export const fetchTransactionList = (userName: string, transactionStatus: TransactionStatus) => {
    const listApi = `${BASE_URL}/${STAGE}/${TRANSACTION_LIST_API}/${userName}?status=${transactionStatus}`;
    return fetch(listApi).then((response: any) => response.json());
}

export const fetchSellerMatches = (userName: string) => {
    const listApi = `${BASE_URL}/${STAGE}/${TRANSACTION_LIST_API}/${userName}?status=MatcH`;
    return fetch(listApi).then((response: any) => response.json());
}

export const postSellerTransactionAction = (
    transactionID: string,
    actionName: TransactionAction,
    cropDetails: MatchRequirementModel
) => {
    const transactionActionApi = `${BASE_URL}/${STAGE}/${TRANSACTION_API}/${transactionID}/seller?action=${actionName}`
    return fetch(transactionActionApi, {
        method: 'POST',
        body: JSON.stringify(cropDetails)
    }).then((response: any) => response.json());
}

export const sellerConnectStatus = ({
    sellerId,
    sellerCropId
}: {sellerId: string, sellerCropId: string}) => {
    const sellerConnectedApi = `${BASE_URL}/${STAGE}/${CONNECT_STATUS}`;
    return fetch(sellerConnectedApi, {
        method: 'POST',
        body: JSON.stringify({seller_id: sellerId, seller_crop_id: sellerCropId})
    }).then((response: any) => response.json());
}

export const postAddBeneficiarydata = (userData: any) => {
    const addBeneficiaryApi = `${BASE_URL}/${STAGE}/${ADD_BENEFICIARY_API}`;
    return fetch(addBeneficiaryApi, {
        method: 'POST',
        body: JSON.stringify(userData) 
    }).then((response: any) => response.text);
}

export const postBuyerDetails = (userData: any) => {
const registerBuyerApi = `${BASE_URL}/${STAGE}/${ADD_BUYER_AT_DESTINY}`;
    return fetch(registerBuyerApi, {
        method: 'POST',
        body: JSON.stringify(userData) 
    }).then((response: any) => response.text);
}

export const postSellerDetails = (userData: any) => {
    const registerSellerApi = `${BASE_URL}/${STAGE}/${ADD_SELLER_AT_DESTINY}`;
    return fetch(registerSellerApi, {
        method: 'POST',
        body: JSON.stringify(userData) 
    }).then((response: any) => response.text);
}

export const getRedirectionToken = (userKey: string) => {
    
    const accessTokenApi = `${BASE_URL}/${STAGE}/${GET_REDIRECTION_TOKEN}`;
    const accessTokenParam = JSON.stringify({
        'key': userKey,
    });
    return fetch(accessTokenApi, {
        method: 'POST',
        body: accessTokenParam 
    }).then((response: any) => response.json());
};

export const getPaymentList = (transactionData: any) => {
    //console.log("transaction data", transactionData)
    const transactionId = transactionData[0].transactionId
    const paymentNo = transactionData[0].paymentNo
    //console.log(transactionId, paymentNo)
    const paymentDetailsApi = `${BASE_URL}/${STAGE}/${GET_PAYMENT_DETAILS}?paymentNo=${paymentNo}&transactionId=${transactionId}`;
    return fetch(paymentDetailsApi, {
        method: 'GET',
    }).then((response: any) => response.json())
}

export const getStatusDetails = (userData:any) => {
    //var id = userData.transactionId
    //console.log("inside getstatus", userData.transactionId)
    const statusDetailsApi = `${BASE_URL}/${STAGE}/${TRANSACTION_API}/${userData.transactionId}/events/?user=${userData.user}&transport=false&event=all`
    return fetch(statusDetailsApi, {
        method: 'GET',
    }).then((response: any) => response.json())
}

export const getCurrentStatusDetails = (userData: any) => {
    console.log("inside getstatus", userData.transactionId)
    const currentStatusDetailsApi = `${BASE_URL}/${STAGE}/${TRANSACTION_API}/${userData.transactionId}/events/?user=${userData.user}&transport=false&event=current`
    return fetch(currentStatusDetailsApi, {
        method: 'GET',
    }).then((response: any) => response.json())
}
/* Matches And Transactions End */