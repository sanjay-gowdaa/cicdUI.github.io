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
        <div className="register-seller"><SellerRegister history={history} /></div>
    ) : (
        <div className="register-buyer"><BuyerRegister history={history} /></div>
    );
};

export default Registration;
