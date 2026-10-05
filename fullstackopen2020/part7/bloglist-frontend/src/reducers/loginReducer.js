import loginService from '../services/login' 
import {  setNotification } from './notificationReducer'

const loginReducer = (state=null, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.user
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const login =  (username, password) => {
    return async dispatch => {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN_SUCCESS',
        user: user,
      })
      dispatch(setNotification('Successful login', 5))
    }
  }

  export const checkLogin =  () => {
    return async dispatch => {
      const user = window.localStorage.getItem('loggedUser')
      if (user) {
        const userObj = JSON.parse(user)
        dispatch({
          type: 'LOGIN_SUCCESS',
          user: userObj,
        })
      }
    }
  }

 export const logout = () => {
    return async dispatch => {
      window.localStorage.removeItem('loggedUser')
      dispatch({
        type: 'LOGOUT',
        user: null,
      })
    }
  }

export default loginReducer