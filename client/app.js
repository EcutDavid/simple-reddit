import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Topic from './pages/Topic'
import Article from './pages/Article'
import NotFound from './pages/NotFound'
import FrontPage from './pages/FrontPage'
import Container from './components/Container'
import store from 'stores'

import 'font-awesome/css/font-awesome.min.css'
import 'styles/app.scss'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route component={Container} path="/(simple-reddit)" >
            <IndexRoute component={FrontPage} />
            <Route component={Login} path="login" />
            <Route component={Article} path="article/:id" />
            <Route component={Signup} path="signup" />
            <Route component={Topic} path="topic/:id" />
          </Route>
          <Route component={NotFound} path="*" />
        </Router>
      </Provider>
    )
  }
}

ReactDom.render(<App />, document.querySelector('#app'))
