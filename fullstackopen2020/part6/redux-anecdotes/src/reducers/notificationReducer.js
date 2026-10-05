
const initialState = 'Welcome to the Anecdotes. Messages will go here'

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
       case 'NEW_NOTIFICATION':
        return action.notification
      default:
        return state
    }
  }

  export const setNotification = (message, time) => {
    return async dispatch => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        notification: message,
      })
      setTimeout(() => {
        dispatch({
          type: 'NEW_NOTIFICATION',
          notification: null,
        })
      }, time*1000)
    }
    
  }

  export const notificationChange = notification => {
    return {
      type: 'NEW_NOTIFICATION',
      notification,
    }
  }

  export default notificationReducer