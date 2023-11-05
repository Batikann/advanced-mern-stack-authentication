import { Link } from 'react-router-dom'
import Card from '../../components/card/Card'
import { AiFillUnlock } from 'react-icons/ai'
import { useState } from 'react'
const LoginWithCode = () => {
  const [loginCode, setLoginCode] = useState('')

  const handleInputChange = () => {}
  return (
    <Card>
      <div className="flex flex-col gap-3 ">
        <div className="flex justify-center items-center flex-col gap-2 mb-6">
          <AiFillUnlock size={35} />
          <h1 className="text-3xl font-bold">Enter Access Code</h1>
        </div>
        <div>
          <form className="flex flex-col gap-3 mb-3">
            <input
              className="border border-slate-800 h-10 outline-none px-4"
              name="loginCode"
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
              placeholder="Enter Access Code"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 cursor-pointer duration-300 transition-all text-white h-10 font-semibold"
            >
              Proceed To Login
            </button>
            <p className="text-center text-sm ">
              Check your email for login access code
            </p>
          </form>
          <div className="flex justify-between items-center">
            <Link to="/">Home</Link>
            <Link
              to="/login"
              className="font-semibold hover:underline hover:underline-offset-2"
            >
              Resend Code
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
export default LoginWithCode
