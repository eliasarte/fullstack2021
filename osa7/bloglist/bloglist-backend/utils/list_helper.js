var _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {

  return blogs.length === 0
    ? 0 
    : blogs.map(blog => blog.likes).reduce((i, j) => i + j)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((fav, blog) => fav.likes > blog.likes
      ? fav
      : blog
      )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  else {
    const authors = _(blogs).groupBy('author')
    .map((blogs, author) => {
      return {
        'author': author,
        'blogs': _.sumBy(blogs, () => { return 1 })
      }
    }).value()

  return _.maxBy(authors, 'blogs')
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  else {
    const authors = _(blogs).groupBy('author')
    .map((blogs, author) => {
      return {
        'author': author,
        'likes': _.sumBy(blogs, 'likes')
      }
    }).value()

  return _.maxBy(authors, 'likes')
  }
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }