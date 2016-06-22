import express from 'express'
import passport from 'passport'
import Account from '../models/account'


const router = express.Router()
export default router

router.get('/', function (req, res) {
    res.render('index', { user : req.user })
})

router.get('/register', function(req, res, next) {
  Account.register(new Account({ username : req.body.username }),
    req.body.password, function(err) {
      console.log(err);
      if (err) {
        console.log(err);
        return res.render('register', { error : err.message });
      } else {
        console.log('user created');
      }

      passport.authenticate('local')(req, res, function () {
        req.session.save(function (err) {
            if (err) {
                return next(err)
            }
            res.redirect('/')
        })
      })
    }
  )
})

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }),
      req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account })
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/')
        })
    })
})

router.get('/login', function(req, res) {
    res.render('login', { user : req.user })
})

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/')
})

router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})

router.get('/ping', function(req, res){
    res.status(200).send('pong!')
})
