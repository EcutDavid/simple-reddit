import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import { BasicStrategy } from 'passport-http'
import passport from 'passport'

const { Schema } = mongoose

const Account = new Schema({
  username: String,
  password: String
})

Account.pre('save', function(next) {
  const user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

Account.methods.verifyPassword = function(password, next) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return next(err)
    next(null, isMatch)
  })
}

const model = mongoose.model('Account', Account)

passport.use(new BasicStrategy(
  function(username, password, next) {
    model.findOne({ username }, function (err, user) {
      if (err) { return next(err) }

      // No user found with that username
      if (!user) { return next(null, false) }

      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return next(err) }
        if (!isMatch) { return next(null, false) }

        // Success
        return next(null, user)
      })
    })
  }
))

export const isAuthenticated = passport.authenticate('basic', {
  session : false
})

export default model
