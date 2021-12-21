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

export const EMAIL_REQUIRED_MSG = 'Please provide your email id!';
export const EMAIL_INVALID_MSG = 'Invalid email id!';

export const GSTIN_REQUIRED_MSG = 'Please enter GSTIN number';
export const GSTIN_MIN_DIGITS_MSG = 'GSTIN must be of 15 characters!';
export const GSTIN_INVALID_MSG = 'Invalid GSTIN!';

export const MAX_FILE_SIZE = 'Max Size of file should be 1MB!';

export const fieldLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 },
};

export const kycFlagDetails = [
    {
        flag: 'incomplete',
        title: 'KYC incomplete',
        backgroundColor: '#ffc700',
        color: 'black'
    },
    {
        flag: 'submitted',
        title: 'KYC submitted',
        backgroundColor: '#ffefb6',
        color: 'black'
    },
    {
        flag: 'complete',
        title: 'KYC complete',
        backgroundColor: '#f2f2f2',
        color: '#12805C',
        icon: true
    }
];

export const documentLabelMapping = [
    {
        key: 'GSTIN',
        label: 'GSTIN',
        name: 'gstin',
        upload: false,
        required: true
    },
    {
        key: 'PAN',
        label: 'PAN card Number',
        name: 'pan',
        upload: true,
        uploadFormName: 'pan_card',
        required: false
    },
    {
        key: 'AADHAR',
        label: 'Aadhaar card Number',
        name: 'uidai',
        upload: true,
        uploadFormName: 'aadhar_card',
        required: true
    },
    {
        key: 'Kisan card',
        label: 'Kisan card',
        name: 'kisancard',
        upload: true,
        uploadFormName: 'kisancard_card',
        required: false
    },
    {
        key: 'FPO',
        label: 'Society/ FPO Number',
        name: 'fpo',
        upload: false,
        required: false
    },
    {
        key: 'RTC',
        label: 'RTC Number',
        name: 'rtc',
        upload: true,
        uploadFormName: 'rtc_card',
        required: false
    }
];

export const inputFieldValue = (name: string, userDetails: any) => {
    switch (name) {
        case 'gstin': return userDetails?.gstin;
        case 'pan': return userDetails?.PAN;
        case 'uidai': return userDetails?.UIDAI;
        case 'kisancard': return userDetails?.kisancard;
        case 'fpo': return userDetails?.fpo;
        case 'rtc': return userDetails?.rtc;
        default: return '';
    }
};

export const bankFieldValue = (name: string, bankInfo: any) => {
    switch (name) {
        case 'account_name': return bankInfo?.account_holder_name;
        case 'account_number': return bankInfo?.account_no;
        case 'ifsc_code': return bankInfo?.ifsc_code;
        case 'upi_id': return bankInfo?.upi_id;
    }
};

export const uploadFiledValue = (name: any, userDetails: any) => {
    switch (name) {
        case 'pan_card': return userDetails.pan_card;
        case 'aadhar_card': return userDetails.aadhar_card;
        case 'kisancard_card': return userDetails.kisancard_card;
        case 'rtc_card': return userDetails.rtc_card;
    }
};

export const bankDocumentsList = [
    {
        name: 'account_name',
        label: 'Account Holder Name',
        upload: false
    },
    {
        name: 'account_number',
        label: 'Account Number',
        upload: false
    },
    {
        name: 'ifsc_code',
        label: 'IFSC Code',
        upload: false
    },
    {
        name: 'bank_doc',
        label: 'Bank Document',
        upload: true
    },
    {
        name: 'upi_id',
        label: 'UPI ID',
        upload: false
    }
];

export const workingHours = [
    {
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
    }
];

export const requiredDocumentList = [
    {
        userType: 'Seller',
        subType: 'Farmer',
        title: 'Kisan Card/ RTC Number'
    },
    {
        userType: 'Seller',
        subType: 'Farmer',
        title: 'Kisan Card/ RTC Photo'
    },
    {
        userType: 'Seller',
        subType: 'Farmer',
        title: 'Aadhar Card Number'
    },
    {
        userType: 'Seller',
        subType: 'Farmer',
        title: 'Aadhar Card Photo'
    },
    {
        userType: 'Seller',
        subType: 'Farmer',
        title: 'Bank Account Details'
    },
    {
        userType: 'Seller',
        subType: 'Farmer',
        title: 'Bank statement/ Passbook/ Cheque'
    },
    {
        userType: 'Seller',
        subType: 'Institution',
        title: 'GSTIN number'
    },
    {
        userType: 'Seller',
        subType: 'Institution',
        title: 'PAN Card number'
    },
    {
        userType: 'Seller',
        subType: 'Institution',
        title: 'PAN Card photo'
    },
    {
        userType: 'Seller',
        subType: 'Institution',
        title: 'Society/ FPO number'
    },
    {
        userType: 'Seller',
        subType: 'Institution',
        title: 'Bank Account Details'
    },
    {
        userType: 'Seller',
        subType: 'Institution',
        title: 'Bank statement/ Passbook/ Cheque'
    },
    {
        userType: 'Buyer',
        subType: 'Individual',
        title: 'Aadhar Card Number'
    },
    {
        userType: 'Buyer',
        subType: 'Individual',
        title: 'Aadhar Card Photo'
    },
    {
        userType: 'Buyer',
        subType: 'Individual',
        title: 'PAN Card Number'
    },
    {
        userType: 'Buyer',
        subType: 'Individual',
        title: 'PAN Card Photo'
    },
    {
        userType: 'Buyer',
        subType: 'Institution',
        title: 'GSTIN Number'
    },
    {
        userType: 'Buyer',
        subType: 'Institution',
        title: 'PAN Card Number'
    },
    {
        userType: 'Buyer',
        subType: 'Institution',
        title: 'PAN Card Photo'
    }
];

export const initialFormValues = {
    account_name: '',
    account_number: '',
    ifsc_code: '',
    pan: '',
    uidai: '',
    email: '',
    gstin: ''
};
