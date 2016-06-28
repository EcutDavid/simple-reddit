import React, { Component } from 'react'
import request from 'superagent'

import { apiServiceUrl } from 'config/api'
import CommentEditor from 'components/CommentEditor'
import 'styles/article.scss'

export default class Article extends Component {
  constructor() {
    super()
    this.state = {
      name,
      content: '',
      author: undefined,
      comments: []
    }
  }

  componentWillMount() {
    this.updateArticle()
  }

  updateArticle() {
    const { id } = this.props.params
    request
      .post(`${apiServiceUrl}article`)
      .send({ id })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
          return
        }
        if (res.body.err) {
          console.error(res.body.err)
          return
        }
        const { name, author, content, comments } = res.body.data
        this.setState({ name, author, content, comments })
      })
  }

  render() {
    const { id } = this.props.params
    const { content, author, name, comments } = this.state
    return (
      <div className='Article'>
        { name && <h1>{ name }</h1> }
        { <p className='content post'>{ content }</p> }
        { author && <p className='author'>By: { author }</p> }
        <ul className='comment-area'>
          {
            comments.map((d, key) => {
              return (
                <li key={key} className='comment'>
                  <p className='content'>{ d.content }</p>
                  <p className='author'>By { d.author }</p>
                </li>
              )
            })
          }
        </ul>
        <CommentEditor
          commentUploaded={ this.updateArticle.bind(this) }
          postId={ id }
        />
      </div>
    )
  }
}
