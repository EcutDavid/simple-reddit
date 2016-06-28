import React, { Component } from 'react'
import request from 'superagent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as userActions from 'actions/userActions'
import { apiServiceUrl } from 'config/api'

export class Signup extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { signed: false }
  }

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
      .post(`${apiServiceUrl}register`)
      .send({ username ,password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        submitBtn.disabled = false
        if (err) {
          indicatorText.innerHTML = 'Sorry, some thing broken in server, please contact David Guan(DavidGuanDev@Gmail.com)'
          console.error(err)
          return
        }
        if (res.body.err) {
          indicatorText.innerHTML = res.body.err
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
        <input ref='passwordInput' type='password' placeholder='password' />
        <button
          className='button'
          onClick={this.submit.bind(this)}
          ref='submitBtn'
        >
          Sign Up
        </button>
        <p ref='indicatorText'></p>
      </div>
    )
  }
}

Signup.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeLoginState: userActions.changeLoginState
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signup)
