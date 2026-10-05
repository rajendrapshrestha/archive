const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.pre('validate', function(next)  {
  if ( this.title == undefined && this.url == undefined ) {
    this.invalidate('Must set at least Title or URL')
  }
  next()
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)