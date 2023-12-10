import AddCircleIcon from '@mui/icons-material/AddCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import GroupsIcon from '@mui/icons-material/Groups';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

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
      icon: <LibraryBooksIcon />,
      subMenu: [
        { title: t('createCourse'), icon: <AddCircleIcon />, path: '/create-course' },
        {
          title: t('courseList'),
          icon: <LibraryBooksIcon />,
          path: '/course-list',
        },
      ],
    },
    // {
    //   title: t('batch'),
    //   path: '/batch',
    //   icon: <Diversity2Icon />,
    //   subMenu: [
    //     {
    //       title: t('batchSubmenu1'),
    //       icon: <AddCircleIcon />,
    //       path: '/create-batch',
    //     },
    //     {
    //       title: t('batchSubmenu2'),
    //       icon: <LibraryBooksIcon />,
    //       path: '/submenu2',
    //     },
    //     {
    //       title: t('batchSubmenu3'),
    //       icon: <LibraryBooksIcon />,
    //       path: '/submenu3',
    //     },
    //     {
    //       title: t('batchSubmenu4'),
    //       icon: <LibraryBooksIcon />,
    //       path: '/submenu4',
    //     },
    //   ],
    // },
    // {
    //   title: t('trainerList'),
    //   path: '/trainerList',
    //   icon: <GroupsIcon />,
    //   subMenu: [
    //     { title: t('addTrainer'), icon: <AddCircleIcon />, path: '/add-trainer' },
    //     {
    //       title: t('batchSubmenu2'),
    //       icon: <LibraryBooksIcon />,
    //       path: '/submenu2',
    //     },
    //     {
    //       title: t('setTrainerLimit'),
    //       icon: <LibraryBooksIcon />,
    //       path: '/submenu3',
    //     },
        
    //     // {
    //     //   title: t('Create Admin User'),
    //     //   icon: <LibraryBooksIcon />,
    //     //   path: '/submenu6',
    //     // },
    //   ],
    // },
    {
      title: t('settings'),
      path: '/settings',
      icon: <SettingsIcon/>,
      subMenu:[
        {
          title: t('adminUserList'),
          icon: <LibraryBooksIcon/>,
          path: '/admin-user-list'
        },
        {
          title: t('createAdminUser'),
          icon: <LibraryBooksIcon/>,
          path: '/create-admin-user'
        },
        // {
        //   title: t('roleList'),
        //   icon: <PersonAddAltOutlinedIcon/>,
        //   path: 'role-list'
        // }
      ]
    }
  ];

  return menuItems;
};

export default useGetMenuItems;
