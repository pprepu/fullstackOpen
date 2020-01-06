import React from 'react';
import anecdoteService from '../services/anecdotes'
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
  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(content)

    showNotification(`you added "${content}"`)
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