import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectRoute = ({ children }) => {
  const navigate = useNavigate()
  const { isLoggedIn, user } = useSelector((state) => state.auth)
  return isLoggedIn && user ? children : navigate('/')
}
export default ProtectRoute
