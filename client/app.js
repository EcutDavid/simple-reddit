import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Topic from './pages/Topic'
import Article from './pages/Article'
import NotFound from './pages/NotFound'
import Container from './Container'


class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Container} path="/" >
          <Route component={Login} path="login" />
          <Route component={Article} path="article/:id" />
          <Route component={Signup} path="signup" />
          <Route component={Topic} path="topic/:id" />
        </Route>
        <Route component={NotFound} path="*" />
      </Router>
    )
  }
}

ReactDom.render(<App />, document.querySelector('#app'))
