const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./integ_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const loginInfo = {
  'username': 'rshrestha',
  'password': 'sekret'
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  //create a new user
  const response =  await api
    .post('/api/users')
    .send(loginInfo)
  expect(response.status).toEqual(200)

  //now get User object that was just created
  const users =  await helper.usersInDb()

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    blogObject.user = users[0].id
    await blogObject.save()
  }

})

const getToken = async () => {
  const loginResponse  = await api
    .post('/api/login')
    .set('Content-Type', 'application/json')
    .send(loginInfo)
  expect(loginResponse.status).toEqual(200)
  return loginResponse.body.token
}

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog has a id field', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'Second Blog'
    )
  })

})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Raj Raj',
      url: 'http://abc.bom/1244',
      likes: 1
    }

    const token  = await getToken()
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  /* test('fails if title and url missing', async () => {
    const newBlog = {
      author: 'Raj Raj',
      likes: 1
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
  */

  test('if no likes given, defaults to 0', async () => {
    const newBlog = {
      title: 'testing default likes',
      author: 'Raj Raj',
      url: 'http://abc.bom/1244',
    }

    const token  = await getToken()
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const addedBlogs = await Blog.find({ 'title': 'testing default likes' })
    const blog = addedBlogs[0]
    expect(blog.likes).toEqual(0)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const token  = await getToken()
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('updating of a blog', () => {
  test('succeeds if updating blog with vaid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = blogToUpdate.likes + 1

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    expect(updatedBlog.body.likes).toEqual(blogToUpdate.likes)
  })
})


afterAll(() => {
  mongoose.connection.close()
})