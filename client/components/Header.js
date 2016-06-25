import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import 'styles/header.scss'

export class Container extends Component {
  render() {
    const { alreadyLogin } = this.props
    return (
      <nav className='Header'>
        <Link to='/'>Home</Link>
        { !alreadyLogin && <Link to='/login'>Login</Link> }
        { !alreadyLogin && <Link to='/signup'>Signup</Link> }
        { alreadyLogin && <a href='javascript:void(0)'>Logout</a> }
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    alreadyLogin: state.user.get('alreadyLogin')
  }
}

export default connect(mapStateToProps)(Container)
