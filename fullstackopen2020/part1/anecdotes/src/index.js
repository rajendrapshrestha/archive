import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)



const App = (props) => {
  Array.prototype.repeat= function(what, L){
    while(L) this[--L]= what;
    return this;
   }
   let votesArr = [].repeat(0, anecdotes.length)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(votesArr)

  let maxIdx = votes.indexOf(Math.max(...votes));

  const handleNextClick = () => {
    let idx = Math.floor(Math.random() * anecdotes.length)
    setSelected(idx)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button onClick={handleVoteClick} text='vote' />
      <Button onClick={handleNextClick} text='next anecdote' />
      
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[maxIdx]}
      <br />
      has {votes[maxIdx]} votes
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