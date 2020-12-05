import React from 'react';
import BuyerRegister from './buyer';
import SellerRegister from './seller';
import './registration.scss'

const Registration = (props: any) => {
    const { history, match } = props;
    const {
        params: { id },
    } = match;
    return id === 'seller' ? (
        <SellerRegister history={history} />
    ) : (
        <BuyerRegister history={history} />
    );
};

export default Registration;
