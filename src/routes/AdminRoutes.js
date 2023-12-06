import { lazy } from 'react';
import Loadable from 'components/common/Loadable';
import Userlist from 'core/UserList/Userlist';
import AdminUserList from 'core/adminUserList/AdminUserList';
import CreateAdminUser from 'core/createUser/CreateAdminUser';
import EditCourse from 'core/course/EditCourse';
import RoleListContainer from 'core/roleList/RoleListContainer';
const PrivateRoute = Loadable(
  lazy(() => import('components/common/PrivateRoute')),
);
const DashboardLayout = Loadable(
  lazy(() => import('components/layouts/DashboardLayout')),
);
const Dashboard = Loadable(lazy(() => import('core/dashboard/Dashboard')));
const BatchList = Loadable(lazy(() => import('core/batch/BatchList')));
const CreateBatch = Loadable(lazy(() => import('core/batch/CreateBatch')));
const CreateCourse = Loadable(lazy(() => import('core/course/CreateCourse')));
const CourseList = Loadable(lazy(() => import('core/course/CourseList')));
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
    { 
      path: 'submenu5',
      element: < Userlist/>,
    },
    {
      path: 'admin-user-list',
      element: <AdminUserList/>
    },
    {
      path: 'create-admin-user',
      element: <CreateAdminUser/>
    },
    { 
      path: 'create-course',
      element: < CreateCourse/>,
    },
    { 
      path: 'course/edit/:id',
      element: < EditCourse/>,
    },
    {
      path: 'role-list',
      element: <RoleListContainer/>
    }
  ],
};

export default AdminRoutes;
