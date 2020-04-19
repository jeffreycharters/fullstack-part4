const invert = require('lodash/invert')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const mostLikes = blogs.reduce((max, blog) => {
        return blog.likes > max ? blog.likes : max
    }, 0)
    return blogs.find(blog => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
    const authorCount = blogs.reduce((tallies, blog) => {
        tallies[blog.author] = (tallies[blog.author] || 0) + 1
        return tallies
    }, {})

    let maxCount = 0
    Object.keys(authorCount).forEach(key => {
        maxCount = authorCount[key] > maxCount ? authorCount[key] : maxCount
    })

    return {
        author: invert(authorCount)[maxCount],
        blogs: maxCount,
    }

}


const mostLikes = (blogs) => {
    const authorCount = blogs.reduce((tallies, blog) => {
        tallies[blog.author] = (tallies[blog.author] || 0) + blog.likes
        return tallies
    }, {})

    let maxCount = 0
    Object.keys(authorCount).forEach(key => {
        maxCount = authorCount[key] > maxCount ? authorCount[key] : maxCount
    })

    return {
        author: invert(authorCount)[maxCount],
        likes: maxCount,
    }

}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}