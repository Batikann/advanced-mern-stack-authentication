import ChangeRole from '../../components/changeRole/ChangeRole'
import PageMenu from '../../components/pageMenu/PageMenu'
import Search from '../../components/search/Search'
import UserStats from '../../components/userStats/UserStats'
import { FaTrashAlt } from 'react-icons/fa'

const UserList = () => {
  return (
    <section className="flex flex-col items-center justify-center ">
      <PageMenu />
      <UserStats />
      <div className="w-full flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold my-5">All Users</h3>
        <Search />
        <div>
          <table className="w-full p-1 overflow-x-auto border-collapse text-xl mt-3">
            <thead className="border-y-2 border-y-blue-500">
              <th className="border border-slate-500">s/n</th>
              <th className="border border-slate-500">Name</th>
              <th className="border border-slate-500">Email</th>
              <th className="border border-slate-500">Role</th>
              <th className="border border-slate-500">Change Role</th>
              <th className="border border-slate-500">Action</th>
            </thead>
            <tbody>
              <tr>
                <td className="align-top text-left p-2">1</td>
                <td className="align-top text-left p-2">Emir Batıkan UÇAR</td>
                <td className="align-top text-left p-2">
                  emiruar123@gmail.com
                </td>
                <td className="align-top text-left p-2">Admin</td>
                <td className="align-top text-left p-2">
                  <ChangeRole />
                </td>
                <td className="align-top text-left p-2">
                  <FaTrashAlt size={20} className="text-red-600 " />
                </td>
              </tr>
              <tr>
                <td className="align-top text-left p-2">1</td>
                <td className="align-top text-left p-2">Emir Batıkan UÇAR</td>
                <td className="align-top text-left p-2">
                  emiruar123@gmail.com
                </td>
                <td className="align-top text-left p-2">Admin</td>
                <td className="align-top text-left p-2">
                  <ChangeRole />
                </td>
                <td className="align-top text-left p-2">
                  <FaTrashAlt size={20} className="text-red-600 " />
                </td>
              </tr>
              <tr>
                <td className="align-top text-left p-2">1</td>
                <td className="align-top text-left p-2">Emir Batıkan UÇAR</td>
                <td className="align-top text-left p-2">
                  emiruar123@gmail.com
                </td>
                <td className="align-top text-left p-2">Admin</td>
                <td className="align-top text-left p-2">
                  <ChangeRole />
                </td>
                <td className="align-top text-left p-2">
                  <FaTrashAlt size={20} className="text-red-600 " />
                </td>
              </tr>
              <tr>
                <td className="align-top text-left p-2">1</td>
                <td className="align-top text-left p-2">Emir Batıkan UÇAR</td>
                <td className="align-top text-left p-2">
                  emiruar123@gmail.com
                </td>
                <td className="align-top text-left p-2">Admin</td>
                <td className="align-top text-left p-2">
                  <ChangeRole />
                </td>
                <td className="align-top text-left p-2">
                  <FaTrashAlt size={20} className="text-red-600 " />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
export default UserList
