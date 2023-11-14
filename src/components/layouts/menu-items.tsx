import { SvgIcon } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
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
    icon: (
      <SvgIcon fontSize="small">
        <InventoryIcon />
      </SvgIcon>
    ),
    subMenu: [
      { title: 'Submenu 1', icon: <InventoryIcon />, path: '/submenu1' },
      { title: 'Submenu 2', icon: <InventoryIcon />, path: '/submenu2' },
    ],
  },
  {
    title: 'প্রশিক্ষণার্থীর বিবরণী',
    path: '/orders',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingCartCheckoutIcon />
      </SvgIcon>
    ),
  },
];
