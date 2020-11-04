export interface ApmcRateChangeModel {
  difference: number,
  increase: boolean
}

export interface CropModel {
  cropName: string
  subCategory: string
  cropGrade: string
  quantity: number
  pricePerQnt: number
  apmcRate: number
  intentToSell: boolean,
  termsAndConditions: string,
  apmcRateChange: ApmcRateChangeModel
}  

export interface MatchRequirementModel extends CropModel {
  buyerId: string
  quantityRequired: number
  location: string
}

export interface SellerStateModel {
  cropsList: Array<CropModel>
  mockCropsList: Array<MatchRequirementModel>
}