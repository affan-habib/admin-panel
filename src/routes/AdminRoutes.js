import { lazy } from 'react';
import Loadable from 'components/common/Loadable';
import MyForm from 'core/addForm/AddSomehing';

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
      path: 'dashboard',
      element: <Dashboard />,
    },
    { 
      path: 'create-batch',
      element: < MyForm/>,
    },
  ],
};

export default AdminRoutes;
