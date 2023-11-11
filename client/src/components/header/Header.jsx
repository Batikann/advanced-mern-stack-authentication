import { BiUserCircle } from 'react-icons/bi'
import { SiAuthelia } from 'react-icons/si'
import { useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { RESET, logout } from '../../redux/features/auth/authSlice'

const activeLink = ({ isActive }) => (isActive ? 'border-b border-b-white' : '')
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutUser = async () => {
    dispatch(RESET())
    await dispatch(logout())
    navigate('/')
  }

  return (
    <header className="bg-indigo-800 p-5">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="logo">
          <Link
            to="/"
            className="text-3xl font-bold text-white flex gap-3 items-center"
          >
            <SiAuthelia size={35} />
            AuthZ
          </Link>
        </div>
        <ul className="flex items-center gap-3 text-white">
          <li className="flex items-center gap-2 cursor-pointer">
            <BiUserCircle size={22} />
            <p className="font-semibold text-base">Hi! Batikann</p>
          </li>
          <li>
            <button>
              <Link to="/login">Login</Link>
            </button>
          </li>
          <li>
            <NavLink to="/profile" className={activeLink}>
              Profile
            </NavLink>
          </li>
          <li>
            <button onClick={logoutUser}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Header
