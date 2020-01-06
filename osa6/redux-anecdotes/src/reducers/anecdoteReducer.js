import anecdoteService from '../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/
export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const res = await anecdoteService.update(anecdote.id, updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id: res.id }
    })
  }
}

export const addAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(data)
    dispatch({ 
      type: 'ADD', 
      data: newAnecdote
    })
  }
}

//const initialState = anecdotesAtStart.map(asObject)

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  //console.log('state now (before action): ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD':
      const newAnecdote = action.data

      //return state.concat(newAnecdote)
      return [...state, newAnecdote]
    case 'VOTE':
      const votedAnecdote = state.find(a => a.id === action.data.id)
      const updatedAnecdote = {
        ...votedAnecdote, 
        votes: votedAnecdote.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== action.data.id ? anecdote : updatedAnecdote
      )
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export default reducer