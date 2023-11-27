import { lazy } from 'react';
import Loadable from 'components/common/Loadable';
import BatchList from 'core/batch/BatchList';
import CreateBatch from 'core/batch/CreateBatch';
// import UserProfile from 'views/userProfile/UserProfile';
const PrivateRoute = Loadable(
  lazy(() => import('components/common/PrivateRoute')),
);
const DashboardLayout = Loadable(
  lazy(() => import('components/layouts/DashboardLayout')),
);
const Dashboard = Loadable(lazy(() => import('core/dashboard/Dashboard')));
const UserProfile = Loadable(lazy(() => import('core/userProfile/UserProfile')));

const AdminRoutes = {
  path: '/',
  element: (
    <>
      <DashboardLayout />
    </>
  ),
  children: [
    { 
      path: 'dashboard',
      element: <Dashboard />,
    },
    {
      path: '/submenu4',
      element:<BatchList/>
    },
    { 
      path: 'create-batch',
      element: < CreateBatch/>,
    },
    { 
      path: 'profile',
      element: < UserProfile/>,
    },
  ],
};

export default AdminRoutes;
