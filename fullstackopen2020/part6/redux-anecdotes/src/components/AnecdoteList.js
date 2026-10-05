import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  incrementVote } from '../reducers/anecdoteReducer'
import {  setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const Anecdote = ({ anecdote, handleVote }) => {
    return(
        <div key={anecdote.id}> {anecdote.content} has {anecdote.votes}
            <button onClick={handleVote}>vote</button>
        </div>
    )
  }
  
  const Anecdotes = () => {
    const dispatch = useDispatch()
    let anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    if (filter != null && filter !== '') {
        anecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
    }
    const vote = (anecdote) => {
        dispatch(incrementVote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
          <h2>Anecdotes</h2>
          <Filter />
          {anecdotes.map(anecdote =>
            <Anecdote 
                key={anecdote.id} 
                anecdote={anecdote} 
               handleVote={() => vote(anecdote)}
            />
          )}
        </div>
      )
  }

  export default Anecdotes