const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})



test('blogs are returned as json', async () => {
    const blogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('id identifier is id in blogs', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('post request creates a new blog post', async () => {
    const newBlog = new Blog({
        title: "This is a new blog and it's ununique!",
        author: "Shevvy Shase",
        url: "https://www.radriders.ca/blog/03",
        likes: 2345798
    })

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(b => b.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(newBlog.title)


})

test('if likes is missing, default is 0', async () => {
    const noLikesBlog = {
        title: "This is a new blog and it's ununique!",
        author: "Shevvy Shase",
        url: "https://www.radriders.ca/blog/03"
    }

    const response = await api
        .post('/api/blogs')
        .send(noLikesBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const addedNote = response.body
    expect(addedNote.likes).toBe(0)


})

test('if title is missing, receive 400', async () => {
    const noTitleBlog = {
        author: "Shevvy Shase",
        url: "https://www.radriders.ca/blog/03"
    }

    const response = await api
        .post('/api/blogs')
        .send(noTitleBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})

test('if url is missing, receive 400', async () => {
    const noUrlBlog = {
        title: "This is a good blog post, v interesting",
        author: "Shevvy Shase"
    }

    const response = await api
        .post('/api/blogs')
        .send(noUrlBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})

test('deleting a resource removes the resource', async () => {
    const blogs = await helper.blogsInDb()
    const idToDelete = blogs[0].id

    const response = await api.delete(`/api/blogs/${idToDelete}`)

    const lessBlogs = await helper.blogsInDb()
    expect(lessBlogs).toHaveLength(blogs.length - 1)
    expect(lessBlogs.map(b => b.id)).not.toContain(idToDelete)
})

test('changing a resource changes the resource', async () => {
    const blogs = await helper.blogsInDb()
    const idToChange = blogs[0].id

    const changedBlog = {
        title: "The title is new",
        author: "Newey Duderson",
        url: "http://radriders.com/calm",
        likes: 349857398475
    }

    let changedBlogPlusId = changedBlog
    changedBlogPlusId['id'] = idToChange

    const response = await api.put(`/api/blogs/${idToChange}`)
        .send(changedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    let updatedBlog = await Blog.findById(idToChange)
    updatedBlog = updatedBlog.toJSON()

    expect(updatedBlog).toEqual(changedBlogPlusId)
})



afterAll((done) => {
    mongoose.connection.close()
    done()
})