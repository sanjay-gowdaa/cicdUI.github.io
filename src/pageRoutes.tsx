import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './App'
import RegisterBuyer from './login-ui/registration'
import SellerUi from './seller-ui/';
import {routesMap} from './constants'
const {home, register_entity, seller_ui} = routesMap


const HomePageRoutes = () => {
  return (
    <Switch>
      <Route exact path={home} component={Home} />
      <Route path={register_entity} component={RegisterBuyer} />
      <Route path={seller_ui} component={SellerUi} />
    </Switch>
  )
}

export default HomePageRoutes