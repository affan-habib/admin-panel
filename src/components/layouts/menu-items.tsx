import { SvgIcon } from '@mui/material';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  title: string;
  icon: JSX.Element;
  path: string;
  subMenu?: MenuItem[];
}

export const useGetMenuItems = (): MenuItem[] => {
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      title: t('dashboardTitle'),
      path: '/dashboard',
      icon: <SpaceDashboardIcon />,
    },
    {
      title: t('curriculum'),
      path: '/study',
      icon: <LibraryBooksIcon  />,
      subMenu: [
        { title: t('createBatch'), icon: <AddCircleIcon />, path: '/submenu1' },
        { title: t('sendInvitation'), icon: <LibraryBooksIcon />, path: '/submenu2' },
        { title: t('setStudentLimits'), icon: <LibraryBooksIcon />, path: '/submenu3' },
      ],
    },
    {
      title: t('batch'),
      path: '/batch',
      icon: <Diversity2Icon />,
      subMenu: [
        { title: t('batchSubmenu1'), icon: <AddCircleIcon />, path: '/create-batch' },
        { title: t('batchSubmenu2'), icon: <LibraryBooksIcon />, path: '/submenu2' },
        { title: t('batchSubmenu3'), icon: <LibraryBooksIcon />, path: '/submenu3' },
        { title: t('batchSubmenu4'), icon: <LibraryBooksIcon />, path: '/submenu4' },
      ],
    },
    {
      title: t('trainerList'),
      path: '/trainerList',
      icon: <GroupsIcon />,
      subMenu: [
        { title: t('createBatch'), icon: <AddCircleIcon />, path: '/submenu1' },
        { title: t('sendInvitation'), icon: <LibraryBooksIcon />, path: '/submenu2' },
        { title: t('setStudentLimits'), icon: <LibraryBooksIcon />, path: '/submenu3' },
      ],
    },
    {
      title: t('leave'),
      path: '/leave',
      icon: <LogoutIcon />,
    },
  ];

  return menuItems;
};

export default useGetMenuItems;
