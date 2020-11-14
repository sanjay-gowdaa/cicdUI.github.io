import React from 'react';
import { Typography, Divider, Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import Review from './review';

const { Title } = Typography;

const ReviewsSection = () => {
    const buyerState = useSelector((state: RootState) => state.buyer);
    const { reviewsList } = buyerState;
    return (
        <>
            <Title level={2}>Reviews</Title>
            <Rate disabled defaultValue={4} />
            <Title level={4}>Total {reviewsList.length} review</Title>
            <Divider />
            <Review reviewsList={reviewsList} />
        </>
    );
};

export default ReviewsSection;
