const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithMultiBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Humpty Dumpty',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Second Blog',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f6',
    title: 'Third Blog',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorites', () => {
  test('when list has only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result.likes).toBe(5)
  })

  test('when list has multiple blogs returns one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultiBlogs)
    expect(result.likes).toBe(10)
  })
})

describe('most blogs', () => {
  test('when list has only one blog equals that author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result.author).toEqual('Edsger W. Dijkstra')
  })

  test('when list has multiple blogs returns author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultiBlogs)
    expect(result.author).toEqual('Edsger W. Dijkstra')
  })
})

describe('most likes', () => {
  test('when list has only one blog equals that author', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result.author).toEqual('Edsger W. Dijkstra')
  })

  test('when list has multiple blogs returns author with most likes', () => {
    const result = listHelper.mostLikes(listWithMultiBlogs)
    expect(result.author).toEqual('Edsger W. Dijkstra')
  })
})

