import { RuleObject } from "antd/lib/form";
import {
    EMAIL_INVALID_MSG,
    EMAIL_REQUIRED_MSG,
    NAME_INVALID,
    NAME_REQUIRED_MSG,
    PHONE_NUMBER_10_DIGIT_MSG,
    PHONE_NUMBER_INVALID,
    PHONE_NUMBER_REQUIRED_MSG
} from "../constants";

export const validatePhoneNumber = (rule: RuleObject, value: any) => {
    const regExp = /^[0-9]*$/;

    if(!value) {
        return Promise.reject(PHONE_NUMBER_REQUIRED_MSG);
    } else if(!regExp.test(value)) {
        return Promise.reject(PHONE_NUMBER_INVALID);
    } else if (value.length !== 10) {
        return Promise.reject(PHONE_NUMBER_10_DIGIT_MSG);
    } else {
        return Promise.resolve();
    }
};

export const validateUserName = (rule: RuleObject, value: any) => {
    const regExp = /^[a-zA-Z ]{1,50}$/;

    if(!value) {
        return Promise.reject(`${NAME_REQUIRED_MSG} your name!`);
    } else if (!regExp.test(value)) {
        return Promise.reject(`Name ${NAME_INVALID}`);
    } else {
        return Promise.resolve();
    }
};

export const emailRequired = (rule: RuleObject, value: any) => {
    const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if(!value) {
        return Promise.reject(EMAIL_REQUIRED_MSG);
    } else if(!regExp.test(value)) {
        return Promise.reject(EMAIL_INVALID_MSG);
    } else {
        return Promise.resolve();
    }
};