import { lazy } from 'react';
import Loadable from 'components/common/Loadable';
const PrivateRoute = Loadable(
  lazy(() => import('components/common/PrivateRoute')),
);
const DashboardLayout = Loadable(
  lazy(() => import('components/layouts/DashboardLayout')),
);
const Dashboard = Loadable(lazy(() => import('core/dashboard/Dashboard')));
const BatchList = Loadable(lazy(() => import('core/batch/BatchList')));
const CreateBatch = Loadable(lazy(() => import('core/batch/CreateBatch')));
const CourseList = Loadable(lazy(() => import('core/course/CreateChapter')));
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
    { 
      path: 'course-list',
      element: < CourseList/>,
    },
  ],
};

export default AdminRoutes;
