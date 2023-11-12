import { useEffect, useLayoutEffect, useState } from 'react'
import PageMenu from '../../components/pageMenu/PageMenu'
import userRedirectLoggedOutUser from '../../customHook/userRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUser,
  selectUser,
  updateUser,
} from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'
import { toast } from 'react-toastify'
import Notification from '../../components/notification/Notification'

const Profile = () => {
  const dispatch = useDispatch()
  userRedirectLoggedOutUser('/')

  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  )
  const initialState = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    role: user?.role || '',
    isVerified: user?.isVerified || false,
  }
  const [profile, setProfile] = useState(initialState)

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const saveProfile = async (e) => {
    e.preventDefault()

    try {
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
      }
      dispatch(updateUser(userData))
      toast.success('User updated')
    } catch (error) {
      toast.error(error.message)
    }
  }

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        role: user.role,
        isVerified: user.isVerified,
      })
    }
  }, [user])

  return (
    <>
      <section className="flex justify-center flex-col  items-center">
        {isLoading == true && <Loader />}
        <PageMenu />
        {!isLoading && user && (
          <>
            {!profile.isVerified && <Notification />}
            <div>
              <h2 className="text-3xl font-bold tracking-wider text-center my-5">
                Profile
              </h2>

              <div className=" flex flex-col gap-5">
                <h3>
                  Role:
                  <span className="font-bold text-lg ml-2">
                    {profile?.role}
                  </span>
                </h3>
              </div>
            </div>
            <div>
              <form className="flex flex-col gap-2" onSubmit={saveProfile}>
                <p className="flex flex-col gap-y-2">
                  <label className="font-semibold">Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={profile?.name}
                    onChange={handleInputChange}
                    className="border border-slate-800 p-2 outline-none"
                  />
                </p>
                <p className="flex flex-col gap-y-2">
                  <label className="font-semibold">Email:</label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={profile?.email}
                    onChange={handleInputChange}
                    disabled
                    className="border border-slate-800 p-2 outline-none"
                  />
                </p>
                <p className="flex flex-col gap-y-2">
                  <label className="font-semibold">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+90 5422222222"
                    value={profile?.phone}
                    onChange={handleInputChange}
                    className="border border-slate-800 p-2 outline-none"
                  />
                </p>
                <p className="flex flex-col gap-y-2">
                  <label className="font-semibold">Bio:</label>
                  <textarea
                    placeholder="bio"
                    name="bio"
                    cols={30}
                    rows={5}
                    value={profile?.bio}
                    onChange={handleInputChange}
                    className="border border-slate-800 px-2  outline-none"
                  />
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2">
                  Update Profile
                </button>
              </form>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default Profile
