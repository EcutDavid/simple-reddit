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
          <Link to='/'>Home</Link>
          { !alreadyLogin && <Link className='right-float' to='/login'>Login</Link> }
          { !alreadyLogin && <Link className='right-float' to='/signup'>Signup</Link> }
          { alreadyLogin && <a className='right-float' onClick={this.logout.bind(this)}>Logout</a> }
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
