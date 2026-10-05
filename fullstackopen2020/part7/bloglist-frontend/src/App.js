import React, { useEffect } from 'react'
import Blogs from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoggedInUser from './components/LoggedInUser'
import { User, Users } from './components/Users'
import { useSelector, useDispatch } from 'react-redux'
import {  checkLogin } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'

import {
  Container,
  Button,
  AppBar,
  Toolbar,
} from '@material-ui/core'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"


const Home = () => {
  return (
    <div> 
      <h2>Blogs Listing Page</h2> 
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> 
    </div>
  )
}

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin()) 
  }, [dispatch])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    }
  }, [dispatch, user])

  return (
    <div>
      <Container>
        <Notification />
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                home
              </Button>
              <Button color="inherit" component={Link} to="/blogs">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/create">
                create
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
              {user
                ? <LoggedInUser />
                : <Button color="inherit" component={Link} to="/login">
                  login
              </Button>
              }
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/blogs">
                <Blogs />
            </Route>
            <Route path="/create">
              <BlogForm  />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Container>
     
    </div>
  )
}

export default App
