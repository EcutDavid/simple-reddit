import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Post from 'components/Post'
import PostEditor from 'components/PostEditor'
import * as postActions from 'actions/postActions'

export class FrontPage extends Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    const { getPosts } = this.props
    getPosts()
  }

  render() {
    const { posts } = this.props
    console.log(posts);
    return (
      <div>
        <h2>Home page</h2>
        {
          posts.map((d, i) => (
            <Post
              author={ d.author }
              description={ d.description }
              key={ i }
              id={ d._id }
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


function mapStateToProps(state) {
  return {
    posts: state.post.get('posts')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getPosts: postActions.getPosts
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
