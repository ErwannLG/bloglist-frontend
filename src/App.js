import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from "./components/Notification"
import Toggleable from "./components/Toggleable"
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBloglistappUser')
    window.location.reload()
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const addBlog = (blogObject) => {
    blogService.createBlog(blogObject).then((createdBlog) => {
      setBlogs(blogs.concat(createdBlog))
      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })

  }

  const blogForm = () => (
    <Toggleable buttonLabel="create new blog">
      <BlogForm createBlog={addBlog} />
    </Toggleable>
  )

  const addLike = async blog => {
    try {
      // console.log('blog :', blog);
      // console.log('blog.likes :', blog.likes);
      blog.likes++
      await blogService.updateBlog(blog)
      setBlogs(blogs.map( blog => blog ))
    } catch (error) {
      console.log('Could not add a like: ', error);
    }
  }

  const deleteBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog)
        setBlogs(blogs.filter(b => b.id !==blog.id))
      } catch (error) {
        console.log('Could not remove blog: ', error);
      }
    }
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {blogs
            .sort((a,b) => b.likes - a.likes)
            .map(blog =>
            <Blog key={blog.id} blog={blog} user={blog.user} addLike={addLike} deleteBlog={deleteBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App