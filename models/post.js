import mongoose from 'mongoose'

const { Schema } = mongoose

const Post = new Schema({
  name: String,
  description: String,
  points: Number,
  author: String,
  content: String
})

export default mongoose.model('Post', Post)
