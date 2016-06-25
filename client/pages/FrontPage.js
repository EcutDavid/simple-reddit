import React, { Component } from 'react'

import Post from 'components/Post'

const mockData = [
  {
    name: 'First Post',
    description: 'A simple test post',
    points: 5,
    id: 5
  }, {
    name: 'British Leave EU',
    description: 'As you know......',
    points: 50,
    id: 4
  }, {
    name: 'Built A Simplest Reddit Like Wesbsite in 7 Days',
    description: '......',
    points: 0,
    id: 1
  }
]

export default class FrontPage extends Component {
  render() {
    return (
      <div>
        <h2>Home page</h2>
        {
          mockData.map((d, i) => (
            <Post
              description={ d.description }
              key={ i }
              id={ d.id }
              name={ d.name }
              points={ d.points }
            />
          ))
        }
      </div>
    )
  }
}
