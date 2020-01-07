
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer.js'
import blogReducer from './reducers/blogReducer.js'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer
})
const store = createStore(reducer)

const renderApp = () => {
  ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)

//ReactDOM.render(<App />, document.getElementById('root'))