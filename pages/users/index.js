// pages/users/index.js

import Link from 'next/link'
import { getAllUserIds, getUserData } from '../../utils/api'

const Users = ({ users }) => {
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const getStaticProps = async () => {
  const userPaths = await getAllUserIds()
  const users = await Promise.all(
    userPaths.map(async ({ params }) => {
      const user = await getUserData(params.id)
      return { id: user.id, name: user.name }
    })
  )

  return {
    props: {
      users
    }
  }
}

export { getStaticProps }
export default Users
