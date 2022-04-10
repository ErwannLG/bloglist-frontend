import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

// describe('<Blog />', () => {
//   beforeEach(() => {
//     const blog = {
//       title: 'Blog title',
//       author: 'Blog author',
//       url: 'https://www.blog.com/blog-title',
//       likes: '3',
//     }
//   })


// const component = render(<Blog blog={blog} />)

test('renders blogs with only title and author by default', () => {
  const blog = {
    title: 'Blog Title',
    author: 'Blog author',
    url: 'https://www.blog.com/blog-title',
    likes: '366',
  }

  render(<Blog blog={blog} />)
  screen.debug()

  const title = screen.queryByText(/Blog Title/)
  expect(title).toBeInTheDocument()
  const author = screen.queryByText(/Blog author/)
  expect(author).toBeInTheDocument()
  const url = screen.queryByText(/https:\/\/www\.blog\.com\/blog-title/)
  expect(url).not.toBeInTheDocument()
  const likes = screen.queryByText(/366/)
  expect(likes).not.toBeInTheDocument()
})
