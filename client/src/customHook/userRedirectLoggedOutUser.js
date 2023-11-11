import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../redux/features/auth/authService'
import { toast } from 'react-toastify'

const userRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate()

  useEffect(() => {
    let isLoggedIn
    const redirectLoggedOutUser = async () => {
      try {
        isLoggedIn = await authService.getLoginStatus()
      } catch (error) {
        console.log(error.message)
      }

      if (!isLoggedIn) {
        toast.info('Session expired, please login to continue.')
        navigate(path)
        return
      }
    }
    redirectLoggedOutUser()
  }, [navigate, path])
}
export default userRedirectLoggedOutUser
