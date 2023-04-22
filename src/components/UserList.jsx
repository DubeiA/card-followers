import { useState, useEffect } from 'react';
import { fetchUsers, nextPageUsers } from './api/usersAPI';
import css from './UserList.module.css';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(2);
  // const [pressTwice, setPressTwice] = useState(true);
  // const [isFollow, setIsFollow] = useState(false);
  // const [followerCount, setFollowerCount] = useState(null);

  // console.log(pressTwice);

  const getUsersFromAPI = async () => {
    const user = await fetchUsers();
    setUsers(user);
  };

  const fetchNextPage = async () => {
    setPage(prevPage => prevPage + 1);
    const usersNext = await nextPageUsers(page, 3);
    setUsers(prevUser => [...prevUser, ...usersNext]);
    if (page === 4) {
      setPage(1);
      await nextPageUsers(page, 3);
      return;
    }

    return usersNext;
  };

  useEffect(() => {
    getUsersFromAPI();
  }, []);

  const followind = (id, e) => {
    // console.log(e.target.id);
    const userIdx = users.findIndex(user => user.id === id);

    if (userId === id) {
      setUserId(null);
      users[userIdx].followers--;

      return;
    }

    setUserId(id);
    users[userIdx].followers++;
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
                      {user.followers.toLocaleString('en-US')}
                      Followers
                    </p>

                    <button
                      id={user.id}
                      className={
                        userId === user.id ? css.btnPress : css.btnFollow
                      }
                      type="button"
                      onClick={e => followind(user.id, e)}
                    >
                      {userId === user.id ? 'Following' : 'Follow'}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {page <= 4 && (
        <button type="button" onClick={fetchNextPage}>
          Next
        </button>
      )}
    </div>
  );
};
