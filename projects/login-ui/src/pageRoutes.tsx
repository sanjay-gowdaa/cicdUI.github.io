import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './App'
import RegisterBuyer from './registration'

import {routesMap} from './constants'
const {home, register_entity} = routesMap


const HomePageRoutes = () => {
  return (
    <Switch>
      <Route exact path={home} component={Home} />
      <Route path={register_entity} component={RegisterBuyer} />
    </Switch>
  )
}

export default HomePageRoutes