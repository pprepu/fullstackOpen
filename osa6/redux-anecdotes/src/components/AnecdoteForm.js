import React from 'react';
import {
  addAnecdote
} from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addNew = (event) => {
    event.preventDefault()
    props.store.dispatch(addAnecdote(event.target.anecdote.value))

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

export default AnecdoteForm