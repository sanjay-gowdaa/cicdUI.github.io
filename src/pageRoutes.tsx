import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './App';
import RegisterBuyer from './login-ui/registration';
import SellerUI from './seller-ui/';
import BuyerUI from './buyer-ui';
import ValidateUserAuthentication from './validateUserAuthentication';
import ValidateUserRedirection from './validateUserRedirection';
import { routesMap } from './constants';
import GuardedRoute from './app-components/GuardedRoute';
import { Terms } from './terms-and-conditions';
import { PurchaseAgreement } from './purchase-agreement';
import Profile from './profile';

const { buyer_ui, home, profile, purchase_agreement, register_entity, seller_ui,  terms } = routesMap;

const HomePageRoutes = () => {
    return (
        <Switch>
            <Route exact path={home} component={Home} />
            <Route path={register_entity} component={RegisterBuyer} />
            {/* <Route path={seller_ui} component={SellerUI} /> */}
            {/* <Route path={buyer_ui} component={BuyerUI} /> */}
            <Route path={'/login-user'} component={ValidateUserAuthentication} />
            <Route path={'/redirected-user'} component={ValidateUserRedirection} />
            <Route path={terms} component={Terms} />
            <Route path={purchase_agreement} component={PurchaseAgreement} />
            {/* Protected route guard */}
            <GuardedRoute Component={SellerUI} path={seller_ui} auth={false} />
            <GuardedRoute Component={BuyerUI} path={buyer_ui} auth={false} />
            <GuardedRoute Component={Profile} path={profile} auth={false} />
        </Switch>
    );
};

export default HomePageRoutes;
