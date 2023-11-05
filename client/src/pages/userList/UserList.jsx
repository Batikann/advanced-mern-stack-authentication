import PageMenu from '../../components/pageMenu/PageMenu'
import UserStats from '../../components/userStats/UserStats'

const UserList = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <PageMenu />
      <UserStats />
    </section>
  )
}
export default UserList
