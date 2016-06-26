import express from 'express'
import passport from 'passport'
import Account from '../models/account'
import Post from '../models/post'

const router = express.Router()
export default router

//TODO example of provide JSON
router.get('/', function (req, res) {
  res.json({ hello: 'world' })
})

router.get('/post', function(req, res) {
  Post.find((err, posts) => {
    if (err) {
      return res.json(err)
    }
    return res.json(posts)
  })
})

router.post('/post', function(req, res) {
  const { description, name, points } = req.body
  const post = new Post({ description, name, points })
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
    console.log(users);
    if (typeof users === 'object' && users.length >= 1) {
      return res.json({err: 'User already exist'})
    }
    const account = new Account({ username, password })
    account.save(function(err) {
        if (err) {
          return res.json({ error: err.message })
        }
        return res.json({ username })
      }
    )
  })
})

router.get('/login', function(req, res) {
  res.render('login', { user : req.user })
})

router.post('/login', function(req, res) {

})
