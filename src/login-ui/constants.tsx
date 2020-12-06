export const PIN_REQUIRED_MSG = 'Please input your pin code!';
export const PIN_6_DIGIT_MSG = 'Enter pincode of 6 characters!';
export const PIN_NOT_FOUND = 'Pincode not found';

export const registerBasicFormMainLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

export const registerBasicFormTailLayout = {
    wrapperCol: { span: 24 },
};

export enum UserTypes {
    SELLER = 'Seller',
    BUYER = 'Buyer'
}

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
}]