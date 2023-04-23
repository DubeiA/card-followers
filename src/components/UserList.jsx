import { useState, useEffect } from 'react';
import { fetchUsers, nextPageUsers } from './api/usersAPI';
import css from './UserList.module.css';

export const UserList = () => {
  const userFollowers = () => {
    return JSON.parse(window.localStorage.getItem('userFollowers')) ?? {};
  };
  const numberFolowers = () => {
    return JSON.parse(window.localStorage.getItem('numberFolowers')) ?? {};
  };

  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(2);
  // const [active, setUserID] = useState(null);

  const [usersFollowingIds, setUserFollowingIds] = useState(userFollowers());

  const [fol, setFol] = useState(numberFolowers());

  useEffect(() => {
    window.localStorage.setItem(
      'userFollowers',
      JSON.stringify(usersFollowingIds)
    );
    window.localStorage.setItem('numberFolowers', JSON.stringify(fol));
  }, [usersFollowingIds, fol]);

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

  const followind = (id, followingStatus) => {
    setUserFollowingIds(prevState => {
      const newState = { ...prevState };

      if (followingStatus) {
        delete newState[id];
      } else {
        newState[id] = true;
      }

      return newState;
    });

    setUsers(prevState => {
      return prevState.map(user => {
        if (user.id === id) {
          const newFollowers = followingStatus
            ? user.followers - 1
            : user.followers + 1;
          setFol(prevState => {
            return {
              ...prevState,
              [id]: newFollowers,
            };
          });
          return {
            ...user,
            followers: newFollowers,
          };
        }

        return user;
      });
    });
  };

  return (
    <div className={css.mainContainer}>
      {users && (
        <ul className={css.list}>
          {users.map(user => {
            const followingStatus = usersFollowingIds[user.id];

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
                      {followingStatus
                        ? fol[user.id]
                        : user.followers.toLocaleString('en-US')}
                      Followers
                    </p>

                    <button
                      id={user.id}
                      className={followingStatus ? css.btnPress : css.btnFollow}
                      type="button"
                      onClick={() => followind(user.id, followingStatus)}
                    >
                      {followingStatus ? 'Following' : 'Follow'}
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
