import React, { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { connect } from 'react-redux'

import { notificationChange } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

//styles
import { Container, Menu, Button } from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, Link
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
      <Container>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input data-cy="username" {...username}/>
          </div>
          <div>
            password
            <input data-cy="password" {...password} />
          </div>
          <button type="submit" data-cy="submit">login</button>
        </form>
      </Container>
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
    <Container>
      <Router>
        <div>
          <Menu inverted>
            <Menu.Item link>
              <Link to="/">blogs</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link to="/users">users</Link>
            </Menu.Item>
            <Menu.Item link>
              {props.user
                ? <em>{props.user.name} logged in</em>
                : <Link to="/login">login</Link>
              }
            </Menu.Item>
            <Menu.Item>
              <Button onClick={handleLogout}>logout</Button>
            </Menu.Item>
          </Menu>
        </div>
        <div>
          <Notification />
        </div>
        <Route exact path="/" render={ () => (
          <div>
            <h2>blogs</h2>
            <Togglable buttonLabel='create new' ref={newBlogRef}>
              <NewBlog notify={notify} />
            </Togglable>

            <ul>
              {props.blogs.sort(byLikes).map(blog =>
                <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author} </Link></li>
              )}
            </ul>
          </div>
        )} />
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/users/:id" render={ ({ match }) =>
          <UserInfo user={userById(match.params.id)} />
        } />
        <Route exact path="/blogs/:id" render={ ({ match }) => {
          const currentBlog = blogById(match.params.id)
          return (
            <Blog
              blog={currentBlog}
              notify={notify} />
          )
        }
        } />
      </Router>
    </Container>

  )
}
//
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