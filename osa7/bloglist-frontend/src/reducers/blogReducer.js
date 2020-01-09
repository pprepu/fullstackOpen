/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG':
    const updatedBlog = action.data
    return state.map(blog => {
      return blog.id !== updatedBlog.id ? blog : updatedBlog
    })
  case 'REMOVE_BLOG':
    const removedBlog = action.data
    return state.filter(blog => {
      return blog.id !== removedBlog.id
    })
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    console.log(createdBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: createdBlog
    })
  }
}

export const likeBlog = (blog, user) => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(likedBlog)
    console.log('updblog1 ', updatedBlog)
    updatedBlog.user = user

    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const removeBlog = (blog) => {
  const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
  if (ok) {
    return async dispatch => {
      //const updatedBlog = await blogService.remove(blog)
      console.log('at remove, blog: ', blog)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog
      })
    }
  }
}



export default blogReducer