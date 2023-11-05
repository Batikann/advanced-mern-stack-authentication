import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

const ChangeRole = () => {
  const [userRole, setUserRole] = useState('')
  return (
    <div className="sort">
      <form
        className="flex gap-x-2"
        onSubmit={(e) => changeRole(e, _id, userRole)}
      >
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="">-- select --</option>
          <option value="subscriber">Subscriber</option>
          <option value="author">Author</option>
          <option value="admin">Admin</option>
          <option value="suspended">Suspended</option>
        </select>
        <button className="bg-blue-600 text-white p-2 hover:bg-blue-700 rounded-sm">
          <FaCheck size={15} />
        </button>
      </form>
    </div>
  )
}
export default ChangeRole
