import CryptoJS from 'crypto-js';

import { BuyerRejectMatch } from '../buyerReducer/types';
import { UpdatedLiveApmcRatesQuery, UserHistoryQuery } from '../genericTypes';

import { MatchRequirementModel, TransactionAction, TransactionStatus } from '../../buyer-seller-commons/types';

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const STAGE = process.env.REACT_APP_ENV;
const TOKEN_GRANT = process.env.REACT_APP_TOKEN_GRANT as string;
const LOGIN_BASE_URL = process.env.REACT_APP_LOGIN_URL_BASE_URL;
const LOGOUT_BASE_URL = process.env.REACT_APP_LOGOUT_BASE_URL;
const COGNITO_ID = process.env.REACT_APP_COGNITO_CLIENT_ID;

export const REDIRECT_URL = `https://${window.location.host}/login-user`;
export const LOGOUT_REDIRECT = `https://${window.location.host}/`;
export const LOGIN_URL = `${LOGIN_BASE_URL}/login?client_id=${COGNITO_ID}&response_type=code&redirect_uri=${REDIRECT_URL}`;
export const LOGOUT_URL = `${LOGOUT_BASE_URL}/logout?client_id=${COGNITO_ID}&logout_uri=${LOGOUT_REDIRECT}`;

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
const GET_REDIRECTION_TOKEN = 'getredirectiontoken';
const GET_PAYMENT_DETAILS = 'getpaymentdetails';
const USER_ALREADY_EXISTS = 'userAlreadyExists';
const GET_EVENT_TEMPLATE = `${TRANSACTION_API}/getBuyerSellerStatus`;
const GET_AMOUNT_API = 'getamounttodisplay';
const GET_REJECT_COUNT = 'getrejectcount';
const COGNITO_PROVIDER = 'CognitoIdentityServiceProvider';
const USER_HISTORY = 'userHistory';
const GET_ADDITIONAL_INFO = 'getAdditionalInfo';
const GET_SELLER_CROP_IMAGE = 'seller/getCropImages';
const GET_DESTINY_ID = `${TRANSACTION_API}/getDestinyCode`;
//CHECK_DRAFT_API endpoint remains same for all the environment
const CHECK_DRAFT_API= 'https://enzdzh0pw2.execute-api.ap-south-1.amazonaws.com/dev/payment/pay'

export const LAST_AUTH_USER = localStorage.getItem(`${COGNITO_PROVIDER}.${COGNITO_ID}.LastAuthUser`);
export const ACCESS_TOKEN = localStorage.getItem(`${COGNITO_PROVIDER}.${COGNITO_ID}.${LAST_AUTH_USER}.accessToken`);

/** Parse the user token
 * 
 * @param { string } userToken - User token
 */
const parseToken = (userToken: string) => {
    const sholudDecrypt = process.env.REACT_APP_ENV === 'prod';
    const decryptedToken = sholudDecrypt ? CryptoJS.AES.decrypt(userToken, TOKEN_GRANT) : userToken;
    const userAccessToken = sholudDecrypt ? JSON.parse(decryptedToken.toString(CryptoJS.enc.Utf8)) : decryptedToken;
    return userAccessToken;
};

// Returns Authorization token
const getAuthHeader = () => {
    const userToken = (window as any).userToken ? (window as any).userToken : ACCESS_TOKEN;
    if (userToken) {
        const userAccessToken = parseToken(userToken);
        
        return ({ 'Authorization': `Bearer ${userAccessToken}` });
    } else {
        return ({ 'Authorization': `Bearer ` });
    }
};

/* OTP Interface */

/** Sends OTP to the phone number
 * 
 * @param { string } number - Ten digit phone number
 */
export const sendOtp = (number: string) => {
    const sendOtpApi = `${BASE_URL}/${STAGE}/${OTP_SEND_API}`;
    const bodyParam = JSON.stringify({ number });
    return fetch(sendOtpApi, {
        method: 'post',
        body: bodyParam
    });
};

/** Resends otp to the phone number
 * 
 * @param { string } number - Ten digit phone number
 */
export const resendOtp = (number: string) => {
    const resendOtpApi = `${BASE_URL}/${STAGE}/${OTP_RESEND_API}`;
    const bodyParam = JSON.stringify({ number });
    return fetch(resendOtpApi, {
        method: 'post',
        body: bodyParam
    });
};

/** Verify otp sent to the phone number
 * 
 * @param { string } number - Phone number which recieved the otp
 * @param { string } otp - Otp to be verifies
 */
