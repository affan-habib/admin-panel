import { useRoutes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes';

export default function ThemeRoutes() {

  return useRoutes([AdminRoutes, PublicRoutes]);
}
