const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
  content: mongoose.Schema.Types.Mixed,
  type: String,
  fileName: String,
  size: Number,
  title: String,
  hidden: Boolean,
  burnAfterRead: Boolean,
  syntaxHighlight: String
})

mediaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Media', mediaSchema)
