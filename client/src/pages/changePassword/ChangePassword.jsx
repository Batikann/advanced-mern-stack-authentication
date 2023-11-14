import { useState } from 'react'
import PageMenu from '../../components/pageMenu/PageMenu'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import userRedirectLoggedOutUser from '../../customHook/userRedirectLoggedOutUser'
import {
  RESET,
  changePassword,
  logout,
} from '../../redux/features/auth/authSlice'
import { sendAutomatedEmail } from '../../redux/features/email/emailSlice'

const ChangePassword = () => {
  const initialState = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }
  userRedirectLoggedOutUser('/')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, user } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState(initialState)
  const { oldPassword, newPassword, confirmNewPassword } = formData

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const updatePassword = async (e) => {
    e.preventDefault()

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.error('All fields are required!')
    }

    if (newPassword !== confirmNewPassword) {
      return toast.error('Passwords do not matched!')
    }

    const userData = { oldPassword, newPassword }

    const emailData = {
      subject: 'Password Changed - AUTHZ',
      send_to: user.email,
      reply_to: 'noreply@batiko',
      template: 'changePassword',
      url: '/forgot',
    }

    await dispatch(changePassword(userData))
    await dispatch(sendAutomatedEmail(emailData))
    await dispatch(logout())
    await dispatch(RESET())
    navigate('/login')
  }
  return (
    <section className="flex justify-center flex-col  items-center ">
      <PageMenu />
      <div className="border border-slate-800 p-4 mt-6">
        <h2 className="text-4xl font-bold my-4">Change Password</h2>
        <div>
          <form onSubmit={updatePassword} className="flex flex-col gap-y-3">
            <p className="flex flex-col gap-y-2">
              <label className="font-bold text-base">Current Password:</label>
              <PasswordInput
                placeholder="Current password"
                name="oldPassword"
                value={oldPassword}
                onChange={handleInputChange}
              />
            </p>
            <p className="flex flex-col gap-y-2">
              <label className="font-bold text-base">New Password:</label>
              <PasswordInput
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={handleInputChange}
              />
            </p>
            <p className="flex flex-col gap-y-2">
              <label className="font-bold text-base">
                Confirm New Password:
              </label>
              <PasswordInput
                placeholder="Confirm New Password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleInputChange}
              />
            </p>
            <button className="bg-blue-500 text-white hover:bg-blue-600 font-semibold h-10">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
export default ChangePassword
