import React, { useState } from 'react'

const Blog = ({
  blog,
  addLike,
  deleteBlog,
  // connectedUser
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: '#3e84f5',
    cursor: 'pointer'
  }

  // const removeButtonStyleDisabled = {
  //   // display: 'none'
  // }

  if(showDetails) {
    return (
      <div className='detailedBlog' style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>hide</button>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button onClick={() => addLike(blog)}>like</button></div>
        <div>{blog.user.username}</div>
        {/* {connectedUser.username === blog.user.username
          ? <button style={removeButtonStyle} id="remove" onClick={() => deleteBlog(blog)}>remove</button>
          : <button style={removeButtonStyleDisabled} ></button>
        } */}
        <button style={removeButtonStyle} id="remove" onClick={() => deleteBlog(blog)}>remove</button>

      </div>
    )
  } else {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>show</button>
      </div>
    )
  }
}

export default Blog