import React from 'react'
import {  useDispatch } from 'react-redux'
import {  login } from '../reducers/loginReducer'
import { TextField,  Button } from '@material-ui/core'
import {useHistory} from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(login(username, password))
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField id="username" label="username" />
        </div>
        <div>
          <TextField id="password" label="password" type='password' />
        </div>
        <div>
          <Button id="login-button" variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm