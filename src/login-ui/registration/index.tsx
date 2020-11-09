import React from 'react';
import BuyerRegister from './buyer';
import SellerRegister from './seller';

const Registration = (props: any) => {
    const { history, match } = props;
    const {
        params: { id },
    } = match;
    console.log('Registration params', id);
    return id === 'seller' ? (
        <SellerRegister history={history} />
    ) : (
        <BuyerRegister history={history} />
    );
};

export default Registration;
