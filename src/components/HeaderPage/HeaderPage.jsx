import { NavLink } from 'react-router-dom';
import css from './HeaderPage.module.css';

const headerItems = [
  { to: '/', title: 'Home' },
  {
    to: '/tweets',
    title: 'Tweets',
  },
];

export const HeaderPage = () => {
  return (
    <nav className={css.nav}>
      <ul>
        {headerItems.map(headerItem => (
          <li key={headerItem.title}>
            <NavLink
              className={({ isActive }) => (isActive ? css.nav_active : null)}
              to={headerItem.to}
            >
              {headerItem.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
