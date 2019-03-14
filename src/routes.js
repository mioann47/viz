import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Visualization from './components/Visualization'
import Report from './components/Report'
import Cleaning from './components/Cleaning'
import Main from './components/Main'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route exact path='/visualization' component={ Visualization } />
          <Route exact path='/report' component={ Report } />
          <Route exact path='/cleaning' component={ Cleaning } />
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )