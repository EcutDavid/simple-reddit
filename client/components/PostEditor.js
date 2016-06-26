import React, { Component } from 'react'
import { connect } from 'react-redux'
import request from 'superAgent'

import 'styles/postEditor.scss'

export class PostEditor extends Component {
  submit() {
    const {
      postNameInput: { value : postName },
      descriptionInput: { value : description },
      contentInput: { value : content }
    } = this.refs
    const { username, password } = this.props
    request
      .post('http://localhost:3000/post')
      .auth(username ,password)
      .send({
        name: postName,
        description,
        content,
        points: 0,
        author: username
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(res);
      })
  }

  render() {
    const { alreadyLogin } = this.props
    if (alreadyLogin) {
      return (
        <div className='PostEditor'>
          <input
            ref='postNameInput'
            type='text'
            defaultValue='postName'
          />
          <input
            className='description'
            ref='descriptionInput'
            type='text'
            defaultValue='description'
          />
          <input
            className='content'
            ref='contentInput'
            type='text'
            defaultValue='content'
          />
          <button onClick={this.submit.bind(this)} >
            Submit
          </button>
        </div>
      )
    } else {
      return (
        <p>Please login or signup for post submit</p>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    alreadyLogin: state.user.get('alreadyLogin'),
    username: state.user.get('username'),
    password: state.user.get('password')
  }
}
export default connect(mapStateToProps)(PostEditor)
