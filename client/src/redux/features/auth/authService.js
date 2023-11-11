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
  const res = await axios.patch(API_URL + 'updateUser', updateUser)
  return res.data
}

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
}

export default authService
