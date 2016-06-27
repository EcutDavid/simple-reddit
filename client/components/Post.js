import React, { Component } from 'react'
import { Link } from 'react-router'

import 'styles/post.scss'

export default class Post extends Component {
  render() {
    const { name, description, points, id, author } = this.props
    return (
      <div className='Post'>
        <Link to={`article/${id ? id : '0'}`} className='title'>{ name }</Link>
        <p className='description'>{ description }</p>
        <p className='points'>{ points }</p>
        <button className='vote-button fa fa-arrow-up'/>
        <button className='vote-button fa fa-arrow-down'/>
        { author ? <p>{ `Author: ${author}` }</p>: ''}
      </div>
    )
  }
}
