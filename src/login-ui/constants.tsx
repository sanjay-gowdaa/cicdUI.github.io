export const PIN_REQUIRED_MSG = 'Please input your pin code!';
export const PIN_6_DIGIT_MSG = 'Enter pincode of 6 characters!';
export const PIN_NOT_FOUND = 'Pincode not found';

export const PAN_REQUIRED_MSG = 'Please provide PAN!';
export const PAN_10_DIGIT_MSG = 'Enter PAN number of 10 characters!';
export const PAN_INVALID = 'Invalid PAN number!';

export const AADHAAR_REQUIRED_MSG = 'Please provide Aadhaar card Number!';
export const AADHAAR_12_DIGIT_MSG = 'Enter Aadhaar number of 12 characters!';

export const IFSC_REQUIRED_MSG = 'Please input IFSC Code!';
export const IFSC_11_DIGIT_MSG = 'Enter IFSC code of 11 characters!';
export const IFSC_INVALID = 'Invalid IFSC code!';

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
