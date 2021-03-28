import { RuleObject } from "antd/lib/form";
import { isEmpty, toUpper } from "lodash";
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
    CONFIRM_ACCOUNT_MISMATCH,
    EMAIL_INVALID_MSG,
    GSTIN_INVALID_MSG,
    GSTIN_MIN_DIGITS_MSG,
    GSTIN_REQUIRED_MSG,
    IFSC_11_DIGIT_MSG,
    IFSC_INVALID,
    MAX_FILE_SIZE,
    NAME_INVALID,
    PAN_10_DIGIT_MSG,
    PAN_INVALID,
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
};

const cleanUpFormSubmitValues = (keysToBeRemoved: Array<string>, formValues: any) => {
    keysToBeRemoved.forEach((formFieldKey) => {
        delete formValues[formFieldKey];
    })
};

export const generateFormData = ({formSubmitValues, userType, addressForPin}: generateFormDataProps) => {
    let fileConversionPromises = [];
    let formKeysToBeRemoved: Array<string> = [];

    for(const property in formSubmitValues) {
        var key = property;
        if(typeof(formSubmitValues[property]) === "object" && !isEmpty(formSubmitValues[property].originFileObj)) {
            const uploadedDocument = generateFileData(formSubmitValues[property][0].originFileObj, property);
            fileConversionPromises.push(uploadedDocument);
        }
        formKeysToBeRemoved = [key];
    }
    cleanUpFormSubmitValues(formKeysToBeRemoved, formSubmitValues);

    if (userType === UserTypes.SELLER) {
    // For testing uncomment below line and comment above line
    // if (false) {
        formSubmitValues = {...formSubmitValues, isSeller: true};
    } else {
        const {weekday, saturday, sunday} = formSubmitValues;
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
    const regExp = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;

    value = toUpper(value);

    if(regExp.test(value) || isEmpty(value)) {
        return Promise.resolve();
    } else if (value.length !== 10 ) {
        return Promise.reject(PAN_10_DIGIT_MSG);
    } else {
        return Promise.reject(PAN_INVALID);
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
    const regExp = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    value = toUpper(value);

    if(regExp.test(value) || isEmpty(value)) {
        return Promise.resolve();
    } else if(value.length !== 11) {
        return Promise.reject(IFSC_11_DIGIT_MSG);
    } else {
        return Promise.reject(IFSC_INVALID);
    }
};

export const customNameValidator = (rule: RuleObject, value: any, name: string) => {
    const regExp = /^[a-zA-Z ]{1,50}$/;

    if(!(regExp.test(value) || isEmpty(value))) {
        return Promise.reject(`${name} ${NAME_INVALID}`);
    } else {
        return Promise.resolve();
    }
};

export const accountNumberValidator = (rule: RuleObject, value: any) => {
    const regExp = /^[0-9]*$/;

    if(isEmpty(value)){
        return Promise.resolve();
    } else if(!(regExp.test(value))) {
        return Promise.reject(ACCOUNT_NUMBER_INVALID);
    } else if(value.length < 9) {
        return Promise.reject(ACCOUNT_NUMBER_MIN_DIGITS_MSG);
    } else if(value.length > 18) {
        return Promise.reject(ACCOUNT_NUMBER_MAX_DIGITS_MSG);
    } else {
        return Promise.resolve();
    }
};

export const confirmAccountValidator = (rule: RuleObject, value: any, accountNumber: any) => {
    if(value === accountNumber || isEmpty(value)) {
        return Promise.resolve();
    } else {
        return Promise.reject(CONFIRM_ACCOUNT_MISMATCH);
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

export const gstinValidator = (rule: RuleObject, value: any) => {
    const regExp = /^\d{2}([A-Z]){5}([0-9]){4}([A-Z]){1}[A-Z 0-9]{3}$/;

    value = toUpper(value);

    if(!value) {
        return Promise.reject(GSTIN_REQUIRED_MSG);
    } else if(value.length !== 15) {
        return Promise.reject(GSTIN_MIN_DIGITS_MSG);
    } else if(!regExp.test(value)) {
        return Promise.reject(GSTIN_INVALID_MSG);
    } else {
        return Promise.resolve();
    }
};

export const validateUpload = (rule: RuleObject, value: any) => {
    if(!isEmpty(value)) {
        const size = value[0]?.size;
        if(size <= 1000000) {
            return Promise.resolve();
        } else {
            return Promise.reject(MAX_FILE_SIZE);
        }
    } else {
        return Promise.resolve();
    }
};

export const validateInputField = (rule: RuleObject, value: any, documentName: string) => {
    switch(documentName) {
        case "AADHAR": {
            return customAadhaarValidator(rule, value);
        }
        case "PAN": {
            return customPANValidator(rule, value);
        }
        case "GSTIN": {
            return gstinValidator(rule, value);
        }
        default: {
            return Promise.resolve();
        }
    }
};
