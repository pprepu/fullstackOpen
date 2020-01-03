import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return (
      <button onClick={onClick}>{text}</button>
  )
}

const DisplayMostVoted = ({mostVoted, votes}) => {
  return (
    <div>
      <h2> Anecdote with most votes </h2>
      <p>{mostVoted}</p>
      <p>has {votes} votes </p>
    </div>
  )
}

const App = ({anecdotes}) => {
  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));


  const selectRandom = () => {
    const randomAnecdote = Math.floor(Math.random() * Math.floor(anecdotes.length));
    return setSelected(randomAnecdote);
  }

  const voteAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    return setVotes(copy);
  }

 
  const mostVotes = votes.reduce((p, e) => { 
    return Math.max(p, e) 
  });
 
  const index = votes.indexOf(mostVotes);
  const mostVotedAnecdote = anecdotes[index];
  
  return (
    <div>
      <h2> Anecdote of the day </h2>
      <p>{anecdotes[selected]} </p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={voteAnecdote} text ='vote' />
      <Button onClick={selectRandom} text='next anecdote' />
      <DisplayMostVoted mostVoted={mostVotedAnecdote} votes={mostVotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)