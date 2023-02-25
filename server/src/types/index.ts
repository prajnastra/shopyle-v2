import { Request } from 'express'
import { ICategory, IUser, IOrder, IProduct } from '../models'

export interface AuthRequest extends Request {
  user?: {
    _id?: string
  }
  auth?: {
    _id?: string
  }
  profile?: IUser
  product?: IProduct | null
  order?: IOrder | null
  queries?: {
    limit?: string
    sortBy?: string
  }
}

export interface CategoryRequest extends Request {
  category?: ICategory | null
}

export interface OrderRequest extends Request {
  profile?: IUser
  order?: IOrder | null
}

export interface UserPurchase {
  _id: string
  name: string
  description: string
  category: string
  quantity: string | number
  price: string | number
  transaction_id: string
  count?: number
}
