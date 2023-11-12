import { useDispatch } from 'react-redux'
import { RESET, verifyUser } from '../../redux/features/auth/authSlice'
import { useParams } from 'react-router-dom'

const Verify = () => {
  const dispatch = useDispatch()
  const { verificationToken } = useParams()
  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken))
    await dispatch(RESET())
  }
  return (
    <div className="w-full flex justify-center items-center mt-20">
      <div className="flex flex-col gap-4  items-start ">
        <h1 className="text-5xl font-bold text-slate-800 tracking-wider">
          Account Verification
        </h1>
        <p className="text-xl font-semibold">
          To Verify your account, click the button bellow...
        </p>
        <div className="flex w-full  mt-3 items-center justify-center">
          <button
            onClick={verifyAccount}
            className="bg-blue-600 hover:bg-blue-400 text-white font-bold text-base h-12 rounded-lg px-4 "
          >
            Verify Account
          </button>
        </div>
      </div>
    </div>
  )
}
export default Verify
