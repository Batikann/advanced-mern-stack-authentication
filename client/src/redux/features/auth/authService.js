import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const API_URL = `${BACKEND_URL}/api/users/`

//REGISTER USER
const register = async (userData) => {
  const res = await axios.post(API_URL + 'register', userData)
  return res.data
}

const authService = {
  register,
}

export default authService
