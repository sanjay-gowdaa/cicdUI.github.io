import { isEmpty } from "lodash";
import { RuleObject } from "rc-field-form/lib/interface";

export const validateQuantity = (rule: RuleObject, value: string) => {
    const regExp = /^[0-9]*$/;
    if (isEmpty(value)) {
        return Promise.reject('Please input the Quantity!');
    } else if (!regExp.test(value)) {
        return Promise.reject('Please enter a valid quantity!');
    } else {
        return Promise.resolve();
    }
};
