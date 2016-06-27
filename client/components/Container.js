import React, { Component } from 'react'
import Header from './Header'

export default class Container extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='row small-11'>
          { this.props.children }
        </div>
      </div>
    )
  }
}
