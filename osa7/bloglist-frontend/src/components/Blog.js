import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const [expanded, setExpanded] = useState(false)

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
    props.removeBlog(props.blog)
    props.notify(`blog ${props.blog.title} by ${props.blog.author} removed`)
  }

  const details = () => (
    <div className='details'>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>{props.blog.likes} likes
        <button onClick={() => likeB()}>like</button>
      </div>
      <div>added by {props.blog.user.name}</div>
      {props.creator &&(<button onClick={() => removeB()}>remove </button>)}
    </div>
  )

  return (
    <div style={blogStyle}>
      <div onClick={() => setExpanded(!expanded)} className='name'>
        {props.blog.title} {props.blog.author}
      </div>
      {expanded && details()}
    </div>
  )}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  creator: PropTypes.bool.isRequired
}

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
