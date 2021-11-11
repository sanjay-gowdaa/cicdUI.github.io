import React from 'react';
import { Divider, Rate, Tooltip, Typography } from 'antd';
import { useSelector } from 'react-redux';

import Review from './review';

import { RootState } from '../../store/rootReducer';

const { Title, Text } = Typography;

const ReviewsSection = () => {
    const sellerState = useSelector((state: RootState) => state.seller);
    const { reviewsList } = sellerState;

    return (
        <div id="seller-ui-feedback">
            <Tooltip title="Coming soon!" placement="left">
                <Text style={{ fontWeight: 700, fontSize: "24px" }}>Reviews</Text>
            </Tooltip>
            {/* <Rate disabled defaultValue={4} /> */}
            {/* <Title level={4}>Total {reviewsList.length} review</Title> */}
            {/* <Divider /> */}
            <Review reviewsList={reviewsList} />
        </div>
    );
};

export default ReviewsSection;
