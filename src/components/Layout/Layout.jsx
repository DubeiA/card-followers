import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderPage } from '../HeaderPage/HeaderPage';

export const Layout = () => {
  return (
    <>
      <HeaderPage />

      <Suspense fallback={<div>Loading....</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};
