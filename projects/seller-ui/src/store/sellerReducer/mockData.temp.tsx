import { CropModel } from "./types";

export const mockCropsList: Array<CropModel> = [
    {
        cropName: 'Rice',
        subCategory: 'Sona Masoori Raw',
        cropGrade: 'Grade B',
        quantity: 20,
        pricePerQnt: 5200,
        apmcRate: 5300,
        apmcRateChange: {difference: 300, increase: true},
        intentToSell: false,
        termsAndConditions: 'http://google.com'
    },
    {
        cropName: 'Ragi',
        subCategory: 'Pearl Millet',
        cropGrade: 'Grade A',
        quantity: 40,
        pricePerQnt: 2000,
        apmcRate: 2100,
        intentToSell: true,
        apmcRateChange: {difference: 150, increase: false},
        termsAndConditions: 'http://google.com'
    }
]
