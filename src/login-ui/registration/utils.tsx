import { RuleObject } from "antd/lib/form";

import { getLocationByPin } from "../../store/api";
import { UserTypes } from "../../store/genericTypes";
import {
    AADHAAR_12_DIGIT_MSG,
    AADHAAR_REQUIRED_MSG,
    IFSC_11_DIGIT_MSG,
    IFSC_INVALID,
    IFSC_REQUIRED_MSG,
    PAN_10_DIGIT_MSG,
    PAN_INVALID,
    PAN_REQUIRED_MSG,
    PIN_6_DIGIT_MSG,
    PIN_NOT_FOUND,
    PIN_REQUIRED_MSG,
} from "../constants";

type generateFormDataProps = {
    formSubmitValues: any,
    userType: string,
    addressForPin: {
        taluk: string,
        district: string,
        state: string
    }
}

export const generateFormData = ({formSubmitValues, userType, addressForPin}: generateFormDataProps) => {
    const {bank_statement} = formSubmitValues;
    let formData = new FormData();
    formData.append('bank_doc', bank_statement[0].originFileObj);
    delete formSubmitValues['bank_statement'];
    
    if (userType === UserTypes.SELLER) {
    // For testing uncomment below line and comment above line   
    // if (false) {
        const {id_doc} = formSubmitValues
        formData.append('id_doc', id_doc[0].originFileObj);
        delete formSubmitValues['id_doc'];
        formSubmitValues = {...formSubmitValues, isSeller: true}
    } else {
        const {aadhar_card, pan_card, weekday, saturday, sunday} = formSubmitValues
        const workingHoursData = {...{weekday, saturday, sunday}}
        formData.append('uidai_doc', aadhar_card[0].originFileObj);
        formData.append('pan_doc', pan_card[0].originFileObj);
        /* To be refactored */
        delete formSubmitValues['aadhar_card'];
        delete formSubmitValues['pan_card'];
        delete formSubmitValues['weekday']
        delete formSubmitValues['saturday']
        delete formSubmitValues['sunday']
        /* To be refactored end */
        formSubmitValues = {...formSubmitValues, working_hours: workingHoursData, isBuyer: true}
        /* For testing purpose uncomment below line and comment above line */
        // formSubmitValues = {...formSubmitValues, working_hours: workingHoursData, isBuyer: true, number: '9036565202', email: 'a', name: 'a', type: 'a'}
    }
    formSubmitValues =  {...formSubmitValues, address2: `${addressForPin.taluk}, ${addressForPin.district}, ${addressForPin.state}`};
    const actualUserReq = JSON.stringify(formSubmitValues)
    formData.append('user_req', actualUserReq)
    return formData;
};


export const customPincodeValidator = (rule: RuleObject, value: any, setAddressForPin: Function) => {
    if (!value) {
        return Promise.reject(PIN_REQUIRED_MSG);
    } else if (value.length !== 6 ) {
        return Promise.reject(PIN_6_DIGIT_MSG);
    } else {
        return getLocationByPin(value)
        .then((response: any) => response.json())
        .then((response: any) => {
            const {locationDetails} = response;
            if (!locationDetails) {
                return Promise.reject(PIN_NOT_FOUND)
            } else {
                const getLocationObj = locationDetails[0];
                const {PostOffice = []} = getLocationObj || {}
                const {District = '', State = '', Block = ''} = PostOffice[0] || {};
                // const address = `${Block}, ${District}, ${State}`;
                const address = { taluk: Block, district: District, state: State };
                setAddressForPin(address);
                return Promise.resolve();
            }
        })
    }
};

export const customPANValidator = (rule: RuleObject, value: any) => {
    if (!value){
        return Promise.reject(PAN_REQUIRED_MSG);
    } else if (value.length !== 10 ) {
        return Promise.reject(PAN_10_DIGIT_MSG);
    } else {
        const panRegExp = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;

        if (panRegExp.test(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(PAN_INVALID);
        }
    }
};

export const customAadhaarValidator = (rule: RuleObject, value: any) => {
    if (!value) {
        return Promise.reject(AADHAAR_REQUIRED_MSG);
    } else if (value.length !== 12) {
        return Promise.reject(AADHAAR_12_DIGIT_MSG);
    } else {
        return Promise.resolve();
    }
};

export const customIfscValidator = (rule: RuleObject, value: any) => {
    if (!value){
        return Promise.reject(IFSC_REQUIRED_MSG);
    } else if (value.length !== 11) {
        return Promise.reject(IFSC_11_DIGIT_MSG);
    } else {
        const ifscRegExp = /^[A-Z]{4}0[A-Z0-9]{6}$/;

        if(ifscRegExp.test(value)){
            return Promise.resolve();
        } else {
            return Promise.reject(IFSC_INVALID);
        }
    }
};
