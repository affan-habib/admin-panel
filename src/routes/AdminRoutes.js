import { lazy } from 'react';
import Loadable from 'components/common/Loadable';
import TrainerList from 'core/trainer/TrainerList';
import TraineeList from 'core/trainee/TraineeList';
import CollegeList from 'core/college/CollegeList';
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
const EditCourse = Loadable(lazy(() => import('core/course/EditCourse')));
const CourseList = Loadable(lazy(() => import('core/course/CourseList')));
const AdminUserList = Loadable(lazy(() => import('core/adminUserList/AdminUserList')));
const CreateAdminUser = Loadable(lazy(() => import('core/createUser/CreateAdminUser')));
const UserProfile = Loadable(lazy(() => import('core/userProfile/UserProfile')));
const EditAdminUser = Loadable(lazy(() => import('core/createUser/EditAdminUser')));
const RoleListContainer = Loadable(lazy(() => import('core/roleList/RoleListContainer')));


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
      path: 'admin-user-list',
      element: <AdminUserList/>
    },
    {
      path: 'create-admin-user',
      element: <CreateAdminUser/>
    },
    {
      path: 'edit-admin-user/:id',
      element: <EditAdminUser/>
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
    },
    {
      path:'circular'
    },
    {
      path:'trainerList',
      element:<TrainerList/>
    },
    {
      path:'traineeList',
      element:<TraineeList/>
    },
    {
      path:'collegeList',
      element:<CollegeList/>
    }
  ],
};

export default AdminRoutes;
