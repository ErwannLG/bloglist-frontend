import React, { useState } from 'react'

const Blog = ({blog}) => {
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

  if(showDetails) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>hide</button>
        <div>{blog.url}</div>
        <div>{blog.likes} likes</div>
        {/* <div>{blog.user.name}</div> */}
        <div>{blog.user.username}</div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>show</button>
      </div>
    )
  }
}

export default Blog