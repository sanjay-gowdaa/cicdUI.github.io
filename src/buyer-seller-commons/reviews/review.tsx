import React from 'react';
import { Rate, Space, Typography } from 'antd';
import { useSelector } from 'react-redux';

import { ReviewRating } from '../types';

import { RootState } from '../../store/rootReducer';
import { UserTypes } from '../../store/genericTypes';

const { Title, Text } = Typography;

interface PropsType {
    reviewsList: Array<ReviewRating>;
}

const Review = ({ reviewsList }: PropsType) => {
    const loginState = useSelector((state: RootState) => state.loginUser);
    const userType = loginState.is_buyer ? UserTypes.BUYER : UserTypes.SELLER;

    return (
        <>
            {reviewsList.map((singleReview: ReviewRating) => {
                const { reviewtext, date, rating, location, userId } = singleReview;
                return (
                    <Space direction='vertical'>
                        <Title level={3}>
                            {userType}: {userId}
                        </Title>
                        <Text strong>
                            {location}, {new Date(date).toLocaleDateString()}
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
