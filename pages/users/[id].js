import { getUserData } from '../../utils/api'

const User = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>
        Address: {user.address.street}, {user.address.suite},{' '}
        {user.address.city}, {user.address.zipcode}
      </p>
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
