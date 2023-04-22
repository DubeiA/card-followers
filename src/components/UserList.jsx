import { useState, useEffect } from 'react';
import { fetchUsers } from './api/usersAPI';
import css from './UserList.module.css';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [press, setPress] = useState(true);

  const getUsersFromAPI = async () => {
    const user = await fetchUsers();
    setUsers(user);
  };
  useEffect(() => {
    getUsersFromAPI();
  }, []);

  const styleBtn = () => {
    if (press) {
      return css.btnFollow;
    }
    return css.btnPress;
  };

  const follow = () => {
    if (press) {
      setPress(false);
    }
    setPress(true);
  };

  return (
    <div>
      {users && (
        <ul className={css.list}>
          {users.map(user => {
            return (
              <li key={user.id} className={css.containerItem}>
                <div className={css.space}>
                  <button type="button" className={css.imageLogo}></button>
                  <div className={css.upperPart}></div>
                  <div className={css.middleLine}>
                    <img
                      className={css.userFoto}
                      src={user.avatar}
                      alt={user.name}
                    ></img>
                  </div>
                  <div className={css.lowerPart}>
                    <p className={css.ps}> {user.tweets} Tweets</p>
                    <p className={css.ps}>
                      {' '}
                      {user.followers.toLocaleString('en-US')} Followers
                    </p>

                    <button
                      className={styleBtn()}
                      type="button"
                      onClick={follow}
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
