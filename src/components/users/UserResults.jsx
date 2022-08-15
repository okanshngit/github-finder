import { useContext } from 'react';
import UserItem from './UserItem';
import GithubContext from '../../context/github/Github.Context';

function UserResults() {
  const { users, loading } = useContext(GithubContext);

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <h3 key={user.id}>
            <UserItem user={user} />
          </h3>
        ))}
      </div>
    );
  } else {
    return <h3>Loading...</h3>;
  }
}

export default UserResults;
