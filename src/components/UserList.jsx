import { useState, useEffect } from 'react';
import { fetchUsers } from './api/usersAPI';
import css from './UserList.module.css';

export const UserList = () => {
  const [users, setUsers] = useState([]);

  const getUsersFromAPI = async () => {
    const user = await fetchUsers();
    setUsers(user);
  };
  useEffect(() => {
    getUsersFromAPI();
  }, []);

  return (
    <div>
      {users && (
        <ul>
          {users.map(user => {
            return (
              <li key={user.id} className={css.containerItem}>
                <div className={css.upperPart}>
                  <div></div>
                  {/* <button>Logo</button> */}
                </div>
                <div>
                  <img src={user.avatar} alt={user.name}></img>
                  <p>Follower: {user.followers}</p>
                  <p>Tweets: {user.tweets}</p>
                  <button type="button">Follow</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
