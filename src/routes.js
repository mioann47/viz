import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Report from './components/Report'
import Cleaning from './components/Cleaning'
import Main from './components/Main'
import Signup from './components/Signup'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route exact path='/visualization' component={ Dashboard } />
          <Route exact path='/signup' component={ Signup } />
          <Route exact path='/report' component={ Report } />
          <Route exact path='/cleaning' component={ Cleaning } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )