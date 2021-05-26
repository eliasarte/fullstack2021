import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [messager, setMessager] = useState(null)
  const [errorState, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message, error }) => {
    if (message === null) {
      return null
    }

    if (error) {
      return (
        <div className="error">
          {message}
        </div>
      )
    }

    return (
      <div className="messager">
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
    } catch (exception) {
      setMessager('Wrong credentials.')
      setError(true)
      setTimeout(() => {
        setMessager(null)
        setError(false)
      }, 5000)
    }
  }

  const refreshBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      blogFormRef.current.toggleVisibility()
      setMessager(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      refreshBlogs()
      setTimeout(() => {
        setMessager(null)
      }, 5000)
    } catch(exception) {
      setMessager('Error creating a blog')
      setError(true)
      setTimeout(() => {
        setMessager(null)
        setError(false)
      }, 5000)
    }
  }

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const addLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    try {
      blogService.setToken(user.token)
      const updatedBlog = await blogService.update(id, newBlog)
      setBlogs(blogs.map(blog =>
        blog.id !== id
          ? blog : updatedBlog))
      refreshBlogs()
    } catch (exception) {
      console.log(exception)
      setMessager('Error liking blog')
      setError(true)
      setTimeout(() => {
        setMessager(null)
        setError(false)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      try {
        blogService.setToken(user.token)
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setMessager(`${blog.title} by ${blog.author} was removed`)
        refreshBlogs()
        setTimeout(() => {
          setMessager(null)
        }, 5000)
      } catch (exception) {
        setMessager('Error while removing blog')
        setError(true)
        setTimeout(() => {
          setMessager(null)
          setError(false)
        }, 5000)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={messager} error={errorState} />
        <LoginForm handleLogin={handleLogin} username={username}
          setUsername={setUsername} password={password} setPassword={setPassword}/>
      </div>
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={messager} error={errorState} />
      <p>
        {user.name} logged in
        <button onClick={logout}>log out</button>
      </p>
      {blogForm()}
      {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user}
          updateBlog={() => addLike(blog.id)}
          deleteBlog={() => deleteBlog(blog.id)}
        />
      )}
    </div>
  )
}

export default App