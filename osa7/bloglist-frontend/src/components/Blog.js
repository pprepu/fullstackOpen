import React from 'react'
import { connect } from 'react-redux'

import { likeBlog, removeBlog } from '../reducers/blogReducer'

//styles
import { Button } from 'semantic-ui-react'

const Blog = (props) => {

  if (!props.blog) {
    return (
      <div>
        <p>loading... or not a valid id</p>
      </div>
    )
  }

  const creator = props.blog.user.username === props.user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeB = () => {
    props.likeBlog(props.blog, props.blog.user)
    props.notify(`blog ${props.blog.title} by ${props.blog.author} liked!`)
  }

  const removeB = () => {
    const ok = window.confirm(`remove blog ${props.blog.title} by ${props.blog.author}`)
    if (ok) {
      props.removeBlog(props.blog)
      props.notify(`blog ${props.blog.title} by ${props.blog.author} removed`)
    }
  }

  const details = () => (
    <div className='details'>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>{props.blog.likes} likes
        <button data-cy="like" onClick={() => likeB()}>like</button>
      </div>
      <div>added by {props.blog.user.name}</div>
      {creator &&(<Button onClick={() => removeB()}>remove </Button>)}
    </div>
  )

  return (
    <div style={blogStyle}>
      <h3 className='name'>
        {props.blog.title} by {props.blog.author}
      </h3>
      {details()}
    </div>
  )}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  likeBlog, removeBlog
}
const connectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default connectedBlog
