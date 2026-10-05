import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE': {
      return state.map(item =>
        item.id !== action.data.id ? item : action.data 
      )
     }
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}


export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const incrementVote = (anecdote) => {
  const object = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(object)
    dispatch({
      type: 'UPDATE',
      data: updatedAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer