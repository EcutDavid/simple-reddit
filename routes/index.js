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
  Account.register(new Account({ username }),
    password, function(err) {
      if (err) {
        return res.json({ error: err.message })
      }

      passport.authenticate('local')(req, res, function () {
        req.session.save(function (err) {
          if (err) {
            return res.json({ err })
          }
          return res.json({ username })
        })
      })
    }
  )
})

router.post('/register', function(req, res) {
  const { username, password } = req.body
  Account.register(new Account({ username : username }),
    password, function(err) {
      if (err) {
        return res.json({ error: err.message })
      }

      passport.authenticate('local')(req, res, function () {
        req.session.save(function (err) {
          if (err) {
            return res.json({ err })
          }
          return res.json({ username })
        })
      })
    }
  )
})

router.get('/login', function(req, res) {
  res.render('login', { user : req.user })
})

//What should I send in front-end for passport.authenticate('local')?
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/')
})

router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})
