import React, { Component } from 'react'
import ReactDom from 'react-dom'
import request from 'superAgent'

class App extends Component {
  constructor() {
    super()
    this.state = { works: undefined }
  }

  componentDidMount() {
    request
      .post('http://localhost:3000/register')
      .send({ username: 'john don2' ,password: '123123' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
          this.setState({ works: false })
        }
        this.setState({ works: true })
      });
  }

  render() {
    const { works } = this.state
    let content
    switch (works) {
      case true:
        content = (<h1>End point works</h1>)
        break
      case false:
        content = (<h1>End point broken</h1>)
        break
      default:
        content = (<h1>Application loading</h1>)
    }
    return (
      <div>
        <h1>It works</h1>
        { content }
      </div>
    )
  }
}

ReactDom.render(<App />, document.querySelector('#app'))
