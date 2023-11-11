const express = require('express')
const {
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
} = require('../controllers/user.controller')
const {
  protect,
  adminOnly,
  authorOnly,
} = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', registerUser)
router.patch('/verifyUser/:verificationToken', verifyUser)

router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/getUser', protect, getUser)
router.patch('/updateUser', protect, updateUser)

router.get('/getUsers', protect, authorOnly, getUsers)
router.get('/loginStatus', loginStatus)

router.post('/sendAutomatedEmail', protect, sendAutomatedEmail)
router.post('/sendVerificationEmail', protect, sendVerificationEmail)

router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:resetToken', resetToken)
router.patch('/changePassword', protect, changePassword)
router.post('/sendLoginCode/:email', sendLoginCode)
router.post('/loginWithCode/:email', loginWithCode)

/*Admin Only Access Route */
router.delete('/:id', protect, adminOnly, deleteUser)
router.post('/upgradeUser', protect, adminOnly, upgradeUser)

module.exports = router
