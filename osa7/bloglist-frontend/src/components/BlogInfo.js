import React from 'react'

const BlogInfo = ({ blog }) => {
  if (!blog) {
    return (
      <div>
        <p>loading... or not a valid id</p>
      </div>
    )
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author} </h2>

      <div></div>
    </div>

  )
}

export default BlogInfo