const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const { generateToken } = require('../utils')
const parser = require('ua-parser-js')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  /*Validation */
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please fill in all the required fields.')
  }
  if (password.length < 6) {
    res.status(400)
    throw new Error('Password must be up to 6 characters.')
  }

  //Check if user exists

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('This email already be registered.')
  }

  //Get user agent

  const ua = parser(req.headers['user-agent'])
  const userAgent = [ua.ua]

  //Create new user

  const user = await User.create({
    name,
    email,
    password,
    userAgent,
  })

  //Generate Token
  const token = generateToken(user._id)

  //Send HTTP-only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400) /*1 Day */,
    sameSite: 'none',
    secure: true,
  })

  if (user) {
    const { _id, name, email, phone, bio, photo, role, isVerified } = user
    res
      .status(201)
      .json({ _id, name, email, phone, bio, photo, role, isVerified, token })
  } else {
    res.status(400)
    throw new Error('Invalid user data.')
  }
})

module.exports = { registerUser }
