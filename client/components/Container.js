import React, { Component } from 'react'
import Header from './Header'

export default class Container extends Component {
  render() {
    return (
      <div>
        <Header />
        { this.props.children }
      </div>
    )
  }
}
