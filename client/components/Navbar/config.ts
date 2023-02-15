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
  ],
  CUSTOMER: [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Analytics',
      href: '/analytics',
    },
  ],
}
