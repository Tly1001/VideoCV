const User = require('../models/user')
const { secret } = require('../config/environment')
const { unauthorized } = require('../lib/errorMessages')
const jwt = require('jsonwebtoken')

//* Register function
//? Working ? Yes
//? Errors Tested ? Yes

async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.userName}` })
  } catch (err) {
    next(err)
  }
}

//* Function for login

//? Working ? Yes
//? Errors Tested ? Yes

async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(req.body.password)) throw new Error(unauthorized)
    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' })
    res.status(202).json({ message: `Hello ${user.userName}`, token })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  register,
  login
}