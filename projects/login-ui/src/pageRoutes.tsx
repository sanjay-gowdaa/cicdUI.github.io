import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './App'
import RegisterBuyer from './registration/buyer'
import RegisterSeller from './registration/seller'

import {routesMap} from './constants'
const {home, register_buyer, register_seller, register_entity} = routesMap


const HomePageRoutes = () => {
  return (
    <Switch>
      <Route exact path={home} component={Home} />
      <Route path={register_buyer} component={RegisterBuyer} />
      <Route path={register_seller} component={RegisterSeller} />
      <Route path={register_entity} component={RegisterBuyer} />
    </Switch>
  )
}

export default HomePageRoutes