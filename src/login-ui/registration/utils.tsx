import { RuleObject } from "antd/lib/form";
import { getLocationByPin } from "../../store/api";
import { PIN_6_DIGIT_MSG, PIN_NOT_FOUND, PIN_REQUIRED_MSG, UserTypes } from "../constants";

type generateFormDataProps = {
    formSubmitValues: any,
    userType: string,
    addressForPin: string
}

export const generateFormData = ({formSubmitValues, userType, addressForPin}: generateFormDataProps) => {
    console.log('formData formSubmitValues', formSubmitValues)
    const {bank_statement} = formSubmitValues;
    let formData = new FormData();
    formData.append('bank_doc', bank_statement[0]);
    delete formSubmitValues['bank_statement'];

    if (userType === UserTypes.SELLER) {
        const {} = formSubmitValues
        formSubmitValues = {...formSubmitValues, isSeller: true}
    } else {
        const {aadhar_card, pan_card} = formSubmitValues
        formData.append('id_doc', aadhar_card[0]);
        formData.append('pan_doc', pan_card[0]);
        delete formSubmitValues['aadhar_card'];
        delete formSubmitValues['pan_card'];
        formSubmitValues = {...formSubmitValues, isBuyer: true}
    }
    formSubmitValues = {...formSubmitValues, address_line_2: addressForPin};
    console.log('formData formSubmitValues edited', formSubmitValues)
    const actualUserReq = JSON.stringify(formSubmitValues)
    formData.append('user_req', actualUserReq)
    
    // const registrationFormEntries = Object.entries(formSubmitValues);
    // registrationFormEntries.forEach((formEntity) => {
    //     const entityKey = formEntity[0];
    //     let entityValue: (any);
    //     if (Array.isArray(formEntity[1])) {
    //         const nestedFormValue = formEntity[1][0];
    //         if (nestedFormValue.hasOwnProperty('originFileObj')) {
    //             entityValue = nestedFormValue;
    //         } else {
    //             entityValue = formEntity[1];
    //         }
    //     } else {
    //         entityValue = formEntity[1];
    //     }
    //     formData.append(entityKey, entityValue);
    // });
    return formData;


    // id_doc
    // bank_doc
    // pan_doc
    // isBuyer
    // isSeller
    // user_req
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
