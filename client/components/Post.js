import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import 'styles/post.scss'

export default class Post extends Component {
  render() {
    const { alreadyLogin, name, description, points, id, author } = this.props
    return (
      <div className='Post'>
        <Link to={`article/${id ? id : '0'}`} className='title'>{ name }</Link>
        <p className='description'>{ description }</p>
        <p className='points'>{ points }</p>
        { alreadyLogin && <button className='vote-button fa fa-arrow-up'/> }
        { alreadyLogin && <button className='vote-button fa fa-arrow-down'/> }
        { author ? <p>{ `Author: ${author}` }</p>: ''}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    alreadyLogin: state.user.get('alreadyLogin')
  }
}

export default connect(mapStateToProps)(Post)
