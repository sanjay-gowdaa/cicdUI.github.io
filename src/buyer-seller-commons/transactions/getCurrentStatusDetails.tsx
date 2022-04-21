import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { currentBuyerStatusDetails } from '../../store/buyerReducer/actions';
import { RootState } from '../../store/rootReducer';

const GetCurrentStatusDetails = (pk: any) => {
    const loginState = useSelector((state: RootState) => state.loginUser);
    const userState = useSelector((state: RootState) => loginState.is_buyer ? state.buyer : state.seller);
    const status = userState.currentStatusDetails;
    const [userStatus, setUserStatus] = useState('');
    const dispatch = useDispatch();
    var id = pk.data;
    id = id.substring(12);

    const data = {
        'transactionId': id,
        'user': loginState.is_buyer ? 'buyer' : 'seller'
    };

    useEffect(() => {
        dispatch(currentBuyerStatusDetails(data));
    }, []);

    useEffect(() => {
        if (!isEmpty(status)) {
            for (let i = 0; i < status.length; i++) {
                if (status[i].pk === pk.data) {
                    setUserStatus(status[i].event_description);
                    console.log(status)
                }
            }
        }
    }, [status]);

    return (
        <p>{userStatus}</p>
    );
};

export default GetCurrentStatusDetails;
