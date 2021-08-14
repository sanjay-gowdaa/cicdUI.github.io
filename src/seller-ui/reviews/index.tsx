import React from 'react';
import { Divider, Rate, Typography } from 'antd';
import { useSelector } from 'react-redux';

import Review from './review';

import { RootState } from '../../store/rootReducer';

const { Title } = Typography;

const ReviewsSection = () => {
    const sellerState = useSelector((state: RootState) => state.seller);
    const { reviewsList } = sellerState;

    return (
        <div id="seller-ui-feedback">
            <Title level={2}>Reviews</Title>
            <Rate disabled defaultValue={4} />
            <Title level={4}>Total {reviewsList.length} review</Title>
            <Divider />
            <Review reviewsList={reviewsList} />
        </div>
    );
};

export default ReviewsSection;
