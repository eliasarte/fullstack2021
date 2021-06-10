import React, { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import AllUsers from './components/AllUsersView'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from "./reducers/notificationReducer"

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const padding = {
    padding: 5
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
        dispatch(setNotification('Wrong credentials.', 5))
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
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5))
      refreshBlogs()
    } catch(exception) {
      dispatch(setNotification('Error creating a blog', 5))
    }
  }

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel="new blog" id='new-blog' ref={blogFormRef}>
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
      dispatch(setNotification('Liked blog', 5))
      refreshBlogs()
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('Error liking blog', 5))
    }
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      try {
        blogService.setToken(user.token)
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        dispatch(setNotification(`${blog.title} by ${blog.author} was removed`, 5))
        refreshBlogs()
      } catch (exception) {
          dispatch(setNotification('Error while removing blog', 5))
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
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
      <h2>Blogs</h2>
      <Notification />
      <Router>
      <div className='navigation'>
        <Link style={padding} to="/">All blogs</Link>
        <Link style={padding} to="/users">All users</Link>
        {user.name} logged in
        <button onClick={logout}>log out</button>
      </div>

      <Switch>
        <Route path="/users">
          <AllUsers />
        </Route>
        <Route path="/">
          {blogForm()}
          {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog =>
            <Blog key={blog.id} blog={blog} user={user}
            updateBlog={() => addLike(blog.id)}
            deleteBlog={() => deleteBlog(blog.id)}
            />
          )}
        </Route>
      </Switch>
    </Router>
  </div>
  )
}

export default App