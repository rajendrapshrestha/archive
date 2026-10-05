import React, {useState} from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import {  incrementLikes, removeBlog } from '../reducers/blogReducer'
import {  setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'


const Blog = ({ blog, handleRemove, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false) 

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: showDetails ? '' : 'none' }
  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }
  const label = showDetails ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span>
        <Button color="inherit" onClick={toggleVisibility}>{label}</Button>
      </div>
      <div style={showWhenVisible} className='blogDetails'>
        {blog.url} <br/>
        likes: {blog.likes} 
        <Button color="inherit" onClick={handleLike}>Like</Button>
        
        <br/>
        {blog.author} <br/>
        {blog.user ? blog.user.id : ''} <br/>
        <Button color="inherit" onClick={handleRemove}>Remove</Button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired
}


const Blogs = () => {
  const dispatch = useDispatch()
  let blogs = useSelector(state => state.blogs)

  const handleLikeClick = async (blog) => {
    dispatch(incrementLikes(blog))
    dispatch(setNotification(`You liked '${blog.title}'`, 5))
  }

  const handleBlogRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  return (
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} handleRemove={() => handleBlogRemove(blog)} handleLike={() => handleLikeClick(blog)} />
        )}
      </div>
  )

}
export default Blogs
