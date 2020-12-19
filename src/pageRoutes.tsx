import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './App';
import RegisterBuyer from './login-ui/registration';
import SellerUI from './seller-ui/';
import BuyerUI from './buyer-ui';
import ValidateUserAuthentication from './validateUserAuthentication';
import { routesMap } from './constants';
import GuardedRoute from './app-components/GuardedRoute';
const { home, register_entity, seller_ui, buyer_ui } = routesMap;

const HomePageRoutes = () => {
    return (
        <Switch>
            <Route exact path={home} component={Home} />
            <Route path={register_entity} component={RegisterBuyer} />
            {/* <Route path={seller_ui} component={SellerUI} /> */}
            {/* <Route path={buyer_ui} component={BuyerUI} /> */}
            <Route path={'/login-user'} component={ValidateUserAuthentication} />
            {/* Protected route guard */}
            <GuardedRoute Component={SellerUI} path={seller_ui} auth={false} />
            <GuardedRoute Component={BuyerUI} path={buyer_ui} auth={false} />
        </Switch>
    );
};

export default HomePageRoutes;
