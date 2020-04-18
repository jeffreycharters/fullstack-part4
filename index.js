const app = require('./app')
const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)



app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})