const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "The first blog post there is!",
        url: "https://www.radriders.ca/blog/01",
        likes: 23487,
        authorId: "dfhj46"
    },
    {
        title: "The second blog post there is!",
        url: "https://www.radriders.ca/blog/02",
        likes: 6,
        authorId: "dglkjdsfkjg"
    }
]


const setInitialBlogs = userIds => {
    const blogList = [
        {
            title: "The first blog post there is!",
            url: "https://www.radriders.ca/blog/01",
            likes: 23487,
            authorId: userIds[0]
        },
        {
            title: "The second blog post there is!",
            url: "https://www.radriders.ca/blog/02",
            likes: 6,
            authorId: userIds[1]
        }
    ]
    return blogList
}

const initialUsers = [
    {
        username: "shrednik",
        name: "boobs pete",
        password: "password"
    },
    {
        username: "username",
        name: "username",
        password: "username"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    setInitialBlogs,
    initialUsers,
    initialBlogs,
    blogsInDb
}