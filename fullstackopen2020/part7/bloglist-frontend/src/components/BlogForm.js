import React from 'react' 
import {  useDispatch } from 'react-redux'
import {  useHistory } from "react-router-dom"
import {  TextField, Button } from '@material-ui/core'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
  
    const addBlog = (event) => {
      event.preventDefault()
      const newBlog = {
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value
      }
      dispatch(createBlog(newBlog))
      dispatch(setNotification('New blog added', 5))
      history.push('/blogs')
    }
  
    return (
      <div>
        <h2>Create a new blog</h2>
        <form onSubmit={addBlog}>
        <div>
          <TextField id='title' label="title" />
        </div>
        <div>
          <TextField id='author' label="author" />
        </div>
        <div>
          <TextField id='url' label="url" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">create</Button>
        </div>
        </form>  
      </div>
    )
  }

export default BlogForm
