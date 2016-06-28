import React, { Component } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as userActions from 'actions/userActions'
import 'styles/header.scss'

export class Container extends Component {
  logout() {
    const { userLogout } = this.props
    userLogout()
  }

  render() {
    const { alreadyLogin } = this.props
    return (
      <nav className='Header row small-11'>
        <div>
          <Link to='/' className='float-left'>Home</Link>
          { !alreadyLogin && <Link className='float-right' to='/login'>Log In</Link> }
          { !alreadyLogin && <Link className='float-right' to='/signup'>Sign Up</Link> }
          { alreadyLogin && <a className='float-right' onClick={this.logout.bind(this)}>Log Out</a> }
        </div>
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
    userLogout: userActions.userLogout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
