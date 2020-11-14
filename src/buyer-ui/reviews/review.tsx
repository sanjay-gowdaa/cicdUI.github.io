import React from 'react';
import { Typography, Rate, Space } from 'antd';
import { ReviewRating } from '../../store/buyerReducer/types';

const { Title, Text } = Typography;

interface PropsType {
    reviewsList: Array<ReviewRating>;
}

const Review = ({ reviewsList }: PropsType) => {
    return (
        <>
            {reviewsList.map((singleReview: ReviewRating) => {
                const { sellerId, buyerLocation, reviewtext, date, rating } = singleReview;
                return (
                    <Space direction="vertical">
                        <Title level={3}>Seller: {sellerId}</Title>
                        <Text strong>
                            {buyerLocation}, {new Date(date).toLocaleDateString()}
                        </Text>
                        <Rate disabled defaultValue={rating} />
                        <Text>{reviewtext}</Text>
                    </Space>
                );
            })}
        </>
    );
};

export default Review;
