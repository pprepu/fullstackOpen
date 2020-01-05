import React, { useState, useEffect } from 'react'
import { useField } from './hooks'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

function App() {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [messageIsError, setMessageIsError] = useState(true)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginName = useField('text')
  const loginPassword = useField('password')

  //lisäämiseen
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, isError) => {
    setErrorMessage(message)
    setMessageIsError(isError)

    setTimeout(() => { setErrorMessage(null) }, 5000)
  }

  const logOut = () => {

    window.localStorage.clear()
    setUser(null)

    notify('You have logged out!', false)

  }


  const handleSubmit = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService.create(blogObject)
      .then(blog => {
        blog.user = user

        setBlogs(blogs.concat(blog))

        setTitle('')
        setAuthor('')
        setUrl('')

        notify(`a new blog ${blog.title} by ${blog.author} has been added`, false)

      }).catch((error) => {
        //console.log(error)
        //console.log(error.response.status)
        //setTitle('')
        //setAuthor('')
        //setUrl('')
        console.log(error)
        notify('could not add a blog with provided fields!', true)
      })
  }

  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleAuthorChange = (e) => setAuthor(e.target.value)
  const handleUrlChange = (e) => setUrl(e.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('Wrong credentials!', true)
    }



  }

  if (user === null) {
    return (
      <div className='loginView'>

        <Notification message={errorMessage} messageIsError={messageIsError} />

        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={( { target } ) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={( { target } ) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div className="App">
      <Notification message={errorMessage} messageIsError={messageIsError} />

      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={() => logOut()}>LOGOUT</button> </p>

      <Togglable buttonLabel='new blog'>
        <BlogForm
          handleSubmit={handleSubmit}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
          title={title}
          author={author}
          url={url}
        />
        <p></p>
      </Togglable>
      <p>Total number of blogs: {blogs.length}</p>


      {blogs
        .sort((a, b) => (b.likes >= a.likes) ? 1 : -1)
        .map(blog => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user} />
        )}

    </div>
  )
}

export default App
