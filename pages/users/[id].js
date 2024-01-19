import { getUserData } from '../../utils/api'
import styles from '../../styles/styles.module.css'

const User = ({ user }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h1 className={styles.title}>{user.name}</h1>
        <p className={styles.text}>Username: {user.username}</p>
        <p className={styles.text}>Email: {user.email}</p>
        <p className={styles.text}>
          Address: {user.address.street}, {user.address.suite},{' '}
          {user.address.city}, {user.address.zipcode}
        </p>
      </div>
    </div>
  )
}

const getStaticPaths = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const usersData = await response.json()

  const paths = usersData.map(user => ({
    params: { id: String(user.id) }
  }))

  return {
    paths,
    fallback: false
  }
}

const getStaticProps = async ({ params }) => {
  const user = await getUserData(params.id)

  return {
    props: {
      user
    }
  }
}

export { getStaticPaths }
export { getStaticProps }
export default User
