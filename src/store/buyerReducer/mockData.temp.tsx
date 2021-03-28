import {
    MatchRequirementModel,
    ReviewRating,
    TransactioModel,
    TransactionStatus,
} from './types';

export const mockReviewsList: Array<ReviewRating> = [
    {
        rating: 4,
        sellerId: '232445',
        buyerLocation: 'Mandya',
        date: new Date().toISOString(),
        reviewtext:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    },
];



// [
//     {
//         "buyer_id": "user#123",
//         "buyer_crop_id": "buyer_crop_id#123",
//         "seller_id": "user#001",
//         "produce": "Pulses-Alsandegram-Med-alsandegram",
//         "quantity": 186.0,
//         "location": "Hassan",
//         "price": 12341.0,
//         "total_price": 1048985.0,
//         "buyer_transportation_cost": 1000.0,
//         "buyer_facilitation_cost": 1470.0,
//         "seller_transportation_cost": 0,
//         "seller_facilitation_cost": 0,
//         "seller_final_price": 6000.0,
//         "buyer_final_price": 8470.0,
//         "fulfillment_flag": "single_fulfillment",
//         "buyer_remaining_quant": 0.0,
//         "seller_remaining_quant": 0.0
//     },
//     {
//         "buyer_id": "user#123",
//         "buyer_crop_id": "buyer_crop_id#124",
//         "seller_id": "user#001",
//         "produce": "Pulses-Alsandegram-Med-alsandegram",
//         "quantity": 186.0,
//         "location": "Hassan",
//         "price": 12341.0,
//         "total_price": 1048985.0,
//         "buyer_transportation_cost": 1000.0,
//         "buyer_facilitation_cost": 1470.0,
//         "seller_transportation_cost": 0,
//         "seller_facilitation_cost": 0,
//         "seller_final_price": 6000.0,
//         "buyer_final_price": 8470.0,
//         "fulfillment_flag": "single_fulfillment",
//         "buyer_remaining_quant": 0.0,
//         "seller_remaining_quant": 0.0
//     }
// ]