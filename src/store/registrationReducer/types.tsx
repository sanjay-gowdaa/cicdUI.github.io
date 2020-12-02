export interface RegsitrationFormModel {
    username: string;
    phone: string;
    email: string;
    type: string;
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
}
