import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import request from 'superagent'

import { apiServiceUrl } from 'config/api'
import 'styles/post.scss'

class Post extends Component {
  constructor() {
    super()
    this.state = { points: 0}
  }

  componentWillMount() {
    this.setState({ points: this.props.points })
  }

  modifyPoints(isUpvote) {
    const { username, password, id } = this.props

    request
      .put(`${apiServiceUrl}post`)
      .auth(username ,password)
      .send({ id, pointInc: isUpvote ? 1 : -1 })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
          return
        }
        const { err: resErr, data } = res.body
        if (!resErr) {
          this.setState({ points: data.points })
        }
      })
  }

  render() {
    const { alreadyLogin, name, description, id, author } = this.props
    const { points } = this.state
    return (
      <div className='Post'>
        <Link to={`article/${id ? id : '0'}`} className='title'>{ name }</Link>
        <p className='description'>{ description }</p>
        <p className='points'>{ points }</p>
        { alreadyLogin && <button onClick={this.modifyPoints.bind(this, true)} className='vote-button fa fa-arrow-up'/> }
        { alreadyLogin && <button onClick={this.modifyPoints.bind(this, false)} className='vote-button fa fa-arrow-down'/> }
        { author ? <p>{ `Author: ${author}` }</p>: ''}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    alreadyLogin: state.user.get('alreadyLogin'),
    username: state.user.get('username'),
    password: state.user.get('password')
  }
}

export default connect(mapStateToProps)(Post)
