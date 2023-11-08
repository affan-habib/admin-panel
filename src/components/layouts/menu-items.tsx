import React from 'react';
import {SvgIcon} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
interface Item {
    title: string;
    path: string;
    icon: React.ReactNode;
}

export const menuItems: Item[] = [
    {
        title: 'ড্যাশবোর্ড',
        path: '/products',
        icon: (
            <SvgIcon fontSize="small">
                <InventoryIcon/>
            </SvgIcon>
        )
    },
    {
        title: 'প্রশিক্ষণার্থীর বিবরণী',
        path: '/orders',
        icon: (
            <SvgIcon fontSize="small">
                <ShoppingCartCheckoutIcon/>
            </SvgIcon>
        )
    },

];
