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

// const converBase64toBlob = (content, contentType) => {
//     contentType = contentType || '';
//     var sliceSize = 512;
//     var byteCharacters = window.atob(content); //method which converts base64 to binary
//     var byteArrays = [
//     ];
//     for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//       var slice = byteCharacters.slice(offset, offset + sliceSize);
//       var byteNumbers = new Array(slice.length);
//       for (var i = 0; i < slice.length; i++) {
//         byteNumbers[i] = slice.charCodeAt(i);
//       }
//       var byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }
//     var blob = new Blob(byteArrays, {
//       type: contentType
//     }); //statement which creates the blob
//     return blob;
// }

	
export const proccessFileToBase64 = (inputObj: any) => {
    const fileObj = inputObj;
    const webworkerReader = new FileReader();

    return new Promise((resolve, reject) => {
        webworkerReader.onerror = () => {
            webworkerReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };
    
        webworkerReader.onload = function() {
            const binaryStr: any = webworkerReader.result;
            const base64Str = btoa(binaryStr);
            resolve(base64Str);
        };

        webworkerReader.readAsBinaryString(fileObj);
    });
}

export const generateFileData = async (fileObject: {name: string, type: string}, fieldname: string) => {
    const filename = fileObject.name;
    const content = await proccessFileToBase64(fileObject);
    return {fieldname, filename , content};
}

const cleanUpFormSubmitValues = (keysToBeRemoved: Array<string>, formValues: any) => {
    keysToBeRemoved.forEach((formFieldKey) => {
        delete formValues[formFieldKey];
    })
}

export const generateFormData = ({formSubmitValues, userType, addressForPin}: generateFormDataProps) => {
    let fileConversionPromises = [];
    let formKeysToBeRemoved: Array<string> = [];

    const {bank_statement} = formSubmitValues;
    const bankstatementData = generateFileData(bank_statement[0].originFileObj, 'bank_doc');
    fileConversionPromises.push(bankstatementData)    
    if (userType === UserTypes.SELLER) {
    // For testing uncomment below line and comment above line   
    // if (false) {
        const {id_doc} = formSubmitValues
        const IDDocument = generateFileData(id_doc[0].originFileObj, 'id_doc');
        fileConversionPromises.push(IDDocument)

        formKeysToBeRemoved = [...formKeysToBeRemoved, 'id_doc', 'bank_statement'];
        cleanUpFormSubmitValues(formKeysToBeRemoved, formSubmitValues);

        formSubmitValues = {...formSubmitValues, isSeller: true}
    } else {
        const {aadhar_card, pan_card, weekday, saturday, sunday} = formSubmitValues
        const buyerIdDocPrimary = generateFileData(aadhar_card[0].originFileObj, 'uidai_doc');
        const buyerIdDocSecondary = generateFileData(pan_card[0].originFileObj, 'pan_doc');
        fileConversionPromises.push(buyerIdDocPrimary);
        fileConversionPromises.push(buyerIdDocSecondary);

        formKeysToBeRemoved = [...formKeysToBeRemoved, 'aadhar_card', 'pan_card', 'weekday', 'saturday', 'sunday', 'bank_statement'];
        cleanUpFormSubmitValues(formKeysToBeRemoved, formSubmitValues);
        formSubmitValues = {...formSubmitValues, working_hours: {weekday, saturday, sunday}, isBuyer: true}

        /* For testing purpose uncomment below line and comment above line */
        // formSubmitValues = {...formSubmitValues, working_hours: workingHoursData, isBuyer: true, number: '9036565202', email: 'a', name: 'a', type: 'a'}
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
    })
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
