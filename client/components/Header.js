import React, { Component } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { userLogout } from 'actions/userActions'
import 'styles/header.scss'

export class Container extends Component {
  logout() {
    const { userLogout } = this.props
    userLogout()
  }

  render() {
    const { alreadyLogin } = this.props
    return (
      <nav className='Header'>
        <Link to='/'>Home</Link>
        { !alreadyLogin && <Link to='/login'>Login</Link> }
        { !alreadyLogin && <Link to='/signup'>Signup</Link> }
        { alreadyLogin && <a onClick={this.logout.bind(this)}>Logout</a> }
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    alreadyLogin: state.user.get('alreadyLogin')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    userLogout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
