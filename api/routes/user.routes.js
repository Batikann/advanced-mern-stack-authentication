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
} = require('../controllers/user.controller')
const {
  protect,
  adminOnly,
  authorOnly,
} = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/getUser', protect, getUser)
router.patch('/updateUser', protect, updateUser)

router.get('/getUsers', protect, authorOnly, getUsers)
router.get('/loginStatus', loginStatus)

/*Admin Only Access Route */
router.delete('/:id', protect, adminOnly, deleteUser)
router.post('/upgradeUser', protect, adminOnly, upgradeUser)

module.exports = router
