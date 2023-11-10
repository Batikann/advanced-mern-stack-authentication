const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const {
  generateToken,
  correctUserPassword,
  verifyToken,
  hashToken,
} = require('../utils')
const parser = require('ua-parser-js')
const sendEmail = require('../utils/sendEmail')
const Token = require('../models/token.model')
const crypto = require('crypto')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.CRYPTR_KEY)

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

//send login code
const sendLoginCode = asyncHandler(async (req, res) => {
  const { email } = req.params
  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('User Not Found')
  }

  //Find Login Code in DB
  const token = await Token.findOne({
    userId: user._id,
    expiresAt: { $gt: Date.now() },
  })
  if (!token) {
    res.status(404)
    throw new Error('Invalid or expired token, please login again!')
  }
  const loginCode = cryptr.decrypt(token.lToken)

  //send login code
  const subject = 'Login Code your Account - AUTHZ'
  const send_to = email
  const sent_from = process.env.EMAIL_USER
  const reply_to = 'noreply@batik.com'
  const template = 'loginCode'
  const name = user.name
  const link = loginCode

  try {
    await sendEmail(subject, send_to, sent_from, reply_to, template, name, link)
    res.status(200).json({ message: `Access code  sent to ${email}` })
  } catch (error) {
    res.status(500)
    throw new Error('Email not sent, please try again!.')
  }
})

const loginWithCode = asyncHandler(async (req, res) => {
  const { email } = req.params
  const { loginCode } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  //Find User Login Token
  const userToken = await Token.findOne({
    userId: user._id,
    expiresAt: { $gt: Date.now() },
  })

  if (!userToken) {
    res.status(404)
    throw new Error('Invalid or Expired Code, please login again')
  }

  const decryptedLoginCode = cryptr.decrypt(userToken.lToken)

  if (loginCode !== decryptedLoginCode) {
    res.status(400)
    throw new Error('Incorrect login code, please try again')
  } else {
    // Register the userAgent
    const ua = parser(req.headers['user-agent'])
    const thisUserAgent = ua.ua
    user.userAgent.push(thisUserAgent)
    await user.save()
    //   Generate Token
    const token = generateToken(user._id)

    // Send HTTP-only cookie
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: 'none',
      secure: true,
    })
    const { _id, name, email, photo, phone, bio, isVerified, role } = user
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      isVerified,
      role,
      token,
    })
  }
})

const sendVerificationEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(404)
    throw new Error('User Not Found')
  }

  if (user.isVerified) {
    res.status(500)
    throw new Error('User Already Verified')
  }

  let token = Token.findOne({ userId: user._id })
  if (token) {
    await token.deleteOne()
  }

  const verificationToken = crypto.randomBytes(32).toString('hex') + user._id

  const hashedToken = hashToken(verificationToken)

  console.log(verificationToken)

  await new Token({
    userId: user._id,
    vToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000) /*1 hour */,
  }).save()

  const verificationURL = `${process.env.FRONTEND_URL}/verify/${verificationToken}`

  //send Email
  const subject = 'verify your Account - AUTHZ'
  const send_to = user.email
  const sent_from = process.env.EMAIL_USER
  const reply_to = 'noreply@batik.com'
  const template = 'email'
  const name = user.name
  const link = verificationURL

  try {
    await sendEmail(subject, send_to, sent_from, reply_to, template, name, link)
    res.status(200).json({ message: 'Verification Email sent' })
  } catch (error) {
    res.status(500)
    throw new Error('Email not sent, please try again!.')
  }
})

const verifyUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params

  const hashedToken = hashToken(verificationToken)

  const userToken = await Token.findOne({
    vToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  })

  if (!userToken) {
    res.status(404)
    throw new Error('Invalid or Expired Token')
  }

  //Find User
  const user = await User.findById({ _id: userToken.userId })
  if (user.isVerified) {
    res.status(400)
    throw new Error('User Already verified.')
  }

  //Now verify User
  user.isVerified = true
  await user.save()
  res
    .status(200)
    .json({ message: `Account verified successfully welcome ${user.name}` })
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

  const ua = parser(req.headers['user-agent'])
  const thisUserAgent = ua.ua
  console.log(thisUserAgent)
  const allowedDevice = user.userAgent.includes(thisUserAgent)

  if (!allowedDevice) {
    const loginCode = Math.floor(100000 + Math.random() * 900000)
    console.log(loginCode)
    // Hash token before saving to DB
    const encryptedLoginCode = cryptr.encrypt(loginCode.toString())

    // Delete token if it exists in DB
    let userToken = await Token.findOne({ userId: user._id })
    if (userToken) {
      await userToken.deleteOne()
    }

    await new Token({
      userId: user._id,
      lToken: encryptedLoginCode,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60 * (60 * 1000) /* 1 hours */,
    }).save()

    res.status(400)
    throw new Error('new browser or device detected')
  }
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

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    const { _id, name, email, phone, bio, photo, role, isVerified } = user
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      role,
      isVerified,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    const { name, phone, bio, photo, email } = user

    user.email = email
    user.name = req.body.name || name
    user.phone = req.body.phone || phone
    user.bio = req.body.bio || bio
    user.photo = req.body.photo || photo

    const updatedUser = await user.save()
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      photo: updatedUser.photo,
      role: updatedUser.role,
      isVerified: updatedUser.isVerified,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found , please sign in')
  }

  await user.deleteOne({ _id: req.params.id })
  res.status(200).json({ message: 'User deleted successfully' })
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort('-createdAt').select('-password')
  if (!users) {
    res.status(500)
    throw new Error('Something went wrong')
  }
  res.status(200).json(users)
})

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json(false)
  }

  const isVerifiedToken = verifyToken(token)
  if (isVerifiedToken) {
    return res.json(true)
  }
  return res.json(false)
})

const upgradeUser = asyncHandler(async (req, res) => {
  const { role, id } = req.body

  const user = await User.findById(id)
  if (!user) {
    res.status(404)
    throw new Error('User not found.')
  }

  user.role = role
  await user.save()

  res.status(200).json({ message: `User role updated to ${role}` })
})

const sendAutomatedEmail = asyncHandler(async (req, res) => {
  const { subject, send_to, reply_to, template, url } = req.body

  if (!subject || !send_to || !reply_to || !template) {
    res.status(500)
    throw new Error('Missing email parameter.')
  }

  //Get User
  const user = await User.findOne({ email: send_to })
  if (!user) {
    res.status(404)
    throw new Error('User not found.')
  }

  const sent_from = process.env.EMAIL_USER
  const name = user.name
  const link = `${process.env.FRONTEND_URL}${url}`

  try {
    await sendEmail(subject, send_to, sent_from, reply_to, template, name, link)
    res.status(200).json({ message: 'Email sent' })
  } catch (error) {
    res.status(500)
    throw new Error('Email not sent, please try again!.')
  }
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(404)
    throw new Error('No user with this email')
  }

  let token = Token.findOne({ userId: user._id })
  if (token) {
    await token.deleteOne()
  }

  const resetToken = crypto.randomBytes(32).toString('hex') + user._id
  console.log(resetToken)

  const hashedToken = hashToken(resetToken)

  await new Token({
    userId: user._id,
    rToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000) /*1 hour */,
  }).save()

  const resetURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`

  //send Email
  const subject = 'Password Reset Request - AUTHZ'
  const send_to = user.email
  const sent_from = process.env.EMAIL_USER
  const reply_to = 'noreply@batik.com'
  const template = 'forgotPassword'
  const name = user.name
  const link = resetURL

  try {
    await sendEmail(subject, send_to, sent_from, reply_to, template, name, link)
    res.status(200).json({ message: 'password reset email sent' })
  } catch (error) {
    res.status(500)
    throw new Error('Email not sent, please try again!.')
  }
})

const resetToken = asyncHandler(async (req, res) => {
  const { resetToken } = req.params
  const { password } = req.body

  const hashedToken = hashToken(resetToken)

  const userToken = await Token.findOne({
    rToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  })

  if (!userToken) {
    res.status(404)
    throw new Error('Invalid or Expired Token')
  }

  //Find User
  const user = await User.findById({ _id: userToken.userId })

  user.password = password
  await user.save()
  res.status(200).json({
    message: `Password resset successfully please try login new password`,
  })
})

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const { oldPassword, newPassword } = req.body
  if (!user) {
    res.status(404)
    throw new Error('User not found ')
  }

  if (!oldPassword || !newPassword) {
    res.status(400)
    throw new Error('Please enter old and new password')
  }

  const passwordIsCorret = correctUserPassword(oldPassword, user.password)

  if (user && passwordIsCorret) {
    user.password = newPassword
    await user.save()
    res
      .status(200)
      .json({ message: 'Password changed Successfully , please re-login' })
  } else {
    res.status(400)
    throw new Error('Current Password not valid')
  }
})

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  loginStatus,
  upgradeUser,
  sendAutomatedEmail,
  sendVerificationEmail,
  verifyUser,
  forgotPassword,
  resetToken,
  changePassword,
  sendLoginCode,
  loginWithCode,
}
