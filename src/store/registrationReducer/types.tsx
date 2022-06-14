export interface RegsitrationFormModel {
    name: string;
    number: string;
    email: string;
    type: string;
    category: string;
    urd_status: boolean;
}

export interface RegitrationFullFormModel extends RegsitrationFormModel {
    otp: string;
    password: string;
    confirmPassword: string;
    addressLine: string;
    district: string;
    pinCode: string;
    taluk: string;
    email: string;
    timeStamp: any;
}
