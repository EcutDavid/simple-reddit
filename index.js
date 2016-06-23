import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import { Strategy } from 'passport-local'

import routes from './routes/index'
import Account from './models/account'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

//middleware settings
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('express-session')({
    secret: 'reddit like website',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

passport.use(new Strategy(Account.authenticate()))
passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

mongoose.connect('mongodb://localhost/passport_local_mongoose_express4')

app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

app.use(function(err, req, res) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})

app.listen(3000)

console.log('Server running on http://localhost:3000')
