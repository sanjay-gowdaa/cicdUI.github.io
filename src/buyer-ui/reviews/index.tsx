import React from 'react';
import { Divider, Rate, Typography } from 'antd';
import { useSelector } from 'react-redux';

import Review from './review';

import { RootState } from '../../store/rootReducer';

const { Title } = Typography;

const ReviewsSection = () => {
    const buyerState = useSelector((state: RootState) => state.buyer);
    const { reviewsList } = buyerState;

    return (
        <div id="buyer-ui-feedback">
            <Title level={2}>Reviews</Title>
            <Rate disabled defaultValue={4} />
            <Title level={4}>Total {reviewsList.length} review</Title>
            <Divider />
            <Review reviewsList={reviewsList} />
        </div>
    );
};

export default ReviewsSection;
