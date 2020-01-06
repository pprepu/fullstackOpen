import React from 'react';
import anecdoteService from '../services/anecdotes'
import {connect} from 'react-redux'
import {
  addAnecdote
} from '../reducers/anecdoteReducer'

import {
  setNotification
} from '../reducers/messageReducer'

const AnecdoteForm = (props) => {

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(content)

    props.setNotification(`you added "${content}"`, 5)  }

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
  setNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
  )(AnecdoteForm)

export default ConnectedAnecdoteForm