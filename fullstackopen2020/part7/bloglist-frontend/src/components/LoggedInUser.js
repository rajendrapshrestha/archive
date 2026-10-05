import React from 'react' 
import { Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const LoggedInUser = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(logout())
        history.push('/')
    }

    return (
        <div>
            <em>{user.name} logged in</em> 
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default LoggedInUser