import { RuleObject } from "antd/lib/form";
import { getLocationByPin } from "../../store/api";

const PIN_REQUIRED_MSG = 'Please input your pin code!';
const PIN_6_DIGIT_MSG = 'Enter pincode of 6 characters!';
const PIN_NOT_FOUND = 'Pincode not found';

export const generateFormData = (formSubmitValues: any) => {
    let formData = new FormData();
    const registrationFormEntries = Object.entries(formSubmitValues);
    registrationFormEntries.forEach((formEntity) => {
        const entityKey = formEntity[0];
        let entityValue: (any);
        if (Array.isArray(formEntity[1])) {
            const nestedFormValue = formEntity[1][0];
            if (nestedFormValue.hasOwnProperty('originFileObj')) {
                entityValue = nestedFormValue;
            } else {
                entityValue = formEntity[1];
            }
        } else {
            entityValue = formEntity[1];
        }
        formData.append(entityKey, entityValue);
    });
    return formData;
}


export const customPincodeValidator = (rule: RuleObject, value: any, setAddressForPin: Function) => {
    if(!value) {
        return Promise.reject(PIN_REQUIRED_MSG);
    } else if (value.length !== 6 ) {
        return Promise.reject(PIN_6_DIGIT_MSG);
    } else {
        return getLocationByPin(value)
        .then((response: any) => response.json())
        .then((response: any) => {
            const {locationDetails} = response;
            if(!locationDetails) {
                return Promise.reject(PIN_NOT_FOUND)
            } else {
                const getLocationObj = locationDetails[0];
                const {PostOffice = []} = getLocationObj || {}
                const {District = '', State = '', Block = ''} = PostOffice[0] || {};
                const address = `${Block}, ${District}, ${State}`;
                setAddressForPin(address);
                return Promise.resolve();
            }
        })
    }
}

// file.type === 'application/pdf' ||
