import { NavItem } from './types'

export const NAV_ITEMS: NavItem = {
  DEFAULT: [
    {
      label: 'Home',
      href: '#',
    },
    {
      label: 'Info',
      children: [
        {
          label: 'Mission',
          subLabel: 'Know about our mission',
          href: '#',
        },
        {
          label: 'Vision',
          subLabel: 'Know more about our vision',
          href: '#',
        },
      ],
    },
    {
      label: 'Contact us',
      href: '#',
    },
    {
      label: 'About us',
      href: '#',
    },
  ],
  ADMIN: [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Category',
      children: [
        {
          label: 'Manage',
          subLabel: 'Update/Delete product categories',
          href: '/category/manage',
        },
        {
          label: 'Create',
          subLabel: 'Create cateogries for products',
          href: '/category/create',
        },
      ],
    },
    {
      label: 'Products',
      children: [
        {
          label: 'Manage',
          subLabel: 'Update/Delete listed products',
          href: '/product/manage',
        },
        {
          label: 'Create',
          subLabel: 'Add your products for sell',
          href: '/product/create',
        },
      ],
    },
  ],
  CUSTOMER: [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Products',
      href: '/product',
    },
    {
      label: 'Cart',
      href: '/cart',
    },
  ],
}
