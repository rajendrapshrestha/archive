const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0) / blogs.length
}

const favoriteBlog = (blogs) => {
  blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
  return blogs[0]
}

const mostBlogs = (blogs) => {
  var aggregated = []
  blogs.forEach(blog => {
    let record = aggregated.find(({ author }) => author === blog.author)
    if (record) {
      const newRec = {
        'author': blog.author,
        'blogs': record.blogs + 1
      }
      aggregated = aggregated.map(record => record.author === blog.author ? newRec : record)
    } else {
      const newRec = {
        'author': blog.author,
        'blogs':  1
      }
      aggregated  = aggregated.concat(newRec)
    }
  })
  aggregated.sort((a, b) => (a.blogs < b.blogs) ? 1 : -1)
  return aggregated[0]
}

const mostLikes = (blogs) => {
  var aggregated = []
  blogs.forEach(blog => {
    let record = aggregated.find(({ author }) => author === blog.author)
    if (record) {
      const newRec = {
        'author': blog.author,
        'likes': record.likes + 1
      }
      aggregated = aggregated.map(record => record.author === blog.author ? newRec : record)
    } else {
      const newRec = {
        'author': blog.author,
        'likes':  blog.likes
      }
      aggregated  = aggregated.concat(newRec)
    }
  })
  aggregated.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
  return aggregated[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}