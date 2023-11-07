const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
}

const correctUserPassword = (loginUserPassword, databaseUserPassword) => {
  return bcrypt.compare(loginUserPassword, databaseUserPassword)
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY)
}

module.exports = { generateToken, correctUserPassword, verifyToken }