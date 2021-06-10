const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog
  .find({}).populate('user')
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!user || !user.id || user.id.toString() !== blog.user.toString()) {
      return response.status(401).json({ error: 'Token is missing or invalid' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  const index = user.blogs.indexOf(request.params.id);
  user.blogs.splice(index, 1)
  await user.save()
  response.status(204).end()
})

/*blogsRouter.put('/:id', async (request, response) => {
  const user = request.user
  const blog = request.body
  const oldBlog = await Blog.findById(request.params.id)
  console.log(blog)

  if (!user || !user.id || user.id.toString() !== oldBlog.user.toString()) {
      return response.status(401).json({ error: 'Token is missing or invalid' })
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(updatedBlog.toJSON())
})*/

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter