import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('The form calls the event handler it received as props with the right details', () => {
  const createBlog = jest.fn()

  const content = render(<BlogForm createBlog={createBlog} />)

  const titleInput = content.container.querySelector('#title-input')
  const authorInput = content.container.querySelector('#author-input')
  const urlInput = content.container.querySelector('#url-input')
  const sendButton = screen.getByText('create')

  fireEvent.change(titleInput, {
    target: { value: 'This is the title' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Author Name' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://awesomeblog.com/article/' }
  })

  expect(titleInput.value).toBe('This is the title')
  expect(authorInput.value).toBe('Author Name')
  expect(urlInput.value).toBe('https://awesomeblog.com/article/')

  fireEvent.submit(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'This is the title',
    author: 'Author Name',
    url: 'https://awesomeblog.com/article/'
  })
})
