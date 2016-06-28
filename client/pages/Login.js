import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { connect } from 'react-redux'

import * as userActions from 'actions/userActions'
import { apiServiceUrl } from 'config/api'

export class Login extends Component {
  submit() {
    const {
      usernameInput: { value : username },
      passwordInput: { value : password },
      indicatorText,
      submitBtn
    } = this.refs
    const { changeLoginState } = this.props

    if (!username || !password) {
      indicatorText.innerHTML = 'Please provide username and password.'
      return
    }

    submitBtn.disabled = true
    indicatorText.innerHTML = 'Request sending.'

    request
      .post(`${apiServiceUrl}login`)
      .auth(username ,password)
      .set('Accept', 'application/json')
      .end((err, res) => {
        submitBtn.disabled = true
        if (err) {
          indicatorText.innerHTML = 'Username or password incorrect'
          console.error(err)
          return
        }

        changeLoginState(username, password, res.body.data)
        this.context.router.push('/')
      })
  }

  render() {
    return (
      <div>
        <input ref='usernameInput' type='text' placeholder='username'/>
        <input ref='passwordInput' type='password' placeholder='password'/>
        <button
          className='button'
          onClick={this.submit.bind(this)}
          ref='submitBtn'
        >
          Log In
        </button>
        <p ref='indicatorText'></p>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeLoginState: userActions.changeLoginState
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
