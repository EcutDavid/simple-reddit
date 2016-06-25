import React, { Component } from 'react'
// import request from 'superAgent'

export default class Login extends Component {
  constructor() {
    super()
  }

  submit() {
  }

  render() {
    return (
      <div>
        <input ref='username' type='text' defaultValue='username'/>
        <input ref='password' type='password' />
        <button
          onCLick={this.submit.bind(this)}
        >
          Submit
        </button>
      </div>
    )
  }
}
