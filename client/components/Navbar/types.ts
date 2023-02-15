import { UserTypes } from '../../types'

export type NavItemProps = {
  label: string
  subLabel?: string
  children?: Array<NavItemProps>
  href?: string
}

export type NavItem = {
  [index in UserTypes]: Array<NavItemProps>
}
