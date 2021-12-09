import { isEmpty } from "lodash";
import { RuleObject } from 'antd/lib/form';

export const validateQuantity = (rule: RuleObject, value: string) => {
    const regExp = /^[0-9]*$/;
    if (isEmpty(value)) {
        return Promise.reject('Please input the Quantity!');
    } else if (!regExp.test(value)) {
        return Promise.reject('Please enter a valid quantity!');
    } else if (parseInt(value) < 15) {
        return Promise.reject('The minimum value for quantity must be 15Qtl!');
    } else if (parseInt(value) > 250) {
        return Promise.reject('The maximum value for quantity must be 250Qtl!');
    } else {
        return Promise.resolve();
    }
};
