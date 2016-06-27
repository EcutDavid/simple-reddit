import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'

import 'styles/postEditor.scss'
import * as postActions from 'actions/postActions'
import { apiServiceUrl } from 'config/api'

export class PostEditor extends Component {
  submit() {
    const {
      postNameInput: { value : postName },
      descriptionInput: { value : description },
      contentInput: { value : content },
      indicatorText
    } = this.refs
    console.log(postName);
    console.log(description);
    console.log(content);
    if (!postName) {
      indicatorText.innerHTML = 'Please provide post name'
      return
    }
    if (!description) {
      indicatorText.innerHTML = 'Please provide description'
      return
    }
    if (!content) {
      indicatorText.innerHTML = 'Please provide content'
      return
    }
    indicatorText.innerHTML = 'Request sending.'
    const { username, password, getPosts } = this.props
    request
      .post(`${apiServiceUrl}post`)
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
          indicatorText.innerHTML = 'Sorry, some thing broken in server, please contact David Guan(DavidGuanDev@Gmail.com)'
          console.error(err)
          return
        }
        if (res.body.err) {
          indicatorText.innerHTML = res.body.err
          return
        }
        indicatorText.innerHTML = 'Thanks for your post!!'
        getPosts()
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
            placeholder='postName'
          />
          <input
            className='description'
            ref='descriptionInput'
            type='text'
            placeholder='description'
          />
          <input
            className='content'
            ref='contentInput'
            type='text'
            placeholder='content'
          />
          <button className='button' onClick={this.submit.bind(this)} >
            Submit
          </button>
          <p ref='indicatorText'></p>
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


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getPosts: postActions.getPosts
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor)
