import { Link, useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/card/Card'
import { MdPassword } from 'react-icons/md'
import { useEffect, useState } from 'react'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RESET, resetPassword } from '../../redux/features/auth/authSlice'

const initialState = {
  password: '',
  confirmNewPassword: '',
}

const Reset = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  const [formData, setFormData] = useState(initialState)
  const { password, confirmNewPassword } = formData
  const { resetToken } = useParams()
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const reset = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      return toast.error('Password must be up 6 characters')
    }

    if (password !== confirmNewPassword) {
      return toast.error('Passwords do not match')
    }

    const userData = {
      password,
    }

    await dispatch(resetPassword({ userData, resetToken }))
    await dispatch(RESET())
  }

  useEffect(() => {
    if (
      isSuccess &&
      message.includes(
        'Password resset successfully please try login new password'
      )
    ) {
      navigate('/login')
    }

    dispatch(RESET())
  }, [isError, isSuccess, message, isLoggedIn, dispatch, navigate])

  return (
    <Card>
      <div className="flex flex-col gap-3 ">
        <div className="flex justify-center items-center flex-col gap-2 mb-6">
          <MdPassword size={35} />
          <h1 className="text-3xl font-bold">Reset Password</h1>
        </div>
        <div>
          <form onSubmit={reset} className="flex flex-col gap-3 mb-3">
            <PasswordInput
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="New Password"
            />
            <PasswordInput
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handleInputChange}
              placeholder="Confirm New Password"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 cursor-pointer duration-300 transition-all text-white h-10 font-semibold"
            >
              Reset Password
            </button>
          </form>
          <div className="flex justify-between items-center">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
export default Reset
