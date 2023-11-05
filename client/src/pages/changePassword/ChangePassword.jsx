import { useState } from 'react'
import PageMenu from '../../components/pageMenu/PageMenu'
import PasswordInput from '../../components/passwordInput/PasswordInput'

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
}

const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState)
  const handleInputChange = () => {}
  return (
    <section className="flex justify-center flex-col  items-center ">
      <PageMenu />
      <div className="border border-slate-800 p-4 mt-6">
        <h2 className="text-4xl font-bold my-4">Change Password</h2>
        <div>
          <form className="flex flex-col gap-y-3">
            <p className="flex flex-col gap-y-2">
              <label className="font-bold text-base">Current Password:</label>
              <PasswordInput
                placeholder="Current password"
                name="currentpassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
              />
            </p>
            <p className="flex flex-col gap-y-2">
              <label className="font-bold text-base">New Password:</label>
              <PasswordInput
                placeholder="New Password"
                name="newpassword"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </p>
            <p className="flex flex-col gap-y-2">
              <label className="font-bold text-base">
                Confirm New Password:
              </label>
              <PasswordInput
                placeholder="Confirm New Password"
                name="confirmnewpassword"
                value={formData.confirmNewPassword}
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
