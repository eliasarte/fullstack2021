import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('blog tests', () => {
  const blog = {
    title: 'This is a test blog',
    author: 'Tester',
    url: 'test.fi/1',
    likes: 69,
    user: {
      username: 'test'
    }
  }
  let component
  const mockHandler = jest.fn()
  const user = {
    name: 'tester',
    username: 'test'
  }
  window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )
  })

  test('simple: only render title and author', () => {
    const onlyTitleAndAuthor = component.container.querySelector('.simple')
    const details = component.container.querySelector('.details')

    expect(component.container).toHaveTextContent(
      'This is a test blog'
    )
    expect(onlyTitleAndAuthor).toBeVisible()
    expect(details).not.toBeVisible()
  })

  test('details on click', () => {
    const button = component.getByText('View')
    const details = component.container.querySelector('.details')
    fireEvent.click(button)

    expect(details).toBeVisible()
  })

  test('like handler is called correctly', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})