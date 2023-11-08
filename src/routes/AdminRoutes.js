import { lazy } from "react";
import Loadable from "components/common/Loadable";

const PrivateRoute = Loadable(lazy(() => import("components/common/PrivateRoute")));
const DashboardLayout = Loadable(lazy(() => import("components/layouts/DashboardLayout")));
const Dashboard = Loadable(lazy(() => import("core/dashboard/Dashboard")));

const AdminRoutes = {
  path: "/",
  element: (
    <>
      < DashboardLayout/>
    </>
  ),
  children: [
    {
      path: "",
      element: <Dashboard />,
    },
  ],
};

export default AdminRoutes;
