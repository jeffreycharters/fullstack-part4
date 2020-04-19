const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "The first blog post there is!",
        author: "Senyor Boogensteen",
        url: "https://www.radriders.ca/blog/01",
        likes: 23487
    },
    {
        title: "The second blog post there is!",
        author: "Shrednik Plexiglas",
        url: "https://www.radriders.ca/blog/02",
        likes: 6
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}