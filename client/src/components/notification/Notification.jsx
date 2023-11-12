import { useDispatch } from 'react-redux'
import {
  RESET,
  sendVerificationEmail,
} from '../../redux/features/auth/authSlice'

const Notification = () => {
  const dispatch = useDispatch()
  const sendVerEmail = async () => {
    await dispatch(sendVerificationEmail())
    await dispatch(RESET())
  }

  return (
    <div className="flex justify-center items-center text-center">
      <div className="bg-red-400 p-4">
        <p className="text-xl">
          <b>Message: </b> &nbsp;
        </p>
        <p className="text-2xl my-2">
          To verify your account, check your email for a verification link.
          &nbsp;
        </p>
        <p
          className="text-blue-600 hover:text-blue-400 cursor-pointer"
          onClick={sendVerEmail}
        >
          <b> Resend Link</b>
        </p>
      </div>
    </div>
  )
}
export default Notification
