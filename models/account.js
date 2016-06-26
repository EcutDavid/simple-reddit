import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

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

export default mongoose.model('Account', Account)
