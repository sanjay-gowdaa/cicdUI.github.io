import { FullfillmentFlags } from './types';

export const initialEmptyCropDetail = {
    fulfillment_flag: FullfillmentFlags.single_fulfillment,
    produce: '',
    seller_id: '',
    quantity: 0,
    seller_location: '',
    buyer_id: '',
    buyer_crop_id: '',
    seller_quantity: 0,
    seller_remaining_quantity: 0,
    buyer_remaining_quantity: 0,
    seller_final_price: 0,
    seller_price: 0,
    buyer_actual_quantity: 0,
    buyer_location: '',
    seller_crop_id: '',
    matched_quantity: 0
};

const CropImages = {
    stapleCrops: require('../static/assets/stapleCrop.png'),
    pulses: require('../static/assets/pulses.png'),
    cashCrops: require('../static/assets/cashCrop.png'),
    spices: require('../static/assets/cardomom.jpg'),
    oilSeeds: require('../static/assets/oilSeed.png')
};

/** Show crop images based on category name
 * 
 * @param { string } category - Category name
 */
export const showCropImage = (category: string) => {
    switch (category) {
        case 'Staple Crops': return CropImages.stapleCrops;
        case 'Pulses': return CropImages.pulses;
        case 'Cash Crops': return CropImages.cashCrops;
        case 'Spices': return CropImages.spices;
        case 'Oil Seeds': return CropImages.oilSeeds;
    }
};

/** Check if the crop details entered is unique or not
 * 
 * @param { any } cropDetails - Crop details
 * @param { any } otpError - Otp error
 * @returns boolean 
 */
export const checkIfUnique = (cropDetails: any, otpError: any) => {
    const sellerIdCheck = cropDetails.seller_id === otpError.sellerId;
    const sellerCropIdCheck = cropDetails.seller_crop_id === otpError.sellerCropId;
    const buyerIdCheck = cropDetails.buyer_id === otpError.buyerId;
    const buyerCropIdCheck = cropDetails.buyer_crop_id === otpError.buyerCropId;

    return sellerIdCheck && sellerCropIdCheck && buyerIdCheck && buyerCropIdCheck;
};
