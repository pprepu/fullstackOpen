import React from 'react';
import {connect} from 'react-redux'
import {
  addVote
} from '../reducers/anecdoteReducer'
import {
  setNotification
} from '../reducers/messageReducer'

const AnecdoteList = (props) => {
  
  const vote = (anecdote) => {
    props.addVote(anecdote)
    props.setNotification(`you voted "${anecdote.content}"`, 5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.visibleAnecdotes
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )
      }
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
  .sort((a, b) => a.content > b.content ? -1 : 1)
  .sort((a, b) => a.votes >= b.votes ? -1 : 1)
  .filter(anecdote => anecdote.content.toUpperCase()
    .includes(filter.toUpperCase()))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdoteList