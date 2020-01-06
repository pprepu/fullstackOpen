import React from 'react';
import {connect} from 'react-redux'
import {
  addAnecdote
} from '../reducers/anecdoteReducer'

import {
  messageChange
} from '../reducers/messageReducer'

const AnecdoteForm = (props) => {

  const showNotification = message => {
    props.messageChange(message)
  
    setTimeout(() => props.messageChange(''), 5000)
  
  }
  const addNew = (event) => {
    event.preventDefault()
    props.addAnecdote(event.target.anecdote.value)

    showNotification(`you added "${event.target.anecdote.value}"`)

    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  messageChange
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
  )(AnecdoteForm)

export default ConnectedAnecdoteForm