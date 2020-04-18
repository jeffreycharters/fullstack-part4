const app = require('./app')
const config = require('./utils/config')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const Blog = require('./models/blog')


app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})