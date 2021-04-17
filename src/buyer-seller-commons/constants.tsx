import { FullfillmentFlags } from "./types";

export const initialEmptyCropDetail = {
    fulfillment_flag: FullfillmentFlags.single_fulfillment,
    produce: '',
    seller_id: '',
    quantity: 0,
    location: '',
    buyer_id: '',
    buyer_crop_id: '',
    seller_quantity: 0,
    seller_remaining_quant: 0,
    buyer_remaining_quant: 0,
    seller_final_price: 0,
    seller_price: 0,
    buyer_actual_quantity: 0,
    buyer_location: '',
    seller_crop_id: '',
    matched_quantity: 0
};