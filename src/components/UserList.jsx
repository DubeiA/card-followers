import { useState, useEffect } from 'react';
import { fetchUsers, nextPageUsers } from './api/usersAPI';
import css from './UserList.module.css';

export const UserList = () => {
  const userBtn = () => {
    return JSON.parse(window.localStorage.getItem('userBtn')) ?? false;
  };
  const userID = () => {
    return JSON.parse(window.localStorage.getItem('userID')) ?? null;
  };
  const userFollowers = () => {
    return JSON.parse(window.localStorage.getItem('userFollowers')) ?? null;
  };

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(userID());
  const [page, setPage] = useState(2);
  const [btnActive, setBtnActive] = useState(userBtn());
  const [fol, setFo] = useState(userFollowers());

  const [followerCount, setFollowerCount] = useState(null);

  useEffect(() => {
    window.localStorage.setItem('userBtn', JSON.stringify(btnActive));
    window.localStorage.setItem('userID', JSON.stringify(userId));
    window.localStorage.setItem('userFollowers', JSON.stringify(fol));
  }, [btnActive, userId, fol]);

  const fetchNextPage = async () => {
    setPage(prevPage => prevPage + 1);
    const usersNext = await nextPageUsers(page, 3);
    setUsers(prevUser => [...prevUser, ...usersNext]);
    if (page === 4) {
      return;
    }

    return usersNext;
  };

  useEffect(() => {
    (async () => {
      const user = await fetchUsers();
      setUsers(user);
    })();
  }, []);

  const followind = id => {
    const userIdx = users.findIndex(user => user.id === id);

    if (userId === id) {
      setUserId(null);

      setFollowerCount(users[userIdx].followers--);

      setFo(followerCount);
      setBtnActive(false);
      return;
    }

    setUserId(id);
    setBtnActive(true);
    setFollowerCount(users[userIdx].followers++);
    setFo(followerCount);
  };

  return (
    <div className={css.mainContainer}>
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
                      {btnActive && userId === user.id
                        ? fol
                        : user.followers.toLocaleString('en-US')}
                      Followers
                    </p>

                    <button
                      id={user.id}
                      className={
                        btnActive && userId === user.id
                          ? css.btnPress
                          : css.btnFollow
                      }
                      type="button"
                      onClick={() => followind(user.id)}
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
      {users && page <= 4 && (
        <button className={css.btnLoad} type="button" onClick={fetchNextPage}>
          Next
        </button>
      )}
    </div>
  );
};
