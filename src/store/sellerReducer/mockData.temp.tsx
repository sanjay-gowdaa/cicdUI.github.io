import { ReviewRating } from '../../buyer-seller-commons/types';

export const mockReviewsList: Array<ReviewRating> = [
    {
        rating: 4,
        userId: '232445',
        location: 'Mandya',
        date: new Date().toISOString(),
        reviewtext:
            `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries`,
    },
];
