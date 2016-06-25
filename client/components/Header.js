import React, { Component } from 'react'
import { Link } from 'react-router'

import 'styles/header.css'

export default class Container extends Component {
  render() {
    return (
      <nav className='Header'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </nav>
    )
  }
}
