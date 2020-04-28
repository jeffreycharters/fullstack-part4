const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const blogSchema = mongoose.Schema({
    title: { type: String, minlength: 5, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    author: { type: String, minLength: 3, required: true },
    url: { type: String, minlength: 10, required: true },
    likes: { type: Number, default: 0 }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)