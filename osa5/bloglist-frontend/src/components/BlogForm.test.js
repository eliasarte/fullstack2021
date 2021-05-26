import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('blogform tests', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )
  test('new blog', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'This is a nice testing blog' }
    })
    fireEvent.change(author, {
      target: { value: 'Tester' }
    })
    fireEvent.change(url, {
      target: { value: 'blog.fi/test' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('This is a nice testing blog' )
    expect(createBlog.mock.calls[0][0].author).toBe('Tester' )
    expect(createBlog.mock.calls[0][0].url).toBe('blog.fi/test' )
  })
})