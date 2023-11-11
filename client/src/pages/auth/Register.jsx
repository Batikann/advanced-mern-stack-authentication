import { FaTimes } from 'react-icons/fa'
import { BsCheck2All } from 'react-icons/bs'
import { FiUserPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import Card from '../../components/card/Card'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { validateEmail } from '../../utils/validateRules'
import {
  RESET,
  register,
  // sendVerificationEmail,
} from '../../redux/features/auth/authSlice'

import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialState)
  const { name, email, password, confirmPassword } = formData
  const [uCase, setUCase] = useState(false)
  const [num, setNum] = useState(false)
  const [sChar, setSChar] = useState(false)
  const [passLength, setPassLength] = useState(false)

  const timesIcon = <FaTimes color="red" size={15} />
  const checkIcon = <BsCheck2All color="green" size={15} />

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon
    }
    return timesIcon
  }

  const { isLoading, isLoggedIn, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true)
    } else {
      setUCase(false)
    }
    // Check For Numbers
    if (password.match(/([0-9])/)) {
      setNum(true)
    } else {
      setNum(false)
    }
    // Check For Special char
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true)
    } else {
      setSChar(false)
    }
    // Check if password up to 6
    if (password.length > 5) {
      setPassLength(true)
    } else {
      setPassLength(false)
    }
  }, [password])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const registerUser = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      return toast.error('All fields are required')
    }
    if (password.length < 6) {
      return toast.error('Passwords must be up to 6 characters')
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email')
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match')
    }

    const userData = {
      name,
      email,
      password,
    }
    console.log(userData)

    await dispatch(register(userData))
    // await dispatch(sendVerificationEmail())
  }

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate('/login')
    }
    dispatch(RESET())
  }, [isLoggedIn, isSuccess, dispatch, navigate, message])

  return (
    <>
      {isLoading && <Loader />}
      <Card>
        <div className="flex flex-col gap-3 items-center">
          <FiUserPlus size={35} />
          <p className="text-3xl font-bold mb-2">Register</p>
        </div>
        <div>
          <form className="flex flex-col gap-3 mb-2" onSubmit={registerUser}>
            <input
              className="h-10 px-4 text-black outline-none border border-slate-900"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              className="h-10 px-4 text-black outline-none border border-slate-900"
              type="text"
              placeholder="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <PasswordInput onChange={handleInputChange} value={password} />
            <PasswordInput
              onChange={handleInputChange}
              value={confirmPassword}
              name="confirmPassword"
              placeholder="Confirm Password"
              onPaste={(e) => {
                e.preventDefault()
                toast.error('Cannot paste  into input field')
                return false
              }}
            />

            <div>
              {/* List  */}
              <ul className="flex flex-col gap-2">
                <li>
                  <span className="flex items-center">
                    {/* {uCase ? checkIcon : timesIcon} */}
                    {switchIcon(uCase)}
                    &nbsp; Lowercase & Uppercase
                  </span>
                </li>
                <li>
                  <span className="flex items-center">
                    {switchIcon(num)}
                    &nbsp; Number (0-9)
                  </span>
                </li>
                <li>
                  <span className="flex items-center">
                    {switchIcon(sChar)}
                    &nbsp; Special Character (!@#$%^&*)
                  </span>
                </li>
                <li>
                  <span className="flex items-center">
                    {switchIcon(passLength)}
                    &nbsp; At least 6 Character
                  </span>
                </li>
              </ul>
            </div>
            <button
              type="submit"
              className="bg-white h-10 text-black py-1 font-semibold hover:bg-indigo-600 border border-slate-900"
            >
              Register
            </button>
          </form>
        </div>
        <p>
          Already have an account ?
          <Link to="/login" className="ml-2 font-bold">
            Login
          </Link>
        </p>
      </Card>
    </>
  )
}

export default Register
