import React from 'react';
import {
  addVote
} from '../reducers/anecdoteReducer'
import {
  messageChange
} from '../reducers/messageReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes

  const showNotification = message => {
    props.store.dispatch(messageChange(message))
  
    setTimeout(() => props.store.dispatch(messageChange('')), 5000)
  
  }
  
  const vote = (id, content) => {
    props.store.dispatch(addVote(id))
    showNotification(`you voted "${content}"`)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
      .sort((a, b) => a.content > b.content ? -1 : 1)
      .sort((a, b) => a.votes >= b.votes ? -1 : 1)
      .filter(anecdote => anecdote.content.toUpperCase()
        .includes(props.store.getState().filter.toUpperCase()))
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default AnecdoteList