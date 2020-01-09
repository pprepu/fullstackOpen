import React, { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import BlogInfo from './components/BlogInfo'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { connect } from 'react-redux'

import { notificationChange } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
  }, [])
  // console.log('user@start', props.user)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.login(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    console.log(props.notification)
    if (type === 'success') {
      props.notificationChange(message, false)
      setTimeout(() => props.notificationChange('', false), 5000)
    } else {
      props.notificationChange(message, true)
      setTimeout(() => props.notificationChange('', true), 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.login(user)
    } catch (exception) {
      notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {

    props.logout()
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  if (props.user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username}/>
          </div>
          <div>
            salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

  const userById = id => {
    // console.log(props.users)
    // console.log(id)
    const userFound = props.users.find(user => user.id === id)
    // console.log('found: ', userFound)
    return userFound
  }

  const blogById = id => {
    // console.log(props.users)
    // console.log(id)
    const blogFound = props.blogs.find(blog => blog.id === id)
    return blogFound
  }

  const newBlogRef = React.createRef()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{props.user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Router>
        <Route exact path="/" render={ () => (
          <div>
            <Togglable buttonLabel='create new' ref={newBlogRef}>
              <NewBlog notify={notify} />
            </Togglable>

            {props.blogs.sort(byLikes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                creator={blog.user.username === props.user.username}
                notify={notify}
              />
            )}
          </div>
        )} />
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/users/:id" render={ ({ match }) =>
          <UserInfo user={userById(match.params.id)} />
        } />
        <Route exact path="/blogs/:id" render={ ({ match }) =>
          <BlogInfo blog={blogById(match.params.id)} />
        } />
      </Router>
    </div>

  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  notificationChange,
  initializeBlogs,
  login,
  logout,
  initializeUsers
}
const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default connectedApp