export const verifyOtp = (number: string, otp: string) => {
    const sendOtpApi = `${BASE_URL}/${STAGE}/${OTP_VERIFY_API}`;
    const bodyParam = JSON.stringify({ number, otp });
    return fetch(sendOtpApi, {
        method: 'post',
        body: bodyParam
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/* OTP Interface End */

/** API checks if the user data is present in the dynamo db or not, returns true if new user
 * 
 * @param { string } phoneNumber - Ten digit phone number
 */
export const checkIfUserAlreadyExists = (phoneNumber: string) => {
    const userAlreadyExistsApi = `${BASE_URL}/${STAGE}/${USER_MANAGER_API}/${USER_ALREADY_EXISTS}/?userName=${phoneNumber}`;
    return fetch(userAlreadyExistsApi)
        .then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API which fetchs the district, taluk and state based on the pincode
 * 
 * @param { string } pincode - Six digit Pincode
 */
export const getLocationByPin = (pincode: string) => {
    const locationByPinApi = `${BASE_URL}/${STAGE}/${LOCATION_API}?pincode=${pincode}`;
    return fetch(locationByPinApi);
};

// Gets all configs present in the config table
export const getAllConfigs = () => {
    const configurationApi = `${BASE_URL}/${STAGE}/${CONFIG_API}?config=user_type`;
    return fetch(configurationApi).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/* Registration And Login Interface */

/** Register new user to VikasBandhu
 * 
 * @param { any } userFormData - User Details
 */
export const registerUser = (userFormData: any) => {
    const registrationApi = `${BASE_URL}/${STAGE}/${REGISTER_API}`;
    return fetch(registrationApi,
        {
            method: 'POST',
            body: JSON.stringify(userFormData)
        }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch access token for a valid user
 * 
 * @param { string } userCode - User code
 */
export const getAccessToken = (userCode: string) => {
    const accessTokenApi = `${BASE_URL}/${STAGE}/${TOKEN_API}`;
    const accessTokenParam = JSON.stringify({
        'code': userCode,
        'redirectURL': REDIRECT_URL
    });
    return fetch(accessTokenApi, {
        method: 'POST',
        body: accessTokenParam
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

// API to fetch user detials
export const fetchUserDetails = () => {
    const userProfileApi = `${BASE_URL}/${STAGE}/${USER_PROFILE_API}`;
    return fetch(userProfileApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to update all user details
 * 
 * @param { any } userFormData - User form data
 */
export const kycUserDetails = (userFormData: any) => {
    const userUpdateApi = `${BASE_URL}/${STAGE}/${UPDATE_USER_DETAILS}`;
    return fetch(userUpdateApi, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(userFormData)
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

// API to fetch user complete details
export const fetchUserCompleteDetails = () => {
    const userDetailsAPI = `${BASE_URL}/${STAGE}/${USER_COMPLETE_DETAILS}`;
    return fetch(userDetailsAPI, {
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch all user files
 * 
 * @param { string } fileName - File name
 */
export const fetchUserFiles = (fileName: string) => {
    const getUserFileAPI = `${BASE_URL}/${STAGE}/${USER_FILE_API}/?filename=${fileName}`;
    return fetch(getUserFileAPI)
        .then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/* Registration And Login Interface End*/

/* Seller Apis */

/** API to get sub category list
 * 
 * @param { string } categoryId - Category Id
 */
export const getSubCategoryList = (categoryId: string) => {
    const subcategoryListApi = `${BASE_URL}/${STAGE}/${CROP_SUB_TYPES_DETAILS_API}?crop=${categoryId}`;
    return fetch(subcategoryListApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to create seller crop
 * 
 * @param { any } cropData - Crop data
 */
export const createCrop = (cropData: any) => {
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const addCropApi = `${BASE_URL}/${STAGE}/seller/${user}/crop`;
    return fetch(addCropApi, {
        method: 'POST',
        body: JSON.stringify(cropData),
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to patch seller crop data
 * 
 * @param { any } cropData - Crop data
 */
export const patchCrop = (cropData: any) => {
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const addProduceApi = `${BASE_URL}/${STAGE}/seller/${user}/crop`;
    const bodyParamData = JSON.stringify(cropData);
    return fetch(addProduceApi, {
        method: 'PATCH',
        body: bodyParamData,
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

// API to fetch all crops
export const getAllCrops = () => {
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const fetcCropsApi = `${BASE_URL}/${STAGE}/seller/${user}/crop`;
    return fetch(fetcCropsApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch live APMC rate updated
 * 
 * @param { Array<UpdatedLiveApmcRatesQuery> } cropDetails - Crop details
 */
export const getLiveApmcRateUpdated = (cropDetails: Array<UpdatedLiveApmcRatesQuery>) => {
    const fetchApmcRatesApi = `${BASE_URL}/${STAGE}/${UPDATED_APMC_API}`;
    return fetch(fetchApmcRatesApi, {
        method: 'POST',
        // headers: getAuthHeader(),
        body: JSON.stringify(cropDetails)
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch intent to sell for seller
 * 
 * @param { string } produceId - Produce id
 */
export const intentToSell = (produceId: string) => {
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const intentToSellForSeller = `${BASE_URL}/${STAGE}/seller/${user}/crop/${produceId}/${INTENT_TO_SELL}`;
    return fetch(intentToSellForSeller, {
        method: 'POST',
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to post seller transaction actions
 * 
 * @param { string } transactionID 
 * @param { TransactionAction } actionName - Can be either accept or reject
 * @param { MatchRequirementModel } cropDetails - Crop Details to be accepted or rejected
 */
export const postSellerTransactionAction = (
    transactionID: string,
    actionName: TransactionAction,
    cropDetails: MatchRequirementModel
) => {
    const transactionActionApi = `${BASE_URL}/${STAGE}/${TRANSACTION_API}/${transactionID}/seller?action=${actionName}`;
    return fetch(transactionActionApi, {
        method: 'POST',
        body: JSON.stringify(cropDetails)
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/* Seller Apis End */

/* Buyer Apis */

/** Add buyer produce
 * 
 * @param { any } produceData - Produce data
 */
export const addProduce = (produceData: any) => {
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const addProduceApi = `${BASE_URL}/${STAGE}/buyer/${user}/crop`;
    const bodyParamData = JSON.stringify(produceData);
    return fetch(addProduceApi, {
        method: 'POST',
        body: bodyParamData,
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** Pathch produce data for buyer
 * 
 * @param { any } produceData - Produce data
 */
export const patchProduce = (produceData: any) => {
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const addProduceApi = `${BASE_URL}/${STAGE}/buyer/${user}/crop`;
    const bodyParamData = JSON.stringify(produceData);
    return fetch(addProduceApi, {
        method: 'PATCH',
        body: bodyParamData,
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** Delete buyer produce
 * 
 * @param { string } produceId - Produce Id
 * @param { boolean } is_buyer - True if the user is a buyer
 */
export const deleteProduce = (produceId: string, is_buyer?: boolean) => {
    const userType = is_buyer ? 'buyer' : 'seller';
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const produceApi = `${BASE_URL}/${STAGE}/${userType}/${user}/crop/${produceId}`;
    return fetch(produceApi, {
        method: 'DELETE',
        headers: getAuthHeader()
    }).then((response: any) => response)
        .catch((error: any) => console.log('error', error));
};

// API to fetch all produce of the buyer
export const getAllProduce = () => {
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const getAllProduceApi = `${BASE_URL}/${STAGE}/buyer/${user}/crop`;
    return fetch(getAllProduceApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch crop list for the particular category
 * 
 * @param { string } category - Category name
 */
export const getCropList = (category: string) => {
    const categoryListApi = `${BASE_URL}/${STAGE}/${CROP_TYPES_API}?category=${category}`;
    return fetch(categoryListApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

// API to fetch all crop categories
export const getCropCategoryList = () => {
    const cropCategoryApi = `${BASE_URL}/${STAGE}/${CROP_CATEGORY_DETAILS_API}`;
    return fetch(cropCategoryApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to update all master list data
 * 
 * @param { any } updateMasterList - Master list data
 */
export const updateMasterList = (updateMasterList: any) => {
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const masterListApi = `${BASE_URL}/${STAGE}/buyer/${user}/master_list`;
    const bodyParamData = JSON.stringify(updateMasterList);
    return fetch(masterListApi, {
        method: 'POST',
        body: bodyParamData,
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

// API to fetch master list data
export const getMasterList = () => {
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const masterListApi = `${BASE_URL}/${STAGE}/buyer/${user}/master_list`;
    return fetch(masterListApi, {
        headers: getAuthHeader()
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch buyer matches
 * 
 * @param { string } buyerId - Buyer Id
 * @param { Array<string> } cropIds - Crop Id Array
 */
export const getBuyerMatchesList = (buyerId: string, cropIds: Array<string>) => {
    const matchesApi = `${BASE_URL}/${STAGE}/${MATCHES_API}`;
    // const matchesApi = `http://localhost:4000/${STAGE}/${MATCHES_API}`;
    const matchesBody = { buyer_id: buyerId, buyer_crop_id: cropIds };
    return fetch(matchesApi, {
        // headers: getAuthHeader(),
        method: 'POST',
        body: JSON.stringify(matchesBody)
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to reject a buyer match
 * 
 * @param { Buyer} rejectData - Reject crop data
 */
export const rejectMatch = (rejectData: BuyerRejectMatch) => {
    const matchesRejectApi = `${BASE_URL}/${STAGE}/${MATCHES_REJECT_API}`;
    //const matchesRejectApi = `http://localhost:4000/dev/${MATCHES_REJECT_API}`;

    return fetch(matchesRejectApi, {
        headers: getAuthHeader(),
        method: 'POST',
        body: JSON.stringify(rejectData)
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch payment amount
 * 
 * @param { string } transactionId - Transaction Id
 */
export const getPaymentAmount = (transactionId: string) => {
    const getamountApi = `${BASE_URL}/${STAGE}/${TRANSACTION_API}/${GET_AMOUNT_API}?transactionId=${transactionId}&user=Buyer`;
    return fetch(getamountApi, {
        method: 'GET',
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/* Buyer Apis End */

/* Matches And Transactions */

/** API to create transaction
 * 
 * @param { any } transactionEntry - Transaction data
 */
export const createTransaction = (transactionEntry: any) => {
    const transactionApi = `${BASE_URL}/${STAGE}/${TRANSACTION_CREATE_API}`;
    return fetch(transactionApi, {
        // headers: getAuthHeader(),
        method: 'POST',
        body: JSON.stringify(transactionEntry)
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch user history
 * 
 * @param { UserHistoryQuery } userData - UserData
 */
export const fetchUserHistory = (userData: UserHistoryQuery) => {
    const userHistoryApi = `${BASE_URL}/${STAGE}/${TRANSACTION_API}/${USER_HISTORY}`;
    // const userHistoryApi = `http://localhost:4000/${STAGE}/${TRANSACTION_API}/${USER_HISTORY}`;
    return fetch(userHistoryApi, {
        headers: getAuthHeader(),
        method: 'POST',
        body: JSON.stringify(userData)
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch user additional information
 * 
 * @param { string } userId - User Id
 * @param { string } cropId - Crop Id
 */
export const fetchAdditionalInfo = (userId: string, cropId: string) => {
    const fetchAdditionalInfoApi = `${BASE_URL}/${STAGE}/${TRANSACTION_API}/${GET_ADDITIONAL_INFO}`;
    // const fetchAdditionalInfoApi = `http://localhost:4000/${STAGE}/${TRANSACTION_API}/${GET_ADDITIONAL_INFO}`;

    return fetch(fetchAdditionalInfoApi, {
        headers: getAuthHeader(),
        method: 'POST',
        body: JSON.stringify({ userId, cropId })
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch seller crop Images
 * 
 * @param { string } userId - User Id
 * @param { string } cropId - Crop Id
 */
export const getSellerCropImages = (userId: string, cropId: string) => {
    const fetchSellerCropImagesApi = `${BASE_URL}/${STAGE}/${GET_SELLER_CROP_IMAGE}`;
    // const fetchSellerCropImagesApi = `http://localhost:4000/${STAGE}/${GET_SELLER_CROP_IMAGE}`;

    return fetch(fetchSellerCropImagesApi, {
        headers: getAuthHeader(),
        method: 'POST',
        body: JSON.stringify({ seller_id: userId, seller_crop_id: cropId })
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch transaction list based on transaction status type
 * 
 * @param { TransactionStatus } transactionStatus - Transaction status type
 */
export const fetchTransactionList = (transactionStatus: TransactionStatus) => {
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const listApi = `${BASE_URL}/${STAGE}/${TRANSACTION_LIST_API}/${user}?status=${transactionStatus}`;
    return fetch(listApi).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

// API to fetch seller matches 
export const fetchSellerMatches = () => {
    const user = (window as any).userName ? (window as any).userName : LAST_AUTH_USER;
    const listApi = `${BASE_URL}/${STAGE}/${TRANSACTION_LIST_API}/${user}?status=MatcH`;
    return fetch(listApi).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** 
 * 
 * @param { string } sellerId - Seller Id
 * @param { string } sellerCropId - Seller crop Id
 */
export const sellerConnectStatus = ({
    sellerId,
    sellerCropId
}: { sellerId: string, sellerCropId: string }) => {
    const sellerConnectedApi = `${BASE_URL}/${STAGE}/${CONNECT_STATUS}`;
    return fetch(sellerConnectedApi, {
        method: 'POST',
        body: JSON.stringify({ seller_id: sellerId, seller_crop_id: sellerCropId })
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch redirection token
 * 
 * @param { string } userKey - User Key
 */
export const getRedirectionToken = (userKey: string) => {
    const accessTokenApi = `${BASE_URL}/${STAGE}/${GET_REDIRECTION_TOKEN}`;
    const accessTokenParam = JSON.stringify({
        'key': userKey,
    });
    return fetch(accessTokenApi, {
        method: 'POST',
        body: accessTokenParam
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch payment list for transaction
 * 
 * @param { any } transactionData - Transaction data
 */
export const getPaymentList = (transactionData: any) => {
    const transactionId = transactionData[0].transactionId;
    const paymentNo = transactionData[0].paymentNo;
    const paymentDetailsApi = `${BASE_URL}/${STAGE}/${GET_PAYMENT_DETAILS}?paymentNo=${paymentNo}&transactionId=${transactionId}`;
    return fetch(paymentDetailsApi, {
        method: 'GET',
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch all transaction status
 * 
 * @param { any } userData - User data
 */
export const getStatusDetails = (userData: any) => {
    const { transactionId, user } = userData;
    const statusDetailsApi = `${BASE_URL}/${STAGE}/${TRANSACTION_API}/${transactionId}/events/?user=${user}&transport=false&event=all`;
    // const statusDetailsApi = `http://localhost:4000/${STAGE}/${TRANSACTION_API}/${transactionId}/events/?user=${user}&transport=false&event=all`;
    return fetch(statusDetailsApi, {
        method: 'GET',
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch current transaction status
 * 
 * @param { any } userData - User data
 */
export const getCurrentStatusDetails = (userData: any) => {
    const { transactionId, user } = userData;
    const currentStatusDetailsApi = `${BASE_URL}/${STAGE}/${TRANSACTION_API}/${transactionId}/events/?user=${user}&transport=false&event=current`;
    // const currentStatusDetailsApi = `http://localhost:4000/${STAGE}/${TRANSACTION_API}/${transactionId}/events/?user=${user}&transport=false&event=current`;
    return fetch(currentStatusDetailsApi, {
        method: 'GET',
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch status event template
 * 
 * @param { string } userType - User Type either buyer or seller
 * @param { string } transport - Transport required status either Yes or No
 */
export const getEventTemplate = (userType: string, transport: string) => {
    const eventTemplateApi = `${BASE_URL}/${STAGE}/${GET_EVENT_TEMPLATE}?user=${userType}&transport=${transport}`;
    // const eventTemplateApi = `http://localhost:4000/${STAGE}/${GET_EVENT_TEMPLATE}?user=Buyer&transport=No`;
    return fetch(eventTemplateApi, {
        method: 'GET',
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/** API to fetch reject count
 * 
 * @param { any } userData - User Data
 */
export const getRejectCount = (userData: any) => {
    const { user_id, crop_id, user } = userData;
    const getAmountApi = `${BASE_URL}/${STAGE}/${TRANSACTION_API}/${GET_REJECT_COUNT}?user_id=${user_id}&crop_id=${crop_id}&user=${user}`;
    // const getAmountApi = `http://localhost:4000/${STAGE}/${TRANSACTION_API}/${GET_REJECT_COUNT}?user_id=${user_id}&crop_id=${crop_id}&user=${user}`;
    return fetch(getAmountApi, {
        method: 'GET',
    }).then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

export const fetchDestinyId = (userName: string) => {
    const destinyIdApi = `${BASE_URL}/${STAGE}/${GET_DESTINY_ID}?username=${userName}`;
    // const destinyIdApi = `http://localhost:4000/${STAGE}/${GET_DESTINY_ID}?username=${userName}`;

    return fetch(destinyIdApi, { method: 'GET' })
        .then((response: any) => response.json())
        .catch((error: any) => console.log('error', error));
};

/* Matches And Transactions End */


export const submitCheckDraftDetails = (values: any) => {
    const checkDraftApi = `${CHECK_DRAFT_API}`;
    console.log(values);
    try {
        return fetch(checkDraftApi, { method: 'POST', body: JSON.stringify(values) }).then(() => window.location.reload());
    } catch (error) {
        return console.log('error', error);
    }
}