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

export interface ProductCart {
  _id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  sold: number
  photo: string
  createdAt: string
  updatedAt: string
  count: number
}
