const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (request.body.username === undefined || request.body.password === undefined) {
    return response.status(400).send({ error: 'username and password are required' }).end()
  }
  if (request.body.username.length < 3 || request.body.password.length < 3) {
    return response.status(400).send({ error: 'username and password must be at least 3 characters long' }).end()
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, url: 1, author: 1, id: 1 })

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter