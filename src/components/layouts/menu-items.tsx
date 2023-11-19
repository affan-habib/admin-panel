import { SvgIcon } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  title: string;
  icon: JSX.Element;
  path: string;
  subMenu?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    title: 'ড্যাশবোর্ড',
    path: '/products',
    icon: <InventoryIcon />,
    subMenu: [
      { title: 'Submenu 1', icon: <InventoryIcon />, path: '/submenu1' },
      { title: 'Submenu 2', icon: <InventoryIcon />, path: '/submenu2' },
    ],
  },
  {
    title: 'পাঠ্যক্রম',
    path: '/study',
    icon: <Diversity2Icon />,
    subMenu: [
      { title: 'ব্যাচ তৈরি করুন', icon: <AddCircleIcon />, path: '/submenu1' },
      { title: 'আমন্ত্রনপত্র পাঠান', icon: <LibraryBooksIcon />, path: '/submenu2' },
      { title: 'প্রশিক্ষণার্থী সীমাবদ্ধতা সেট', icon: <LibraryBooksIcon />, path: '/submenu3' },
    ],
  },
  {
    title: 'প্রশিক্ষণার্থীর বিবরণী',
    path: '/orders',
    icon: <ShoppingCartCheckoutIcon />,
  },
];
