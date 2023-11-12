import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API_URL = `${BACKEND_URL}/api/users/`

//REGISTER USER
const register = async (userData) => {
  const res = await axios.post(API_URL + 'register', userData)
  return res.data
}

//Login USER
const login = async (userData) => {
  const res = await axios.post(API_URL + 'login', userData)
  return res.data
}

//Logout USER
const logout = async () => {
  const res = await axios.get(API_URL + 'logout')
  return res.data.message
}

//login Status
const getLoginStatus = async () => {
  const res = await axios.get(API_URL + 'loginStatus')
  return res.data
}

//Get User
const getUser = async () => {
  const res = await axios.get(API_URL + 'getUser')
  return res.data
}

//update USER
const updateUser = async (userData) => {
  const res = await axios.patch(API_URL + 'updateUser', userData)
  return res.data
}

//send verification Email
const sendVerificationEmail = async () => {
  const response = await axios.post(API_URL + 'sendVerificationEmail')
  return response.data.message
}

const verifyUser = async (verificationToken) => {
  const res = await axios.patch(`${API_URL}verifyUser/${verificationToken}`)
  return res.data.message
}

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  sendVerificationEmail,
  verifyUser,
}

export default authService
