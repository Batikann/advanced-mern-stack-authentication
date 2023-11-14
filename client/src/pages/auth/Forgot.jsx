import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { AiOutlineMail } from 'react-icons/ai'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RESET, forgotPassword } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils/validateRules.js'

const Forgot = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const forgotPasswordHandle = async (e) => {
    e.preventDefault()
    if (!email) {
      return toast.error('Please enter an email')
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email')
    }

    const userData = {
      email,
    }

    await dispatch(forgotPassword(userData))
    await dispatch(RESET())
    navigate('/')
  }
  return (
    <Card>
      <div className="flex flex-col gap-3 ">
        <div className="flex justify-center items-center flex-col gap-2 mb-6">
          <AiOutlineMail size={35} />
          <h1 className="text-2xl font-bold">Forgot Password</h1>
        </div>
        <div>
          <form
            onSubmit={forgotPasswordHandle}
            className="flex flex-col gap-3 mb-3"
          >
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="border border-slate-700 text-black h-10 px-4 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 cursor-pointer duration-300 transition-all text-white h-10 font-semibold"
            >
              Get Reset Email
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
export default Forgot
