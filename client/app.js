import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
  render() {
    return (
      <div>
        <h1>It works</h1>
        <h1>This is react</h1>
      </div>
    )
  }
}

ReactDom.render(<App />, document.querySelector('#app'))
