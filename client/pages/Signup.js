import React, { Component } from 'react'
import request from 'superAgent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeLoginState } from 'actions/userActions'

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
      .post('http://localhost:3000/register')
      .send({ username ,password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
          return
        }
        changeLoginState(true)
        this.context.router.push('/')
      })
  }

  render() {
    const { signed } = this.state


    const content = signed ? (
      <h2>You are a user of simplest reddit now</h2>
    ) : (
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
    return (
      <div>
        { content }
      </div>
    )
  }
}

Signup.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeLoginState
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signup)
