import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type) {
      case 'UPDATE': {
        return state.map(item =>
            item.id !== action.data.id ? item : action.data 
          )
       }
       case 'REMOVE': {
        return state.filter(item => item.id !== action.data.id) 
       }
      case 'NEW_BLOG':
        return [...state, action.data]
      case 'INIT_BLOGS':
          return action.data
      default:
        return state
    }
  }
  
  export const createBlog = content => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
    }
  }

  export const incrementLikes = (blog) => {
    return async dispatch => {
        const object = {
            ...blog,
            likes: blog.likes + 1
          }
        const updatedBlog = await blogService.update(blog.id, object)
        dispatch({
            type: 'UPDATE',
            data: updatedBlog,
        })
    }
  }

  export const removeBlog = (blog) => {
    return async dispatch => {
      await blogService.remove(blog.id)
      dispatch({
        type: 'REMOVE',
        data: blog,
      })
    }
  }

  export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
      })
    }
  }
  
  export default blogReducer
  