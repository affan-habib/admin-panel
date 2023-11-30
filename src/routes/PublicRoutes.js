import { lazy } from 'react';
import Loadable from 'components/common/Loadable';
const LoginPage = Loadable(lazy(() => import('core/auth/LoginPage')));
const NotFoundPage = Loadable(
  lazy(() => import('components/common/NotFoundPage')),
);

const PublicRoutes = {
  path: '/',
  children: [
    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      path: '*',
      element: <NotFoundPage />,
    },
  ],
};

export default PublicRoutes;
