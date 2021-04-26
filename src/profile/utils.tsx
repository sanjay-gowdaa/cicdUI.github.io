import React, { useState } from 'react';
import { Modal } from "antd";
import { RuleObject } from 'rc-field-form/lib/interface';
import { isEmpty, toUpper } from "lodash";

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
    UPI_ID_INVALID_MSG
} from './constants';

import { generateFileData } from "../app-components/utils";

export const ViewDocument = (props: any) => {
    const { isPDF, setShowDocument, url } = props;
    const [showModal, setModal] = useState(true);

    return (
        <Modal
            visible={showModal}
            onCancel={() => {
                setModal(!showModal);
                setShowDocument(!showModal);
            }}
            centered
            width={"fit-content"}
            className="view-document-modal"
            maskClosable={true}
            footer={null}
        >
            { isPDF ? <iframe src={url} /> : <img src={url} />}
        </Modal>
    );
};

export const normFile = (e: any) => {
    console.log('Upload event:', e.fileList);
    if (Array.isArray(e)) {
        return e;
    }
    // return e && e.fileList.filter((file: any) => !!file.status);
    return e && e.fileList;
};

export const generateFormData = (formSubmitValues : any) => {
    let fileConversionPromises = [];
    for(const property in formSubmitValues) {
        var key = property;
        // Remove any field which is empty
        if(!isEmpty(formSubmitValues[property])) {
            formSubmitValues = {...formSubmitValues, [property]: formSubmitValues[property]};
        }
        // To check if the form value is a file
        if(typeof(formSubmitValues[property]) === "object" && !isEmpty(formSubmitValues[property][0]?.originFileObj)) {
            const uploadedDocument = generateFileData(formSubmitValues[property][0].originFileObj, property);
            fileConversionPromises.push(uploadedDocument);
            delete formSubmitValues[key];
        }
    }
    return Promise.all(fileConversionPromises).then((values) => {
        console.log({user_req: formSubmitValues, files: values});
        return {user_req: formSubmitValues, files: values};
    });
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
    if(value === accountNumber) {
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

export const validateInputField = (rule: RuleObject, value: any, name: string) => {
    switch(name) {
        case "uidai": {
            return customAadhaarValidator(rule, value);
        }
        case "pan": {
            return customPANValidator(rule, value);
        }
        case "gstin": {
            return gstinValidator(rule, value);
        }
        case "account_name": {
            return customNameValidator(rule, value, "Account Holder Name");
        }
        case "account_number": {
            return accountNumberValidator(rule, value);
        }
        case "ifsc_code": {
            return customIfscValidator(rule, value);
        }
        case "upi_id": {
            return customUpiValidator(rule, value);
        }
        default: {
            return Promise.resolve();
        }
    }
};

export const setInput = (name: string, value: any) => {
    console.log("value", value);
    console.log("isEmpty(value)", isEmpty(value), ":name",name);
    return isEmpty(value);
};
