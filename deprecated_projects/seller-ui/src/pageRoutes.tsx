import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './App'

import {routesMap} from './constants'
const {home} = routesMap


const HomePageRoutes = () => {
  return (
    <Switch>
      <Route exact path={home} component={Home} />
    </Switch>
  )
}

export default HomePageRoutes