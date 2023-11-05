import InfoBox from '../infoBox/InfoBox'
import { FaUsers, FaUserCheck, FaUserTimes, FaUserSlash } from 'react-icons/fa'

const UserStats = () => {
  return (
    <div>
      <h3 className="text-3xl font-bold my-4 text-center">User Stats</h3>
      <div className="w-full flex gap-x-4 items-center justify-center">
        <InfoBox
          bgColor="bg-indigo-800"
          title="Total Users"
          count={31}
          icon={<FaUsers size={40} />}
        />
        <InfoBox
          bgColor="bg-green-600"
          title="Verified Users"
          count={2}
          icon={<FaUserCheck size={40} />}
        />
        <InfoBox
          bgColor="bg-orange-600"
          title="Unverified Users"
          count={6}
          icon={<FaUserTimes size={40} />}
        />
        <InfoBox
          bgColor="bg-red-600"
          title="Suspended Users"
          count={10}
          icon={<FaUserSlash size={40} />}
        />
      </div>
    </div>
  )
}
export default UserStats
