import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import { MdPassword } from 'react-icons/md'
import { useState } from 'react'
import PasswordInput from '../../components/passwordInput/PasswordInput'

const initialState = {
  password: '',
  confirmNewPassword: '',
}

const Reset = () => {
  const [formData, setFormData] = useState(initialState)
  const { password, confirmNewPassword } = formData

  const handleInputChange = () => {}
  return (
    <Card>
      <div className="flex flex-col gap-3 ">
        <div className="flex justify-center items-center flex-col gap-2 mb-6">
          <MdPassword size={35} />
          <h1 className="text-3xl font-bold">Reset Password</h1>
        </div>
        <div>
          <form className="flex flex-col gap-3 mb-3">
            <PasswordInput
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="New Password"
            />
            <PasswordInput
              name="confirmPassword"
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
