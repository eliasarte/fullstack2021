const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('2 blogs were saved', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain('React patterns')
})

test("check for id field", async () => {
	const blogs = await helper.blogsInDb()
  const checker = id => { expect(id).toBeDefined() }
  blogs.forEach(checker)
})


test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Test blog",
    author: "Testeri",
    url: "google.fi",
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogs.map(n => n.title)
  expect(title).toContain('Test blog')
})

test('likes are zero if not defined', async () => {
  const newBlog = {
    title: "Test blog2",
    author: "Testeri2",
    url: "google.fi",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

  const likes = blogs[helper.initialBlogs.length].likes
  expect(likes).toBe(0)
})


test('blog without url or title is not added', async () => {
  const newBlog = {
    author: "EmptyBlog"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const toDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${toDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain(toDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})