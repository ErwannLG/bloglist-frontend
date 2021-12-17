

import React from 'react'

const BlogDetails = ({blog}) => {
  console.log('blog.user', blog.user);
  return (
    <div>
      {blog.url}
      <div>{blog.likes} likes</div>
      <div>{blog.user.name}</div>
    </div>
  )
}



export default BlogDetails