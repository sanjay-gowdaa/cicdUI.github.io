export const PIN_REQUIRED_MSG = 'Please provide your pin code!';
export const PIN_6_DIGIT_MSG = 'Enter pincode of 6 characters!';
export const PIN_NOT_NUMBER = 'Pin code must be a number!';
export const PIN_NOT_FOUND = 'Pincode not found!';

export const PAN_REQUIRED_MSG = 'Please provide your PAN!';
export const PAN_10_DIGIT_MSG = 'Enter PAN number of 10 characters!';
export const PAN_INVALID = 'Invalid PAN number!';

export const AADHAAR_REQUIRED_MSG = 'Please provide your Aadhaar card Number!';
export const AADHAAR_12_DIGIT_MSG = 'Enter Aadhaar number of 12 digits!';
export const AADHAAR_NOT_NUMBER = 'Aadhaar should be a number!';

export const IFSC_REQUIRED_MSG = 'Please provide your IFSC Code!';
export const IFSC_11_DIGIT_MSG = 'Enter IFSC code of 11 characters!';
export const IFSC_INVALID = 'Invalid IFSC code!';

export const NAME_REQUIRED_MSG = 'Please provide';
export const NAME_INVALID = 'should contain alphabets only!';

export const ACCOUNT_NUMBER_REQUIRED_MSG = 'Please enter Account Number!';
export const ACCOUNT_NUMBER_MIN_DIGITS_MSG = 'Account Number must have at least 9 digits!';
export const ACCOUNT_NUMBER_MAX_DIGITS_MSG = 'Account Number can not exceed 18 digits!';
export const ACCOUNT_NUMBER_INVALID = 'Account Number should be a number!';

export const CONFIRM_ACCOUNT_REQUIRED_MSG = 'Please confirm Account Number!';
export const CONFIRM_ACCOUNT_MISMATCH = 'It should be same as Account Number!';

export const UPI_ID_INVALID_MSG = 'Invalid UPI Id!';

export const PHONE_NUMBER_REQUIRED_MSG = 'Please provide your phone number!';
export const PHONE_NUMBER_INVALID = 'Phone Number should be a number!';
export const PHONE_NUMBER_10_DIGIT_MSG = 'Phone Number should be of 10 digits!';

export const EMAIL_REQUIRED_MSG = 'Please provide your email id!';
export const EMAIL_INVALID_MSG = 'Invalid email id!';

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
