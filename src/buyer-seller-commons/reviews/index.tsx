import React from 'react';
import { Tooltip, Typography } from 'antd';
import { useSelector } from 'react-redux';

import Review from './review';

import { RootState } from '../../store/rootReducer';

const { Text } = Typography;

const ReviewsSection = () => {
    const loginState = useSelector((state: RootState) => state.loginUser);
    const userState = useSelector((state: RootState) => loginState.is_buyer ? state.buyer : state.seller);
    const { reviewsList } = userState;

    return (
        <div id='seller-ui-feedback'>
            <Tooltip title='Coming soon!' placement='left'>
                <Text style={{ fontWeight: 700, fontSize: '24px' }}>Reviews</Text>
            </Tooltip>
            {/* <Rate disabled defaultValue={4} /> */}
            {/* <Title level={4}>Total {reviewsList.length} review</Title> */}
            {/* <Divider /> */}
            <Review reviewsList={reviewsList} />
        </div>
    );
};

export default ReviewsSection;
