import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

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

    const mockHandlerDetails = jest.fn()

    component = render(<Blog blog={blog} toggleDetails={mockHandlerDetails} connectedUser={connectedUser} />)

    screen.debug()
  })



  test('renders blogs with only title and author by default', () => {
    expect(component.container).toHaveTextContent('Blog title')
    expect(component.container).toHaveTextContent('Blog author')
    expect(component.container).not.toHaveTextContent('https://www.blog.com/blog-title')
    expect(component.container).not.toHaveTextContent('3')
  })

  test('blog\'s url and number of likes are shown when the details button has been clicked', async () => {
    const button = screen.getByText('show')
    userEvent.click(button)
    screen.debug()

    expect(component.container).toHaveTextContent('https://www.blog.com/blog-title')
    expect(component.container).toHaveTextContent('3')
  })

})