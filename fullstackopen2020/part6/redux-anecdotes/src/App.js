import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  },[dispatch]) 

   return (
    <div>
      <Notification />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App