import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './App';
import RegisterBuyer from './login-ui/registration';
import SellerUI from './seller-ui/';
import BuyerUI from './buyer-ui';
import { routesMap } from './constants';
const { home, register_entity, seller_ui, buyer_ui } = routesMap;

const HomePageRoutes = () => {
    return (
        <Switch>
            <Route exact path={home} component={Home} />
            <Route path={register_entity} component={RegisterBuyer} />
            <Route path={seller_ui} component={SellerUI} />
            <Route path={buyer_ui} component={BuyerUI} />
        </Switch>
    );
};

export default HomePageRoutes;
