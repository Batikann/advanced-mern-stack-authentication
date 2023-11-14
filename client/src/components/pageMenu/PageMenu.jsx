import { NavLink } from 'react-router-dom'
import { AdminAuthorLink } from '../protect/hiddenLink'

const PageMenu = () => {
  const activeLink = ({ isActive }) =>
    isActive ? 'border-b border-b-white' : ''
  return (
    <div>
      <nav className="bg-indigo-800 text-white mt-6 p-2 font-semibold px-6 rounded-md">
        <ul className="flex items-center justify-center gap-4">
          <li>
            <NavLink to="/profile" className={activeLink}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/changePassword" className={activeLink}>
              Change Password
            </NavLink>
          </li>

          <AdminAuthorLink>
            <li>
              <NavLink to="/users" className={activeLink}>
                Users
              </NavLink>
            </li>
          </AdminAuthorLink>
        </ul>
      </nav>
    </div>
  )
}
export default PageMenu
