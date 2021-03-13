import { RuleObject } from "antd/lib/form";
import { isEmpty } from "lodash";
import { generateFileData, proccessFileToBase64 } from "../../app-components/utils";

import { getLocationByPin } from "../../store/api";
import { UserTypes } from "../../store/genericTypes";
import {
    AADHAAR_12_DIGIT_MSG,
    AADHAAR_NOT_NUMBER,
    AADHAAR_REQUIRED_MSG,
    ACCOUNT_NUMBER_INVALID,
    ACCOUNT_NUMBER_MAX_DIGITS_MSG,
    ACCOUNT_NUMBER_MIN_DIGITS_MSG,
    ACCOUNT_NUMBER_REQUIRED_MSG,
    CONFIRM_ACCOUNT_MISMATCH,
    CONFIRM_ACCOUNT_REQUIRED_MSG,
    EMAIL_INVALID_MSG,
    IFSC_11_DIGIT_MSG,
    IFSC_INVALID,
    IFSC_REQUIRED_MSG,
    NAME_INVALID,
    NAME_REQUIRED_MSG,
    PAN_10_DIGIT_MSG,
    PAN_INVALID,
    PAN_REQUIRED_MSG,
    PIN_6_DIGIT_MSG,
    PIN_NOT_FOUND,
    PIN_NOT_NUMBER,
    PIN_REQUIRED_MSG,
    UPI_ID_INVALID_MSG,
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

const cleanUpFormSubmitValues = (keysToBeRemoved: Array<string>, formValues: any) => {
    keysToBeRemoved.forEach((formFieldKey) => {
        delete formValues[formFieldKey];
    })
};

export const generateFormData = ({formSubmitValues, userType, addressForPin}: generateFormDataProps) => {
    let fileConversionPromises = [];
    let formKeysToBeRemoved: Array<string> = [];

    const {bank_statement} = formSubmitValues;
    if(bank_statement && bank_statement.length) {
        const bankstatementData = generateFileData(bank_statement[0].originFileObj, 'bank_doc');
        fileConversionPromises.push(bankstatementData);
    }
    if (userType === UserTypes.SELLER) {
    // For testing uncomment below line and comment above line
    // if (false) {
        const {id_doc, kisancard_card, rtc_card, aadhar_card, pan_card} = formSubmitValues;
        if(id_doc && id_doc.length) {
            const IDDocument = generateFileData(id_doc[0].originFileObj, 'id_doc');
            fileConversionPromises.push(IDDocument);
        } // Not required
        if(kisancard_card && kisancard_card.length) {
            const kisanCardDoc = generateFileData(kisancard_card[0].originalFileObj,'kisancard_card');
            fileConversionPromises.push(kisanCardDoc);
        }
        if(rtc_card && rtc_card.length) {
            const rtcCardDoc = generateFileData(rtc_card[0].originalFileObj, 'rtc_card');
            fileConversionPromises.push(rtcCardDoc);
        }
        if(aadhar_card && aadhar_card.length) {
            const aadharCardDoc = generateFileData(aadhar_card[0].originalFileObj, 'aadhar_card');
            fileConversionPromises.push(aadharCardDoc);
        }
        if(pan_card && pan_card.length) {
            const panCardDoc = generateFileData(pan_card[0].originalFileObj, 'pan_card');
            fileConversionPromises.push(panCardDoc);
        }
        formKeysToBeRemoved = [...formKeysToBeRemoved, 'id_doc', 'bank_statement', 'kisancard_card', 'rtc_card', 'aadhar_card', 'pan_card'];
        cleanUpFormSubmitValues(formKeysToBeRemoved, formSubmitValues);

        formSubmitValues = {...formSubmitValues, isSeller: true};
    } else {
        const {aadhar_card, pan_card, weekday, saturday, sunday} = formSubmitValues;
        if(aadhar_card && aadhar_card.length){
            const buyerIdDocPrimary = generateFileData(aadhar_card[0].originFileObj, 'uidai_doc');
            fileConversionPromises.push(buyerIdDocPrimary);
        }
        if(pan_card && pan_card.length){
            const buyerIdDocSecondary = generateFileData(pan_card[0].originFileObj, 'pan_doc');
            fileConversionPromises.push(buyerIdDocSecondary);
        }

        formKeysToBeRemoved = [...formKeysToBeRemoved, 'aadhar_card', 'pan_card', 'weekday', 'saturday', 'sunday', 'bank_statement'];
        cleanUpFormSubmitValues(formKeysToBeRemoved, formSubmitValues);
        formSubmitValues = {...formSubmitValues, working_hours: {weekday, saturday, sunday}, isBuyer: true};

        /* For testing purpose uncomment below line and comment above line */
        // formSubmitValues = {...formSubmitValues, working_hours: workingHoursData, isBuyer: true, number: '9036565202', email: 'a', name: 'a', type: 'a'};
    }

    formSubmitValues =
        {...formSubmitValues,
            address2: `${addressForPin.taluk}, ${addressForPin.district}, ${addressForPin.state}`,
            taluk: addressForPin.taluk,
            district: addressForPin.district,
            state: addressForPin.state
        };

    return Promise.all(fileConversionPromises).then((values) => {
        return {user_req: formSubmitValues, files: values};
    });
};

export const customPincodeValidator = (rule: RuleObject, value: any, setAddressForPin: Function) => {
    const regExp = /^[0-9]*$/;

    if (!value) {
        return Promise.reject(PIN_REQUIRED_MSG);
    } else if (!regExp.test(value)) {
        return Promise.reject(PIN_NOT_NUMBER);
    } else if (value.length !== 6 ) {
        return Promise.reject(PIN_6_DIGIT_MSG);
    } else {
        return getLocationByPin(value)
        .then((response: any) => response.json())
        .then((response: any) => {
            const {locationDetails} = response;
            if (!locationDetails) {
                return Promise.reject(PIN_NOT_FOUND);
            } else {
                const getLocationObj = locationDetails[0];
                const {PostOffice = []} = getLocationObj || {};
                const {District = '', State = '', Block = ''} = PostOffice[0] || {};
                // const address = `${Block}, ${District}, ${State}`;
                const address = { taluk: Block, district: District, state: State };
                setAddressForPin(address);
                return Promise.resolve();
            }
        });
    }
};

export const customPANValidator = (rule: RuleObject, value: any) => {
    const panRegExp = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;

    if (!value){
        return Promise.reject(PAN_REQUIRED_MSG);
    } else if (value.length !== 10 ) {
        return Promise.reject(PAN_10_DIGIT_MSG);
    } else if (!panRegExp.test(value)) {
        return Promise.reject(PAN_INVALID);
    } else {
        return Promise.resolve();
    }
};

export const customAadhaarValidator = (rule: RuleObject, value: any) => {
    const regExp = /^[0-9]*$/;

    if (!value) {
        return Promise.reject(AADHAAR_REQUIRED_MSG);
    } else if(!regExp.test(value)) {
        return Promise.reject(AADHAAR_NOT_NUMBER);
    } else if (value.length !== 12 ) {
        return Promise.reject(AADHAAR_12_DIGIT_MSG);
    } else {
        return Promise.resolve();
    }
};

export const customIfscValidator = (rule: RuleObject, value: any) => {
    const ifscRegExp = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    if (!value){
        return Promise.reject(IFSC_REQUIRED_MSG);
    } else if (value.length !== 11) {
        return Promise.reject(IFSC_11_DIGIT_MSG);
    } else if(!ifscRegExp.test(value)){
        return Promise.reject(IFSC_INVALID);
    } else {
        return Promise.resolve();
    }
};

export const customNameValidator = (rule: RuleObject, value: any, name: string) => {
    const regExp = /^[a-zA-Z ]{1,50}$/;

    if(!value) {
        return Promise.reject(`${NAME_REQUIRED_MSG} ${name}!`);
    } else if(!regExp.test(value)) {
        return Promise.reject(`${name} ${NAME_INVALID}`);
    } else {
        return Promise.resolve();
    }
};

export const accountNumberValidator = (rule: RuleObject, value: any) => {
    const regExp = /^[0-9]*$/;

    if(!value) {
        return Promise.reject(ACCOUNT_NUMBER_REQUIRED_MSG);
    } else if(regExp.test(value)) {
        if(value.length < 9) {
            return Promise.reject(ACCOUNT_NUMBER_MIN_DIGITS_MSG);
        } else if(value.length > 18) {
            return Promise.reject(ACCOUNT_NUMBER_MAX_DIGITS_MSG);
        } else {
            return Promise.resolve();
        }
    } else {
        return Promise.reject(ACCOUNT_NUMBER_INVALID);
    }
};

export const confirmAccountValidator = (rule: RuleObject, value: any, accountNumber: any) => {
    if(!value) {
        return Promise.reject(CONFIRM_ACCOUNT_REQUIRED_MSG);
    } else if(value !== accountNumber) {
        return Promise.reject(CONFIRM_ACCOUNT_MISMATCH);
    } else {
        return Promise.resolve();
    }
};

export const customUpiValidator = (rule: RuleObject, value: any) => {
    const regExp = /^[\w.-]+@[\w.-]+$/;

    if(regExp.test(value) || isEmpty(value)) {
        return Promise.resolve();
    } else {
        return Promise.reject(UPI_ID_INVALID_MSG);
    }
};

export const emailValidator = (rule: RuleObject, value: any) => {
    const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(regExp.test(value) || isEmpty(value)) {
        return Promise.resolve();
    } else {
        return Promise.reject(EMAIL_INVALID_MSG);
    }
};
