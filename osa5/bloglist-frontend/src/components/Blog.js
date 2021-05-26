import React, { useState } from 'react'
const Blog = ( { blog, updateBlog, user, deleteBlog } ) => {
  const [visible, setVisible] = useState(false)
  const [view, setView] = useState('View')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //const user = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
    view === 'View' ? setView('Hide') : setView('View')
  }

  return (
    <div style={blogStyle} className='simple'>
      <div>
        {blog.title}, {blog.author}
        <button onClick={toggleVisibility}>{view}</button>
      </div>
      <div style={showWhenVisible} className='details'>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes}
          <button onClick={updateBlog}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.username === user.username
          ? <button onClick={deleteBlog}>delete</button>
          : <></>
        }
      </div>
    </div>
  )
}
export default Blog