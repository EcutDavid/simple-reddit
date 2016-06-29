import express from 'express'

import Account, { isAuthenticated } from '../models/account'
import Post from '../models/post'
import Comment from '../models/comment'

const router = express.Router()
export default router

//posts

router.get('/post', (req, res) => {
  Post.find((err, posts) => {
    if (err) {
      return res.json({ err })
    }
    return res.json({ data: posts })
  })
})

router.put('/post', isAuthenticated, (req, res) => {
  const { id, pointInc } = req.body
  Post.findOne({ _id: id }, (err, post) => {
    if (err) {
      return res.json({ err })
    }
    if (post && pointInc) {
      post.points = Number.parseInt(post.points) + Number.parseInt(pointInc)
      post.save()
    }
    return res.json({ data: post })
  })
})

router.post('/post', isAuthenticated, (req, res) => {
  const { description, name, points, author, content } = req.body
  const post = new Post({ author, content, description, name, points })
  Post.find({ name }, (err, posts) => {
    if (err) {
      return res.json({ err })
    }
    if (typeof posts === 'object' && posts.length > 0) {
      return res.json({ err: 'post with same name alreday exist' })
    }
    post.save(function (err) {
      if (err) {
        return res.json({ err })
      }
      return res.json({ data: post })
    })
  })
})

// accounts

router.post('/register', (req, res) => {
  const { username, password } = req.body
  Account.find({username}, (err, users) => {
    if (err) {
      return res.json({ err })
    }
    if (typeof users === 'object' && users.length >= 1) {
      return res.json({err: 'User already exist'})
    }
    const account = new Account({ username, password })
    account.save(function(err) {
        if (err) {
          return res.json({ err })
        }
        return res.json({ data: account })
      }
    )
  })
})

router.post('/login', isAuthenticated, (req, res) => {
  Account.findOne({ username: req.user.username }, (err, user) => {
    if (err) {
      return res.json({ err })
    }
    return res.json({ data: user })
  })
})

// comment

router.post('/comment', isAuthenticated, (req, res) => {
  const { content, postId, author } = req.body
  const comment = new Comment({ content, postId, author })
  comment.save(err => {
    if (err) {
      return res.json({ err })
    }
    return res.json({ data: comment })
  })
})

// article

//TODO: change this method to get
router.post('/article', (req, res) => {
  const { id } = req.body
  Post.findOne({ _id: id }, (err, post) => {
    if (err) {
      return res.json({ err })
    }
    Comment.find({ postId: id }, (err, comments) => {
      if (err) {
        return res.json({ err })
      }
      return res.json({ data: {
        name: post.name,
        author: post.author,
        content: post.content,
        comments
      }})
    })
  })
})
