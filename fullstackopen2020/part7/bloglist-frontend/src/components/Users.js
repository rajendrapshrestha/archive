import React, { useState, useEffect } from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Button,
  } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import userService from '../services/users'

const CurrentUser = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(logout())
        history.push('/')
    }

    if (!user) {
        return (
            <>
            </>
        )
    }

    return (
        <div>
            <div>
                <em>{user.name} logged in</em>
            </div>
            <div>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}

export const User =  () => {
    const loginUser = useSelector(state => state.user)
    const [user, setUser] = useState(null) 

    useEffect(() => {
        if (loginUser) {
            userService.user(loginUser.username)
                .then (item => setUser(item))
        }
      }, [loginUser])

    return (
        <div>
            <h2>blogs</h2>
            <CurrentUser />

            <h2>{user && user.name}</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                            </TableCell>
                            <TableCell>
                                Added Blogs
                                </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { user && user.blogs && user.blogs.map(blog => (
                            <TableRow key={blog.id}>
                                <TableCell>
                                    {blog.title}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export const Users =  () => {
    const [users, setUsers] = useState([]) 

    useEffect(() => {
        userService.users()
            .then (items => setUsers(items))
      }, [])

    return (
        <div>
            <h2>blogs</h2>
            <CurrentUser />

            <h2>Users</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                            </TableCell>
                            <TableCell>
                                Blogs
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.username}`}>
                                    {user.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {user.blogs.length}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Users