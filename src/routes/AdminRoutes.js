import { lazy } from 'react';
import Loadable from 'components/common/Loadable';
import BatchTable from 'core/dashboard/BatchTable';

const PrivateRoute = Loadable(
  lazy(() => import('components/common/PrivateRoute')),
);
const DashboardLayout = Loadable(
  lazy(() => import('components/layouts/DashboardLayout')),
);
const Dashboard = Loadable(lazy(() => import('core/dashboard/Dashboard')));

const AdminRoutes = {
  path: '/',
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  children: [
    { 
      path: '',
      element: <Dashboard />,
    },
    {
      path: '/submenu4',
      element:<BatchTable/>
    }
  ],
};

export default AdminRoutes;
