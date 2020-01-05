const User = require('../models/user');
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;

    if (body.password === undefined || body.password.length < 4) {
      return response.status(400).json({ error: 'password needs to be at least 3 characters long' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/', async (request, response, next) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.json(users.map(user => user.toJSON()));
});

module.exports = usersRouter;