import React, {useState} from 'react' 
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleRemove }) => {
//const Blog = React.forwardRef((props, ref) => {
  //let blog = props.blog
  //let handleRemove = props.handleRemove

  const [showDetails, setShowDetails] = useState(false) 
  const [likes, setLikes] = useState(blog.likes) 

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

  const handleLikeClick = async () => {
    blog.likes = blog.likes + 1
    await blogService.update(blog.id, blog)
    setLikes(blog.likes)
  }

  const handleRemoveClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      handleRemove()
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span>
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={showWhenVisible} class='blogDetails'>
        {blog.url} <br/>
        likes: {likes} 
        <button onClick={handleLikeClick}>Like</button>
        <br/>
        {blog.author} <br/>
        {blog.user ? blog.user.id : ''} <br/>
        <button onClick={handleRemoveClick}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog
