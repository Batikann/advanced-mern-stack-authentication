import { Link } from 'react-router-dom'
import loginImg from '../../assets/login.svg'

const Home = () => {
  return (
    <div className="mt-2">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-center">
          <div className="flex  flex-col gap-y-4 flex-1">
            <h1 className="text-4xl font-bold text-slate-800">
              Ultimate MERN Stack Authentication System
            </h1>
            <p className="text-xl">
              Learn and Master Authentication and Authorization using MERN
              Stack.
            </p>
            <p className="text-xl">
              Implement User Regisration,Login,Password Reset, Social Login,
              User, Permissions, Email Notifications etc.
            </p>
            <div className="flex gap-3">
              <Link
                className="bg-indigo-800 text-sm flex items-center justify-center text-white font-bold py-2 px-6 rounded-md cursor-pointer hover:bg-indigo-600 duration-300 transition-colors hover:scale-110"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-green-800 text-sm flex items-center justify-center text-white font-bold py-2 px-6 rounded-md cursor-pointer hover:bg-green-600 duration-300 transition-colors hover:scale-110"
                to="/register"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center mt-11  w-[40%]">
            <img src={loginImg} alt="auth" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
