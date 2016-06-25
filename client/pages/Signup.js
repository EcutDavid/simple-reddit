import React, { Component } from 'react'
import request from 'superAgent'

export default class Signup extends Component {
  constructor() {
    super()
    this.state = { signed: false }
  }

  submit() {
    const {
      usernameInput: { value : username },
      passwordInput: { value : password }
    } = this.refs

    request
      .post('http://localhost:3000/register')
      .send({ username ,password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(res);
        this.setState({ signed: true })
      })
  }

  render() {
    const { signed } = this.state
    const content = signed ? (
      <h2>You are a user of simplest reddit now</h2>
    ) : (
      <div>
        <h2>Signup</h2>
        <input ref='usernameInput' type='text' defaultValue='username'/>
        <input ref='passwordInput' type='password' />
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
