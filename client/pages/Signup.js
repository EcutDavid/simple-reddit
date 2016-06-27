import React, { Component } from 'react'
import request from 'superAgent'
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
      passwordInput: { value : password }
    } = this.refs
    const { changeLoginState } = this.props

    request
      .post(`${apiServiceUrl}register`)
      .send({ username ,password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
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
        <h2>Signup</h2>
        Username: <input ref='usernameInput' type='text' />
        <br />
        Password: <input ref='passwordInput' type='password' />
        <br />
        <button
          onClick={this.submit.bind(this)}
        >
          Submit
        </button>
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
