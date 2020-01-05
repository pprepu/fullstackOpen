import React, { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleShownInfo = () => {
    setShowAll(!showAll)
  }

  const sendLike = () => {
    //console.log('sendLikeeeeee to: ', blog.id)

    const updatedBlog = {
      ...blog, likes: blog.likes + 1
    }

    blogService.update(blog.id, updatedBlog)
      .then((responseBlog) => {
        setBlogs(blogs.map(
          curblog => {
            responseBlog.user = blog.user
            return curblog.id !== blog.id ? curblog : responseBlog
          }
        ))
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteBlog = () => {

    let confirmation = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)

    if (!confirmation) {
      return
    }

    blogService.deleteBlog(blog.id)
      .then(() => {
        setBlogs(blogs.filter(curBlog => curBlog.id !== blog.id)
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  const hideWhenVisible = { display: showAll ? 'none' : '' }
  const showWhenVisible = { display: showAll ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideButton = {
    display: 'none'
  }

  if (user.username === blog.user.username) {
    hideButton.display = ''
  }

  return (
    <div style={blogStyle}>
      <div className='default' style={hideWhenVisible} onClick={toggleShownInfo}>
        {blog.title} {blog.author}
      </div>
      <div className='clicked' style={showWhenVisible}>
        <p className='clickable' onClick={toggleShownInfo}>{blog.title} {blog.author}</p>
        <p><a href={`http://${blog.url}`}>{blog.url}</a></p>
        <p>{blog.likes} likes <button onClick={sendLike}>like</button></p>
        <p>added by {blog.user.name}</p>
        <p style={hideButton}><button onClick={deleteBlog}>remove</button></p>
      </div>

    </div>
  )
}
export default Blog