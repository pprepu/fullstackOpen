import React from 'react'

const BlogForm = ({handleSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, 
  title, author, url}) => {

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input onChange={handleTitleChange} value={title} />
        </div>
        <div>
          author: <input onChange={handleAuthorChange} value={author} />
        </div>
        <div>
          url: <input onChange={handleUrlChange} value={url} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm