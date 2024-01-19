import { useRouter } from 'next/router'
import { getAllUserIds, getUserData } from '../../utils/api'
import styles from '../../styles/users.module.css'

const Users = ({ users }) => {
  const router = useRouter()

  const handleUserClick = userId => {
    router.push(`/users/${userId}`)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User List</h1>
      <ul className={styles['user-list']}>
        {users.map(user => (
          <li key={user.id} className={styles['user-item']}>
            <span
              className={styles['user-link']}
              onClick={() => handleUserClick(user.id)}
            >
              <span className={styles['user-name']}>{user.name}</span>
            </span>
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
