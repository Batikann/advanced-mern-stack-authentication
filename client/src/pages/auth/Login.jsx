import { SiAuthelia } from 'react-icons/si'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import Card from '../../components/card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils/validateRules'
import { RESET, login } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  const [formData, setFormData] = useState(initialState)
  const { email, password } = formData
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const loginUser = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error('All fields are required')
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email')
    }
    const userData = {
      email,
      password,
    }
    await dispatch(login(userData))
  }

  useEffect(() => {
    if (isLoggedIn && isSuccess) {
      navigate('/profile')
    }
    dispatch(RESET())
  }, [isLoading, isSuccess, navigate, dispatch])

  return (
    <>
      {isLoading && <Loader />}
      <Card>
        <div className="flex flex-col gap-3 items-center">
          <SiAuthelia size={35} />
          <p className="text-3xl font-bold">Login</p>
          <button className="flex items-center justify-center gap-3 border border-slate-900 py-2  w-full">
            <FcGoogle size={20} /> Sign in with Google
          </button>
          <p className="font-bold text-lg">or</p>
        </div>
        <div>
          <form className="flex flex-col gap-3 mb-2" onSubmit={loginUser}>
            <input
              className="h-10 px-4 text-black outline-none border border-slate-900"
              type="text"
              placeholder="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <PasswordInput onChange={handleInputChange} value={password} />
            <button
              type="submit"
              className="bg-white h-10 text-black py-1 font-semibold hover:bg-indigo-600 border border-slate-900"
            >
              Login
            </button>
          </form>
          <Link
            to="/forgot"
            className="mt-2 hover:underline underline-offset-2"
          >
            Forgot Password
          </Link>
        </div>
        <p>
          Don't you have an account ?
          <Link to="/register" className="font-bold ml-2">
            Register
          </Link>
        </p>
      </Card>
    </>
  )
}
export default Login
