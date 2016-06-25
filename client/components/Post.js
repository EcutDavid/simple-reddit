import React, { Component } from 'react'
import { Link } from 'react-router'

import 'styles/post.scss'

export default class Container extends Component {
  render() {
    const { name, description, points, id } = this.props
    return (
      <div className='Post'>
        <Link to={`article/${id ? id : '0'}`} className='title'>{ name }</Link>
        <p className='description'>{ description }</p>
        <p className='points'>{ points }</p>
        <button>upvote</button>
        <button>downvote</button>
      </div>
    )
  }
}
