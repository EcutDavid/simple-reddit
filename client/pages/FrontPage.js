import React, { Component } from 'react'
import request from 'superAgent'

import Post from 'components/Post'
import PostEditor from 'components/PostEditor'
import { apiServiceUrl } from 'config/api'

export default class FrontPage extends Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    request
      .get(`${apiServiceUrl}post`)
      .end((err, res) => {
        if (err) {
          console.error(err)
          return
        }
        this.setState({ posts: res.body })
      })
  }

  render() {
    const { posts } = this.state
    return (
      <div>
        <h2>Home page</h2>
        {
          posts.map((d, i) => (
            <Post
              author={ d.author }
              description={ d.description }
              key={ i }
              id={ d.id }
              name={ d.name }
              points={ d.points }
            />
          ))
        }
        <PostEditor />
      </div>
    )
  }
}
