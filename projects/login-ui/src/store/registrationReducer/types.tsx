export interface RegsitrationFormModel {
    username: string
    phone: string
  }

  export interface RegitrationFullFormModel extends RegsitrationFormModel {
    otp: string
    password: string
    email: string
  }