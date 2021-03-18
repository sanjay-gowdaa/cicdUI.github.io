export const PIN_REQUIRED_MSG = 'Please provide your pin code!';
export const PIN_6_DIGIT_MSG = 'Enter pincode of 6 characters!';
export const PIN_NOT_NUMBER = 'Pin code must be a number!';
export const PIN_NOT_FOUND = 'Pincode not found!';

export const PAN_10_DIGIT_MSG = 'Enter PAN number of 10 characters!';
export const PAN_INVALID = 'Invalid PAN number!';

export const AADHAAR_REQUIRED_MSG = 'Please provide your Aadhaar card Number!';
export const AADHAAR_12_DIGIT_MSG = 'Enter Aadhaar number of 12 digits!';
export const AADHAAR_NOT_NUMBER = 'Aadhaar should be a number!';

export const IFSC_11_DIGIT_MSG = 'Enter IFSC code of 11 characters!';
export const IFSC_INVALID = 'Invalid IFSC code!';

export const NAME_REQUIRED_MSG = 'Please provide';
export const NAME_INVALID = 'should contain alphabets only!';

export const ACCOUNT_NUMBER_MIN_DIGITS_MSG = 'Account Number must have at least 9 digits!';
export const ACCOUNT_NUMBER_MAX_DIGITS_MSG = 'Account Number can not exceed 18 digits!';
export const ACCOUNT_NUMBER_INVALID = 'Account Number should be a number!';

export const CONFIRM_ACCOUNT_MISMATCH = 'It should be same as Account Number!';

export const UPI_ID_INVALID_MSG = 'Invalid UPI Id!';

export const PHONE_NUMBER_REQUIRED_MSG = 'Please provide your phone number!';
export const PHONE_NUMBER_INVALID = 'Phone Number should be a number!';
export const PHONE_NUMBER_10_DIGIT_MSG = 'Phone Number should be of 10 digits!';
export const PHONE_NUMBER_ALREADY_EXISTS = 'USER ALREADY EXISTS. KINDLY LOGIN!';

export const EMAIL_REQUIRED_MSG = 'Please provide your email id!';
export const EMAIL_INVALID_MSG = 'Invalid email id!';

export const GSTIN_REQUIRED_MSG = 'Please enter GSTIN number';
export const GSTIN_MIN_DIGITS_MSG = 'GSTIN must be of 15 characters!';
export const GSTIN_INVALID_MSG = 'Invalid GSTIN!';

export const MAX_FILE_SIZE = 'Max Size of file should be 1MB!';

export const registerBasicFormMainLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

export const registerBasicFormTailLayout = {
    wrapperCol: { span: 24 },
};

export const workingHours = [{
    name: '9am_to_9pm',
    label: '9am to 9pm'
},
{
    name: '9am_to_5pm',
    label: '9am to 5pm'
},
{
    name: 'holiday',
    label: 'Holiday'
},
{
    name: 'all_day',
    label: 'All Day',
    disabled: true
}];

export const documentLabelMapping = [
{
    key: "GSTIN",
    label: "GSTIN",
    labelClassName: "required-form-field",
    name: "gstin",
    upload: false
},
{
    key: "PAN",
    label: "PAN card Number",
    name: "pan",
    formClassName: "form-item-60",
    upload: true,
    uploadFormName: "pan_card"
},
{
    key: "AADHAR",
    label: "Aadhaar card Number",
    labelClassName: "required-form-field",
    name: "uidai",
    formClassName: "form-item-60",
    upload: true,
    uploadFormName: "aadhar_card"
},
{
    key: "Kisan card",
    label: "Kisan card",
    name: "kisancard",
    formClassName: "form-item-60",
    upload: true,
    uploadFormName: "kisancard_card"
},
{
    key: "FPO",
    label: "Society/ FPO Number",
    name: "fpo",
    upload: false,
},
{
    key: "RTC",
    label: "RTC Number",
    name: "rtc",
    formClassName: "form-item-60",
    upload: true,
    uploadFormName: "rtc_card"
}
]