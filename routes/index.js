import express from 'express'
import Account, { isAuthenticated } from '../models/account'
import Post from '../models/post'

const router = express.Router()
export default router

router.get('/post', function(req, res) {
  Post.find((err, posts) => {
    if (err) {
      return res.json(err)
    }
    return res.json(posts)
  })
})

router.put('/post', isAuthenticated, function(req, res) {
  const { id, pointInc } = req.body
  Post.findOne({ _id: id }, (err, post) => {
    if (err) {
      return res.json(err)
    }
    if (post && pointInc) {
      post.points = Number.parseInt(post.points) + Number.parseInt(pointInc)
      post.save()
    }
    return res.json(post)
  })
})

router.post('/post', isAuthenticated, function(req, res) {
  const { description, name, points, author, content } = req.body
  const post = new Post({ author, content, description, name, points })
  Post.find({ name }, (err, posts) => {
    if (err) {
      return res.json(err)
    }
    if (typeof posts === 'object' && posts.length > 0) {
      return res.json({ err: 'post with same name alreday exist' })
    }
    post.save(function (err) {
      if (err) {
        return res.json(err)
      }
      return res.json(name)
    })
  })
})

router.post('/register', function(req, res) {
  const { username, password } = req.body
  Account.find({username}, (err, users) => {
    if (err) {
      return res.json({err})
    }
    if (typeof users === 'object' && users.length >= 1) {
      return res.json({err: 'User already exist'})
    }
    const account = new Account({ username, password })
    account.save(function(err) {
        if (err) {
          return res.json({ error: err.message })
        }
        return res.json({ data: account })
      }
    )
  })
})

router.post('/login', isAuthenticated, function(req, res) {
  Account.findOne({ username: req.user.username }, (err, user) => {
    if (err) {
      return res.json({err})
    }
    return res.json({ data: user })
  })
})
