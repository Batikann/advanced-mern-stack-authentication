import { useState } from 'react'
import PageMenu from '../../components/pageMenu/PageMenu'

const initialState = {
  name: 'Emir Batikan UÇAR',
  email: 'emiruar123@gmail.com',
  phone: '',
  bio: '',
  photo: '',
  role: '',
  isVerified: false,
}

const Profile = () => {
  const handleImageChange = () => {}
  const handleInputChange = () => {}
  const [profile, setProfile] = useState(initialState)

  return (
    <section className="flex justify-center flex-col  items-center">
      <PageMenu />
      <div>
        <h2 className="text-3xl font-bold tracking-wider text-center my-5">
          Profile
        </h2>
        <div className=" flex flex-col gap-5">
          <img
            src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1299"
            alt="avatar"
            className="w-28 h-28 rounded-full"
          />
          <h3>
            Role:<span className="font-bold text-lg ml-2">Admin</span>
          </h3>
        </div>
      </div>
      <div>
        <form className="flex flex-col gap-2">
          <p className="flex flex-col gap-y-2">
            <label className="font-semibold">Change Photo:</label>
            <input
              className="border border-slate-800 p-2"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
          </p>
          <p className="flex flex-col gap-y-2">
            <label className="font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={profile.name}
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
              value={profile.email}
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
              value={profile.phone}
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
              value={profile.bio}
              onChange={handleInputChange}
              className="border border-slate-800 px-2  outline-none"
            />
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2">
            Update Profile
          </button>
        </form>
      </div>
    </section>
  )
}
export default Profile
