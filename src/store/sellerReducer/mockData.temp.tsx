import {
    CropModel,
    MatchRequirementModel,
    ReviewRating,
    TransactioModel,
    TransactionStatus,
} from './types';

export const mockMatchedCropsList: Array<MatchRequirementModel> = [
    {
        cropName: 'Rice',
        subCategory: 'Sona Masoori Raw',
        cropGrade: 'Grade B',
        quantity: 20,
        pricePerQnt: 5200,
        apmcRate: 5300,
        apmcRateChange: { difference: 300, increase: true },
        intentToSell: false,
        termsAndConditions: 'http://google.com',
        buyerId: '123',
        quantityRequired: 20,
        location: 'Koppal',
    },
    {
        cropName: 'Ragi',
        subCategory: 'Pearl Millet',
        cropGrade: 'Grade A',
        quantity: 40,
        pricePerQnt: 2000,
        apmcRate: 2100,
        intentToSell: true,
        apmcRateChange: { difference: 150, increase: false },
        termsAndConditions: 'http://google.com',
        buyerId: '125',
        quantityRequired: 40,
        location: 'Mysore',
    },
];

export const mockTransactionCropsList: Array<TransactioModel> = [
    {
        cropName: 'Rice',
        subCategory: 'Sona Masoori Raw',
        cropGrade: 'Grade B',
        quantity: 20,
        pricePerQnt: 5200,
        apmcRate: 5300,
        apmcRateChange: { difference: 300, increase: true },
        intentToSell: false,
        termsAndConditions: 'http://google.com',
        buyerId: '123',
        quantityRequired: 20,
        location: 'Koppal',
        transactionStatus: TransactionStatus.pending,
        transactionId: '111',
        transactionTotalAmount: 40000,
        transactionStatusText: 'Waiting for Trade finalization',
    },
    {
        cropName: 'Ragi',
        subCategory: 'Pearl Millet',
        cropGrade: 'Grade A',
        quantity: 40,
        pricePerQnt: 2000,
        apmcRate: 2100,
        intentToSell: true,
        apmcRateChange: { difference: 150, increase: false },
        termsAndConditions: 'http://google.com',
        buyerId: '125',
        quantityRequired: 40,
        location: 'Mysore',
        transactionStatus: TransactionStatus.on_going,
        transactionId: '112',
        transactionTotalAmount: 40000,
        transactionStatusText: '10% Advance payment initiated',
    },
];

export const mockReviewsList: Array<ReviewRating> = [
    {
        rating: 4,
        buyerId: '232445',
        buyerLocation: 'Mandya',
        date: new Date().toISOString(),
        reviewtext:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    },
];
