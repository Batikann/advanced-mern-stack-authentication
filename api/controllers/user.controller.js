const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const { generateToken, correctUserPassword } = require('../utils')
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

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  //Validation
  if (!email || !password) {
    res.status(400)
    throw new Error('Please email and password.')
  }

  const user = await User.findOne({ email })
  if (!user) {
    res.status(404)
    throw new Error('User not found, please signup.')
  }

  const passwordIsCorret = await correctUserPassword(password, user.password)
  if (!passwordIsCorret) {
    res.status(400)
    throw new Error('Invalid email or password.')
  }

  //Trigger 2FA for unkown userAgent

  //Generate Token
  const token = generateToken(user._id)
  if (user && passwordIsCorret) {
    //Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400) /*1 Day */,
      sameSite: 'none',
      secure: true,
    })

    const { _id, name, email, phone, bio, photo, role, isVerified } = user
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
      token,
    })
  } else {
    res.status(500)
    throw new Error('Somethings went wrong, please try again')
  }
})

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none',
    secure: true,
  })
  return res.status(200).json({ message: 'Logout Successfully' })
})

const getUser = asyncHandler(async (req, res) => {})

module.exports = { registerUser, loginUser, logoutUser, getUser }
