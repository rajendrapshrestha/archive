import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login' 

const Notification = ({ message }) => {
  if (message === '' || message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  const handleBlogRemove = async (event) => {
    await blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const blogFormRef = React.createRef()
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        })
        .then( () => {
          setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
  }
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>      
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in
          <button onClick={handleLogout}>Logout</button>
          </p>
          <h2>blogs</h2>
          {/*blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )*/}
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} user={user} handleRemove={handleBlogRemove}/>
          )}
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App