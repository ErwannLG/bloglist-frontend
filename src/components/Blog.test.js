import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component, mockHandlerDetails, mockHandlerLike

  beforeEach(() => {
    const blog = {
      title: 'Blog title',
      author: 'Blog author',
      url: 'https://www.blog.com/blog-title',
      likes: '3',
      user: { username: 'Bob' },
    }
    const connectedUser = {
      username: 'Bob',
    }

    mockHandlerDetails = jest.fn()
    mockHandlerLike = jest.fn()


    component = render(
      <Blog
        blog={blog}
        toggleDetails={mockHandlerDetails}
        connectedUser={connectedUser}
        addLike={mockHandlerLike}
      />)

    screen.debug()
  })



  test('renders blogs with only title and author by default', () => {
    expect(component.container).toHaveTextContent('Blog title')
    expect(component.container).toHaveTextContent('Blog author')
    expect(component.container).not.toHaveTextContent('https://www.blog.com/blog-title')
    expect(component.container).not.toHaveTextContent('3')
  })

  test('blog\'s url and number of likes are shown when the details button has been clicked', async () => {
    const detailsButton = screen.getByText('show')
    fireEvent.click(detailsButton)
    screen.debug()

    expect(component.container).toHaveTextContent('https://www.blog.com/blog-title')
    expect(component.container).toHaveTextContent('3')
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {

    const detailsButton = screen.getByText('show')
    fireEvent.click(detailsButton)

    const addLikeButton = screen.getByText('like')
    fireEvent.click(addLikeButton)
    fireEvent.click(addLikeButton)

    screen.debug()

    expect(component.container).toHaveTextContent('like')

    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })
})