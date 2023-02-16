import type { Session } from 'next-auth'

export enum UserTypes {
  DEFAULT = 'DEFAULT',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export interface SessionExtended extends Session {
  token: string
  expires: string
  user: {
    id: string
    name: string
    email: string
    user_type: UserTypes
  }
}
